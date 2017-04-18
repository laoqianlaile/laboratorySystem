package com.cqut.xiji.service.messageNotice;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
			return -1+ "";
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
	
	@Override
	public boolean addReportAuditMessageNotice(String messageID,
			String testreportID) {
		String filterCondition = "";
		if (testreportID != null && !testreportID.equals("")
				&& !testreportID.equals(" ") && !testreportID.isEmpty()) {
			filterCondition = " WHERE testreport.ID = '" + testreportID + "'";
		}
		String baseEntity = " ( " + " SELECT " + "testreport.fileID AS fileID"
				+ " FROM " + " testreport " + filterCondition + " ) AS a ";
		String[] properties = new String[] { "fileinformation.uploaderID" };
		String joinEntity = " LEFT JOIN fileinformation ON a.fileID = fileinformation.ID ";
		String condition = " 1 = 1";
		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				baseEntity, joinEntity, null, condition);
		String employeeID = "";
		if (result != null && result.size() > 0) {
			employeeID = result.get(0).get("uploaderID").toString();
		}
		MessageNotice messageNotice = new MessageNotice();
		messageNotice.setID(EntityIDFactory.createId());
		messageNotice.setMessageID(messageID);
		messageNotice.setEmployeeID(employeeID);
		messageNotice.setState(0);
		Date now = new Date(System.currentTimeMillis());
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		try {
			messageNotice.setLookTime(dateFormat.parse(dateFormat.format(now)));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		boolean flag = entityDao.save(messageNotice) > 0 ? true : false;
		return flag;
	}
	
	@Override
	public boolean addReportAuditPersonMessageNotice(String messageID,
			String employeeID) {
		MessageNotice messageNotice = new MessageNotice();
		messageNotice.setID(EntityIDFactory.createId());
		messageNotice.setMessageID(messageID);
		messageNotice.setEmployeeID(employeeID);
		messageNotice.setState(0);
		Date now = new Date(System.currentTimeMillis());
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		try {
			messageNotice.setLookTime(dateFormat.parse(dateFormat.format(now)));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		boolean flag = entityDao.save(messageNotice) > 0 ? true : false;
		return flag;
	}
	
	@Override
	public boolean addReportThridAuditPersonMessageNotice(String messageID) {
		String baseEntity = "employee";
		String[] properties = { "employee.ID AS ID" };
		String joinEntity = " LEFT JOIN role ON employee.roleID = role.ID ";
		String condition = " 1 = 1 AND role.`name` = '签发人' ";
		List<Map<String, Object>> employeeIDs = originalSearchForeign(
				properties, baseEntity, joinEntity, null, condition, false);
		if (employeeIDs == null || employeeIDs.size() == 0) {
			return false;
		} else {
			for (Map<String, Object> m : employeeIDs) {
				MessageNotice messageNotice = new MessageNotice();
				messageNotice.setID(EntityIDFactory.createId());
				messageNotice.setMessageID(messageID);
				messageNotice.setEmployeeID(m.get("ID").toString());
				messageNotice.setState(0);
				Date now = new Date(System.currentTimeMillis());
				SimpleDateFormat dateFormat = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");
				try {
					messageNotice.setLookTime(dateFormat.parse(dateFormat
							.format(now)));
				} catch (ParseException e) {
					e.printStackTrace();
				}
				entityDao.save(messageNotice);
			}
			return true;
		}
	}
}