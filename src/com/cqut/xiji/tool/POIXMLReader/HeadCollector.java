package com.cqut.xiji.tool.POIXMLReader;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import com.cqut.xiji.tool.POIEntity.ColumnWidth;
import com.cqut.xiji.tool.POIEntity.DataArea;
import com.cqut.xiji.tool.POIEntity.DynamicLengthReportHeader;
import com.cqut.xiji.tool.POIEntity.FreezePane;
import com.cqut.xiji.tool.POIEntity.HorizontalAlignmen;
import com.cqut.xiji.tool.POIEntity.StaticSingleReportHeader;

public class HeadCollector {
	public String XMLPath;
	public Document document;
	
	public HeadCollector(String XMLPath) {
		this.XMLPath = XMLPath;
		FileInputStream inputStream = null;
		try {
			inputStream = new FileInputStream(new File(XMLPath));
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = factory.newDocumentBuilder();
			this.document = builder.parse(inputStream);
			inputStream.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
		
	}
	
	public List<DynamicLengthReportHeader> getDLengthHeader() {
		NodeList DLengthList = document.getElementsByTagName("dynamicLengthReportHeader");
		Element DLength = null;
		if(DLengthList.getLength() > 0) {
			DLength = (Element) DLengthList.item(0);
		}else {
			return null;	
		}
		
		NodeList dLengthChild= DLength.getChildNodes();
		List<DynamicLengthReportHeader> dLengthReportHeaderList = new ArrayList<DynamicLengthReportHeader>();
		if(dLengthChild.getLength() > 0) {
			for(int i = 0; i < dLengthChild.getLength(); i++) {
				if(dLengthChild.item(i).getNodeName().equals("header")) {
					dLengthReportHeaderList.add(new DynamicLengthReportHeader((Element)dLengthChild.item(i)));
				}
			}
		}else {
			return null;
		}
		
		if(dLengthReportHeaderList.size() > 0) {
			return dLengthReportHeaderList;
		}else {
			return null;
		}	
	}
	
	public List<StaticSingleReportHeader> getSSingleHeader() {
		NodeList sSingleList = document.getElementsByTagName("staticSingleReportHeader");
		Element sSingle = null;
		
		if(sSingleList.getLength() > 0) {
			sSingle = (Element) sSingleList.item(0);
		}else {
			return null;	
		}
		
		NodeList sSingleChild = sSingle.getChildNodes();
		
		List<StaticSingleReportHeader> sSingleReportHeader = new ArrayList<StaticSingleReportHeader>();
		if(sSingleChild.getLength() > 0) {
			for(int i = 0; i < sSingleChild.getLength(); i++) {
				if(sSingleChild.item(i).getNodeName().equals("header")) {
					sSingleReportHeader.add(new StaticSingleReportHeader((Element)sSingleChild.item(i)));
				}
			}
		}else {
			return null;
		}
		
		if(sSingleReportHeader.size() > 0) {
			return sSingleReportHeader;
		}else {
			return null;
		}	
	}
	
	public FreezePane getFreezePane() {
		NodeList freezePaneList = document.getElementsByTagName("freezePane");
		if(freezePaneList.getLength() > 0) {
			return new FreezePane((Element)freezePaneList.item(0));
		}else {
			return null;
		}
	}
	
	public DataArea getDataArea() {
		NodeList dataAreaList = document.getElementsByTagName("dataArea");
		if(dataAreaList.getLength() > 0) {
			return new DataArea((Element)dataAreaList.item(0));
		}else {
			return null;
		}
	}
	
	public ColumnWidth getColumnWidth() {
		NodeList columnWidthList = document.getElementsByTagName("colWidth");
		if(columnWidthList.getLength() > 0) {
			return new ColumnWidth((Element)columnWidthList.item(0));
		}else {
			return null;
		}
	}
	
	public HorizontalAlignmen getHoriAligStyle() {
		NodeList horiAligStyle = document.getElementsByTagName("horizontal");
		if(horiAligStyle.getLength() > 0) {
			return new HorizontalAlignmen((Element)horiAligStyle.item(0));
		}else {
			return null;
		}
	}
}
