package com.cqut.xiji.entity.equipment;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Equipment extends Entity{
	
	@ID
	private String ID;
	private String equipmentCode;
	private String equipmentName;
	private String departmentID;
	private Date buyTime;
	private int useYear;
	private String equipmentTypeID;
	private String employeeID;
	private String remarks;
	private int state;
	private String model;
	private String factoryCode;
	private String credentials;
	private Date effectiveTime;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getEquipmentCode() {
		return equipmentCode;
	}	
	
	public void setEquipmentCode(String equipmentCode) {
		this.equipmentCode = equipmentCode;
	}
	public String getEquipmentName() {
		return equipmentName;
	}	
	
	public void setEquipmentName(String equipmentName) {
		this.equipmentName = equipmentName;
	}
	
	public String getDepartmentID() {
		return departmentID;
	}	
	
	public void setDepartmentID(String departmentID) {
		this.departmentID = departmentID;
	}
	public Date getBuyTime() {
		return buyTime;
	}	
	
	public void setBuyTime(Date buyTime) {
		this.buyTime = buyTime;
	}
	public int getUseYear() {
		return useYear;
	}	
	
	public void setUseYear(int useYear) {
		this.useYear = useYear;
	}
	public String getEquipmentTypeID() {
		return equipmentTypeID;
	}	
	
	public void setEquipmentTypeID(String equipmentTypeID) {
		this.equipmentTypeID = equipmentTypeID;
	}
	public String getEmployeeID() {
		return employeeID;
	}	
	
	public void setEmployeeID(String employeeID) {
		this.employeeID = employeeID;
	}
	public String getRemarks() {
		return remarks;
	}	
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public int getState() {
		return state;
	}	
	
	public void setState(int state) {
		this.state = state;
	}
	
	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getFactoryCode() {
		return factoryCode;
	}

	public void setFactoryCode(String factoryCode) {
		this.factoryCode = factoryCode;
	}

	public String getCredentials() {
		return credentials;
	}

	public void setCredentials(String credentials) {
		this.credentials = credentials;
	}

	public Date getEffectiveTime() {
		return effectiveTime;
	}

	public void setEffectiveTime(Date effectiveTime) {
		this.effectiveTime = effectiveTime;
	}

	@Override
	public String toString() {
		return "Equipment [" +  "ID=" + ID  + ", " +  "equipmentCode=" + equipmentCode  + ", " +  "equipmentName=" + equipmentName + ", " +  "model=" + model + ", " +  "departmentID=" + departmentID  + ", " +  "buyTime=" + buyTime  + ", " +  "useYear=" + useYear  + ", " +  "equipmentTypeID=" + equipmentTypeID  + ", " +  "employeeID=" + employeeID  + ", " +  "remarks=" + remarks  + ", " +  "state=" + state +  ", " +  "factoryCode=" + factoryCode + ", " +  "credentials=" + credentials + ", " +  "effectiveTime=" + effectiveTime  + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "equipment";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
