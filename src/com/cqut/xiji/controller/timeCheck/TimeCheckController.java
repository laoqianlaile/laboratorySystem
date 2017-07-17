package com.cqut.xiji.controller.timeCheck;

import java.awt.Window;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.service.fileEncrypt.IFileEncryptService;
import com.cqut.xiji.service.fileOperate.IFileOperateService;
import com.cqut.xiji.service.timeCheck.ITimeCheckService;
import com.cqut.xiji.tool.util.EntityIDFactory;
import com.cqut.xiji.tool.util.JToolWeb;
import com.cqut.xiji.tool.util.PropertiesTool;
import com.sun.jna.platform.win32.WinDef.BOOL;

@Controller
@RequestMapping("/timeCheckController")
public class TimeCheckController{
	
	@Resource(name="timeCheckService")
	ITimeCheckService service;
	
	@Resource(name = "fileEncryptService")
	IFileEncryptService fileEncryptservice;
	
	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;
	
	@Resource(name = "fileOperateService")
	IFileOperateService fileOperateService;
	/**
	 * @description 初始化文件列表
	 * @author fujianfei
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param tableName
	 * @return
	 */
	@RequestMapping("/getTimecheckFileWithPaging")
	@ResponseBody
	public JSONObject getTimecheckFileWithPaging(int limit, int offset,String order, String sort, String belongtoID){
		Map<String, Object> result = service.getTimecheckFileWithPaging(limit, offset, order, sort, belongtoID);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * @description 根据登陆的Session获取制定人
	 * @author fujianfei
	 * @param session
	 * @return
	 */
	@RequestMapping("/getEmployeeID1BySeeion")
	@ResponseBody
	public String getEmployeeID1BySeeion(HttpSession session){
		JSONArray arr=service.getEmployeeID1BySeeion(session);
		JSONObject js=JSONObject.fromObject(arr.get(0).toString());
		return js.getString("employeeName");
	}
	
	
	/**
	 * @description 获取审核人
	 * @author fujianfei
	 * @return
	 */
	@RequestMapping("/getEmployeeID2")
	@ResponseBody
	public JSONArray getEmployeeID2(){
		return service.getEmployeeID2();
	}
	
	/**
	 * @description 初始化建议表格
	 * @author fujianfei
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param tableName
	 * @return
	 */
	@RequestMapping("/getTimeCheckWithPaging")
	@ResponseBody
	public JSONObject getTimeCheckWithPaging(int limit, int offset,String order, String sort,String projectcode,String projectpoint, 
			String starttime,String endtime,String projectname,String department,String chargePer,
			HttpSession session){
		Map<String, Object> result = service.getTimeCheckWithPaging(limit, offset, order, sort, projectcode, projectpoint, starttime,endtime, projectname, department, chargePer, session);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * @description 审核/结果页面初始化建议表格
	 * @author fujianfei
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param tableName
	 * @return
	 */
	@RequestMapping("/getARTimeCheckWithPaging")
	@ResponseBody
	public JSONObject getARTimeCheckWithPaging(int limit, int offset,String order, String sort,String projectcode,String projectpoint, 
			String starttime,String endtime,String projectname,String department,String chargePer,
			HttpSession session){
		Map<String, Object> result = service.getARTimeCheckWithPaging(limit, offset, order, sort, projectcode, projectpoint, starttime,endtime, projectname, department, chargePer, session);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * @description 新增建议
	 * @author fujianfei
	 * @param projectName
	 * @param projectPoint
	 * @param endTime
	 * @param remark
	 * @return
	 * @throws ParseException
	 */
	@RequestMapping("/addTimeCheck")
	@ResponseBody
	public String addTimeCheck(String projectName,String projectPoint,String endTime,String remark,HttpSession session) throws ParseException{
		System.out.println(remark);
		return service.addTimeCheck(projectName, projectPoint, endTime, remark,session);
	}
	
	/**
	 * @description 删除建议
	 * @author fujianfei
	 * @param idstr
	 * @return
	 */
	@RequestMapping("/deleteTimeCheck")
	@ResponseBody
	public String deleteTimeCheck(String idstr){
		return service.deleteTimeCheck(idstr);
	}
	
	/**
	 * @description 修改建议
	 * @author fujianfei
	 * @param id
	 * @param projectName
	 * @param projectPoint
	 * @param endTime
	 * @param remark
	 * @return
	 * @throws ParseException
	 */
	@RequestMapping("/updataTimeCheck")
	@ResponseBody
	public int updataTimeCheck(String id,String projectName,String projectPoint,String endTime,String remark) throws ParseException{
		return service.updataTimeCheck(id, projectName, projectPoint, endTime, remark);
	}
	
	/**
	 * @description 审核和结果修改
	 * @author fujianfei
	 * @param i
	 * @param id
	 * @param reason
	 * @return
	 */
	@RequestMapping("/AuditAndResultUpdata")
	@ResponseBody
	public int AuditAndResultUpdata(int i,String id,String reason){
		return service.AuditAndResultUpdata(i, id, reason);
	}
	
	/**
	 * @description 搜索部分下拉
	 * @author fujianfei
	 * @param type
	 * @return
	 */
	@RequestMapping("/getDepartment")
	@ResponseBody
	public JSONArray getDepartment(int type){
		return service.getDepartment(type);
	}
	
	/**
	 * 
     * @discription 文件上传
     * @author zt       
     * @created 2017-2-26 下午8:51:03     
     * @param file
     * @param req
     * @param response
     * @param filePath
     * @param firstDirectory
     * @param secondDirectory
     * @param thirdDirectory
     * @param TypeNumber
     * @param belongtoID
     * @param content
     * @param remark
     * @return
     * @throws IOException
	 */
	@RequestMapping("/upload")
	@ResponseBody
	public String uploadFile(@RequestParam("files") CommonsMultipartFile file,
			HttpServletRequest req, HttpServletResponse response,
			String filePath, String firstDirectory, String secondDirectory,
			String thirdDirectory, int TypeNumber, String belongtoID,
			String content, String remark) throws IOException {
		String uploader = belongtoID;// 上传人
		String ID = EntityIDFactory.createId();// 文件ID
		String fileName = file.getOriginalFilename();// 获取文件全名
		PropertiesTool pe = new PropertiesTool();
		String path = ""; // 实际文件存储路径
		String relativePath = "";// 文件的相对路径,加密后存入数据库
		String[] fileNames = fileName.split("\\.");// 将文件名以\.分割成一个数组
		String cacheFilePath = "";// 缓存文件路径
		String directoryName = "";
		String fileSuffixName = fileNames[fileNames.length - 1].toLowerCase();
		if (TypeNumber == 2) {
			System.out.println("fileSuffixName :" + fileSuffixName);
			if (!fileSuffixName.equals("docx") && !fileSuffixName.equals("doc")) {
				return null;
			}
		}
		if (TypeNumber == 3) {
			if (fileSuffixName.equals("jpg") || fileSuffixName.equals("png") || fileSuffixName.equals("gif")) {
				path = pe.getSystemPram("filePath") + "\\";
				if (secondDirectory != null && !secondDirectory.isEmpty()
						&& !secondDirectory.equals("")) {
					path = path + secondDirectory + "\\";
					relativePath += secondDirectory + "\\";

				}
				for (int j = 0; j < fileNames.length; j++) {
					if (fileNames.length - j > 1) {
						path += fileNames[j];
						relativePath += fileNames[j];
					} else {
						path += "_" + ID + "." + fileNames[j];
						relativePath += "_" + ID + "." + fileNames[j];
					}
				}
				File targetFile = new File(path);
				if (!targetFile.exists()) {
					targetFile.mkdirs();
				}

				try {
					file.transferTo(targetFile);
				} catch (IllegalStateException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}

				System.out.println("这里的path: " + path);
			} else {
				return null;
			}
		} else {
			path = pe.getSystemPram("filePath") + "\\";// 文件路径
			cacheFilePath = pe.getSystemPram("cacheFilePath") + "\\";// 缓存文件地址
			if (filePath != null && !filePath.isEmpty() && !filePath.equals("")) {
				path = path + filePath;
				relativePath = relativePath + filePath;
			} else if (firstDirectory != null && !firstDirectory.isEmpty()
					&& !firstDirectory.equals("")) {
				path = path + firstDirectory + "\\";
				relativePath += firstDirectory + "\\";
			}
			if (secondDirectory != null && !secondDirectory.isEmpty()
					&& !secondDirectory.equals("")) {
				path = path + secondDirectory + "\\";
				relativePath += secondDirectory + "\\";

			}
			if (thirdDirectory != null && !thirdDirectory.isEmpty()
					&& !thirdDirectory.equals("")) {
				path = path + thirdDirectory + "\\";
				relativePath += thirdDirectory + "\\";
			}
			System.out.println(firstDirectory + " " + secondDirectory + " "
					+ " " + thirdDirectory);
			directoryName += path;
			for (int j = 0; j < fileNames.length; j++) {
				if (fileNames.length - j > 1) {
					path += fileNames[j];
					relativePath += fileNames[j];
					cacheFilePath += fileNames[j];
				} else {
					path += "_" + ID + "." + fileNames[j];
					relativePath += "_" + ID + "." + fileNames[j];
					cacheFilePath += "_" + ID + "." + fileNames[j];
				}
			}

			File directoryCreate = new File(directoryName);
			if (!directoryCreate.exists()) {
				directoryCreate.mkdirs();
			}
			File targetFile = new File(cacheFilePath);

			if (!targetFile.exists()) {
				targetFile.mkdirs();
			}
			try {
				file.transferTo(targetFile);
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		System.out.println("fileName :" + fileName);
		System.out.println("path :" + path);
		System.out.println("cacheFilePath " + cacheFilePath);
		System.out.println("relativePath " + relativePath);
		
		Date now = new Date(System.currentTimeMillis());
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		FileInformation fr = new FileInformation();
		fr.setID(ID);
		fr.setContent(content);
		fr.setFileName(fileName);
		fr.setPath(relativePath);
		fr.setRemarks(remark);
		if (fileSuffixName.equals("jpg") || fileSuffixName.equals("png") || fileSuffixName.equals("gif")) {
			fr.setBelongtoID(uploader);
		} else {
			fr.setBelongtoID(belongtoID);
		}
		System.out.println("UPLOADER :" + uploader);
		fr.setUploaderID(uploader);
		fr.setType(TypeNumber);
		fr.setState(0);
		try {
			fr.setUploadTime(dateFormat.parse(dateFormat.format(now)));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		fileOperateService.saveFiles(fr);

		if (!fileSuffixName.equals("jpg") && !fileSuffixName.equals("png") && !fileSuffixName.equals("gif")) {
			fileEncryptservice.encryptPath(relativePath, ID);// 加密路径
			fileEncryptservice.encryptFile(cacheFilePath, path, ID);// 加密文件
		}
		return ID + "";
	}

	
	/***
	 * 
	 * @description 单文件下载
	 * @author zt
	 * @created 2016-10-10 下午8:27:28
	 * @param request
	 * @param response
	 * @param ID
	 * @throws IOException 
	 */
	@RequestMapping("/filedownload")
	@ResponseBody
	public void filedownload(HttpServletRequest request,HttpServletResponse response, String ID) throws IOException {
		response.reset();// 可以加也可以不加,注意加了之后tomcate需要配置UTF-8否则乱码
		response.setContentType("application/x-download");
		Map<String, Object> fileNameInfo = baseEntityDao.getByID(ID,"ID", "fileInformation");
		String fileName = fileNameInfo.get("fileName").toString();
		String[] fileNames = fileName.split("\\.");
		String fileSuffixName = fileNames[fileNames.length - 1].toLowerCase();
		String filedisplay = "";// 给用户提供的下载文件名;
		String filePath = fileNameInfo.get("path").toString();
		String cacheFilePath = "";// 缓存文件地址;
		PropertiesTool pe = new PropertiesTool();
		if (fileSuffixName.equals("jpg") || fileSuffixName.equals("png") || fileSuffixName.equals("gif")){
		    filedisplay = fileName;// "给用户提供的下载文件名";
		    cacheFilePath  = pe.getSystemPram("filePath") + "\\" + filePath;
		}else{
			Map<String, Object> results = fileOperateService.getFileDecryptPassword(ID);
			String pathpassword = results.get("pathPassword").toString();
			String relativePath = fileEncryptservice.decryptPath(filePath, pathpassword);
			System.out.println("relativePath :" + relativePath);
		    filedisplay = fileName;// "给用户提供的下载文件名";
		    String path = pe.getSystemPram("filePath") + "\\" + relativePath;
		    System.out.println("下载地址path :" + path);
		    cacheFilePath = pe.getSystemPram("cacheFilePath") + "\\" + filedisplay;
			fileEncryptservice.decryptFile(path, cacheFilePath, ID);
		}
		if (request.getHeader("User-Agent").toLowerCase()
				.indexOf("firefox") > 0) {// 火狐
			filedisplay = JToolWeb.processFileName(request, filedisplay);
		} else {
			filedisplay = URLEncoder.encode(filedisplay, "UTF-8");
		}
		response.addHeader("Content-Disposition", "attachment;filename=" + filedisplay);
		OutputStream outp = null;
		FileInputStream in = null;
		try {
			outp = response.getOutputStream();
			in = new FileInputStream(cacheFilePath);
			byte[] b = new byte[1024];
			int i = 0;
			while ((i = in.read(b)) > 0) {
				outp.write(b, 0, i);
			}
			outp.flush();
			outp.close();
	
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("下载出错!");
		} finally {

			if (in != null) {
				in.close();
				in = null;
			}
			if (outp != null) {
				outp.close();
				outp = null;
			}
			if (!fileSuffixName.equals("gif") && !fileSuffixName.equals("jpg") && !fileSuffixName.equals("png")) {
				File cacheFile = new File(cacheFilePath);
				if (cacheFile.exists()) {
					cacheFile.delete();
				}
			}
		}	
	}

}
