package com.cqut.xiji.service.message;

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
	public Map<String, Object> getMessageByUserID(String userID,int limit,int offset,String sort,String order) {
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
		" SELECT message.ID as mID ,messagenotice.ID FROM messagenotice, message WHERE messagenotice.messageID = message.ID AND messagenotice.state = 0 ";
		
	
		String baseEntity = " message , messagenotice ";
		String condition = " messagenotice.messageID = message.ID AND messagenotice.state = 0 ";
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
	
}
