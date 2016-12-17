package com.cqut.xiji.entity.jouranlAccount;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class JouranlAccount extends Entity{
	
	@ID
	private String ID;
	private String contractID;
	private String projectID;
	private String invoice;
	private String employeeID;
	private double money;
	private Date checkinTime;
	private String contractFineItemID;
	private int state;
	private String remarks;
	private int isIncome;
	
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
	public String getInvoice() {
		return invoice;
	}	
	
	public void setInvoice(String invoice) {
		this.invoice = invoice;
	}
	public String getEmployeeID() {
		return employeeID;
	}	
	
	public void setEmployeeID(String employeeID) {
		this.employeeID = employeeID;
	}
	public double getMoney() {
		return money;
	}	
	
	public void setMoney(double money) {
		this.money = money;
	}
	public Date getCheckinTime() {
		return checkinTime;
	}	
	
	public void setCheckinTime(Date checkinTime) {
		this.checkinTime = checkinTime;
	}
	public String getContractFineItemID() {
		return contractFineItemID;
	}	
	
	public void setContractFineItemID(String contractFineItemID) {
		this.contractFineItemID = contractFineItemID;
	}
	public int getState() {
		return state;
	}	
	
	public void setState(int state) {
		this.state = state;
	}
	public String getRemarks() {
		return remarks;
	}	
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public int getIsIncome() {
		return isIncome;
	}	
	
	public void setIsIncome(int isIncome) {
		this.isIncome = isIncome;
	}
	
	@Override
	public String toString() {
		return "JouranlAccount [" +  "ID=" + ID  + ", " +  "contractID=" + contractID  + ", " +  "projectID=" + projectID  + ", " +  "invoice=" + invoice  + ", " +  "employeeID=" + employeeID  + ", " +  "money=" + money  + ", " +  "checkinTime=" + checkinTime  + ", " +  "contractFineItemID=" + contractFineItemID  + ", " +  "state=" + state  + ", " +  "remarks=" + remarks  + ", " +  "isIncome=" + isIncome  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "jouranlAccount";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
