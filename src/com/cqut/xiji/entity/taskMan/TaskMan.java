package com.cqut.xiji.entity.taskMan;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class TaskMan extends Entity{
	
	@ID
	private String ID;
	private String taskID;
	private String detector;
	private double laborHour;
	
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
	public String getDetector() {
		return detector;
	}	
	
	public void setDetector(String detector) {
		this.detector = detector;
	}
	
	
	
	@Override
	public String toString() {
		return "TaskMan [ID=" + ID + ", taskID=" + taskID + ", detector="
				+ detector + ", laborHour=" + laborHour + "]";
	}

	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "taskMan";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}

	public double getLaborHour() {
		return laborHour;
	}

	public void setLaborHour(double laborHour) {
		this.laborHour = laborHour;
	}
}
