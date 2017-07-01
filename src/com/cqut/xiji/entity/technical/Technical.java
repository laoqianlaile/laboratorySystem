package com.cqut.xiji.entity.technical;

import com.cqut.xiji.entity.base.Entity;

public class Technical extends Entity{
	
	private String ID;
	private String contractID;
	private String content;
	
	public String getID() {
		return ID;
	}

	public void setID(String iD) {
		ID = iD;
	}

	public String getContractID() {
		return contractID;
	}

	public void setContractID(String contractID) {
		this.contractID = contractID;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	

	@Override
	public String toString() {
		return "Technical [ID=" + ID + ", contractID=" + contractID
				+ ", content=" + content + "]";
	}

	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "technical";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}

}
