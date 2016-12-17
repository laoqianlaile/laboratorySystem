package com.cqut.xiji.entity.linkReSample;



import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class LinkReSample extends Entity{
   @ID
	private String ID;
	private String receiptlistID;
	private String sampleID;
	private Date createTime;
	private String remarks;

	public String getID() {
		return ID;
	}

	public void setID(String iD) {
		ID = iD;
	}

	public String getReceiptlistID() {
		return receiptlistID;
	}

	public void setReceiptlistID(String receiptlistID) {
		this.receiptlistID = receiptlistID;
	}

	public String getSampleID() {
		return sampleID;
	}

	public void setSampleID(String sampleID) {
		this.sampleID = sampleID;
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
		return "linkReSample";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "linkReSample.ID";
	}

}
