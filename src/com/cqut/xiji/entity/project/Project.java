package com.cqut.xiji.entity.project;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Project extends Entity{
	
	@ID
	private String ID;
	private String contractID;
	private int state;
	private Date createTime;
	private String remarks;
	private Date endTime;
	
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
	public int getState() {
		return state;
	}	
	
	public void setState(int state) {
		this.state = state;
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
	public Date getEndTime() {
		return endTime;
	}	
	
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	
	@Override
	public String toString() {
		return "Project [" +  "ID=" + ID  + ", " +  "contractID=" + contractID  + ", " +  "state=" + state  + ", " +  "createTime=" + createTime  + ", " +  "remarks=" + remarks  + ", " +  "endTime=" + endTime  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "project";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
