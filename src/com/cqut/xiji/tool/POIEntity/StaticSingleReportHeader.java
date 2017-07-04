package com.cqut.xiji.tool.POIEntity;

import javax.xml.soap.Node;

import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

public class StaticSingleReportHeader {
	public int row;
	public int col;
	
	private String title = null;
	private boolean isUseful = true;
	
	public StaticSingleReportHeader(int row, int col, String title) {
		this.row = row;
		this.col = col;
		this.title = title;
	}
	
	public StaticSingleReportHeader(Element sSingleHeaderElement) {
		NodeList addressList = sSingleHeaderElement.getElementsByTagName("address");
		if(addressList.getLength() > 0) {
			NodeList addressChild = addressList.item(0).getChildNodes();
			for(int i = 0; i < addressChild.getLength(); i++) {
				if(addressChild.item(i).getNodeType() == Node.ELEMENT_NODE) {
					if(addressChild.item(i).getNodeName().equals("row")) {
						row = Integer.parseInt(addressChild.item(i).getTextContent());
					}else if(addressChild.item(i).getNodeName().equals("col")) {
						col = Integer.parseInt(addressChild.item(i).getTextContent());
					}
 				}
			}
		}else {
			isUseful = false;
		} 
		
		NodeList titleList = sSingleHeaderElement.getElementsByTagName("title");
		if(titleList.getLength() > 0) {
			title = titleList.item(0).getTextContent();
		}else {
			isUseful = false;
		}
	}
	
	public boolean isUseful() {
		return isUseful;
	}

	public Point getBasePoint() {
		return new Point(row, col);
	}
	
	public String getTitle() {
		return title;
	}
}
