package com.cqut.xiji.controller.traceability;

import java.io.IOException;
import java.text.ParseException;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.entity.traceability.Traceability;
import com.cqut.xiji.service.calibrationValue.ICalibrationValueService;
import com.cqut.xiji.service.employee.IEmployeeService;
import com.cqut.xiji.service.traceability.ITraceabilityService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Controller
@RequestMapping("/traceabilityController")
public class TraceabilityController {

	@Resource(name = "traceabilityService")
	ITraceabilityService service;

	@Resource(name = "employeeService")
	IEmployeeService employeeService;

	@Resource(name = "calibrationValueService")
	ICalibrationValueService calibrationValueService;

	/**
	 * 
	 * 方法简述：生成建议ID
	 * 
	 * @return
	 * @author 蒋兴成
	 * @date 2016年11月16日 下午6:18:18
	 * 
	 */
	@RequestMapping("/createTracebilityID")
	@ResponseBody
	public String createTracebilityID() {
		String ID = EntityIDFactory.createId();
		return ID;
	}

	/**
	 * 
	 * 方法简述：新增建议
	 * 
	 * @param traceability
	 * @param session
	 * @return
	 * @author 蒋兴成
	 * @date 2016年11月15日 下午9:27:40
	 * 
	 */
	@RequestMapping("/saveTracebility")
	@ResponseBody
	public String saveTracebility(Traceability traceability, HttpSession session) {
		return service.saveTracebility(traceability, session) == 1 ? "true"
				: "false";
	}

	/**
	 * 
	 * 方法简述：删除建议
	 * 
	 * @param ID
	 * @return
	 * @author 蒋兴成
	 * @date 2016年11月15日 下午9:27:44
	 * 
	 */
	@RequestMapping("/deleteTracebilityByID")
	@ResponseBody
	public String deleteTracebilityByID(String ID) {
		calibrationValueService.deleteCalibrationValueByCondition(ID);
		return service.deleteTracebilityByID(ID) == 1 ? "true" : "false";
	}

	/**
	 * 
	 * 方法简述：删除多条建议
	 * 
	 * @param IDs
	 * @return
	 * @author 蒋兴成
	 * @date 2016年11月15日 下午9:27:48
	 * 
	 */
	@RequestMapping("/deleteTracebilityByIDs")
	@ResponseBody
	public String deleteTracebilityByIDs(String[] IDs) {
		for (int i = 0; i < IDs.length; i++) {
			calibrationValueService
					.deleteCalibrationValueByCondition(" traceabilityID = '"
							+ IDs[i] + "'");
		}
		return service.deleteTracebilityByIDs(IDs) == 1 ? "ture" : "false";
	}

	/**
	 * 
	 * 方法简述：更新建议信息
	 * 
	 * @param traceability
	 * @return
	 * @author 蒋兴成
	 * @date 2016年11月15日 下午9:27:51
	 * 
	 */
	@RequestMapping("/updateTracebilityByID")
	@ResponseBody
	public String updateTracebilityByID(Traceability traceability) {
		return service.updateTracebilityByID(traceability) == 1 ? "true"
				: "false";
	}

	/**
	 * 
	 * 方法简述：分页获取建议信息（此处为新增建议页面方法，其他不可调用），根据制定者(session)和qualityPlanID获取数据
	 * 
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param session
	 * @param equipmentName
	 * @param equipmentCode
	 * @param equipmentTypeName
	 * @param correctOrgan
	 * @param auditState
	 * @param startTime
	 * @param endTime
	 * @param departmentName
	 * @param qualityPlanID
	 *            必有字段
	 * @return
	 * @throws ParseException
	 * @author 蒋兴成
	 * @date 2016年12月6日 下午9:24:53
	 * 
	 */
	@RequestMapping("/getTraceabilityWithPaging")
	@ResponseBody
	public JSONObject getTraceabilityWithPaging(int limit, int offset,
			String order, String sort, HttpSession session,
			String equipmentName, String equipmentCode,
			String equipmentTypeName, String correctOrgan, String auditState,
			String startTime, String endTime, String departmentName,
			String qualityPlanID) throws ParseException {

		String condition = "";
		String userID = (String) session.getAttribute("ID"); // 获取制定者ID
		// 获取建议制定者来获取详细建议
		if (userID != null && !userID.equals("")) {
			condition += " traceability.employeeID = '" + userID + "'";
		}
		condition = getCondition(condition, equipmentName, equipmentCode,
				equipmentTypeName, correctOrgan, auditState, startTime,
				endTime, departmentName, session.getAttribute("qualiyPlanId")
						.toString(), null);

		Map<String, Object> result = service.getTraceabilityWithPaging(limit,
				offset, order, sort, condition);
		return JSONObject.fromObject(result);
	}

