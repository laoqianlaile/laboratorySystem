package com.cqut.xiji.entity.standardType;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class StandardType extends Entity{
	
	@ID
	private String ID;
	private String standardTypeCode;
	private String standardTypeName;
	private Date createTime;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getStandardTypeCode() {
		return standardTypeCode;
	}	
	
	public void setStandardTypeCode(String standardCode) {
		this.standardTypeCode = standardCode;
	}
	public String getStandardTypeName() {
		return standardTypeName;
	}	
	
	public void setStandardTypeName(String standardName) {
		this.standardTypeName = standardName;
	}
	public Date getCreateTime() {
		return createTime;
	}	
	
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	@Override
	public String toString() {
		return "StandardType [" +  "ID=" + ID  + ", " +  "standardCode=" + standardTypeCode  + ", " +  "standardName=" + standardTypeName  + ", " +  "createTime=" + createTime  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "standardType";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
