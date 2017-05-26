package com.cqut.xiji.entity.testDepartment;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class TestDepartment extends Entity {

	@ID
	private String ID;
	private String testProjectID;
	private String departmentID;
	
	
	
	public String getID() {
		return ID;
	}

	public void setID(String iD) {
		ID = iD;
	}

	public String getTestProjectID() {
		return testProjectID;
	}

	public void setTestProjectID(String testProjectID) {
		this.testProjectID = testProjectID;
	}

	public String getDepartmentID() {
		return departmentID;
	}

	public void setDepartmentID(String departmentID) {
		this.departmentID = departmentID;
	}

	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "testDepartment";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}

}
