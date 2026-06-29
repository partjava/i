package com.partjava.config;

import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.partjava.entity.User;
import com.partjava.repository.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class VipResetScheduler {

    @Autowired
    private UserMapper userMapper;

    // 每月1号的凌晨0点0分0秒执行
    @Scheduled(cron = "0 0 0 1 * ?")
    public void resetMonthlyDraftCounts() {
        log.info("开始定时任务：重置会员当月已出题计数额度...");
        try {
            User temp = new User();
            temp.setDraftCount(0);
            
            int rows = userMapper.update(temp, new LambdaUpdateWrapper<User>()
                    .gt(User::getDraftCount, 0)
            );
            log.info("成功重置 {} 名会员的出题额度计数为 0", rows);
        } catch (Exception e) {
            log.error("重置会员出题计数任务执行异常", e);
        }
    }
}
