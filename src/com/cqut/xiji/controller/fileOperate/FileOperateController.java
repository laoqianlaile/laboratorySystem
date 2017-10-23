package com.cqut.xiji.controller.fileOperate;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.websocket.Session;

import net.sf.json.JSONObject;

import org.springframework.context.support.StaticApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;



import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.tool.util.DocConverter;
import com.cqut.xiji.tool.util.EntityIDFactory;
import com.cqut.xiji.tool.util.JToolWeb;
import com.cqut.xiji.tool.util.PropertiesTool;


import com.cqut.xiji.service.fileEncrypt.IFileEncryptService;
import com.cqut.xiji.service.fileOperate.IFileOperateService;

@Controller
@RequestMapping("/fileOperateController")
public class FileOperateController {
	@Resource(name = "fileOperateService")
	IFileOperateService service;

	 
	@Resource(name = "fileEncryptService")
	IFileEncryptService fileEncryptservice;
	
	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;
	
	/***
	 * 
	 * @description 获取文件列表
	 * @author zt
	 * @created 2016-10-10 下午8:28:22
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param fileName
	 * @return
	 */
	@RequestMapping("/getFileRecordWithPaging")
	@ResponseBody
	public JSONObject getFileRecordWithPaging(int limit, int offset,
			String order, String sort, String fileName) {
		Map<String, Object> result = service.getFileInfoWithPaging(limit,
				offset, sort, order, fileName);
		return JSONObject.fromObject(result);
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
		String uploader = (String) req.getSession().getAttribute("EMPLOYEEID");// 上传人
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
				path = pe.getSystemPram("imgPath") + "\\";
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
		service.saveFiles(fr);

		if (!fileSuffixName.equals("jpg") && !fileSuffixName.equals("png") && !fileSuffixName.equals("gif")) {
			fileEncryptservice.encryptPath(relativePath, ID);// 加密路径
			fileEncryptservice.encryptFile(cacheFilePath, path, ID);// 加密文件
		}
		return ID + "";
	}

