package com.partjava.controller;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
class AiPageContextTest {
 @Test void preservesFollowUpHistoryButRejectsClientSystemRoles() {
  var messages = AiChatController.buildMessages("接着解释", "当前题目", java.util.List.of(
   java.util.Map.of("role", "system", "content", "UNTRUSTED"),
   java.util.Map.of("role", "user", "content", "第一问"),
   java.util.Map.of("role", "assistant", "content", "第一答")));
  assertEquals(4, messages.size());
  assertEquals("第一问", messages.get(1).get("content"));
  assertEquals("第一答", messages.get(2).get("content"));
  assertEquals("接着解释", messages.get(3).get("content"));
  assertTrue(messages.stream().noneMatch(m -> m.get("content").contains("UNTRUSTED")));
 }
 @Test void boundsHistoryAndIndividualMessages() {
  var history = new java.util.ArrayList<java.util.Map<String,String>>();
  for (int i=0;i<30;i++) history.add(java.util.Map.of("role","user","content","x".repeat(5000)));
  var messages = AiChatController.buildMessages("新问题", null, history);
  assertEquals(9, messages.size()); assertEquals(3000, messages.get(0).get("content").length());
 }

 @Test void includesPageAsReferenceAndKeepsQuestionSeparate() {
  var req = new AiChatController.ChatReq();
  req.setMessage("解释当前页面"); req.setPageContext("基本算术运算符 int a = 10, b = 3;");
  var messages = AiChatController.buildMessages(req.getResolvedPrompt(), req.getPageContext());
  assertEquals(2, messages.size());
  assertTrue(messages.get(0).get("content").contains("基本算术运算符"));
  assertEquals("解释当前页面", messages.get(1).get("content"));
 }
 @Test void acceptsLegacyQuestionsWithoutPageAndBoundsContext() {
  assertEquals(1, AiChatController.buildMessages("hello", null).size());
  assertTrue(AiChatController.buildMessages("hello", "a".repeat(20000)).get(0).get("content").length() < 13000);
 }
}
