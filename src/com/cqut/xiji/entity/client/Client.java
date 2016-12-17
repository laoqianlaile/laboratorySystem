package com.cqut.xiji.entity.client;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Client extends Entity{
	
	@ID
	private String ID;
	private String clientNo;
	private String password;
	private String companyID;
	private Date createTime;
	private String  reviewStatus;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getClientNo() {
		return clientNo;
	}	
	
	public void setClientNo(String clientNo) {
		this.clientNo = clientNo;
	}
	public String getPassword() {
		return password;
	}	
	
	public void setPassword(String password) {
		this.password = password;
	}
	public String getCompanyID() {
		return companyID;
	}	
	
	public void setCompanyID(String companyID) {
		this.companyID = companyID;
	}
	public Date getCreateTime() {
		return createTime;
	}	
	
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	@Override
	public String toString() {
		return "Client [" +  "ID=" + ID  + ", " +  "clientNo=" + clientNo  + ", " +  "password=" + password   + ", " +  "companyID=" + companyID  + ", " +  "createTime=" + createTime  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "client";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}

	public String getReviewStatus() {
		return reviewStatus;
	}

	public void setReviewStatus(String reviewStatus) {
		this.reviewStatus = reviewStatus;
	}
}
