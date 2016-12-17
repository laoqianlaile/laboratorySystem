package com.cqut.xiji.entity.permissionAssign;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

/**
 * @author zx
 * 权限分配
 */
public class PermissionAssign extends Entity{
	
	@ID
	private String ID;
	private int OWNERTYPE;
	private String OWNERCODE;
	private int PERMISSIONTYPE;
	private String PERMISSIONCODE;
	private boolean ISNO;
	private String REMARKS;
	
	public String getID() {
		return ID;
	}

	public void setID(String iD) {
		ID = iD;
	}

	public int getOWNERTYPE() {
		return OWNERTYPE;
	}

	public void setOWNERTYPE(int oWNERTYPE) {
		OWNERTYPE = oWNERTYPE;
	}

	public String getOWNERCODE() {
		return OWNERCODE;
	}

	public void setOWNERCODE(String oWNERCODE) {
		OWNERCODE = oWNERCODE;
	}

	public int getPERMISSIONTYPE() {
		return PERMISSIONTYPE;
	}

	public void setPERMISSIONTYPE(int pERMISSIONTYPE) {
		PERMISSIONTYPE = pERMISSIONTYPE;
	}

	public String getPERMISSIONCODE() {
		return PERMISSIONCODE;
	}

	public void setPERMISSIONCODE(String pERMISSIONCODE) {
		PERMISSIONCODE = pERMISSIONCODE;
	}

	public boolean isISNO() {
		return ISNO;
	}

	public void setISNO(boolean iSNO) {
		ISNO = iSNO;
	}

	public String getREMARKS() {
		return REMARKS;
	}

	public void setREMARKS(String rEMARKS) {
		REMARKS = rEMARKS;
	}
	
	@Override
	public String toString() {
		return "PermissionAssign [ID=" + ID + ", OWNERTYPE=" + OWNERTYPE
				+ ", OWNERCODE=" + OWNERCODE + ", PERMISSIONTYPE="
				+ PERMISSIONTYPE + ", PERMISSIONCODE=" + PERMISSIONCODE
				+ ", ISNO=" + ISNO + ", REMARKS=" + REMARKS + "]";
	}

	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "PermissionAssign";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
