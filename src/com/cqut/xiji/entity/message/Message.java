package com.cqut.xiji.entity.message;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Message extends Entity{
	
	@ID
	private String ID;
	private String content;
	private Date createTime;
	private String remarks;
	
	public String getID() {
		return ID;
	}

	public void setID(String iD) {
		ID = iD;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
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
	public String getTableName() {
		// TODO Auto-generated method stub
		return "message";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
