package com.cqut.xiji.entity.testInstument;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class TestInstument extends Entity{
	
	@ID
	private String ID;
	private String testProjectID;
	private String equipmentID;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getTestProjectID() {
		return testProjectID;
	}	
	
	public void setTestProjectID(String testProjectID) {
		this.testProjectID = testProjectID;
	}
	public String getEquipmentID() {
		return equipmentID;
	}	
	
	public void setEquipmentID(String equipmentID) {
		this.equipmentID = equipmentID;
	}
	
	@Override
	public String toString() {
		return "TestInstument [" +  "ID=" + ID  + ", " +  "testProjectID=" + testProjectID  + ", " +  "equipmentID=" + equipmentID  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "testInstument";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
