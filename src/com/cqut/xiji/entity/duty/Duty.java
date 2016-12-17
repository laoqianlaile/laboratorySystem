package com.cqut.xiji.entity.duty;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Duty extends Entity{
	
	@ID
	private String ID;
	private String dutyName;
	private String dutyCode;
	private String introduction;
	private Date createTime;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getDutyName() {
		return dutyName;
	}	
	
	public void setDutyName(String dutyName) {
		this.dutyName = dutyName;
	}
	public String getDutyCode() {
		return dutyCode;
	}	
	
	public void setDutyCode(String dutyCode) {
		this.dutyCode = dutyCode;
	}
	public String getIntroduction() {
		return introduction;
	}	
	
	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}
	public Date getCreateTime() {
		return createTime;
	}	
	
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	@Override
	public String toString() {
		return "Duty [" +  "ID=" + ID  + ", " +  "dutyName=" + dutyName  + ", " +  "dutyCode=" + dutyCode  + ", " +  "introduction=" + introduction  + ", " +  "createTime=" + createTime  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "duty";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
