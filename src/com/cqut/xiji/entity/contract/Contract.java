package com.cqut.xiji.entity.contract;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Contract extends Entity{
	
	@ID
	private String ID;
	private String contractCode;
	private String contractName;
	private String companyID;
	private String oppositeMen;
	private String linkPhone;
	private String employeeID;
	private String signAddress;
	private Date signTime;
	private Date startTime;
	private Date endTime;
	private double contractAmount;
	private String fileID;
	private int isClassified;
	private int classifiedLevel;
	private int state;
	private String viewpoint;
	private int type;
	private int orderType;
	private int isInput;
	
	public int getOrderType() {
		return orderType;
	}

	public void setOrderType(int orderType) {
		this.orderType = orderType;
	}

	public int getIsInput() {
		return isInput;
	}

	public void setIsInput(int isInput) {
		this.isInput = isInput;
	}

	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getContractCode() {
		return contractCode;
	}	
	
	public void setContractCode(String contractCode) {
		this.contractCode = contractCode;
	}
	public String getContractName() {
		return contractName;
	}	
	
	public void setContractName(String contractName) {
		this.contractName = contractName;
	}
	public String getCompanyID() {
		return companyID;
	}	
	
	public void setCompanyID(String companyID) {
		this.companyID = companyID;
	}
	public String getOppositeMen() {
		return oppositeMen;
	}	
	
	public void setOppositeMen(String oppositeMen) {
		this.oppositeMen = oppositeMen;
	}
	public String getLinkPhone() {
		return linkPhone;
	}	
	
	public void setLinkPhone(String linkPhone) {
		this.linkPhone = linkPhone;
	}
	public String getEmployeeID() {
		return employeeID;
	}	
	
	public void setEmployeeID(String employeeID) {
		this.employeeID = employeeID;
	}
	public String getSignAddress() {
		return signAddress;
	}	
	
	public void setSignAddress(String signAddress) {
		this.signAddress = signAddress;
	}
	public Date getSignTime() {
		return signTime;
	}	
	
	public void setSignTime(Date signTime) {
		this.signTime = signTime;
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
	public double getContractAmount() {
		return contractAmount;
	}	
	
	public void setContractAmount(double contractAmount) {
		this.contractAmount = contractAmount;
	}
	public String getFileID() {
		return fileID;
	}	
	
	public void setFileID(String fileID) {
		this.fileID = fileID;
	}
	public int getIsClassified() {
		return isClassified;
	}	
	
	public void setIsClassified(int isClassified) {
		this.isClassified = isClassified;
	}
	public int getClassifiedLevel() {
		return classifiedLevel;
	}	
	
	public void setClassifiedLevel(int classifiedLevel) {
		this.classifiedLevel = classifiedLevel;
	}
	public int getState() {
		return state;
	}	
	
	public void setState(int state) {
		this.state = state;
	}
	public String getViewpoint() {
		return viewpoint;
	}	
	
	public void setViewpoint(String viewpoint) {
		this.viewpoint = viewpoint;
	}
	public int getType() {
		return type;
	}	
	
	public void setType(int type) {
		this.type = type;
	}
	
	@Override
	public String toString() {
		return "Contract [" +  "ID=" + ID  + ", " +  "contractCode=" + contractCode  + ", " +  "contractName=" + contractName  + ", " +  "companyID=" + companyID  + ", " +  "oppositeMen=" + oppositeMen  + ", " +  "linkPhone=" + linkPhone  + ", " +  "employeeID=" + employeeID  + ", " +  "signAddress=" + signAddress  + ", " +  "signTime=" + signTime  + ", " +  "startTime=" + startTime  + ", " +  "endTime=" + endTime  + ", " +  "contractAmount=" + contractAmount  + ", " +  "fileID=" + fileID  + ", " +  "isClassified=" + isClassified  + ", " +  "classifiedLevel=" + classifiedLevel  + ", " +  "state=" + state  + ", " +  "viewpoint=" + viewpoint  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "contract";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
