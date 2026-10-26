package com.partjava.service.impl;
import com.partjava.entity.ChallengeDetail;
import com.partjava.repository.*;
import com.partjava.service.SandboxService;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.test.util.ReflectionTestUtils;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.*;
class ThinkingEvaluationTest {
 private final ChallengeDetailMapper details = mock(ChallengeDetailMapper.class);
 private final UserChallengeRecordMapper records = mock(UserChallengeRecordMapper.class);
 private ChallengeServiceImpl service() {
  return spy(new ChallengeServiceImpl(mock(ChallengeMapper.class),details,mock(ChallengeQuizMapper.class),records,mock(ChallengeDraftMapper.class),mock(SandboxService.class),mock(ApplicationEventPublisher.class)));
 }
 private void question() {when(details.selectById(3)).thenReturn(ChallengeDetail.builder().challengeId(3).thinkingQuestion("为什么循环终止？").theoryMarkdown("循环条件").build());}
 @Test void missingKeyMustNotWriteDefaultScore() {question();var service=service();assertThrows(IllegalArgumentException.class,()->service.evaluateThinkingQuestion(7,3,"条件为假"));verifyNoInteractions(records);}
 @Test void invalidModelScoresMustNotWrite() throws Exception {
  question(); var service=service();ReflectionTestUtils.setField(service,"aiApiKey","test-key");
  for(String response:java.util.List.of("出错了5次", "{\"score\":11,\"feedback\":\"bad\"}","{\"score\":5.5,\"feedback\":\"bad\"}","{\"score\":5}","{\"score\":\"5\",\"feedback\":\"bad\"}")) {
   doReturn(response).when(service).callAI(anyString());
   assertThrows(IllegalArgumentException.class,()->service.evaluateThinkingQuestion(7,3,"条件为假"));
  }
  verifyNoInteractions(records);
 }
 @Test void validResultIncludesQuestionAndWritesValidatedScore() throws Exception {
  question();var service=service();ReflectionTestUtils.setField(service,"aiApiKey","test-key");
  doReturn("```json\n{\"score\":8,\"feedback\":\"说明了终止条件\"}\n```").when(service).callAI(anyString());
  var result=service.evaluateThinkingQuestion(7,3,"条件为假");assertEquals(8,result.getScore());
  verify(service).callAI(argThat(prompt->prompt.contains("为什么循环终止？")&&prompt.contains("循环条件")&&prompt.contains("条件为假")));
  verify(records).insert(argThat((com.partjava.entity.UserChallengeRecord record)->record.getThinkingScore()==8));
 }
 @Test void transportFailureDoesNotOverwriteExistingScore() throws Exception {
  question();var service=service();ReflectionTestUtils.setField(service,"aiApiKey","test-key");doThrow(new RuntimeException("unavailable")).when(service).callAI(anyString());
  assertThrows(IllegalArgumentException.class,()->service.evaluateThinkingQuestion(7,3,"回答"));verifyNoInteractions(records);
 }
}
