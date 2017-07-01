package com.cqut.xiji.service.duty;

import java.util.List;
import java.util.Map;

public interface IDutyService {
	/**
	 * 初始化职位界面
	 * @param dutyCode
	 * @param dutyName
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	Map<String, Object> getDutyWithPage(String dutyCode,String dutyName,
			 int limit, int offset,String order, String sort);
	/**
	 * 添加职位
	 * @param dutyCode
	 * @param dutyName
	 * @param introduction
	 * @return
	 */
	public String addDuty(String dutyCode,String dutyName,String introduction);
	/**
	 * 删除职位
	 * @param IDs
	 * @return
	 */
	public String delDuty(String IDs);
	/**
	 * 更新职位信息
	 * @param ID
	 * @param dutyCode
	 * @param dutyName
	 * @param introduction
	 * @return
	 */
	public String updDuty(String ID,String dutyCode,String dutyName,String introduction);
	/**
	 * 获取所有职位来比较
	 * @return
	 */
	List<Map<String, Object>> getAllDutyName();
	/**
	 * 检测数据
	 * @param dutyCode
	 * @param dutyName
	 * @return
	 */
	public String addText(String dutyCode,String dutyName);
}
