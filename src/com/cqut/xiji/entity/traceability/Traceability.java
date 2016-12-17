package com.cqut.xiji.entity.traceability;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Traceability extends Entity{
	
	@ID
	private String ID;
	private String qualityPlanID;
	private String departmentID;
	private String equipmentID;
	private String employeeID;
	private String correctOrgan;
	private String period;
	private String nowCorrectYear;
	private String nextCorrectYear;
	private String reason;
	private String auditState;
	private String result;
	private String certificateNumber;
	private String remark;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	
	
	public String getEmployeeID() {
		return employeeID;
	}

	public void setEmployeeID(String employeeID) {
		this.employeeID = employeeID;
	}

	public String getCorrectOrgan() {
		return correctOrgan;
	}	
	
	public void setCorrectOrgan(String correctOrgan) {
		this.correctOrgan = correctOrgan;
	}
	public String getPeriod() {
		return period;
	}	
	
	public void setPeriod(String period) {
		this.period = period;
	}
	public String getNowCorrectYear() {
		return nowCorrectYear;
	}	
	
	public void setNowCorrectYear(String nowCorrectYear) {
		this.nowCorrectYear = nowCorrectYear;
	}
	public String getNextCorrectYear() {
		return nextCorrectYear;
	}	
	
	public void setNextCorrectYear(String nextCorrectYear) {
		this.nextCorrectYear = nextCorrectYear;
	}
	public String getReason() {
		return reason;
	}	
	
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getAuditState() {
		return auditState;
	}	
	
	public void setAuditState(String auditState) {
		this.auditState = auditState;
	}
	public String getResult() {
		return result;
	}	
	
	public void setResult(String result) {
		this.result = result;
	}
	public String getCertificateNumber() {
		return certificateNumber;
	}	
	
	public void setCertificateNumber(String certificateNumber) {
		this.certificateNumber = certificateNumber;
	}
	
	public String getRemark() {
		return remark;
	}	
	
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	public String getQualityPlanID() {
		return qualityPlanID;
	}

	public void setQualityPlanID(String qualityPlanID) {
		this.qualityPlanID = qualityPlanID;
	}

	public String getDepartmentID() {
		return departmentID;
	}

	public void setDepartmentID(String departmentID) {
		this.departmentID = departmentID;
	}

	public String getEquipmentID() {
		return equipmentID;
	}

	public void setEquipmentID(String equipmentID) {
		this.equipmentID = equipmentID;
	}

	@Override
	public String toString() {
		return "Traceability [" +  "ID=" + ID  + ", " +  "qualityPlanID=" + qualityPlanID  + ", " +  "departmentID=" + departmentID  + ", " +  "equipmentID=" + equipmentID  + "," + "employeeID=" + employeeID + ", " +  "correctOrgan=" + correctOrgan  + ", " +  "period=" + period  + ", " +  "nowCorrectYear=" + nowCorrectYear  + ", " +  "nextCorrectYear=" + nextCorrectYear  + ", " +  "reason=" + reason  + ", " +  "auditState=" + auditState  + ", " +  "result=" + result  + ", " +  "certificateNumber=" + certificateNumber  + ", " +  "remark=" + remark  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		return "traceability";
	}

	@Override
	public String getPrimaryKey() {
		return "ID";
	}
}
