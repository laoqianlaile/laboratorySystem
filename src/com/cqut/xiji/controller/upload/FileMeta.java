package com.cqut.xiji.controller.upload;
 
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
 
//ignore "bytes" when return json format
@JsonIgnoreProperties({"bytes"})
public class FileMeta {
 
    private String fileName;
    private String fileSize;
    private String fileType;
    private String filePath;
    private String fileID;	//对应的是systeFile的ID
    
    
 
    public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileSize() {
		return fileSize;
	}

	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public byte[] getBytes() {
		return bytes;
	}

	public void setBytes(byte[] bytes) {
		this.bytes = bytes;
	}

	private byte[] bytes;

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getFileID() {
		return fileID;
	}

	public void setFileID(String fileID) {
		this.fileID = fileID;
	}
 
         //setters & getters
}