package com.cqut.xiji.entity.permission;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Permission extends Entity{
	
	@ID
	private String ID;
	private String roleID;
	private String moduleCode;
	private Date createTime;
	private String remarks;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getRoleID() {
		return roleID;
	}	
	
	public void setRoleID(String roleID) {
		this.roleID = roleID;
	}
	public String getModuleCode() {
		return moduleCode;
	}	
	
	public void setModuleCode(String moduleCode) {
		this.moduleCode = moduleCode;
	}
	public Date getCreateTime() {
		return createTime;
	}	
	
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getRemarks() {
		return remarks;
	}	
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	@Override
	public String toString() {
		return "Permission [" +  "ID=" + ID  + ", " +  "roleID=" + roleID  + ", " +  "moduleCode=" + moduleCode  + ", " +  "createTime=" + createTime  + ", " +  "remarks=" + remarks  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "permission";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
