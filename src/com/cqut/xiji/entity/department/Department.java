package com.cqut.xiji.entity.department;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Department extends Entity{
	
	@ID
	private String ID;
	private String departmentName;
	private String departmentCode;
	private String employeeID;
	private String remarks;
	private Date createTime;
	private String parentID;
	private int level;

	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getDepartmentName() {
		return departmentName;
	}	
	
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public String getDepartmentCode() {
		return departmentCode;
	}	
	
	public void setDepartmentCode(String departmentCode) {
		this.departmentCode = departmentCode;
	}
	public String getEmployeeID() {
		return employeeID;
	}	
	
	public void setEmployeeID(String employeeID) {
		this.employeeID = employeeID;
	}
	public String getRemarks() {
		return remarks;
	}	
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public Date getCreateTime() {
		return createTime;
	}	
	
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getParentID() {
		return parentID;
	}	
	
	public void setParentID(String parentID) {
		this.parentID = parentID;
	}
	
	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	@Override
	public String toString() {
		return "Department [" +  "ID=" + ID  + ", " +  "departmentName=" + departmentName  + ", " +  "departmentCode=" + departmentCode  + ", " +  "employeeID=" + employeeID  + ", " +  "remarks=" + remarks  + ", " +  "createTime=" + createTime  + ", " +  "parentID=" + parentID  + "level=" + level  + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "department";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
