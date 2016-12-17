package com.cqut.xiji.tool.fileEncrypt;


import javax.annotation.Resource;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.fileInformation.FileInformation;

@Service
public class FileEncrypt   extends SearchService {
	
	@Resource(name = "entityDao")
	EntityDao entityDao;

	@Resource(name = "searchDao")
	SearchDao searchDao;

	

	
	public  boolean  encryptPath(String path ,String fileID) {   //这个加密密钥要自己存在文件表里
		if(path == null || fileID == null  || path.equals("")  || fileID.equals("")){
			return false;
		}
		
	     	String 	 pathPassword = getPassword();
			DES des = new DES(pathPassword);
			     byte[] result = des.encryptString(path.getBytes());
				FileInformation  fileInformation  = entityDao.getByID(fileID, FileInformation.class);
				fileInformation.setPath(new String(result));
				fileInformation.setPathPassword(pathPassword);
			   
				
		return  entityDao.updatePropByID(fileInformation, fileID) == 1 ? true:false;
	}
	public  String  decryptPath(String path ,String password) {   //这个加密密钥要自己存在文件表里
		if(path == null || path.equals("")){
			return "";
		}
	  DES des = new DES(password);
	  byte[] decryResult = new byte[1];
		try {
			decryResult = des.decryptString(path.getBytes());
		} catch (Exception e1) {
			e1.printStackTrace();
		}
	     
		return  new String(decryResult);
	}
	public  boolean  encryptFile(String sourcepath ,String goalPanth,String fileID) {  
		String filePassword = getPassword();
	    DES des = new DES(filePassword);	
	    
    try {
    	/* des3.encryptFile("C:\\Users\\jiddar\\Desktop\\海豹.docx", "../../上一下haibaong.docx");*/ //加密   
    	des.encryptFile(sourcepath, goalPanth);
	} catch (Exception e) {
	    e.printStackTrace();
	}  
    FileInformation fileInformation  = entityDao.getByID(fileID, FileInformation.class);
    fileInformation.setFilePassword(filePassword);
       return entityDao.updatePropByID(fileInformation, fileID) ==1 ?true:false;
	
	}
	public  boolean  decryptFile(String sourcepath ,String goalPanth,String fileID) {  //解密文件
		String filePassword = "";
		  FileInformation fileInformation  = entityDao.getByID(fileID, FileInformation.class);
		  if(fileInformation == null )
			  return false;
		  filePassword  =    fileInformation.getFilePassword();
	    DES des3 = new DES(filePassword);	
	    
    try {
    	
    	 des3.decryptFile(sourcepath,goalPanth ); //解密   
    	/* "E:/wakeplace_myecpl/buildJava/src/com/cqut/xiji/tool/encrypt/r1.txt"
    	 * "E:/wakeplace_myecpl/buildJava/src/com/cqut/xiji/tool/encrypt/r2.txt"
    	 * 
    	 * */
	} catch (Exception e) {
	    e.printStackTrace();
	}  

       return true;
	
	}
	
	
	public static String getPassword(){
		return RandomStringUtils.randomAlphanumeric(56);
	}

	@Override
	public String getBaseEntityName() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getBasePrimaryKey() {
		// TODO Auto-generated method stub
		return null;
	}

	

}