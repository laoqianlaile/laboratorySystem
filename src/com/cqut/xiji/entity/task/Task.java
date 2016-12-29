package com.cqut.xiji.entity.task;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Task extends Entity{
	
	@ID
	private String ID;
	private String receiptlistID;
	private String sampleID;
	private String testProjectID;
	private Date startTime;
	private Date endTime;
	private Date completeTime;
	private String custodian;
	private String result;
	private int allotstate;
	private String originaldataID;
	private String testReportID;
	private int detectstate;
	private Date sendReportTime;
	private String acceptman;
	private String requires;
	private String levelTwo;
	private String levelThree;
	private String taskCode;
	
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getReceiptlistID() {
		return receiptlistID;
	}	
	
	public void setReceiptlistID(String receiptlistID) {
		this.receiptlistID = receiptlistID;
	}
	
	public String getSampleID() {
		return sampleID;
	}

	public void setSampleID(String sampleID) {
		this.sampleID = sampleID;
	}

	public String getTestProjectID() {
		return testProjectID;
	}	
	
	public void setTestProjectID(String testProjectID) {
		this.testProjectID = testProjectID;
	}
	public Date getStartTime() {
		return startTime;
	}	
	
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}	
	
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public Date getCompleteTime() {
		return completeTime;
	}	
	
	public void setCompleteTime(Date completeTime) {
		this.completeTime = completeTime;
	}
	public String getCustodian() {
		return custodian;
	}	
	
	public void setCustodian(String custodian) {
		this.custodian = custodian;
	}
	public String getResult() {
		return result;
	}	
	
	public void setResult(String result) {
		this.result = result;
	}
	public int getAllotstate() {
		return allotstate;
	}	
	
	public void setAllotstate(int allotstate) {
		this.allotstate = allotstate;
	}
	public String getOriginaldataID() {
		return originaldataID;
	}	
	
	public void setOriginaldataID(String originaldataID) {
		this.originaldataID = originaldataID;
	}
	public String getTestReportID() {
		return testReportID;
	}	
	
	public void setTestReportID(String testReportID) {
		this.testReportID = testReportID;
	}
	public int getDetectstate() {
		return detectstate;
	}	
	
	public void setDetectstate(int detectstate) {
		this.detectstate = detectstate;
	}
	public Date getSendReportTime() {
		return sendReportTime;
	}	
	
	public void setSendReportTime(Date sendReportTime) {
		this.sendReportTime = sendReportTime;
	}
	public String getAcceptman() {
		return acceptman;
	}	
	
	public void setAcceptman(String acceptman) {
		this.acceptman = acceptman;
	}
	
	public String getRequires() {
		return requires;
	}

	public void setRequires(String requires) {
		this.requires = requires;
	}

	public String getLevelTwo() {
		return levelTwo;
	}

	public void setLevelTwo(String levelTwo) {
		this.levelTwo = levelTwo;
	}

	public String getLevelThree() {
		return levelThree;
	}

	public void setLevelThree(String levelThree) {
		this.levelThree = levelThree;
	}

	public String getTaskCode() {
		return taskCode;
	}

	public void setTaskCode(String taskCode) {
		this.taskCode = taskCode;
	}

	@Override
	public String toString() {
		return "Task [" +  "ID=" + ID  + ", " +  "receiptlistID=" + receiptlistID  + ", " +  "sampleID=" + sampleID  + ", " +  "testProjectID=" + testProjectID  + ", " +  "startTime=" + startTime  + ", " +  "endTime=" + endTime  + ", " +  "completeTime=" + completeTime  + ", " +  "custodian=" + custodian  + ", " +  "result=" + result  + ", " +  "allotstate=" + allotstate  + ", " +  "originaldataID=" + originaldataID  + ", " +  "testReportID=" + testReportID  + ", " +  "detectstate=" + detectstate  + ", " +  "sendReportTime=" + sendReportTime  + ", " +  "acceptman=" + acceptman  + ", "  + "requires=" + requires + "levelTwo=" + levelTwo + "levelThree=" + levelThree + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "task";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
