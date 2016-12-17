package com.cqut.xiji.entity.selfapplication;





import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Selfapplication extends Entity{
	
	@ID
	private String selfApplyID;
	private String selfCompanyId;
	private String selfSampleName;
	private String selfDetection;
	private String selfContact;
	private String selfContactPhone;
	private Date  selfEntryData;
	private String selfHasContact;
	private String selfRemork;
	
	public Selfapplication(){
	}
	
	public Selfapplication(String selfSampleName, String selfDetection,
			String selfContact, String selfContactPhone, String selfRemork) {
		this.selfSampleName = selfSampleName;
		this.selfDetection = selfDetection;
		this.selfContact = selfContact;
		this.selfContactPhone = selfContactPhone;
		this.selfRemork = selfRemork;
		this.selfHasContact = "0";
		this.selfEntryData = new Date();
	}

	public String getSelfApplyID() {
		return selfApplyID;
	}	
	
	public void setSelfApplyID(String selfApplyID) {
		this.selfApplyID = selfApplyID;
	}
	public String getSelfCompanyId() {
		return selfCompanyId;
	}	
	
	public void setSelfCompanyId(String selfCompanyId) {
		this.selfCompanyId = selfCompanyId;
	}
	public String getSelfSampleName() {
		return selfSampleName;
	}	
	
	public void setSelfSampleName(String selfSampleName) {
		this.selfSampleName = selfSampleName;
	}
	public String getSelfDetection() {
		return selfDetection;
	}	
	
	public void setSelfDetection(String selfDetection) {
		this.selfDetection = selfDetection;
	}
	public String getSelfContact() {
		return selfContact;
	}	
	
	public void setSelfContact(String selfContact) {
		this.selfContact = selfContact;
	}
	public String getSelfContactPhone() {
		return selfContactPhone;
	}	
	
	public void setSelfContactPhone(String selfContactPhone) {
		this.selfContactPhone = selfContactPhone;
	}
	public Date getSelfEntryData() {
		return selfEntryData;
	}	
	
	public void setSelfEntryData(Date selfEntryData) {
		this.selfEntryData = selfEntryData;
	}
	public String getSelfHasContact() {
		return selfHasContact;
	}	
	
	public void setSelfHasContact(String selfHasContact) {
		this.selfHasContact = selfHasContact;
	}
	public String getSelfRemork() {
		return selfRemork;
	}	
	
	public void setSelfRemork(String selfRemork) {
		this.selfRemork = selfRemork;
	}
	
	@Override
	public String toString() {
		return "Selfapplication [" +  "selfApplyID=" + selfApplyID  + ", " +  "selfCompanyId=" + selfCompanyId  + ", " +  "selfSampleName=" + selfSampleName  + ", " +  "selfDetection=" + selfDetection  + ", " +  "selfContact=" + selfContact  + ", " +  "selfContactPhone=" + selfContactPhone  + ", " +  "selfEntryData=" + selfEntryData  + ", " +  "selfHasContact=" + selfHasContact  + ", " +  "selfRemork=" + selfRemork  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "selfapplication";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "selfApplyID";
	}
}
