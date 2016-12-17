package com.cqut.xiji.entity.equipmentUse;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class EquipmentUse extends Entity{
	
	@ID
	private String ID;
	private String equipmentID;
	private String testProjectID;
	private String sampleID;
	private int useNumber;
	private String application;
	private Date startTime;
	private Date endTime;
	private Date applyTime;
	private Date returnTime;
	private int effectiveTime;
	private String remarks;
	private int state;
	
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
	public String getTestProjectID() {
		return testProjectID;
	}	
	
	public void setTestProjectID(String testProjectID) {
		this.testProjectID = testProjectID;
	}
	public String getSampleID() {
		return sampleID;
	}	
	
	public void setSampleID(String sampleID) {
		this.sampleID = sampleID;
	}
	public int getUseNumber() {
		return useNumber;
	}	
	
	public void setUseNumber(int useNumber) {
		this.useNumber = useNumber;
	}
	public String getApplication() {
		return application;
	}	
	
	public void setApplication(String application) {
		this.application = application;
	}
	public Date getStartTime() {
		return startTime;
	}	
	
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}	
	
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public Date getApplyTime() {
		return applyTime;
	}	
	
	public void setApplyTime(Date applyTime) {
		this.applyTime = applyTime;
	}
	public Date getReturnTime() {
		return returnTime;
	}	
	
	public void setReturnTime(Date returnTime) {
		this.returnTime = returnTime;
	}
	public int getEffectiveTime() {
		return effectiveTime;
	}	
	
	public void setEffectiveTime(int effectiveTime) {
		this.effectiveTime = effectiveTime;
	}
	public String getRemarks() {
		return remarks;
	}	
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public int getState() {
		return state;
	}	
	
	public void setState(int state) {
		this.state = state;
	}
	
	@Override
	public String toString() {
		return "EquipmentUse [" +  "ID=" + ID  + ", " +  "equipmentID=" + equipmentID  + ", " +  "testProjectID=" + testProjectID  + ", " +  "sampleID=" + sampleID  + ", " +  "useNumber=" + useNumber  + ", " +  "application=" + application  + ", " +  "startTime=" + startTime  + ", " +  "endTime=" + endTime  + ", " +  "applyTime=" + applyTime  + ", " +  "returnTime=" + returnTime  + ", " +  "effectiveTime=" + effectiveTime  + ", " +  "remarks=" + remarks  + ", " +  "state=" + state  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "equipmentUse";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
