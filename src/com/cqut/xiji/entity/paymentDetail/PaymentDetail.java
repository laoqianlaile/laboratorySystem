package com.cqut.xiji.entity.paymentDetail;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class PaymentDetail extends Entity{
	
	@ID
	private String ID;
	private String jouranlAccountID;
	private String taskID;
	private String employeeID;
	private Date createTime;
	private String remarks;
	private String drawID;
	private String receiptlistID;
	private double payMoney;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getJouranlAccountID() {
		return jouranlAccountID;
	}	
	
	public void setJouranlAccountID(String jouranlAccountID) {
		this.jouranlAccountID = jouranlAccountID;
	}
	public String getTaskID() {
		return taskID;
	}	
	
	public void setTaskID(String taskID) {
		this.taskID = taskID;
	}
	public String getEmployeeID() {
		return employeeID;
	}	
	
	public void setEmployeeID(String employeeID) {
		this.employeeID = employeeID;
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
	
	public String getDrawID() {
		return drawID;
	}

	public void setDrawID(String drawID) {
		this.drawID = drawID;
	}

	public String getReceiptlistID() {
		return receiptlistID;
	}

	public void setReceiptlistID(String receiptlistID) {
		this.receiptlistID = receiptlistID;
	}

	public double getPayMoney() {
		return payMoney;
	}

	public void setPayMoney(double payMoney) {
		this.payMoney = payMoney;
	}

	@Override
	public String toString() {
		return "PaymentDetail [" +  "ID=" + ID  + ", " +  "jouranlAccountID=" + jouranlAccountID  + ", " +  "taskID=" + taskID  + ", " +  "employeeID=" + employeeID  + ", " +  "createTime=" + createTime  + ", " +  "remarks=" + remarks  + ", " + "drawID=" + drawID  + ", " +  "receiptlistID=" + receiptlistID  + "payMoney=" + payMoney  + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "paymentDetail";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
