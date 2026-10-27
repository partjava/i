package com.partjava.service.impl;
import com.partjava.dto.JudgementResult;
import com.partjava.entity.ChallengeDetail;
import com.partjava.repository.*;
import com.partjava.service.SandboxService;
import org.springframework.context.ApplicationEventPublisher;
import org.junit.jupiter.api.Test;
import java.util.List;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.*;
class ChallengeSubmissionTest {
 private final ChallengeDetailMapper details=mock(ChallengeDetailMapper.class);
 private final UserChallengeRecordMapper records=mock(UserChallengeRecordMapper.class);
 private final SandboxService sandbox=mock(SandboxService.class);
 private final ApplicationEventPublisher events=mock(ApplicationEventPublisher.class);
 private ChallengeServiceImpl service(){return new ChallengeServiceImpl(mock(ChallengeMapper.class),details,mock(ChallengeQuizMapper.class),records,mock(ChallengeDraftMapper.class),sandbox,events);}
 @Test void missingCasesRunsButCannotPassOrWriteProgress(){
  when(details.selectById(3)).thenReturn(ChallengeDetail.builder().challengeId(3).starterCode("pass").build());
  when(sandbox.evaluateCode(anyString(),anyString(),anyDouble())).thenReturn(new JudgementResult("EXECUTED","真实输出",10));
  var result=service().submitCode(7,3,"print(1)");assertEquals("EXECUTED",result.getStatus());verifyNoInteractions(records,events);
  verify(sandbox).evaluateCode(eq("print(1)"),argThat(spec->spec.contains("cases")),anyDouble());
 }
 @Test void blankCodeDoesNotStartExecution(){when(details.selectById(3)).thenReturn(ChallengeDetail.builder().challengeId(3).build());assertThrows(IllegalArgumentException.class,()->service().submitCode(7,3,"  "));verifyNoInteractions(sandbox,records,events);}
 @Test void serviceFailuresDoNotOverwriteProgress(){
  when(details.selectById(3)).thenReturn(ChallengeDetail.builder().challengeId(3).testCases(List.of(Map.of("args",List.of(1,2),"expected",3,"function","add"))).build());
  when(sandbox.evaluateCode(anyString(),anyString(),anyDouble())).thenReturn(new JudgementResult("SERVICE_UNAVAILABLE","Docker 不可用",0));
  assertEquals("SERVICE_UNAVAILABLE",service().submitCode(7,3,"def add(a,b): return a+b").getStatus());verifyNoInteractions(records,events);
 }
 @Test void onlyVerifiedAcceptedResultsGrantProgress(){
  when(details.selectById(3)).thenReturn(ChallengeDetail.builder().challengeId(3).testCases(List.of(Map.of("args",List.of(1,2),"expected",3,"function","add"))).build());
  when(sandbox.evaluateCode(anyString(),anyString(),anyDouble())).thenReturn(new JudgementResult("ACCEPTED","1/1 passed",10));
  assertEquals("ACCEPTED",service().submitCode(7,3,"def add(a,b): return a+b").getStatus());
  verify(records).insert(any(com.partjava.entity.UserChallengeRecord.class));verify(events).publishEvent(any(com.partjava.event.UserActionEvent.class));
 }
 @Test void sampleRunUsesOnlyFirstTwoPublicCasesAndNeverWritesProgress(){
  var publicCases=List.<Object>of(Map.of("args",List.of(1),"expected",1),Map.of("args",List.of(2),"expected",2),Map.of("args",List.of(3),"expected",3));
  when(details.selectById(3)).thenReturn(ChallengeDetail.builder().challengeId(3).testCases(publicCases).evaluationCases(List.of(Map.of("args",List.of("hidden-input"),"expected","hidden-output"))).build());
  when(sandbox.evaluateCode(anyString(),anyString(),anyDouble())).thenReturn(new JudgementResult("ACCEPTED","2/2 passed",10));
  var result=service().runSampleCode(7,3,"def solve(x):return x");assertEquals("ACCEPTED",result.getStatus());assertTrue(result.getMessage().contains("不记录通关"));
  verify(sandbox).evaluateCode(anyString(),argThat(spec->{try{var cases=new com.fasterxml.jackson.databind.ObjectMapper().readTree(spec).path("cases");return cases.size()==2&&!spec.contains("hidden-input")&&!spec.contains("hidden-output")&&!cases.get(0).path("hidden").asBoolean();}catch(Exception e){return false;}}),anyDouble());
  verifyNoInteractions(records,events);
 }
 @Test void fullSubmissionIncludesPublicAndHiddenCases(){
  when(details.selectById(3)).thenReturn(ChallengeDetail.builder().challengeId(3).testCases(List.of(Map.of("args",List.of(1),"expected",1))).evaluationCases(List.of(Map.of("args",List.of(9),"expected",9))).build());
  when(sandbox.evaluateCode(anyString(),anyString(),anyDouble())).thenReturn(new JudgementResult("ACCEPTED","2/2 passed",10));
  service().submitCode(7,3,"def solve(x):return x");
  verify(sandbox).evaluateCode(anyString(),argThat(spec->{try{var cases=new com.fasterxml.jackson.databind.ObjectMapper().readTree(spec).path("cases");return cases.size()==2&&!cases.get(0).path("hidden").asBoolean()&&cases.get(1).path("hidden").asBoolean();}catch(Exception e){return false;}}),anyDouble());
 }
 @Test void guestSubmissionCannotCreditFallbackAccount(){
  when(details.selectById(3)).thenReturn(ChallengeDetail.builder().challengeId(3).testCases(List.of(Map.of("args",List.of(1),"expected",1))).build());
  when(sandbox.evaluateCode(anyString(),anyString(),anyDouble())).thenReturn(new JudgementResult("ACCEPTED","1/1 passed",10));
  assertEquals("ACCEPTED",service().submitCode(null,3,"def solve(x):return x").getStatus());verifyNoInteractions(records,events);
 }

}
