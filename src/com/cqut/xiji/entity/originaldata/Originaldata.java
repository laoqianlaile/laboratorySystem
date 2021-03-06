package com.cqut.xiji.entity.originaldata;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Originaldata extends Entity{
	
	@ID
	private String ID;
	private String taskID;
	private String originaldataCode;
	private String fileID;
	private String remarks;
	private int state;
	private String suggest;
	private String name;
	private String codeOne;
	private String codeTwo;
	
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
	public String getOriginaldataCode() {
		return originaldataCode;
	}	
	
	public void setOriginaldataCode(String originaldataCode) {
		this.originaldataCode = originaldataCode;
	}
	public String getFileID() {
		return fileID;
	}	
	
	public void setFileID(String fileID) {
		this.fileID = fileID;
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
	public String getSuggest() {
		return suggest;
	}	
	
	public void setSuggest(String suggest) {
		this.suggest = suggest;
	}
	
	
	
	@Override
	public String toString() {
		return "Originaldata [ID=" + ID + ", taskID=" + taskID
				+ ", originaldataCode=" + originaldataCode + ", fileID="
				+ fileID + ", remarks=" + remarks + ", state=" + state
				+ ", suggest=" + suggest + ", name=" + name + ", codeOne="
				+ codeOne + ", codeTwo=" + codeTwo + "]";
	}

	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "originaldata";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCodeOne() {
		return codeOne;
	}

	public void setCodeOne(String codeOne) {
		this.codeOne = codeOne;
	}

	public String getCodeTwo() {
		return codeTwo;
	}

	public void setCodeTwo(String codeTwo) {
		this.codeTwo = codeTwo;
	}
}
