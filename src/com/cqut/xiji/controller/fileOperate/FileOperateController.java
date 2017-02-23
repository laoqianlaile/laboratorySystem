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
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.tool.fileEncrypt.FileEncrypt;
import com.cqut.xiji.tool.util.DocConverter;
import com.cqut.xiji.tool.util.EntityIDFactory;
import com.cqut.xiji.tool.util.JToolWeb;
import com.cqut.xiji.tool.util.PropertiesTool;
import com.cqut.xiji.service.fileOperate.IFileOperateService;

@Controller
@RequestMapping("/fileOperateController")
public class FileOperateController {
	@Resource(name = "fileOperateService")
	IFileOperateService service;

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

	/***
	 * 
	 * @description 文件上传
	 * @author zt
	 * @created 2016-10-10 下午8:28:08
	 * @param file
	 * @param req
	 * @param response
	 * @param type
	 * @param subtypeName
	 * @param content
	 * @param belongtoID
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
		// String UPLOADER =
		// request.getSession().getAttribute("USERID").toString();//上传ID,从session里面取出来
		long begin = 0;
		String ID = "";// 文件ID
		String fileName = "";// 文件名
		String[] fileNames = null; // 文件名按"."分割后文件名的集合
		String path = "";// 文件路径
		begin = System.currentTimeMillis();
		ID = EntityIDFactory.createId();
		fileName = file.getOriginalFilename();
		fileNames = fileName.split("\\.");
    //	path = System.getProperty("user.dir").replace("bin", "webapps") + "\\" + "files" + "\\";// 获取tomcat下webapps的目录
	    PropertiesTool pe = new PropertiesTool();
		path= pe.getSystemPram("filePath")+"\\" ;
		if (filePath != null && !filePath.isEmpty() && !filePath.equals("")) {
			path = filePath;
		} else if (firstDirectory != null && !firstDirectory.isEmpty()
				&& !firstDirectory.equals("")) {
			path = path + firstDirectory + "\\";
		}
		if (secondDirectory != null && !secondDirectory.isEmpty()
				&& !secondDirectory.equals("")) {
			path = path + secondDirectory + "\\";
		}
		if (thirdDirectory != null && !thirdDirectory.isEmpty()
				&& !thirdDirectory.equals("")) {
			path = path + thirdDirectory + "\\";
		}
		for (int j = 0; j < fileNames.length; j++) {
			if (fileNames.length - j > 1) {
				path += fileNames[j];
			} else {
				path += "_" + ID + "." + fileNames[j];
			}
		}
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
		fr.setContent(content);
		fr.setFileName(fileName);
		fr.setPath(path);
		fr.setRemarks(remark);
		fr.setBelongtoID(belongtoID);
		// fr.setUploaderID();
		fr.setType(TypeNumber);
		fr.setState(0);
		try {
			fr.setUploadTime(dateFormat.parse(dateFormat.format(now)));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		service.saveFiles(fr);
		FileEncrypt fe = new FileEncrypt();
		fe.encryptPath(path, ID);

		return ID;

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
		String fileTurePath = service.getFilePath(ID);// 获取文件路径
		File file = new File(fileTurePath);
		if (fileTurePath.equals("nofile")) {
			return "没有记录";
		} else if (!file.exists()) {
			return "真实文件已被删除！";
		} else {
			return "OK";
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
		String fileTurePath = service.getFilePath(ID);
		int length = fileTurePath.length();
		int x = fileTurePath.lastIndexOf("\\");
		x++;
		String filedisplay = fileTurePath.substring(x, length);// "给用户提供的下载文件名";
		// String filedisplay = new
		// String(request.getParameter("name").getBytes("iso8859-1"), "utf-8");
		if (request.getHeader("User-Agent").toLowerCase().indexOf("firefox") > 0) {// 火狐
			filedisplay = JToolWeb.processFileName(request, filedisplay);
		} else {
			filedisplay = URLEncoder.encode(filedisplay, "UTF-8");
		}
		response.addHeader("Content-Disposition", "attachment;filename="
				+ filedisplay);
		OutputStream outp = null;
		FileInputStream in = null;
		try {
			outp = response.getOutputStream();
			in = new FileInputStream(fileTurePath);
			byte[] b = new byte[1024];
			int i = 0;
			while ((i = in.read(b)) > 0) {
				outp.write(b, 0, i);
			}
			outp.flush();
			outp.close();
		} catch (Exception e) {
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
		// HttpSession session = request.getSession();
		response.reset();// 可以加也可以不加,注意加了之后tomcate需要配置UTF-8否则乱码
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
			for (int i = 0; i < list.size(); i++) {

				String FilePath = list.get(i).get("path").toString(); // list为存放路径的数组
																		// 循环可以得到路径和文件名
				String FileName = list.get(i).get("fileName").toString();

				File f = new File(FilePath);
				if (!f.exists()) {
					continue;
				}
				ze = new ZipEntry(FileName);
				ze.setSize(f.length());
				ze.setTime(f.lastModified());
				zos.putNextEntry(ze);
				InputStream is = new BufferedInputStream(new FileInputStream(f));
				while ((readLength = is.read(buf, 0, 2048)) != -1) {
					zos.write(buf, 0, readLength);
				}
				is.close();
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
	public String imageUpload(@RequestParam("file") MultipartFile file,
			HttpServletRequest request, HttpServletResponse response) {
		System.out.println("进入图片上传");
		// 得到上传图片的保存目录，将上传的图片放在WEB-INF下，不允许外界直接访问，保证上传图片的安全

		/*
		 * String savePath =
		 * request.getSession().getServletContext().getRealPath("C:\\upload\\");
		 */String filePathString = "C:\\upload";

