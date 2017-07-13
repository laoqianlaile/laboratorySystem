package com.cqut.xiji.tool.POIEntity;

import java.util.List;

public class DynamicLengthConfig {
	private int rowSpan;
	private int colSpan;
	private int baseRow;
	private int baseCol;

	private List<String> info;

	// 字体格式
	private String fontName;
	// 字体大小
	private int fontSize;

	public DynamicLengthConfig(int baseRow, int baseCol, int rowSpan,
			int colSpan, List<String> info, String fontName, int fontSize) {
		this.rowSpan = rowSpan;
		this.colSpan = colSpan;
		this.baseRow = baseRow;
		this.baseCol = baseCol;
		this.info = info;
		this.fontName = fontName;
		this.fontSize = fontSize;
	}
	
	public DynamicLengthConfig(int baseRow, int baseCol, int rowSpan,
			int colSpan, List<String> info) {
		this.rowSpan = rowSpan;
		this.colSpan = colSpan;
		this.baseRow = baseRow;
		this.baseCol = baseCol;
		this.info = info;
		this.fontName = "";
		this.fontSize = 0;
	}
	public int getRowSpan() {
		return rowSpan;
	}

	public int getColSpan() {
		return colSpan;
	}

	public int getBaseRow() {
		return baseRow;
	}

	public int getBaseCol() {
		return baseCol;
	}

	public List<String> getAllInfo() {
		return info;
	}

	public String getFontName() {
		return fontName;
	}

	public void setFontName(String fontName) {
		this.fontName = fontName;
	}

	public int getFontSize() {
		return fontSize;
	}

	public void setFontSize(int fontSize) {
		this.fontSize = fontSize;
	}

}
