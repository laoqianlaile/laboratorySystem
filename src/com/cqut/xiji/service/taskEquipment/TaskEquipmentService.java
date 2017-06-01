package com.cqut.xiji.service.taskEquipment;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.taskEquipment.TaskEquipment;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class TaskEquipmentService extends SearchService implements ITaskEquipmentService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "taskEquipment";
	}

	@Override
	public String getBasePrimaryKey() {
		return "taskEquipment.ID";
	}
	
	@Override
	public String saveTaskEquipment(String[] equipmentIDs,String taskID){
		if (equipmentIDs == null) {
			return "没有新登记的设备";
		} else {
			int saveSuccessCount = 0;
			String ID = "";
			SimpleDateFormat dateFormat = new SimpleDateFormat(
					"yyyy-MM-dd HH:mm:ss");
			for (int i = 0, len = equipmentIDs.length; i < len; i++) {
				ID = EntityIDFactory.createId();
				Date time = new Date(System.currentTimeMillis());
				TaskEquipment te = new TaskEquipment();
				te.setID(ID);
				te.setTaskID(taskID);
				te.setEquipmentID(equipmentIDs[i]);
				try {
					te.setUseTime(dateFormat.parse(dateFormat.format(time)));
				} catch (ParseException e) {
					e.printStackTrace();
				}
				if (baseEntityDao.save(te) == 1) {
					saveSuccessCount++;
				}
			}
			if (saveSuccessCount == equipmentIDs.length) {
				return "true";
			} else {
				return "登记失败";
			}
		}

	}
	
	@Override
	public List<Map<String, Object>> getTaskEquipmentID(String taskID) {
		String baseEntity = "taskequipment";
		String[] properties = { "equipmentID" };
		String condition = " 1 = 1 and  taskequipment.taskID  = '" + taskID + "'";
		List<Map<String, Object>> result = originalSearchForeign(properties,baseEntity, null, null, condition, false);
		return result;
	}
	
	@Override
	public boolean deleteTaskEquipmentID(String[] taskIDs) {
		return baseEntityDao.deleteEntities(taskIDs, "taskequipment", "equipmentID") > 0 ? true : false;
	}

}