		/*
		 * String filePath = System.getProperty("user.dir").replace("bin",
		 * "webapps") + "\\" + "files" + "\\" + "protalImages";//
		 * 获取tomcat下webapps的目录
		 */

		// 如果目录不存在则创建改目录
		String filename = file.getOriginalFilename();
		String typeName = (filename.substring(filename.lastIndexOf(".") + 1))
				.toLowerCase();
		if (typeName.equals("jpg") || typeName.equals("png")
				|| typeName.equals("psd") || typeName.equals("tiff")
				|| typeName.equals("jpeg") || typeName.equals("gif")
				|| typeName.equals("bmp")) {
			File saveFile1 = new File(filePathString, filename);

			if (!saveFile1.exists()) {
				saveFile1.mkdirs();
			}

			// 复制文件到创建的目录下
			try {
				file.transferTo(saveFile1);
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}

			Date now = new Date();
			SimpleDateFormat dateFormat = new SimpleDateFormat(
					"yyyy-MM-dd HH:mm:ss");
			String ID = EntityIDFactory.createId();// 图片ID
			FileInformation fr = new FileInformation();
			fr.setID(ID);
			fr.setFileName(filename);

			fr.setPath(filePathString);

			/*
			 * fr.setPath(filePath);
			 */
			fr.setType(5);
			try {
				fr.setUploadTime(dateFormat.parse(dateFormat.format(now)));
			} catch (ParseException e) {
				e.printStackTrace();
			}
			service.saveFiles(fr);

			System.out.println(filePathString + "\\" + filename);
			return filePathString + "\\" + filename;
		} else {
			return "false";
		}
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
	 * @description 在线查看文件，将文件转换为swf
	 * @author zt
	 * @created 2016-11-19 下午4:09:21
	 * @param filePath
	 * @return
	 */
	@RequestMapping("/onlinePreview")
	@ResponseBody
	public String onlinePreview(String filePath, HttpServletRequest request) {
		// String outputPath = System.getProperty("user.dir").replace("bin","webapps")+ "\\" + "SVPE" + "\\";
		 PropertiesTool pe = new PropertiesTool();
		String outputPath = pe.getSystemPram("swfPath") + "\\";
		if (filePath != null && !filePath.isEmpty() && !filePath.equals(" ")) {
			DocConverter dc = new DocConverter(filePath, outputPath);
			dc.conver();
			String swfFilePath = dc.getswfPath();
			if (swfFilePath != null && !swfFilePath.isEmpty()
					&& !swfFilePath.equals(" ")) {
				swfFilePath = swfFilePath.substring(2).replace("\\", "/");
				HttpSession session = request.getSession();
				session.setAttribute("swfFilePath", swfFilePath);
				return swfFilePath;
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
		String outputPath = pe.getSystemPram("swfPath") + "\\";
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
}
