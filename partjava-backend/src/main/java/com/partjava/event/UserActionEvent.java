package com.partjava.event;

import org.springframework.context.ApplicationEvent;

public class UserActionEvent extends ApplicationEvent {

    private final Integer userId;
    private final String actionType; // CREATE_NOTE, STREAK_CHECKIN, COMPLETE_CHALLENGE
    private final Integer count;     // 触发次数或增量，默认为 1

    public UserActionEvent(Object source, Integer userId, String actionType, Integer count) {
        super(source);
        this.userId = userId;
        this.actionType = actionType;
        this.count = count;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getActionType() {
        return actionType;
    }

    public Integer getCount() {
        return count;
    }
}
