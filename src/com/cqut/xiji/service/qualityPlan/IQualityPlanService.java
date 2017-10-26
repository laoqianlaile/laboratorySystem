package com.cqut.xiji.service.qualityPlan;

import java.util.Map;

import javax.servlet.http.HttpSession;

import com.cqut.xiji.entity.qualityPlan.QualityPlan;

public interface IQualityPlanService {

	Map<String, Object> getQualityPlanWithPaging(int limit, int offset,
			String order, String sort, String type, String year, String code,
			String employeeName2, String EMPLOYEEID);

	int updataQualityPlanById(String id, String type, String code, String year,
			String employeeName, String employeeName2, int jude, int judg2,String remark);

	String deleteQualityPlanById(String idstr);

	String addQualityPlan(String type, String code, String year,
			String employeeName, String employeeName2,String remark,HttpSession session);
}
