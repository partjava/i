package com.partjava.service;
import com.partjava.entity.AiConversation;
import com.partjava.repository.AiConversationMapper;
import com.partjava.repository.AiMessageMapper;
import com.partjava.service.impl.AiConversationServiceImpl;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.*;
class AiConversationServiceTest {
 @Test void otherAccountsCannotReadOrAppendMessages() {
  var conversations=mock(AiConversationMapper.class);var messages=mock(AiMessageMapper.class);
  when(conversations.selectById(4L)).thenReturn(AiConversation.builder().id(4L).userId(7L).build());
  var service=new AiConversationServiceImpl(conversations,messages);
  assertThrows(IllegalArgumentException.class,()->service.getConversationMessages(8L,4L));
  assertThrows(IllegalArgumentException.class,()->service.saveDialog(8L,4L,"问题","回答"));verifyNoInteractions(messages);
 }
 @Test void ownerCanRestoreAndContinueConversation() {
  var conversations=mock(AiConversationMapper.class);var messages=mock(AiMessageMapper.class);
  var conversation=AiConversation.builder().id(4L).userId(7L).title("新对话").build();when(conversations.selectById(4L)).thenReturn(conversation);
  var service=new AiConversationServiceImpl(conversations,messages);
  service.getConversationMessages(7L,4L);verify(messages).selectList(any());
  service.saveDialog(7L,4L,"新的问题","新的回答");
  verify(messages,times(2)).insert(any(com.partjava.entity.AiMessage.class));verify(conversations).updateById(conversation);assertEquals("新的问题",conversation.getTitle());
 }
}
