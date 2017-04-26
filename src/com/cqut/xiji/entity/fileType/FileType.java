package com.cqut.xiji.entity.fileType;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class FileType extends Entity{
	
	@ID
	private String ID;
	private String name;
	private int levelType;
	private String fileTypeID;
	private int  isLeaf ;
	
	public int getIsLeaf() {
		return isLeaf;
	}	
	
	public void setIsLeaf(int isLeaf) {
		this.isLeaf = isLeaf;
	}
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getName() {
		return name;
	}	
	
	public void setName(String name) {
		this.name = name;
	}
	public int getLevelType() {
		return levelType;
	}	
	
	public void setLevelType(int levelType) {
		this.levelType = levelType;
	}
	public String getFileTypeID() {
		return fileTypeID;
	}	
	
	public void setFileTypeID(String fileTypeID) {
		this.fileTypeID = fileTypeID;
	}
	
	@Override
	public String toString() {
		return "FileType [" +  "ID=" + ID  + ", " +  "name=" + name  + ", " +  "levelType=" + levelType  + ", " +  "fileTypeID=" + fileTypeID  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "fileType";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
