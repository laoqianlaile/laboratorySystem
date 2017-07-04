package com.cqut.xiji.entity.taskTestProject;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.entity.testProject.TestProject;
import com.cqut.xiji.service.tableCreator.ID;

public class TaskTestProject extends Entity{
	
	@ID
	private String ID;
	private String taskID;
	private String testProjectID;
	private Date checkInTime;
	private String testStandard;
	
	public String getID() {
		return ID;
	}

	public void setID(String iD) {
		ID = iD;
	}

	public String getTaskID() {
		return taskID;
	}

	public void setTaskID(String taskID) {
		this.taskID = taskID;
	}

	public String getTestProjectID() {
		return testProjectID;
	}

	public void setTestProjectID(String testProjectID) {
		this.testProjectID = testProjectID;
	}

	public Date getCheckInTime() {
		return checkInTime;
	}

	public void setCheckInTime(Date checkInTime) {
		this.checkInTime = checkInTime;
	}

	@Override
	public String toString() {
		return "TaskTestProject [ID=" + ID + ", taskID=" + taskID
				+ ", testProjectID=" + testProjectID + ", checkInTime="
				+ checkInTime + ", testStandard=" + testStandard + "]";
	}

	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "taskTestProject";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}

	public String getTestStandard() {
		return testStandard;
	}

	public void setTestStandard(String testStandard) {
		this.testStandard = testStandard;
	}
}
