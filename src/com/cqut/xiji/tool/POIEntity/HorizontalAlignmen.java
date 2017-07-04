package com.cqut.xiji.tool.POIEntity;

import java.util.ArrayList;
import java.util.List;

import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

public class HorizontalAlignmen {
private List<Integer> aligList;
	
	public HorizontalAlignmen(List<Integer> aligList) {
		this.aligList = aligList;
	}
	
	public HorizontalAlignmen(Element horiAligStyleElement) {
		NodeList horiAligStyleList = horiAligStyleElement.getElementsByTagName("horizontalItem");
		aligList = new ArrayList<Integer>();
		for(int i = 0; i < horiAligStyleList.getLength(); i++) {
			try {
				int width = Integer.parseInt(horiAligStyleList.item(i).getTextContent().trim());
				aligList.add(width);
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	public List<Integer> getHoriAligStyleList() {
		return aligList;
	}
}
