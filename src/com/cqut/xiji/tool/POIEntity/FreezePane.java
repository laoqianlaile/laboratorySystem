package com.cqut.xiji.tool.POIEntity;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class FreezePane {
	public int rowSplit;
	public int colSplit;
	
	private boolean isUseful = true;
	
	public FreezePane(int rowSplit, int colSplit) {
		this.rowSplit = rowSplit;
		this.colSplit = colSplit;
	}
	
	public FreezePane(Element freezePaneElement) {
		NodeList paneChild = freezePaneElement.getChildNodes();

		if(paneChild.getLength() > 0) {
			for(int i = 0; i < paneChild.getLength(); i++) {
				if(paneChild.item(i).getNodeType() == Node.ELEMENT_NODE) {
					if(paneChild.item(i).getNodeName().equals("rowSplit")) {
						rowSplit = Integer.parseInt(paneChild.item(i).getTextContent());
					}else if(paneChild.item(i).getNodeName().equals("colSplit")) {
						colSplit = Integer.parseInt(paneChild.item(i).getTextContent());
					}
				}
				
			}
		}else {
			isUseful = false;
		}
	}
	
	public boolean isUseful() {
		return isUseful;
	}
}
