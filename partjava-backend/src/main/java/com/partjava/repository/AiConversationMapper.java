package com.partjava.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.partjava.dto.response.ConversationResp;
import com.partjava.entity.AiConversation;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface AiConversationMapper extends BaseMapper<AiConversation> {

    @Select("SELECT c.id, c.title, c.updated_at as updatedAt, " +
            "(SELECT content FROM ai_messages WHERE conversation_id = c.id ORDER BY created_at ASC LIMIT 1) as firstMsg " +
            "FROM ai_conversations c " +
            "WHERE c.user_id = #{userId} " +
            "ORDER BY c.updated_at DESC LIMIT 50")
    List<ConversationResp> selectUserConversations(Long userId);
}
