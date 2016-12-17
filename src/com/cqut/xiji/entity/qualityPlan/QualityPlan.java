package com.cqut.xiji.entity.qualityPlan;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class QualityPlan extends Entity{
	
	@ID
	private String ID;
	private String type;
	private String code;
	private String employeeID1;
	private String employeeID2;
	private String state;
	private String remark;
	private String year;
	
	
	
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

	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getType() {
		return type;
	}	
	
	public void setType(String type) {
		this.type = type;
	}
	public String getCode() {
		return code;
	}	
	
	public void setCode(String code) {
		this.code = code;
	}
	
	public String getState() {
		return state;
	}	
	
	public void setState(String state) {
		this.state = state;
	}
	public String getRemark() {
		return remark;
	}	
	
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	@Override
	public String toString() {
		return "QualityPlan [" +  "ID=" + ID  + ", " +  "type=" + type  + ", " +  "code=" + code  + ", " +  "employeeID1=" + employeeID1  + ", "  + "employeeID2=" + employeeID2 + ", "+  "state=" + state  + ", " +  "remark=" + remark  + ", " +  "year=" + year + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "qualityPlan";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
