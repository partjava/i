package com.partjava.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.partjava.entity.PdfBook;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PdfBookMapper extends BaseMapper<PdfBook> {
}
