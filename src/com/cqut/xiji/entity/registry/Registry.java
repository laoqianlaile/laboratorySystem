package com.cqut.xiji.entity.registry;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Registry extends Entity{
	
	@ID
	private String regisUserName;
	private String regisPassword;
	private String regisCompyName;
	private String regisContactAddregisss;
	private String regisStatus;
	private String regisLicensePic;
	private String regisQulicationPic;
	private String regisPhoneNumber;
	private String regisBusScope;
	private String regisLegal;
	private String regisCompanyType;
	private String regisRemark;
	private String regisID;
	
	public String getRegisUserName() {
		return regisUserName;
	}	
	
	public void setRegisUserName(String regisUserName) {
		this.regisUserName = regisUserName;
	}
	public String getRegisPassword() {
		return regisPassword;
	}	
	
	public void setRegisPassword(String regisPassword) {
		this.regisPassword = regisPassword;
	}
	public String getRegisCompyName() {
		return regisCompyName;
	}	
	
	public void setRegisCompyName(String regisCompyName) {
		this.regisCompyName = regisCompyName;
	}
	public String getRegisContactAddregisss() {
		return regisContactAddregisss;
	}	
	
	public void setRegisContactAddregisss(String regisContactAddregisss) {
		this.regisContactAddregisss = regisContactAddregisss;
	}
	public String getRegisStatus() {
		return regisStatus;
	}	
	
	public void setRegisStatus(String regisStatus) {
		this.regisStatus = regisStatus;
	}
	public String getRegisLicensePic() {
		return regisLicensePic;
	}	
	
	public void setRegisLicensePic(String regisLicensePic) {
		this.regisLicensePic = regisLicensePic;
	}
	public String getRegisQulicationPic() {
		return regisQulicationPic;
	}	
	
	public void setRegisQulicationPic(String regisQulicationPic) {
		this.regisQulicationPic = regisQulicationPic;
	}
	public String getRegisPhoneNumber() {
		return regisPhoneNumber;
	}	
	
	public void setRegisPhoneNumber(String regisPhoneNumber) {
		this.regisPhoneNumber = regisPhoneNumber;
	}
	public String getRegisBusScope() {
		return regisBusScope;
	}	
	
	public void setRegisBusScope(String regisBusScope) {
		this.regisBusScope = regisBusScope;
	}
	public String getRegisLegal() {
		return regisLegal;
	}	
	
	public void setRegisLegal(String regisLegal) {
		this.regisLegal = regisLegal;
	}
	public String getRegisCompanyType() {
		return regisCompanyType;
	}	
	
	public void setRegisCompanyType(String regisCompanyType) {
		this.regisCompanyType = regisCompanyType;
	}
	public String getRegisRemark() {
		return regisRemark;
	}	
	
	public void setRegisRemark(String regisRemark) {
		this.regisRemark = regisRemark;
	}
	public String getRegisID() {
		return regisID;
	}	
	
	public void setRegisID(String regisID) {
		this.regisID = regisID;
	}
	
	@Override
	public String toString() {
		return "Registry [" +  "regisUserName=" + regisUserName  + ", " +  "regisPassword=" + regisPassword  + ", " +  "regisCompyName=" + regisCompyName  + ", " +  "regisContactAddregisss=" + regisContactAddregisss  + ", " +  "regisStatus=" + regisStatus  + ", " +  "regisLicensePic=" + regisLicensePic  + ", " +  "regisQulicationPic=" + regisQulicationPic  + ", " +  "regisPhoneNumber=" + regisPhoneNumber  + ", " +  "regisBusScope=" + regisBusScope  + ", " +  "regisLegal=" + regisLegal  + ", " +  "regisCompanyType=" + regisCompanyType  + ", " +  "regisRemark=" + regisRemark  + ", " +  "regisID=" + regisID  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "registry";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "regisUserName";
	}
}
