package com.cqut.xiji.entity.module;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Module extends Entity{
	
	@ID
	private String ID;
	private String text;
	private String parent;
	private int hasChild;
	private int level0;
	private int isEndOfModuleLevel;
	private int childShowType;
	private int moduleType;
	private int isShow;
	private String moduleCode;
	private String href;
	private String icon;
	private int isFolder;
	private String remarks;
	private int checked;
	private String color;
	private String backColor;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getText() {
		return text;
	}	
	
	public void setText(String text) {
		this.text = text;
	}
	public String getParent() {
		return parent;
	}	
	
	public void setParent(String parent) {
		this.parent = parent;
	}
	public int getHasChild() {
		return hasChild;
	}	
	
	public void setHasChild(int hasChild) {
		this.hasChild = hasChild;
	}
	public int getLevel0() {
		return level0;
	}	
	
	public void setLevel0(int level0) {
		this.level0 = level0;
	}
	public int getIsEndOfModuleLevel() {
		return isEndOfModuleLevel;
	}	
	
	public void setIsEndOfModuleLevel(int isEndOfModuleLevel) {
		this.isEndOfModuleLevel = isEndOfModuleLevel;
	}
	public int getChildShowType() {
		return childShowType;
	}	
	
	public void setChildShowType(int childShowType) {
		this.childShowType = childShowType;
	}
	public int getModuleType() {
		return moduleType;
	}	
	
	public void setModuleType(int moduleType) {
		this.moduleType = moduleType;
	}
	public int getIsShow() {
		return isShow;
	}	
	
	public void setIsShow(int isShow) {
		this.isShow = isShow;
	}
	public String getModuleCode() {
		return moduleCode;
	}	
	
	public void setModuleCode(String moduleCode) {
		this.moduleCode = moduleCode;
	}
	public String getHref() {
		return href;
	}	
	
	public void setHref(String href) {
		this.href = href;
	}
	public String getIcon() {
		return icon;
	}	
	
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public int getIsFolder() {
		return isFolder;
	}	
	
	public void setIsFolder(int isFolder) {
		this.isFolder = isFolder;
	}
	public String getRemarks() {
		return remarks;
	}	
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public int getChecked() {
		return checked;
	}	
	
	public void setChecked(int checked) {
		this.checked = checked;
	}
	public String getColor() {
		return color;
	}	
	
	public void setColor(String color) {
		this.color = color;
	}
	public String getBackColor() {
		return backColor;
	}	
	
	public void setBackColor(String backColor) {
		this.backColor = backColor;
	}
	
	@Override
	public String toString() {
		return "Module [" +  "ID=" + ID  + ", " +  "text=" + text  + ", " +  "parent=" + parent  + ", " +  "hasChild=" + hasChild  + ", " +  "level0=" + level0  + ", " +  "isEndOfModuleLevel=" + isEndOfModuleLevel  + ", " +  "childShowType=" + childShowType  + ", " +  "moduleType=" + moduleType  + ", " +  "isShow=" + isShow  + ", " +  "moduleCode=" + moduleCode  + ", " +  "href=" + href  + ", " +  "icon=" + icon  + ", " +  "isFolder=" + isFolder  + ", " +  "remarks=" + remarks  + ", " +  "checked=" + checked  + ", " +  "color=" + color  + ", " +  "backColor=" + backColor  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "module";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
