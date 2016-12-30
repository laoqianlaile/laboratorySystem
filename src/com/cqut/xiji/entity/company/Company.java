package com.cqut.xiji.entity.company;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Company extends Entity{
	
	@ID
	private String ID;
	private String companyCode;
	private String companyName;
	private String linkMan;
	private String mobilePhone;
	private String address;
	private String fileID1;
	private String legal;
	private String fileID2;
	private String scope;
	private int type;
	private String remarks;
	private Date createTime;
	
	@Override
	public String toString() {
		return "Company [ID=" + ID + ", companyCode=" + companyCode
				+ ", companyName=" + companyName + ", linkMan=" + linkMan
				+ ", mobilePhone=" + mobilePhone + ", address=" + address
				+ ", fileID1=" + fileID1 + ", legal=" + legal + ", fileID2="
				+ fileID2 + ", scope=" + scope + ", type=" + type
				+ ", remarks=" + remarks + ", createTime=" + createTime + "]";
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getCompanyCode() {
		return companyCode;
	}
	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getLinkMan() {
		return linkMan;
	}
	public void setLinkMan(String linkMan) {
		this.linkMan = linkMan;
	}
	public String getMobilePhone() {
		return mobilePhone;
	}
	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getFileID1() {
		return fileID1;
	}
	public void setFileID1(String fileID1) {
		this.fileID1 = fileID1;
	}
	public String getLegal() {
		return legal;
	}
	public void setLegal(String legal) {
		this.legal = legal;
	}
	public String getFileID2() {
		return fileID2;
	}
	public void setFileID2(String fileID2) {
		this.fileID2 = fileID2;
	}
	public String getScope() {
		return scope;
	}
	public void setScope(String scope) {
		this.scope = scope;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "company";
	}
	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
	
}
