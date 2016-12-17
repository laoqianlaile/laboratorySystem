package com.cqut.xiji.service.qualityPlan;

import java.util.Map;

import javax.servlet.http.HttpSession;

public interface IQualityPlanService {

	Map<String, Object> getQualityPlanWithPaging(int limit, int offset,
			String order, String sort, String type, String year, String code,
			String employeeName2);

	int updataQualityPlanById(String id, String type, String code, String year,
			String employeeName, String employeeName2, int jude, int judg2);

	String deleteQualityPlanById(String idstr);

	String addQualityPlan(String type, String code, String year,
			String employeeName, String employeeName2,HttpSession session);
}
