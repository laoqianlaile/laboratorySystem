package com.cqut.xiji.entity.personconTrast;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class PersonconTrast extends Entity{
	
	@ID
	private String ID;
	private String qualityPlanID;
	private String projectCode;
	private String projectName;
	private String testDevice;
	private String departmentID;
	private String employeeID0;
	private String employeeID1;
	private String employeeID2;
	private String diffierence;
	private String result;
	private String startTime;
	private String state;
	private String auditState;
	private String reason;
	private String remark;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	
	
	public String getEmployeeID0() {
		return employeeID0;
	}

	public void setEmployeeID0(String employeeID0) {
		this.employeeID0 = employeeID0;
	}

	public String getQualityPlanID() {
		return qualityPlanID;
	}

	public void setQualityPlanID(String qualityPlanID) {
		this.qualityPlanID = qualityPlanID;
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
	public String getTestDevice() {
		return testDevice;
	}	
	
	public void setTestDevice(String testDevice) {
		this.testDevice = testDevice;
	}
	public String getDepartmentID() {
		return departmentID;
	}	
	
	public void setDepartmentID(String departmentID) {
		this.departmentID = departmentID;
	}
	public String getEmployeeID1() {
		return employeeID1;
	}	
	
	public void setEmployeeID1(String employeeID1) {
		this.employeeID1 = employeeID1;
	}
	public String getEmployeeID2() {
		return employeeID2;
	}	
	
	public void setEmployeeID2(String employeeID2) {
		this.employeeID2 = employeeID2;
	}
	public String getDiffierence() {
		return diffierence;
	}	
	
	public void setDiffierence(String diffierence) {
		this.diffierence = diffierence;
	}
	public String getResult() {
		return result;
	}	
	
	public void setResult(String result) {
		this.result = result;
	}
	public String getStartTime() {
		return startTime;
	}	
	
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getState() {
		return state;
	}	
	
	public void setState(String state) {
		this.state = state;
	}
	public String getAuditState() {
		return auditState;
	}	
	
	public void setAuditState(String auditState) {
		this.auditState = auditState;
	}
	public String getReason() {
		return reason;
	}	
	
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getRemark() {
		return remark;
	}	
	
	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Override
	public String toString() {
		return "PersonconTrast [" +  "ID=" + ID  + ", " +  "qualityPlanID=" + qualityPlanID  + ", " +  "projectCode=" + projectCode  + ", " +  "projectName=" + projectName  + ", " +  "testDevice=" + testDevice  + ", " +  "departmentID=" + departmentID  + ", " +  "employeeID0=" + employeeID0  + ", " +  "employeeID1=" + employeeID1  + ", " +  "employeeID2=" + employeeID2  + ", " +  "diffierence=" + diffierence  + ", " +  "result=" + result  + ", " +  "startTime=" + startTime  + ", " +  "state=" + state  + ", " +  "auditState=" + auditState  + ", " +  "reason=" + reason  + ", " +  "remark=" + remark +  ", " + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "personconTrast";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
