package com.cqut.xiji.entity.standard;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Standard extends Entity{
	
	@ID
	private String ID;
	private String standardCode;
	private String standardName;
	private String type;
	private String scope;
	private String description;
	private String suggest;
	private String fileID;
	private int state;
	private int applicationType;
	private String remarks;
	private int editState;
	private String abandonApplyMan;
	private Date abandonApplyTime;
	private String abandonApplyReason;
	private String equipmentCode;
	private String templateID;
	

	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getStandardCode() {
		return standardCode;
	}	
	
	public void setStandardCode(String standardCode) {
		this.standardCode = standardCode;
	}
	public String getStandardName() {
		return standardName;
	}	
	
	public void setStandardName(String standardName) {
		this.standardName = standardName;
	}
	public String getType() {
		return type;
	}	
	
	public void setType(String type) {
		this.type = type;
	}
	public String getScope() {
		return scope;
	}	
	
	public void setScope(String scope) {
		this.scope = scope;
	}
	public String getDescription() {
		return description;
	}	
	
	public void setDescription(String description) {
		this.description = description;
	}
	public String getSuggest() {
		return suggest;
	}	
	
	public void setSuggest(String suggest) {
		this.suggest = suggest;
	}
	public String getFileID() {
		return fileID;
	}	
	
	public void setFileID(String fileID) {
		this.fileID = fileID;
	}
	public int getState() {
		return state;
	}	
	
	public void setState(int state) {
		this.state = state;
	}
	public int getApplicationType() {
		return applicationType;
	}	
	
	public void setApplicationType(int applicationType) {
		this.applicationType = applicationType;
	}
	public String getRemarks() {
		return remarks;
	}	
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public int getEditState() {
		return editState;
	}	
	
	public void setEditState(int editState) {
		this.editState = editState;
	}
	
	public String getAbandonApplyMan() {
		return abandonApplyMan;
	}

	public void setAbandonApplyMan(String abandonApplyMan) {
		this.abandonApplyMan = abandonApplyMan;
	}

	public Date getAbandonApplyTime() {
		return abandonApplyTime;
	}

	public void setAbandonApplyTime(Date abandonApplyTime) {
		this.abandonApplyTime = abandonApplyTime;
	}

	public String getAbandonApplyReason() {
		return abandonApplyReason;
	}

	public void setAbandonApplyReason(String abandonApplyReason) {
		this.abandonApplyReason = abandonApplyReason;
	}

	public String getEquipmentCode() {
		return equipmentCode;
	}

	public void setEquipmentCode(String equipmentCode) {
		this.equipmentCode = equipmentCode;
	}
	
	public String getTemplateID() {
		return templateID;
	}

	public void setTemplateID(String templateID) {
		this.templateID = templateID;
	}

	@Override
	public String toString() {
		return "Standard [" +  "ID=" + ID  + ", " +  "standardCode=" + standardCode  + ", " +  "standardName=" + standardName  + ", " +  "type=" + type  + ", " +  "scope=" + scope  + ", " +  "description=" + description  + ", " +  "suggest=" + suggest  + ", " +  "fileID=" + fileID  + ", " +  "state=" + state  + ", " +  "applicationType=" + applicationType  + ", " +  "remarks=" + remarks  + ", " +  "editState=" + editState  + ", " +  "abandonApplyMan=" + abandonApplyMan + ", " +  "abandonApplyTime=" + abandonApplyTime + ", " +  "abandonApplyReason=" + abandonApplyReason + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "standard";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
