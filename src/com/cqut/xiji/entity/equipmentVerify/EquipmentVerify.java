package com.cqut.xiji.entity.equipmentVerify;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class EquipmentVerify extends Entity{
	
	@ID
	private String ID;
	private String equipmentID;
	private String verifyID;
	private String testProjectID;
	private int accuracy;
	private String departmentID;
	private String remarks;
	private int result;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getEquipmentID() {
		return equipmentID;
	}	
	
	public void setEquipmentID(String equipmentID) {
		this.equipmentID = equipmentID;
	}
	public String getVerifyID() {
		return verifyID;
	}	
	
	public void setVerifyID(String verifyID) {
		this.verifyID = verifyID;
	}
	public String getTestProjectID() {
		return testProjectID;
	}	
	
	public void setTestProjectID(String testProjectID) {
		this.testProjectID = testProjectID;
	}
	public int getAccuracy() {
		return accuracy;
	}	
	
	public void setAccuracy(int accuracy) {
		this.accuracy = accuracy;
	}
	public String getDepartmentID() {
		return departmentID;
	}	
	
	public void setDepartmentID(String departmentID) {
		this.departmentID = departmentID;
	}
	public String getRemarks() {
		return remarks;
	}	
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public int getResult() {
		return result;
	}	
	
	public void setResult(int result) {
		this.result = result;
	}
	
	@Override
	public String toString() {
		return "EquipmentVerify [" +  "ID=" + ID  + ", " +  "equipmentID=" + equipmentID  + ", " +  "verifyID=" + verifyID  + ", " +  "testProjectID=" + testProjectID  + ", " +  "accuracy=" + accuracy  + ", " +  "departmentID=" + departmentID  + ", " +  "remarks=" + remarks  + ", " +  "result=" + result  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "equipmentVerify";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
