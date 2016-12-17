package com.cqut.xiji.entity.equipmentScrap;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class EquipmentScrap extends Entity{
	
	@ID
	private String ID;
	private String equipmentID;
	private Date buyTime;
	private String employeeID;
	private int number;
	private Date checkinTime;
	private int useTime;
	private double money;
	private String remarks;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getEquipmentID() {
		return equipmentID;
	}	
	
	public void setEquipmentID(String equipmentID) {
		this.equipmentID = equipmentID;
	}
	public Date getBuyTime() {
		return buyTime;
	}	
	
	public void setBuyTime(Date buyTime) {
		this.buyTime = buyTime;
	}
	public String getEmployeeID() {
		return employeeID;
	}	
	
	public void setEmployeeID(String employeeID) {
		this.employeeID = employeeID;
	}
	public int getNumber() {
		return number;
	}	
	
	public void setNumber(int number) {
		this.number = number;
	}
	public Date getCheckinTime() {
		return checkinTime;
	}	
	
	public void setCheckinTime(Date checkinTime) {
		this.checkinTime = checkinTime;
	}
	public int getUseTime() {
		return useTime;
	}	
	
	public void setUseTime(int useTime) {
		this.useTime = useTime;
	}
	public double getMoney() {
		return money;
	}	
	
	public void setMoney(double money) {
		this.money = money;
	}
	public String getRemarks() {
		return remarks;
	}	
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	@Override
	public String toString() {
		return "EquipmentScrap [" +  "ID=" + ID  + ", " +  "equipmentID=" + equipmentID  + ", " +  "buyTime=" + buyTime  + ", " +  "employeeID=" + employeeID  + ", " +  "number=" + number  + ", " +  "checkinTime=" + checkinTime  + ", " +  "useTime=" + useTime  + ", " +  "money=" + money  + ", " +  "remarks=" + remarks  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "equipmentScrap";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
