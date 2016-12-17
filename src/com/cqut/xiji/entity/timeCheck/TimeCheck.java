package com.cqut.xiji.entity.timeCheck;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class TimeCheck extends Entity{
	
	@ID
	private String ID;
	private String qualityPlanID;
	private String projectCode;
	private String projectName;
	private String projectPoint;
	private String departmentID;
	private String employeeID;
	private Date endTime;
	private String reason;
	private String auditState;
	private String result;
	private String remark;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	
	
	public String getEmployeeID() {
		return employeeID;
	}

	public void setEmployeeID(String employeeID) {
		this.employeeID = employeeID;
	}

	public String getProjectCode() {
		return projectCode;
	}	
	
	public void setProjectCode(String projectCode) {
		this.projectCode = projectCode;
	}
	public String getProjectName() {
		return projectName;
	}	
	
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getProjectPoint() {
		return projectPoint;
	}	
	
	public String getQualityPlanID() {
		return qualityPlanID;
	}

	public void setQualityPlanID(String qualityPlanID) {
		this.qualityPlanID = qualityPlanID;
	}

	public String getDepartmentID() {
		return departmentID;
	}

	public void setDepartmentID(String departmentID) {
		this.departmentID = departmentID;
	}

	public void setProjectPoint(String projectPoint) {
		this.projectPoint = projectPoint;
	}
	public Date getEndTime() {
		return endTime;
	}	
	
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public String getReason() {
		return reason;
	}	
	
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getAuditState() {
		return auditState;
	}	
	
	public void setAuditState(String auditState) {
		this.auditState = auditState;
	}
	public String getResult() {
		return result;
	}	
	
	public void setResult(String result) {
		this.result = result;
	}
	public String getRemark() {
		return remark;
	}	
	
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	@Override
	public String toString() {
		return "TimeCheck [" +  "ID=" + ID  + ", " +  "qualityPlanID=" + qualityPlanID  + ", " + "employeeID=" + employeeID + ", " +  "projectCode=" + projectCode  + ", " +  "projectName=" + projectName  + ", " +  "projectPoint=" + projectPoint  + ", " +  "departmentID=" + departmentID  + ", " +  "endTime=" + endTime  + ", " +  "reason=" + reason  + ", " +  "auditState=" + auditState  + ", " +  "result=" + result  + ", " +  "remark=" + remark  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "timeCheck";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
