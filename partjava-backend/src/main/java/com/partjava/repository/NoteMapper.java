package com.partjava.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.partjava.entity.Note;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface NoteMapper extends BaseMapper<Note> {
}
