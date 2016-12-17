package com.cqut.xiji.entity.testStandard;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class TestStandard extends Entity{
	
	@ID
	private String ID;
	private String testPorjectID;
	private String standardID;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getTestPorjectID() {
		return testPorjectID;
	}	
	
	public void setTestPorjectID(String testPorjectID) {
		this.testPorjectID = testPorjectID;
	}
	public String getStandardID() {
		return standardID;
	}	
	
	public void setStandardID(String standardID) {
		this.standardID = standardID;
	}
	
	@Override
	public String toString() {
		return "TestStandard [" +  "ID=" + ID  + ", " +  "testPorjectID=" + testPorjectID  + ", " +  "standardID=" + standardID  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "testStandard";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
