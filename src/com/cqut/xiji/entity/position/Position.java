package com.cqut.xiji.entity.position;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;

public class Position extends Entity{

	private String POSITIONID;
	private String NAME;
	private String INTRODUCTION;
	private Date CREATTIME;
	private String REMARKS;
	
	public String getPOSITIONID() {
		return POSITIONID;
	}

	public void setPOSITIONID(String pOSITIONID) {
		POSITIONID = pOSITIONID;
	}

	public String getNAME() {
		return NAME;
	}

	public void setNAME(String nAME) {
		NAME = nAME;
	}

	public String getINTRODUCTION() {
		return INTRODUCTION;
	}

	public void setINTRODUCTION(String iNTRODUCTION) {
		INTRODUCTION = iNTRODUCTION;
	}

	public Date getCREATTIME() {
		return CREATTIME;
	}

	public void setCREATTIME(Date cREATTIME) {
		CREATTIME = cREATTIME;
	}

	public String getREMARKS() {
		return REMARKS;
	}

	public void setREMARKS(String rEMARKS) {
		REMARKS = rEMARKS;
	}

	@Override
	public String toString() {
		return "Position [POSITION=" + POSITIONID + ", NAME=" + NAME
				+ ", INTRODUCTION=" + INTRODUCTION + ", CREATTIME=" + CREATTIME
				+ ", REMARKS=" + REMARKS + "]";
	}

	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "position";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "POSITION";
	}

}
