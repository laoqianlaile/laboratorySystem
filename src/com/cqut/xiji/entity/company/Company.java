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
	private String mobilephone;
	private String address;
	private String qulicationPic;
	private String legal;
	private String businessLicence;
	private String scope;
	private int type;
	private String remarks;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
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
	public String getAddress() {
		return address;
	}	
	
	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getBusinessLicence() {
		return businessLicence;
	}	
	
	public void setBusinessLicence(String businessLicence) {
		this.businessLicence = businessLicence;
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
	
	public String getMobilephone() {
		return mobilephone;
	}

	public void setMobilephone(String mobilephone) {
		this.mobilephone = mobilephone;
	}

	public String getQulicationPic() {
		return qulicationPic;
	}

	public void setQulicationPic(String qulicationPic) {
		this.qulicationPic = qulicationPic;
	}

	public String getLegal() {
		return legal;
	}

	public void setLegal(String legal) {
		this.legal = legal;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	@Override
	public String toString() {
		return "Company [" +  "ID=" + ID  + ", " +  "companyCode=" + companyCode  + ", " +  "companyName=" + companyName  + ", " +  "linkMan=" + linkMan  + ", " +  "mobilephone=" + mobilephone  + ", " +  "address=" + address  + ", " +  "qulicationPic=" + qulicationPic+ ", " +  "legal=" + legal + ", " +  "businessLicence=" + businessLicence  + ", " +  "scope=" + scope  + ", " +  "type=" + type  + ", " +  "remarks=" + remarks  + ", "   + "]";
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
