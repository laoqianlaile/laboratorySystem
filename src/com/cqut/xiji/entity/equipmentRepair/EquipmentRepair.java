package com.cqut.xiji.entity.equipmentRepair;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class EquipmentRepair extends Entity{
	
	@ID
	private String ID;
	private String equipmentID;
	private Date repairTime;
	private String employeeID;
	private String beforeStatus;
	private String afterStatus;
	private String mounting;
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
	public Date getRepairTime() {
		return repairTime;
	}	
	
	public void setRepairTime(Date repairTime) {
		this.repairTime = repairTime;
	}
	public String getEmployeeID() {
		return employeeID;
	}	
	
	public void setEmployeeID(String employeeID) {
		this.employeeID = employeeID;
	}
	public String getBeforeStatus() {
		return beforeStatus;
	}	
	
	public void setBeforeStatus(String beforeStatus) {
		this.beforeStatus = beforeStatus;
	}
	public String getAfterStatus() {
		return afterStatus;
	}	
	
	public void setAfterStatus(String afterStatus) {
		this.afterStatus = afterStatus;
	}
	public String getMounting() {
		return mounting;
	}	
	
	public void setMounting(String mounting) {
		this.mounting = mounting;
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
		return "EquipmentRepair [" +  "ID=" + ID  + ", " +  "equipmentID=" + equipmentID  + ", " +  "repairTime=" + repairTime  + ", " +  "employeeID=" + employeeID  + ", " +  "beforeStatus=" + beforeStatus  + ", " +  "afterStatus=" + afterStatus  + ", " +  "mounting=" + mounting  + ", " +  "money=" + money  + ", " +  "remarks=" + remarks  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "equipmentRepair";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
