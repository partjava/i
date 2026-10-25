package com.partjava.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.partjava.dto.response.UserProfileResp;
import com.partjava.entity.User;
import com.partjava.entity.UserProfile;
import com.partjava.repository.UserMapper;
import com.partjava.repository.UserProfileMapper;
import com.partjava.service.impl.UserProfileServiceImpl;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserProfileServiceTest {
    @Test
    void textEditWithStoredLargeAvatarUpdatesBothRecords() {
        var users = mock(UserMapper.class);
        var profiles = mock(UserProfileMapper.class);
        var image = "data:image/jpeg;base64," + "a".repeat(10000);
        var user = User.builder().id(7L).nickname("Old name").avatar(image).build();
        var profile = UserProfile.builder().id(1L).userId(7L).avatar(image).build();
        when(users.selectById(7L)).thenReturn(user);
        when(profiles.selectOne(any())).thenReturn(profile);
        var service = new UserProfileServiceImpl(users, profiles, new ObjectMapper());

        service.updateUserProfile(7L, UserProfileResp.builder()
                .name("Updated name").bio("Updated bio").image(image).build());

        verify(users).updateById(user);
        verify(profiles).updateById(profile);
        assertEquals("Updated name", user.getNickname());
        assertEquals("Updated bio", user.getBio());
        assertEquals(image, user.getAvatar());
        assertEquals(image, profile.getAvatar());
        assertEquals("Updated name", profile.getName());
    }
}
