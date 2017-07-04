package com.cqut.xiji.tool.POIEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

public class DataArea {
	public int row;
	public int col;
	
	private List<String> dataItemList = new ArrayList<String>();
	private List<Integer> colMergeList = new ArrayList<Integer>();
	private boolean isUseful = true;
	
	public DataArea(int row, int col, List<String> dataItemList, 
			List<Integer> colMergeList) {
		this.row = row;
		this.col = col;
		this.dataItemList = dataItemList;
		this.colMergeList = colMergeList;
	}
	
	public DataArea(Element dataAreaElement) {
		NodeList dataAreaChild = dataAreaElement.getChildNodes();
		if(dataAreaChild.getLength() > 0) {
			for(int i = 0; i < dataAreaChild.getLength(); i++) {
				if(dataAreaChild.item(i).getNodeName().equals("basePoint")) {
					getRowAndCol((Element)dataAreaChild.item(i));
				}else if(dataAreaChild.item(i).getNodeName().equals("dataItem")) {
					getDataItems((Element)dataAreaChild.item(i));
				}else if(dataAreaChild.item(i).getNodeName().equals("colMerge")) {
					getColMerge((Element)dataAreaChild.item(i));
				}
			}
		}else {
			isUseful = false;
		}
	
		
	}
	
	
	private void getRowAndCol(Element basePoint) {
		NodeList pointChild = basePoint.getChildNodes();
		if(pointChild.getLength() > 0) {
			for(int i = 0; i < pointChild.getLength(); i++) {
				if(pointChild.item(i).getNodeName().equals("row")) {
					row = Integer.parseInt(pointChild.item(i).getTextContent());
				}else if(pointChild.item(i).getNodeName().equals("col")) {
					col = Integer.parseInt(pointChild.item(i).getTextContent());
				}
			}
		}else {
			isUseful = false;
		}
	}
	
	private void getDataItems(Element dataItem) {
		NodeList itemElementList = dataItem.getElementsByTagName("item");
		for(int i = 0; i < itemElementList.getLength(); i++) {
			dataItemList.add(replaceBlank(itemElementList.item(i).getTextContent()));
		}
	}
	
	private void getColMerge(Element colMerge) {
		NodeList colList = colMerge.getElementsByTagName("line");
		for(int i = 0; i < colList.getLength(); i++) {
			colMergeList.add(
					Integer.parseInt(
							replaceBlank(colList.item(i).getTextContent())));
		}
	}
	
	private static String replaceBlank(String str) {
        String dest = "";
        if (str!=null) {
            Pattern p = Pattern.compile("\\s*|\t|\r|\n");
            Matcher m = p.matcher(str);
            dest = m.replaceAll("");
        }
        return dest;
    }
	
	public boolean isUseful() {
		return isUseful;
	}
	
	public Point getBasePoint() {
		return new Point(row, col);
	}
	
	public List<String> getDataItemList() {
		return dataItemList;
	}
	
	public List<Integer> getColMergeList() {
		return colMergeList;
	}
	
}
