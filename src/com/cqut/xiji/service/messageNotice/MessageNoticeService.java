package com.cqut.xiji.service.messageNotice;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.messageNotice.MessageNotice;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.treeNode.Node;
import com.cqut.xiji.tool.treeNode.NodeList;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class MessageNoticeService extends SearchService implements IMessageNoticeService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "messageNotice";
	}

	@Override
	public String getBasePrimaryKey() {
		return "messageNotice.ID";
	}
	
	/**
	 * 
	 * @author zkl
	 * @data 2017年2月13日 下午4:54:19
	 * @param MessageID  
	 * @param recipient	接收人（信息接收的角色名 例 ：标准审核人）
	 * @return
	 */
	@Override
	public String addMessageNotice(String messageID, String recipient) {
		
		int result = 0;
		// 获取需要推送的员工ID
		String baseEntity = "employee";
		String[] properties = {
				"employee.ID as employeeID",
				"employee.roleID",
				"employee.employeeName",
				"role.`name`"
		};
		String joinEntity = "LEFT JOIN role on role.ID = employee.roleID ";
		String condition = " 1 = 1 AND role.`name`='" + recipient+"'";
		List<Map<String, Object>>  employeeIDs = originalSearchForeign(properties, baseEntity, joinEntity, null, condition, false);
		
		if(employeeIDs.size() == 0){
			return -1 +"";
		}
		else{
			for (Map<String, Object> m : employeeIDs) {
			    	MessageNotice messageNotice = new MessageNotice();
					messageNotice.setID(EntityIDFactory.createId());
					messageNotice.setMessageID(messageID);
					messageNotice.setEmployeeID((String)m.get("employeeID"));
					messageNotice.setState(0);
					result += entityDao.save(messageNotice);
			}
		}
		return result +"";
	}
	
}
