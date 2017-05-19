package com.cqut.xiji.entity.testType;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.entity.testProject.TestProject;
import com.cqut.xiji.service.tableCreator.ID;

public class TestType extends Entity{
	
	@ID
	private String ID;
	private String name;
	private Date checkInTime;
	
	public String getID() {
		return ID;
	}

	public void setID(String iD) {
		ID = iD;
	}

	public Date getCheckInTime() {
		return checkInTime;
	}

	public void setCheckInTime(Date checkInTime) {
		this.checkInTime = checkInTime;
	}

	@Override
	public String toString() {
		return "TestType [" +  "ID=" + ID + ", " +  "checkInTime=" + checkInTime  + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "testType";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
