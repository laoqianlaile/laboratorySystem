package com.cqut.xiji.entity.receiptlist;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Receiptlist extends Entity{
	
	@ID
	private String ID;
	private String contractID;
	private String projectID;
	private String linkMan;
	private String linkPhone;
	private String receiptlistCode;
	private String employeeID;
	private Date createTime;
	private int state;
	private int isEditSample;
	private Date completeTime;
	private int receiptlistType;
	private String accordingDoc;
	private int allotState;
	private int isCreate ;
	private String reFile ;
	private int type;
	
	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getReFile() {
		return reFile;
	}

	public void setReFile(String reFile) {
		this.reFile = reFile;
	}

	public int getIsCreate() {
		return isCreate;
	}

	public void setIsCreate(int isCreate) {
		this.isCreate = isCreate;
	}

	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getContractID() {
		return contractID;
	}	
	
	public void setContractID(String contractID) {
		this.contractID = contractID;
	}
	public String getProjectID() {
		return projectID;
	}	
	
	public void setProjectID(String projectID) {
		this.projectID = projectID;
	}
	public String getLinkMan() {
		return linkMan;
	}	
	
	public void setLinkMan(String linkMan) {
		this.linkMan = linkMan;
	}
	public String getLinkPhone() {
		return linkPhone;
	}	
	
	public void setLinkPhone(String linkPhone) {
		this.linkPhone = linkPhone;
	}
	public String getReceiptlistCode() {
		return receiptlistCode;
	}	
	
	public void setReceiptlistCode(String receiptlistCode) {
		this.receiptlistCode = receiptlistCode;
	}
	public String getEmployeeID() {
		return employeeID;
	}	
	
	public void setEmployeeID(String employeeID) {
		this.employeeID = employeeID;
	}
	public int getState() {
		return state;
	}	
	
	public void setState(int state) {
		this.state = state;
	}
	public int getIsEditSample() {
		return isEditSample;
	}	
	
	public void setIsEditSample(int isEditSample) {
		this.isEditSample = isEditSample;
	}
	
	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getCompleteTime() {
		return completeTime;
	}

	public void setCompleteTime(Date completeTime) {
		this.completeTime = completeTime;
	}

	public int getReceiptlistType() {
		return receiptlistType;
	}

	public void setReceiptlistType(int receiptlistType) {
		this.receiptlistType = receiptlistType;
	}

	public String getAccordingDoc() {
		return accordingDoc;
	}

	public void setAccordingDoc(String accordingDoc) {
		this.accordingDoc = accordingDoc;
	}

	public int getAllotState() {
		return allotState;
	}

	public void setAllotState(int allotState) {
		this.allotState = allotState;
	}

	@Override
	public String toString() {
		return "Receiptlist [" +  "ID=" + ID  + ", " +  "contractID=" + contractID  + ", " +  "projectID=" + projectID  + ", " +  "linkMan=" + linkMan  + ", " +  "linkPhone=" + linkPhone  + ", " +  "receiptlistCode=" + receiptlistCode  + ", " +  "employeeID=" + employeeID  + ", " +  "createTime=" + createTime  + ", " +  "state=" + state  + ", " +  "isEditSample=" + isEditSample + ", " +  "completeTime=" + completeTime + ", " +  "receiptlistType=" + receiptlistType + ", " +  "accordingDoc=" + accordingDoc +  "allotState=" + allotState +"]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "receiptlist";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