	/**
	 * 
	 * 方法简述：审核建议信息
	 * 
	 * @param traceability
	 * @return
	 * @author wnn
	 * @date 2016年11月15日 下午9:27:51
	 * 
	 */
	@RequestMapping("/auditTracebilityByID")
	@ResponseBody
	public String auditTracebilityByID(Traceability traceability) {
		return service.auditTracebilityByID(traceability) == 1 ? "true"
				: "false";
	}

	/** 封装查询的条件(审核，完善，新增建议页面) **/
	public String getCondition(String condition, String equipmentName,
			String equipmentCode, String equipmentTypeName,
			String correctOrgan, String auditState, String startTime,
			String endTime, String departmentName, String qualityPlanID,
			String type) throws ParseException {

		// condition 合法性检查
		if (condition == null || condition.trim().toString().equals("")) {
			condition = "1 = 1";
		}

		// 获取计划类型ID来获取详细建议
		if (qualityPlanID != null && !qualityPlanID.trim().equals("")) {
			condition += " and qualityPlanID = '" + qualityPlanID + "'";
		}
		if (type != null && !type.trim().toString().equals("")) {
			condition += " and fileinformation.type = '" + type + "'";
		}
		// 根据条件查询
		if (equipmentName != null && !equipmentName.trim().equals("")) {
			condition += " and equipmentName = '" + equipmentName + "'";
		}
		if (equipmentCode != null && !equipmentCode.trim().equals("")) {
			condition += " and equipmentCode = '" + equipmentCode + "'";
		}
		if (equipmentTypeName != null && !equipmentTypeName.trim().equals("")) {
			condition += " and equipmentTypeName = '" + equipmentTypeName + "'";
		}
		if (correctOrgan != null && !correctOrgan.trim().equals("")) {
			condition += " and correctOrgan = '" + correctOrgan + "'";
		}
		if (auditState != null && !auditState.trim().equals("")) {
			condition += " and auditState = '" + auditState + "'";
		}
		if (startTime != null && !startTime.trim().equals("")
				&& endTime != null && !endTime.trim().equals("")) {
			condition += " and nowCorrectYear  between '" + startTime + "' "
					+ " and '" + endTime + "'";
		}
		if (departmentName != null && !departmentName.trim().equals("")) {
			condition += " and departmentName = '" + departmentName + "'";
		}
		return condition;
	}

	/**
	 * 
	 * 方法简述：根据qualityPlanID分页获取审核建议信息（审核页面以及完善溯源计划页面接口调用）
	 * 
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param equipmentName
	 * @param equipmentCode
	 * @param auditState
	 * @param startTime
	 * @param endTime
	 * @param departmentName
	 *            公有字段
	 * @param qualityPlanID
	 *            必有字段
	 * @param type
	 *            完善页面字段
	 * @param session
	 * @return
	 * @throws ParseException
	 * @author 蒋兴成
	 * @date 2016年12月6日 下午9:22:28
	 * 
	 */
	@RequestMapping("/getTraceabilityAuditWithPaging")
	@ResponseBody
	public JSONObject getTraceabilityAuditWithPaging(int limit, int offset,
			String order, String sort, String equipmentName,
			String equipmentCode, String auditState, String startTime,
			String endTime, String departmentName, String qualityPlanID,
			String type, HttpSession session) throws ParseException {
		String condition = getCondition(null, equipmentName, equipmentCode,
				null, null, auditState, startTime, endTime, departmentName,
				session.getAttribute("qualiyPlanId").toString(), type);
		Map<String, Object> result = service.getTraceabilityWithPaging(limit,
				offset, order, sort, condition);
		return JSONObject.fromObject(result);
	}

	/**
	 * @description 上传文件并保存
	 * @author fujianfei
	 * @param request
	 * @param response
	 * @param model
	 * @throws IOException
	 */
	@RequestMapping("/upload")
	@ResponseBody
	public void upload(HttpServletRequest request,
			HttpServletResponse response, ModelMap model) throws IOException {
		Boolean result = service.upload(request, response, model);
		if (result == true) {
			response.sendRedirect("../module/jsp/traceability/traceability.jsp");
		} else {
			response.sendRedirect("../module/jsp/traceability/traceability.jsp");
		}
	}

}
