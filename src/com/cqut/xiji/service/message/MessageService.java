package com.cqut.xiji.service.message;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.message.Message;
import com.cqut.xiji.entity.messageNotice.MessageNotice;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.treeNode.Node;
import com.cqut.xiji.tool.treeNode.NodeList;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class MessageService extends SearchService implements IMessageService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "message";
	}

	@Override
	public String getBasePrimaryKey() {
		return "message.ID";
	}
    /**
     * 
     * 获取自己的通知信息
     * @author wzj
     * @date 2016年12月28日 下午3:35:06
     *
     */
	@Override
	public Map<String, Object> getMessageByUserID(String userID,int limit,int offset,String sort,String order,boolean isRead) {
		// TODO Auto-generated method stub
		int index = limit;
		int pageNum = offset/limit;
		String[] properties = new String[]{
				"message.content",
				"message.ID AS mID",
				"messageNotice.ID as mnID",
				"messageNotice.state",
				"date_format(message.createTime,'%Y-%m-%d %H:%i:%s') as createTime",
				"message.remarks"
		};
		String sql =""+
		" SELECT message.ID as mID ,messagenotice.ID FROM messagenotice, message WHERE messagenotice.messageID = message.ID ";
		
	
		String baseEntity = " message , messagenotice ";
		String condition = " messagenotice.messageID = message.ID ";
		System.out.println(isRead+"   isread");
		if( isRead == false){
			 condition +=" AND messagenotice.state = 0 ";
			 sql +=" AND messagenotice.state = 0 ";
		}else{
			 condition +=" AND messagenotice.state = 1 ";
			 sql += "  AND messagenotice.state = 1 ";
		}
//		userID = "1";
		if(userID != null && !userID.equals("")){
			condition += " and messagenotice.employeeID = '"+userID+"'";
			sql += " and messagenotice.employeeID = '"+userID+"'";
		}else {
			return null;
		}
		List<Map<String, Object>> result = originalSearchWithpaging(properties, baseEntity, null , null, condition, false, null, " createTime " , " desc ", index, pageNum);
	    int count = searchDao.sqlCount(sql);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		return map;
		
	}
	/**
	 * 
	 * 确认查看信息
	 * @author wzj
	 * @date 2017年1月16日 上午11:18:34
	 *
	 */
	@Override
	public void readedMessageByID(String messageID) {
		if(messageID != null &&  !messageID.equals("")){
			MessageNotice messageNotice = entityDao.getByID(messageID, MessageNotice.class);
			if(messageNotice != null){
				messageNotice.setState(1);
				messageNotice.setLookTime(new Date());
				entityDao.updatePropByID(messageNotice, messageID);
			}
		}
		
			
	}
	
	/**
	 * 新增消息推送
	 * @author zkl
	 * @data 2017年2月13日 下午4:45:29
	 * @param content 信息内容
	 */
	@Override
	public String addMessage(String content,String remarks) {
		
		Message message = new Message();
		message.setID(EntityIDFactory.createId());
		message.setContent(content);
		message.setRemarks(remarks);
		message.setCreateTime(new Date());
		entityDao.save(message);
		String result = message.getID();
		
		return result;
	}
	
	@Override
	public String addReportSecondAuditPassMessage(String fileName) {
		String content = "您有一份报告 ";
		if (fileName != null && !fileName.equals("") && !fileName.isEmpty()) {
			content += fileName;
		}
		content += " 二次审核通过";
		Message message = new Message();
		message.setID(EntityIDFactory.createId());
		message.setContent(content);
		Date now = new Date(System.currentTimeMillis());
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		try {
			message.setCreateTime(dateFormat.parse(dateFormat.format(now)));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		entityDao.save(message);
		String result = message.getID();
		return result;
	}
	
	@Override
	public String addReportThirdAuditPassMessage(String fileName) {
		String content = "您有一份报告 ";
		if (fileName != null && !fileName.equals("") && !fileName.isEmpty()) {
			content += fileName;
		}
		content += " 三次审核通过";
		Message message = new Message();
		message.setID(EntityIDFactory.createId());
		message.setContent(content);
		Date now = new Date(System.currentTimeMillis());
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		try {
			message.setCreateTime(dateFormat.parse(dateFormat.format(now)));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		entityDao.save(message);
		String result = message.getID();
		return result;
	}
	
	@Override
	public String addReportSecondAuditRejectMessage(String fileName){
		String content = "您有一份报告 ";
		if (fileName != null && !fileName.equals("") && !fileName.isEmpty()) {
			content += fileName;
		}
		content += " 二次审核失败";
		Message message = new Message();
		message.setID(EntityIDFactory.createId());
		message.setContent(content);
		Date now = new Date(System.currentTimeMillis());
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		try {
			message.setCreateTime(dateFormat.parse(dateFormat.format(now)));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		entityDao.save(message);
		String result = message.getID();
		return result;
	}
	
	@Override
	public String addReportThirdAuditRejectMessage(String fileName) {
		String content = "您有一份报告 ";
		if (fileName != null && !fileName.equals("") && !fileName.isEmpty()) {
			content += fileName;
		}
		content += " 三次审核失败";
		Message message = new Message();
		message.setID(EntityIDFactory.createId());
		message.setContent(content);
		Date now = new Date(System.currentTimeMillis());
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		try {
			message.setCreateTime(dateFormat.parse(dateFormat.format(now)));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		entityDao.save(message);
		String result = message.getID();
		return result;
	}
	
	@Override
	public String addReportAudiPersontMessage(String fileName) {
		String content = "您有一份报告 ";
		if (fileName != null && !fileName.equals("") && !fileName.isEmpty()) {
			content += fileName;
		}
		content += " 需要审核";
		Message message = new Message();
		message.setID(EntityIDFactory.createId());
		message.setContent(content);
		Date now = new Date(System.currentTimeMillis());
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		try {
			message.setCreateTime(dateFormat.parse(dateFormat.format(now)));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		entityDao.save(message);
		String result = message.getID();
		return result;
	}
	
	@Override
	public String addWaitThirdAuditReportMessage(String fileName){
		String content = "报告 ";
		if (fileName != null && !fileName.equals("") && !fileName.isEmpty()) {
			content += fileName;
		}
		content += " 待三次审核";
		Message message = new Message();
		message.setID(EntityIDFactory.createId());
		message.setContent(content);
		Date now = new Date(System.currentTimeMillis());
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		try {
			message.setCreateTime(dateFormat.parse(dateFormat.format(now)));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		entityDao.save(message);
		String result = message.getID();
		return result;
	}
}
