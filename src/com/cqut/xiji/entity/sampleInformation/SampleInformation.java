package com.cqut.xiji.entity.sampleInformation;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class SampleInformation extends Entity{
	
	@ID
	private String ID;
	private String factoryCode;
	private String sampleName;
	private String receiptlistID;
	private Date createTime;
	private String remarks;
	private String specifications;
	private int state;
	
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
	public String getSampleName() {
		return sampleName;
	}	
	
	public void setSampleName(String sampleName) {
		this.sampleName = sampleName;
	}
	public String getReceiptlistID() {
		return receiptlistID;
	}	
	
	public void setReceiptlistID(String receiptlistID) {
		this.receiptlistID = receiptlistID;
	}
	public Date getCreateTime() {
		return createTime;
	}	
	
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getRemarks() {
		return remarks;
	}	
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getSpecifications() {
		return specifications;
	}	
	
	public void setSpecifications(String specifications) {
		this.specifications = specifications;
	}
	public int getState() {
		return state;
	}	
	
	public void setState(int state) {
		this.state = state;
	}
	
	@Override
	public String toString() {
		return "SampleInformation [" +  "ID=" + ID  + ", " +  "factoryCode=" + factoryCode  + ", " +  "sampleName=" + sampleName  + ", " +  "receiptlistID=" + receiptlistID  + ", " +  "createTime=" + createTime  + ", " +  "remarks=" + remarks  + ", " +  "specifications=" + specifications  + ", " +  "state=" + state  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "sampleInformation";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
