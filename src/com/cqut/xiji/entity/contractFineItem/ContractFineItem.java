package com.cqut.xiji.entity.contractFineItem;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class ContractFineItem extends Entity{
	
	@ID
	private String ID;
	private String testProjectID;
	private String fineItemCode;
	private String fineItemNameEn;
	private String fineItemNameCn;
	private int isOutsourcing;
	private String departmentID;
	private int number;
	private double price;
	private int calculateType;
	private int hour;
	private String outSourcingDepartmentID;
	private double money;
	private String remarks;
	private String contractID;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getTestProjectID() {
		return testProjectID;
	}	
	
	public void setTestProjectID(String testProjectID) {
		this.testProjectID = testProjectID;
	}
	public String getFineItemCode() {
		return fineItemCode;
	}	
	
	public void setFineItemCode(String fineItemCode) {
		this.fineItemCode = fineItemCode;
	}
	public String getFineItemNameEn() {
		return fineItemNameEn;
	}	
	
	public void setFineItemNameEn(String fineItemNameEn) {
		this.fineItemNameEn = fineItemNameEn;
	}
	public String getFineItemNameCn() {
		return fineItemNameCn;
	}	
	
	public void setFineItemNameCn(String fineItemNameCn) {
		this.fineItemNameCn = fineItemNameCn;
	}
	public int getIsOutsourcing() {
		return isOutsourcing;
	}	
	
	public void setIsOutsourcing(int isOutsourcing) {
		this.isOutsourcing = isOutsourcing;
	}
	public String getDepartmentID() {
		return departmentID;
	}	
	
	public void setDepartmentID(String departmentID) {
		this.departmentID = departmentID;
	}
	public int getNumber() {
		return number;
	}	
	
	public void setNumber(int number) {
		this.number = number;
	}
	public double getPrice() {
		return price;
	}	
	
	public void setPrice(double price) {
		this.price = price;
	}
	public int getCalculateType() {
		return calculateType;
	}	
	
	public void setCalculateType(int calculateType) {
		this.calculateType = calculateType;
	}
	public int getHour() {
		return hour;
	}	
	
	public void setHour(int hour) {
		this.hour = hour;
	}
	public String getOutSourcingDepartmentID() {
		return outSourcingDepartmentID;
	}	
	
	public void setOutSourcingDepartmentID(String outSourcingDepartmentID) {
		this.outSourcingDepartmentID = outSourcingDepartmentID;
	}
	public double getMoney() {
		return money;
	}	
	
	public void setMoney(double money) {
		this.money = money;
	}
	public String getRemarks() {
		return remarks;
	}	
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getContractID() {
		return contractID;
	}	
	
	public void setContractID(String contractID) {
		this.contractID = contractID;
	}
	
	@Override
	public String toString() {
		return "ContractFineItem [" +  "ID=" + ID  + ", " +  "testProjectID=" + testProjectID  + ", " +  "fineItemCode=" + fineItemCode  + ", " +  "fineItemNameEn=" + fineItemNameEn  + ", " +  "fineItemNameCn=" + fineItemNameCn  + ", " +  "isOutsourcing=" + isOutsourcing  + ", " +  "departmentID=" + departmentID  + ", " +  "number=" + number  + ", " +  "price=" + price  + ", " +  "calculateType=" + calculateType  + ", " +  "hour=" + hour  + ", " +  "outSourcingDepartmentID=" + outSourcingDepartmentID  + ", " +  "money=" + money  + ", " +  "remarks=" + remarks  + ", " +  "contractID=" + contractID  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "contractFineItem";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
