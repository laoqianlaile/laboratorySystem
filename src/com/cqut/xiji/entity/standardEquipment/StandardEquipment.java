package com.cqut.xiji.entity.standardEquipment;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;

public class StandardEquipment extends Entity{
	private String ID;
	private String standardID;
	private String equipmentID;
	private Date userTime;
	
	public String getID() {
		return ID;
	}

	public void setID(String iD) {
		ID = iD;
	}

	public String getStandardID() {
		return standardID;
	}

	public void setStandardID(String standardID) {
		this.standardID = standardID;
	}

	public String getEquipmentID() {
		return equipmentID;
	}

	public void setEquipmentID(String equipmentID) {
		this.equipmentID = equipmentID;
	}

	public Date getUserTime() {
		return userTime;
	}

	public void setUserTime(Date userTime) {
		this.userTime = userTime;
	}
	
	

	@Override
	public String toString() {
		return "StandardEquipment [ID=" + ID + ", standardID=" + standardID
				+ ", equipmentID=" + equipmentID + ", userTime=" + userTime
				+ "]";
	}

	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "standardEquipment";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}

}
