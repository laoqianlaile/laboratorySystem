package com.cqut.xiji.tool.POIEntity;

import java.util.ArrayList;
import java.util.List;

import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

public class ColumnWidth {
private List<Integer> widthList;
	
	public ColumnWidth(List<Integer> widthList) {
		this.widthList = widthList;
	}
	
	public ColumnWidth(Element colWidthElement) {
		NodeList colWidthList = colWidthElement.getElementsByTagName("widthItem");
		widthList = new ArrayList<Integer>();
		for(int i = 0; i < colWidthList.getLength(); i++) {
			try {
				int width = Integer.parseInt(colWidthList.item(i).getTextContent().trim());
				widthList.add(width);
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	public List<Integer> getColWidthList() {
		return widthList;
	}
}
