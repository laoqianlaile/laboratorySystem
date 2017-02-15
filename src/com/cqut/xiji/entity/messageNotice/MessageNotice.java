package com.cqut.xiji.entity.messageNotice;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class MessageNotice extends Entity{
	
	@ID
	private String ID;
	private String messageID;
	private String employeeID;
	private int state;
	private Date lookTime;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	
	public String getMessageID() {
		return messageID;
	}

	public void setMessageID(String messageID) {
		this.messageID = messageID;
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

	public Date getLookTime() {
		return lookTime;
	}

	public void setLookTime(Date lookTime) {
		this.lookTime = lookTime;
	}

	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "messageNotice";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
