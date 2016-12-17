package com.cqut.xiji.entity.taskEquipment;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class TaskEquipment extends Entity{
	
	@ID
	private String ID;
	private String taskID;
	private String equipmentID;
	private Date useTime;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getTaskID() {
		return taskID;
	}	
	
	public void setTaskID(String taskID) {
		this.taskID = taskID;
	}
	public String getEquipmentID() {
		return equipmentID;
	}	
	
	public void setEquipmentID(String equipmentID) {
		this.equipmentID = equipmentID;
	}
	public Date getUseTime() {
		return useTime;
	}	
	
	public void setUseTime(Date useTime) {
		this.useTime = useTime;
	}
	
	@Override
	public String toString() {
		return "TaskEquipment [" +  "ID=" + ID  + ", " +  "taskID=" + taskID  + ", " +  "equipmentID=" + equipmentID  + ", " +  "useTime=" + useTime  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "taskEquipment";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
