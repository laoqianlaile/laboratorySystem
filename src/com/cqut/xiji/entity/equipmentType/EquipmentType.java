package com.cqut.xiji.entity.equipmentType;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class EquipmentType extends Entity{
	
	@ID
	private String ID;
	private String typeCode;
	private String name;
	private String remarks;
	private Date createTime;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getTypeCode() {
		return typeCode;
	}	
	
	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}
	public String getName() {
		return name;
	}	
	
	public void setName(String name) {
		this.name = name;
	}
	public String getRemarks() {
		return remarks;
	}	
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public Date getCreateTime() {
		return createTime;
	}	
	
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	@Override
	public String toString() {
		return "EquipmentType [" +  "ID=" + ID  + ", " +  "typeCode=" + typeCode  + ", " +  "name=" + name  + ", " +  "remarks=" + remarks  + ", " +  "createTime=" + createTime  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "equipmentType";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
