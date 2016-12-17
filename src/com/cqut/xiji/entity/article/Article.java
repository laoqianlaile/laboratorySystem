package com.cqut.xiji.entity.article;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Article extends Entity{
	
	@ID
	private String articleID;
	private String artTitle;
	private String artColumn;
	private Date artCregisattime;
	private String artCaseType;
	private String artPublisher;
	private String artContent;
	private String artPicturegis;
	private String artRemark;
	
	public String getArticleID() {
		return articleID;
	}	
	
	public void setArticleID(String articleID) {
		this.articleID = articleID;
	}
	public String getArtTitle() {
		return artTitle;
	}	
	
	public void setArtTitle(String artTitle) {
		this.artTitle = artTitle;
	}
	public String getArtColumn() {
		return artColumn;
	}	
	
	public void setArtColumn(String artColumn) {
		this.artColumn = artColumn;
	}
	public Date getArtCregisattime() {
		return artCregisattime;
	}	
	
	public void setArtCregisattime(Date artCregisattime) {
		this.artCregisattime = artCregisattime;
	}
	public String getArtCaseType() {
		return artCaseType;
	}	
	
	public void setArtCaseType(String artCaseType) {
		this.artCaseType = artCaseType;
	}
	public String getArtPublisher() {
		return artPublisher;
	}	
	
	public void setArtPublisher(String artPublisher) {
		this.artPublisher = artPublisher;
	}
	public String getArtContent() {
		return artContent;
	}	
	
	public void setArtContent(String artContent) {
		this.artContent = artContent;
	}
	public String getArtPicturegis() {
		return artPicturegis;
	}	
	
	public void setArtPicturegis(String artPicturegis) {
		this.artPicturegis = artPicturegis;
	}
	public String getArtRemark() {
		return artRemark;
	}	
	
	public void setArtRemark(String artRemark) {
		this.artRemark = artRemark;
	}
	
	@Override
	public String toString() {
		return "Article [" +  "articleID=" + articleID  + ", " +  "artTitle=" + artTitle  + ", " +  "artColumn=" + artColumn  + ", " +  "artCregisattime=" + artCregisattime  + ", " +  "artCaseType=" + artCaseType  + ", " +  "artPublisher=" + artPublisher  + ", " +  "artContent=" + artContent  + ", " +  "artPicturegis=" + artPicturegis  + ", " +  "artRemark=" + artRemark  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "article";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "articleID";
	}
}
