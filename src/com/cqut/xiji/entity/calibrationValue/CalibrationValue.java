package com.cqut.xiji.entity.calibrationValue;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class CalibrationValue extends Entity{
	
	@ID
	private String ID;
	private String Name;
	private String Value;
	private String traceabilityID;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	
	public String getValue() {
		return Value;
	}	
	
	public void setValue(String Value) {
		this.Value = Value;
	}
	
	
	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
	}

	public String getTraceabilityID() {
		return traceabilityID;
	}

	public void setTraceabilityID(String traceabilityID) {
		this.traceabilityID = traceabilityID;
	}

	@Override
	public String toString() {
		return "CalibrationValue [" +  "ID=" + ID  + ", " +  "Name=" + Name   + ", " + "Value=" + Value  + ", "   +  "traceabilityID=" + traceabilityID  + ", "  + "]";
	}
	
	@Override
	public String getTableName() {
		return "calibrationValue";
	}

	@Override
	public String getPrimaryKey() {
		return "ID";
	}
}
