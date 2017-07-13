package com.cqut.xiji.service.taskMan;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.taskMan.TaskMan;
import com.cqut.xiji.service.base.SearchService;

@Service
public class TaskManService extends SearchService implements ITaskManService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;
	
	/**
	 * 
	 * @description 任务分配下分配工时时获取检测人员列表
	 * @author chenyubo
	 * @created 2017年07月01日09:33:40
	 * @param ID task任务ID
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @return
	 */
	@Override
	public Map<String, Object> getTaskManWithPaging(String ID, int limit, int offset, String sort, String order) {
		int index = limit;
		int pageNum = offset / limit;
		String[] properties = new String[] {
				"taskMan.ID",
				"taskMan.taskID",
				"taskMan.detector",
				"employee.employeeName",
				"IFnull( taskMan.laborhour, '无' ) AS laborhour" 
		};

		String joinEntity = " left join employee on taskman.detector = employee.ID ";

		String condition = " taskMan.taskID = '" + ID + "' ";

		List<Map<String, Object>> result = searchPagingWithJoin(properties,
				joinEntity, null, condition, false, index, pageNum);
		int count = getForeignCountWithJoin(joinEntity, null, condition, false);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);

		return map;
	}
	
	/**
	 * 
	 * @description 分配工时时修改具体检测人员的工时
	 * @author chenyubo
	 * @created 2017年07月01日14:16:51
	 * @param ID taskMan主键
	 * @param detector 检测人ID
	 * @param laborhour 工时
	 * @return
	 */
	@Override
	public int assignLaborHour(String ID, String detector, Double laborHour) {
		TaskMan taskMan = entityDao.getByID(ID, TaskMan.class);
		
		// 获取总工时
		String[] properties = new String[] {
				"sample.laborHour"
		};

		String joinEntity = " left join task on task.ID = taskman.taskID "
				+ " left join sample on sample.ID = task.sampleID ";

		String condition = " taskman.ID= '" + ID + "' ";

		List<Map<String, Object>> result = searchForeignWithJoin(properties, joinEntity, null, condition, false);
		
		double maxLaborHour = (double) result.get(0).get("laborHour"); // 总工时
		
		// 获取已分配工时
		String taskID = taskMan.getTaskID();
		String[] properties2 = new String[] {
				"sum(taskman.laborhour) as totalLaborHour"
		};
		
		String condition2 = " taskMan.taskID = '" + taskID + "' ";
		
		List<Map<String, Object>> result2 = entityDao.findByCondition(properties2, condition2, TaskMan.class);
		double totalLaborHour = (double) result2.get(0).get("totalLaborHour"); // 已分配工时
		
		
		if (laborHour > maxLaborHour) { // 如果分配的工时大于总工时
			return 2;
		} else if (laborHour + totalLaborHour > maxLaborHour) { // 如果分配的工时超过可分配的工时
			return 3;
		} else { // 正常分配
			taskMan.setLaborHour(laborHour);
			
			return entityDao.updatePropByID(taskMan, ID); // 即返回1
		}
	}

	@Override
	public String getBaseEntityName() {
		return "taskMan";
	}

	@Override
	public String getBasePrimaryKey() {
		return "taskMan.ID";
	}
	
}
