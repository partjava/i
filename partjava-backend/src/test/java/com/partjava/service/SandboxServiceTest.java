package com.partjava.service;

import com.partjava.service.impl.SandboxServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;
import org.springframework.test.util.ReflectionTestUtils;
import static org.junit.jupiter.api.Assertions.*;

/** Explicit opt-in only: these calls consume OnlineCompiler runs. Never run in the default suite. */
@EnabledIfEnvironmentVariable(named="PARTJAVA_RUN_ONLINECOMPILER_TESTS",matches="true")
class SandboxServiceTest {
 private SandboxServiceImpl configuredService(){
  String key=System.getenv("ONLINECOMPILER_API_KEY");assertNotNull(key,"Opt-in integration requires ONLINECOMPILER_API_KEY");assertFalse(key.isBlank());
  var sandbox=new SandboxServiceImpl();ReflectionTestUtils.setField(sandbox,"apiKey",key);
  String base=System.getenv("ONLINECOMPILER_BASE_URL");if(base!=null&&!base.isBlank())ReflectionTestUtils.setField(sandbox,"baseUrl",base);
  String compiler=System.getenv("ONLINECOMPILER_COMPILER");if(compiler!=null&&!compiler.isBlank())ReflectionTestUtils.setField(sandbox,"compiler",compiler);
  return sandbox;
 }
 @Test void nativeProviderAcceptsTypedAddCase(){
  var result=configuredService().evaluateCode("def add(a,b): return a+b","{\"cases\":[{\"function\":\"add\",\"args\":[1,2],\"expected\":3}]}",5);
  assertEquals("ACCEPTED",result.getStatus(),result.getMessage());
 }
 @Test void nativeProviderRejectsWrongValue(){
  var result=configuredService().evaluateCode("def add(a,b): return a-b","{\"cases\":[{\"function\":\"add\",\"args\":[1,2],\"expected\":3}]}",5);
  assertEquals("WRONG_ANSWER",result.getStatus(),result.getMessage());
 }
}
