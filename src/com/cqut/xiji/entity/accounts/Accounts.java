package com.cqut.xiji.entity.accounts;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Accounts extends Entity{
	
	@ID
	private String ID;
	private String contractID;
	private String employeeID;
	private Date checkinTime;
	private String remarks;

	public String getID() {
		return ID;
	}

	public void setID(String iD) {
		ID = iD;
	}

	public String getContractID() {
		return contractID;
	}

	public void setContractID(String contractID) {
		this.contractID = contractID;
	}

	public String getEmployeeID() {
		return employeeID;
	}

	public void setEmployeeID(String employeeID) {
		this.employeeID = employeeID;
	}

	public Date getCheckinTime() {
		return checkinTime;
	}

	public void setCheckinTime(Date checkinTime) {
		this.checkinTime = checkinTime;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Override
	public String toString() {
		return "Accounts [" +  "ID=" + ID  + ", " +  "contractID=" + contractID  + ", " +  "employeeID=" + employeeID  + ", " +  "checkinTime=" + checkinTime  + ", " +  "remarks=" + remarks + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "accounts";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