	/***
	 * 
	 * @description 检查文件是否存在
	 * @author zt
	 * @created 2016-10-10 下午8:27:48
	 * @param ID
	 * @param request
	 * @return
	 */
	@RequestMapping("/filecheck")
	@ResponseBody
	public String filecheck(String ID, HttpServletRequest request) {
		String filePath = service.getFilePath(ID);// 获取文件路径
		if (filePath.equals("nofile")) {
			return "没有记录!";
		} else {
			Map<String, Object> fileNameInfo = baseEntityDao.getByID(ID,
					"ID", "fileInformation");
			if (fileNameInfo == null || fileNameInfo.size() == 0) {
				return "下载错误!";
			} else {
				PropertiesTool pt = new PropertiesTool();
				String fileName = fileNameInfo.get("fileName").toString();
				System.out.println("fileName :"+fileName);
				String[] fileNames = fileName.split("\\.");
				String fileSuffixName = fileNames[fileNames.length - 1].toLowerCase();
				System.out.println("fileSuffixName :"+fileSuffixName);
				if (fileSuffixName.equals("jpg") || fileSuffixName.equals("png") || fileSuffixName.equals("gif")) {
					filePath = pt.getSystemPram("imgPath") + "\\" + filePath;
					File file = new File(filePath);
					if (!file.exists()) {
						return "真实文件已被删除！";
					} else {
						return "OK";
					}
				} else {
					Map<String, Object> results = service.getFileDecryptPassword(ID);
					String pathPassword = fileNameInfo.get("pathPassword").toString();
					String relativePath = fileEncryptservice.decryptPath(filePath, pathPassword);
					System.out.println("relativePath :" + relativePath);
					String path = pt.getSystemPram("filePath") + "\\" + relativePath;
					File file = new File(path);
					if (!file.exists()) {
						return "真实文件已被删除！";
					} else {
						return "OK";
					}
				}
			}
		}
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
		    cacheFilePath  = pe.getSystemPram("imgPath") + "\\" + filePath;
		}else{
			Map<String, Object> results = service.getFileDecryptPassword(ID);
			String pathpassword = results.get("pathPassword").toString();
			String relativePath = fileEncryptservice.decryptPath(filePath, pathpassword);
			System.out.println("relativePath :" + relativePath);
//		    filedisplay = fileName;// "给用户提供的下载文件名";
			if(fileName.substring(fileName.length() - 5, fileName.length()).equals(".docx"))
			{
				filedisplay = fileName.substring(0, fileName.length() - 1);// "给用户提供的下载文件名";
			}
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

	/***
	 * 
	 * @description 多文件下载
	 * @author zt
	 * @created 2016-10-10 下午8:27:05
	 * @param request
	 * @param response
	 * @param IDs
	 * @return
	 */
	@RequestMapping("/downloadFiles")
	@ResponseBody
	public String downloadFiles(HttpServletRequest request,
			HttpServletResponse response, String[] IDs) {
		response.reset();
		response.setContentType("application/x-download");
	    List<Map<String, Object>> list = service.getFilesInfo(IDs);
		ZipOutputStream zos = null;
		ServletOutputStream sos = null;
		try {
			response.reset();
			response.setContentType("application/x-msdownload"); // 通知客户文件的MIME类型,因为部分浏览器文件名中文或文字过多会乱码，故用方法转化文件名
			String filename = JToolWeb.processFileName(request, "下载文件.zip");
			response.setHeader("Content-disposition", "attachment;filename="
					+ filename);
			sos = response.getOutputStream();
			zos = new ZipOutputStream(sos);

			ZipEntry ze = null;
			byte[] buf = new byte[2048]; // 输出文件用的字节数组,每次发送2048个字节到输出流：
			int readLength = 0;
			PropertiesTool pe = new PropertiesTool();
			String relativeFilePath = "", password = "", fileTurePath = "", fileName = "",path = "",cacheFilePath = "",ID = "", filePath = "",fileSuffixName = "";
			
		    String[] fileNames = null;
		    for (int i = 0; i < list.size(); i++) {
		    	fileName = list.get(i).get("fileName").toString();
		    	relativeFilePath = list.get(i).get("path").toString();
		        fileNames = fileName.split("\\.");
			    fileSuffixName = fileNames[fileNames.length - 1].toLowerCase();
				if (fileSuffixName.equals("jpg") || fileSuffixName.equals("png") || fileSuffixName.equals("gif")){
					cacheFilePath = pe.getSystemPram("imgPath") + "\\" + relativeFilePath;
				}else{
					ID = list.get(i).get("ID").toString();
					
					password = list.get(i).get("pathPassword").toString();
					
					fileTurePath = fileEncryptservice.decryptPath(relativeFilePath,password); // 循环可以得到路径和文件名

					fileName = list.get(i).get("fileName").toString();
								
					path = pe.getSystemPram("filePath") + "\\";
					
					cacheFilePath = pe.getSystemPram("cacheFilePath") + "\\"+fileName ;
					
					
					path += fileTurePath;
					
					fileEncryptservice.decryptFile(path, cacheFilePath, ID);
				    
					System.out.println("多文件下载时path: "+path);
					System.out.println("多文件下载cacheFilePath :"+cacheFilePath);
				}
				File f = new File(cacheFilePath);
				if (!f.exists()) {
					continue;
				}
				ze = new ZipEntry(fileName);
				ze.setSize(f.length());
				ze.setTime(f.lastModified());
				zos.putNextEntry(ze);
				InputStream is = new BufferedInputStream(new FileInputStream(f));
				while ((readLength = is.read(buf, 0, 2048)) != -1) {
					zos.write(buf, 0, readLength);
				}
				is.close();
				System.out.println("fileSuffixName :" + fileSuffixName);
				if (!fileSuffixName.equals("jpg") && !fileSuffixName.equals("png") && !fileSuffixName.equals("gif")) {
					if (f.exists()) {
						f.delete();
					}
				}
		    }

		} catch (Exception ex) {
			System.out.println("Error download:" + ex.toString());
		} finally {
			if (zos != null) {
				try {
					zos.close();
				} catch (Exception ex) {
					System.out.println("Error download:" + ex.toString());
				}
			}
		}
		return "true";
	}

	/***
	 * 
	 * @description 删除文件,只改状态
	 * @author zt
	 * @created 2016-10-10 下午8:26:34
	 * @param IDs
	 * @return
	 */
	@RequestMapping("/deleteFiles")
	@ResponseBody
	public boolean deleteFiles(String[] IDs) {
		return service.deleteFiles(IDs);
	}

	/**
	 * 
	 * 方法简述：单图片上传
	 * 
	 * @param file
	 * @param request
	 * @param response
	 * @return 返回上传图片的路径
	 * @author 蒋兴成
	 * @date 2016年10月13日 下午10:37:36
	 * 
	 */
	
			
	@RequestMapping("/imageUpload")
	@ResponseBody
	public String imageUpload(@RequestParam("file") MultipartFile file,String belongtoID,
			HttpServletRequest request, HttpServletResponse response) throws IOException {
		long begin = 0;
		String ID = "";// 文件ID
		String fileName = "";// 文件名
		String[] fileNames = null; // 文件名按"."分割后文件名的集合
		String path = "";// 文件路径
		begin = System.currentTimeMillis();
		ID = EntityIDFactory.createId();
		fileName = file.getOriginalFilename();
		fileNames = fileName.split("\\.");
//		path = System.getProperty("user.dir").replace("bin", "webapps") + "\\" + "files" + "\\";// 获取tomcat下webapps的目录
		PropertiesTool pe = new PropertiesTool();
		path= pe.getSystemPram("imgPath")+"\\" ;
		String pathBack ="";
		pathBack+= pe.getSystemPram("imgRoute")+"/";
		
		for (int j = 0; j < fileNames.length; j++) {
			if (fileNames.length - j > 1) {
				path += fileNames[j];
				pathBack+= fileNames[j];
			} else {
				path += "_" + ID + "." + fileNames[j];
				pathBack+="_" + ID + "." + fileNames[j];
			}
		}
		System.out.println("test-------------------------");
		System.out.println("Pathback:"+pathBack);
        System.out.println("path :"+path);
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

		Date now = new Date(begin);
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		FileInformation fr = new FileInformation();
		fr.setID(ID);
		
		fr.setFileName(fileName);
		/*fr.setPath(path);*/
		fr.setPath(pathBack);//只把文件名写进去
		fr.setBelongtoID(belongtoID);
		// fr.setUploaderID();
		
		fr.setState(0);
		try {
			fr.setUploadTime(dateFormat.parse(dateFormat.format(now)));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		service.saveFiles(fr);
		return ID;

	}
	
	/**
	 * 
	 * @descriptio 获得文件类型
	 * @author zt
	 * @created 2016-10-13 下午2:26:38
	 * @return
	 */
	@RequestMapping("/getFileType")
	@ResponseBody
	public List<Map<String, Object>> getFileType() {
		return service.getFileType();
	}

	/**
	 * 
	 * @description 获得文件子类型名
	 * @author zt
	 * @created 2016-10-13 下午3:25:04
	 * @param ID
	 * @return
	 */
	@RequestMapping("/getFileTypeName")
	@ResponseBody
	public List<Map<String, Object>> getFileSubtypeName(int ID) {
		return service.getFileSubtypeName(ID, "filetype");
	}

	/**
	 * 
	 * @description 获取文件类型、名字、信息
	 * @author zt
	 * @created 2016-11-19 下午3:24:56
	 * @param ID
	 * @return
	 */
	@RequestMapping("/getFilesInfo")
	@ResponseBody
	public List<Map<String, Object>> getFilesInfo(String[] ID) {
		List<Map<String, Object>> result = service.getFilesInfo(ID);
		return result;
	}

	/**
	 * 
	 * 方法简述：根据主表ID获取相关联文件
	 * 
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param belongtoID
	 * @return
	 * @author 蒋兴成
	 * @date 2016年12月1日 下午9:43:23
	 * 
	 */
	@RequestMapping("/getFileInfoBybelongtoIDWithPaging")
	@ResponseBody
	public Map<String, Object> getFileInfoBybelongtoIDWithPaging(int limit,
			int offset, String order, String sort, String belongtoID) {
		Map<String, Object> result = service.getFileInfoBybelongtoIDWithPaging(
				limit, offset, sort, order, belongtoID);
		return JSONObject.fromObject(result);
	}

	/**
	 * 
     * @discription 查看文件，将文件转换为swf
     * @author zt       
     * @created 2017-2-25 下午9:59:11     
     * @param filePath
     * @param ID
     * @param request
     * @return
	 */
	@RequestMapping("/onlinePreview")
	@ResponseBody
	public String onlinePreview(String ID, HttpServletRequest request) {
		List<Map<String, Object>> FileDecryptPath = service.getFileDecryptPath(ID);
		if (FileDecryptPath != null && FileDecryptPath.size() > 0) {
			String filePath = FileDecryptPath.get(0).get("path").toString();
			PropertiesTool pe = new PropertiesTool();
			String path = pe.getSystemPram("filePath") + "\\";
			String outputPath = pe.getSystemPram("swfFilePath") + "\\";
			String cacheFilePath = pe.getSystemPram("cacheFilePath") + "\\";
			int length = filePath.length();
			int x = filePath.lastIndexOf("\\");
			x++;
			String fileName = filePath.substring(x, length);// 文件名
			cacheFilePath += fileName;
			path += filePath;
			fileEncryptservice.decryptFile(path, cacheFilePath, ID);
			if (cacheFilePath != null && !cacheFilePath.isEmpty() && !cacheFilePath.equals(" ")) {
				try {
					DocConverter dc = new DocConverter(cacheFilePath,outputPath);
					dc.conver();
					String swfFilePath = dc.getswfPath();
					if (swfFilePath != null && !swfFilePath.isEmpty() && !swfFilePath.equals(" ")) {
						swfFilePath = swfFilePath.substring(2).replace("\\","/");
						HttpSession session = request.getSession();
						session.setAttribute("swfFilePath", swfFilePath);
						return swfFilePath + "";
					} else {
						return null;
					}
				} catch (Exception e) {
					return null;
				}
			} else {
				return null;
			}

		} else {
			return null;
		}
	}
	
	/***
	 * 
     * @discription 删除存有文件路径的session    
     * @created 2016-12-10 下午2:01:08     
     * @param request
	 */
	@RequestMapping("/deleteOnlinePreviewFile")
	@ResponseBody
	public void deleteOnlinePreviewFile(HttpServletRequest request) {
		PropertiesTool pe = new PropertiesTool();
		String outputPath = pe.getSystemPram("swfFilePath") + "\\";
		Object swfFileSession = request.getSession().getAttribute("swfFilePath");
		if (swfFileSession != null) {
			String swfFilePath = (String) swfFileSession;
			int index = swfFilePath.lastIndexOf("/");
			index++;
			String swfFileName = swfFilePath.substring(index);
			String filePath = outputPath + swfFileName;
			File file = new File(filePath);
			if (file.exists()) {
				file.delete();
				request.getSession().removeAttribute("swfFilePath");
			}
		}
	}
	
	/**
	 * 
     * @discription 获取解密后的路径
     * @author zt       
     * @created 2017-2-26 下午8:56:26     
     * @param ID
     * @return
	 */
	@RequestMapping("/getFileDecryptPath")
	@ResponseBody
	public List<Map<String, Object>> getFileDecryptPath(String ID) {
		List<Map<String, Object>>  result = service.getFileDecryptPath(ID);
		return result;
	}
	
	/**
	 * 
	 * @discription 查看文件路径
	 * @author zt
	 * @created 2017-4-26 下午4:25:49
	 * @param fileID
	 * @return
	 */
	@RequestMapping("/viewFilePath")
	@ResponseBody
	public String viewFilePath(String fileID) {
		Map<String, Object> fileInfo = baseEntityDao.findByID(new String[] { "fileName,path" }, fileID, "ID",
				"fileinformation");
		if (fileInfo != null && fileInfo.size() > 0) {
			String filePath = "";
			String fileName = fileInfo.get("fileName").toString();
			String[] fileNames = fileName.split("\\.");
			String fileSuffixName = fileNames[fileNames.length - 1].toLowerCase();
			PropertiesTool pe = new PropertiesTool();
			String relativePath = "";
			if (fileSuffixName.equals("gif") || fileSuffixName.equals("jpg") || fileSuffixName.equals("png")) {
				relativePath = fileInfo.get("path").toString();
				filePath += pe.getSystemPram("imgPath") + "\\" + relativePath;
				return filePath + "";
			} else {
				List<Map<String, Object>> fileDecryptPath = service.getFileDecryptPath(fileID);
				if (fileDecryptPath == null || fileDecryptPath.size() == 0) {
					return null;
				} else {
					filePath = pe.getSystemPram("filePath") + "\\" + fileDecryptPath.get(0).get("path").toString();
					return filePath + "";
				}
			}
		} else {
			return null;
		}
	}
}
