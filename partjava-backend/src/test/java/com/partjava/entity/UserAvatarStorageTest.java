package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.FieldStrategy;
import com.baomidou.mybatisplus.core.MybatisConfiguration;
import com.baomidou.mybatisplus.core.metadata.TableInfo;
import com.baomidou.mybatisplus.core.metadata.TableInfoHelper;
import org.apache.ibatis.builder.MapperBuilderAssistant;
import org.junit.jupiter.api.Test;
import com.baomidou.mybatisplus.core.MybatisSqlSessionFactoryBuilder;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.partjava.repository.UserMapper;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class UserAvatarStorageTest {
    private TableInfo tableInfo() {
        return TableInfoHelper.initTableInfo(
                new MapperBuilderAssistant(new MybatisConfiguration(), "avatar-storage-test"), User.class);
    }

    @Test
    void avatarWritesUseExistingMediumtextImageColumn() {
        var field = tableInfo().getFieldList().stream()
                .filter(item -> item.getProperty().equals("avatar")).findFirst().orElseThrow();
        assertEquals("image", field.getColumn(),
                "base64 avatars cannot be written to users.avatar VARCHAR(500)");
    }

    @Test
    void legacyAvatarColumnIsReadOnly() {
        var field = tableInfo().getFieldList().stream()
                .filter(item -> item.getColumn().equals("avatar")).findFirst().orElseThrow();
        assertEquals(FieldStrategy.NEVER, field.getUpdateStrategy());
        assertEquals(FieldStrategy.NEVER, field.getInsertStrategy());
    }

    @Test
    void generatedUserUpdateWritesLongImageAndTextWithoutLegacyAvatar() {
        var configuration = new MybatisConfiguration();
        configuration.addMapper(UserMapper.class);
        new MybatisSqlSessionFactoryBuilder().build(configuration);
        var user = User.builder().id(7L).nickname("Updated name")
                .avatar("data:image/jpeg;base64," + "a".repeat(10000)).build();
        var bound = configuration.getMappedStatement(UserMapper.class.getName() + ".updateById")
                .getBoundSql(Map.of("et", user));
        var sql = bound.getSql();
        assertTrue(sql.contains("image=?"), sql);
        assertTrue(sql.contains("name=?"), sql);
        assertFalse(sql.matches("(?s).*\\bavatar\\s*=.*"), sql);
        assertTrue(bound.getParameterMappings().stream()
                .anyMatch(item -> item.getProperty().equals("et.avatar")));
    }

    @Test
    void publicJsonKeepsAvatarContractAndHidesLegacyStorage() throws Exception {
        var user = User.builder().avatar("new-image").legacyAvatar("old-url").build();
        var json = new ObjectMapper().readTree(new ObjectMapper().writeValueAsString(user));
        assertEquals("new-image", json.get("avatar").asText());
        assertFalse(json.has("legacyAvatar"));
    }

    @Test
    void existingAvatarUrlRemainsVisibleUntilAReplacementIsStored() throws Exception {
        var user = new User();
        var legacy = User.class.getDeclaredField("legacyAvatar");
        legacy.setAccessible(true);
        legacy.set(user, "https://example.com/old.png");
        assertEquals("https://example.com/old.png", user.getAvatar());
        var image = "data:image/jpeg;base64," + "a".repeat(2000);
        user.setAvatar(image);
        assertEquals(image, user.getAvatar());
        user.setAvatar("");
        assertEquals("", user.getAvatar());
    }
}
