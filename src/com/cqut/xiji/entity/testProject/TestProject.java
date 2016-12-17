package com.cqut.xiji.entity.testProject;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class TestProject extends Entity{
	
	@ID
	private String ID;
	private String nameEn;
	private String nameCn;
	private String departmentID;
	private String environmentalRequirements;
	private String standardID;
	private Date createTime;
	private String templateID;
	private String remarks;
	private String describes;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getNameEn() {
		return nameEn;
	}	
	
	public void setNameEn(String nameEn) {
		this.nameEn = nameEn;
	}
	public String getNameCn() {
		return nameCn;
	}	
	
	public void setNameCn(String nameCn) {
		this.nameCn = nameCn;
	}
	public String getDepartmentID() {
		return departmentID;
	}	
	
	public void setDepartmentID(String departmentID) {
		this.departmentID = departmentID;
	}
	public String getEnvironmentalRequirements() {
		return environmentalRequirements;
	}	
	
	public void setEnvironmentalRequirements(String environmentalRequirements) {
		this.environmentalRequirements = environmentalRequirements;
	}
	public String getStandardID() {
		return standardID;
	}	
	
	public void setStandardID(String standardID) {
		this.standardID = standardID;
	}
	public Date getCreateTime() {
		return createTime;
	}	
	
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getTemplateID() {
		return templateID;
	}	
	
	public void setTemplateID(String templateID) {
		this.templateID = templateID;
	}
	public String getRemarks() {
		return remarks;
	}	
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	public String getDescribes() {
		return describes;
	}

	public void setDescribes(String describes) {
		this.describes = describes;
	}

	@Override
	public String toString() {
		return "TestProject [" +  "ID=" + ID  + ", " +  "nameEn=" + nameEn  + ", " +  "nameCn=" + nameCn  + ", " +  "departmentID=" + departmentID  + ", " +  "environmentalRequirements=" + environmentalRequirements  + ", " +  "standardID=" + standardID  + ", " +  "createTime=" + createTime  + ", " +  "templateID=" + templateID  + ", " +  "remarks=" + remarks + ", " +  "describes=" + describes + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "testProject";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
