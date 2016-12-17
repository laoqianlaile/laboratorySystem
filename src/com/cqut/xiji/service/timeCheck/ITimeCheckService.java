package com.cqut.xiji.service.timeCheck;

import java.io.IOException;
import java.text.ParseException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.ui.ModelMap;

import net.sf.json.JSONArray;

import com.cqut.xiji.entity.fileInformation.FileInformation;

public interface ITimeCheckService {
	
	Map<String, Object> getTimeCheckWithPaging(int limit, int offset,
			String order, String sort,String projectcode,String projectpoint, 
			String starttime,String endtime,String projectname,String department,String chargePer,
			HttpSession session);

	Map<String, Object> getTimecheckFileWithPaging(int limit, int offset,
			String order, String sort, String quaString);
	
	String saveFiles(FileInformation fr);
	JSONArray getEmployeeID2();

	JSONArray getDepartment(int type);

	JSONArray getEmployeeID1BySeeion(HttpSession session);

	String addTimeCheck(String projectName, String projectPoint,
			String endTime, String remark,HttpSession session) throws ParseException;

	int updataTimeCheck(String id, String projectName, String projectPoint,
			String endTime, String remark) throws ParseException;

	String deleteTimeCheck(String idstr);

	int AuditAndResultUpdata(int i, String id, String reason);

	Map<String, Object> getARTimeCheckWithPaging(int limit, int offset,
			String order, String sort, String projectcode, String projectpoint,
			String starttime, String endtime, String projectname,
			String department, String chargePer, HttpSession session);

	Boolean upload(HttpServletRequest request, HttpServletResponse response,
			ModelMap model) throws IOException;
}
