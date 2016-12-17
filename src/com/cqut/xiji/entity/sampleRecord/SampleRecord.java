package com.cqut.xiji.entity.sampleRecord;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class SampleRecord extends Entity{
	
	@ID
	private String ID;
	private String factoryCode;
	private String getMan;
	private Date getTime;
	private String returnMan;
	private Date returnTime;
	private String remarks;
	private String sampleID;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getFactoryCode() {
		return factoryCode;
	}	
	
	public void setFactoryCode(String factoryCode) {
		this.factoryCode = factoryCode;
	}
	public String getGetMan() {
		return getMan;
	}	
	
	public void setGetMan(String getMan) {
		this.getMan = getMan;
	}
	public Date getGetTime() {
		return getTime;
	}	
	
	public void setGetTime(Date getTime) {
		this.getTime = getTime;
	}
	public String getReturnMan() {
		return returnMan;
	}	
	
	public void setReturnMan(String returnMan) {
		this.returnMan = returnMan;
	}
	public Date getReturnTime() {
		return returnTime;
	}	
	
	public void setReturnTime(Date returnTime) {
		this.returnTime = returnTime;
	}
	public String getRemarks() {
		return remarks;
	}	
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getSampleID() {
		return sampleID;
	}

	public void setSampleID(String sampleID) {
		this.sampleID = sampleID;
	}

	@Override
	public String toString() {
		return "SampleRecord [" +  "ID=" + ID  + ", " +  "factoryCode=" + factoryCode  + ", " +  "getMan=" + getMan  + ", " +  "getTime=" + getTime  + ", " +  "returnMan=" + returnMan  + ", " +  "returnTime=" + returnTime  + ", " +  "remarks=" + remarks + ", " +  "sampleID=" + sampleID  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "sampleRecord";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
