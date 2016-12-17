package com.cqut.xiji.entity.abilityCheck;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class AbilityCheck extends Entity{
	
	@ID
	private String ID;
	private String parameter;
	private String employeeID;
	private String type;
	private String equipmentID;
	private String departmentID;
	private String startTime;
	private String result;
	private String state;
	private String fileID;
	private String remark;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getParameter() {
		return parameter;
	}	
	
	public void setParameter(String parameter) {
		this.parameter = parameter;
	}
	public String getEmployeeID() {
		return employeeID;
	}	
	
	public void setEmployeeID(String employeeID) {
		this.employeeID = employeeID;
	}
	public String getType() {
		return type;
	}	
	
	public void setType(String type) {
		this.type = type;
	}
	public String getEquipmentID() {
		return equipmentID;
	}	
	
	public void setEquipmentID(String equipmentID) {
		this.equipmentID = equipmentID;
	}
	public String getDepartmentID() {
		return departmentID;
	}	
	
	public void setDepartmentID(String departmentID) {
		this.departmentID = departmentID;
	}
	public String getStartTime() {
		return startTime;
	}	
	
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getResult() {
		return result;
	}	
	
	public void setResult(String result) {
		this.result = result;
	}
	public String getState() {
		return state;
	}	
	
	public void setState(String state) {
		this.state = state;
	}
	public String getFileID() {
		return fileID;
	}	
	
	public void setFileID(String fileID) {
		this.fileID = fileID;
	}
	public String getRemark() {
		return remark;
	}	
	
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	@Override
	public String toString() {
		return "AbilityCheck [" +  "ID=" + ID  + ", " +  "parameter=" + parameter  + ", " +  "employeeID=" + employeeID  + ", " +  "type=" + type  + ", " +  "equipmentName=" + equipmentID  + ", " +  "departmentName=" + departmentID  + ", " +  "startTime=" + startTime  + ", " +  "result=" + result  + ", " +  "state=" + state  + ", " +  "fileID=" + fileID  + ", " +  "remark=" + remark  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "abilitycheck";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
