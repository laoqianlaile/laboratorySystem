package com.cqut.xiji.service.message;

import java.util.List;
import java.util.Map;

import com.cqut.xiji.entity.message.Message;

public interface IMessageService {

	 Map<String, Object> getMessageByUserID(String attribute,int limit,int offset,String sort,String order);  //获取登录人的消息通知
	
}
