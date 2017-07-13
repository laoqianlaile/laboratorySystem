package com.cqut.xiji.tool.POIEntity;

import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

public class DynamicLengthReportHeader {
	private String requireKey;
	private boolean isUseful = true;
	public DynamicLengthReportHeader(String requireKey, boolean isUseful) {
		this.requireKey = requireKey;
		this.isUseful = isUseful;
	}
	
	public DynamicLengthReportHeader(Element dLengthHeaderElement) {
		NodeList requireList = dLengthHeaderElement.getElementsByTagName("require");
		if(requireList.getLength() > 0) {
			requireKey = requireList.item(0).getTextContent();
		}else {
			isUseful = false;
		}
	}
	
	public boolean isUseful() {
		return isUseful;
	}
	
	public String getDynamicLengthConfigName() {
		return requireKey;
	}
	
}
