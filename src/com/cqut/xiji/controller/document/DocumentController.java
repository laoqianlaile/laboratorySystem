package com.cqut.xiji.controller.document;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import com.cqut.xiji.entity.document.Document;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.service.document.IDocumentService;
import com.cqut.xiji.service.timeCheck.ITimeCheckService;
import com.cqut.xiji.tool.util.EntityIDFactory;
import com.cqut.xiji.tool.util.JToolWeb;
import com.cqut.xiji.tool.word.wordToHtml;

@Controller
@RequestMapping("/documentController")
public class DocumentController{
	
	@Resource(name="documentService")
	IDocumentService service;
	@Resource(name="timeCheckService")
	ITimeCheckService service1;
	
	/**
	 * 
	 * 方法简述：创建ID
	 * @param 
	 * @return  
	 * @author 蒋兴成
	 * @date 2016年11月24日 下午3:26:15
	 *
	 */
	@RequestMapping("/creatID")
	@ResponseBody
	public String creatID(){
		return EntityIDFactory.createId().toString();
	}
	/**
	 * 
	 * 方法简述：新增文档并将文件加入到file
	 * @param document file
	 * @return  
	 * @author 蒋兴成
	 * @throws ParseException 
	 * @date 2016年11月24日 下午3:26:15
	 *
	 */
	@RequestMapping("/addDocument")
	@ResponseBody
	public void addDocument(
			HttpServletRequest request,HttpServletResponse response, 
			ModelMap model,Document document) throws IOException{
		 MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		  // 得到上传的文件
		  MultipartFile mFile = multipartRequest.getFile("files");
		  // 得到上传服务器的路径
		  String path = request.getSession().getServletContext().getRealPath("/WEB-INF/");		 
		  System.out.println(path);
		  String filename = mFile.getOriginalFilename();
		  String remark = request.getParameter("remark");
		  System.out.println("filename:"+filename);
		  System.out.println("remarks:"+remark);
		  InputStream inputStream = mFile.getInputStream();
		  byte[] b = new byte[1048576];
		  int length = inputStream.read(b);
		  path += "\\" + filename;
		  // 文件流写到服务器端
		  FileOutputStream outputStream = new FileOutputStream(path);
		  outputStream.write(b, 0, length);
		  inputStream.close();
		  outputStream.close();
		  String ID = EntityIDFactory.createId();
		  FileInformation fr = new FileInformation();
		  fr.setID(ID);
		  fr.setBelongtoID(document.getID());
		  fr.setFileName(filename);
		  fr.setPath(path);
		  fr.setUploadTime(new Date());
		  fr.setRemarks(remark);
		  String result = service1.saveFiles(fr);
		
		
		
		
		
		
		Date date=new Date();//添加到document表
		System.out.println(date+"**");
		try{
			document.setSaveTime(date);
		}
		catch(Exception e){
			System.out.println("**"+e);
			
		}

	
		 if(service.addDocument(document)=="true" && result=="true"){
			  System.out.println("返回结果正确");
			  response.sendRedirect("../module/jsp/documentManage/documentManage.jsp");
		  }
	}
	
	
	/*
	@RequestMapping("search")
	@ResponseBody
	public int search(String sdocumentCode,String sdocumenTypeName){
		System.out.println("sdocumentCode="+sdocumentCode);
		System.out.println("sdocumenTypeName="+sdocumenTypeName);
		return service.search(sdocumentCode, sdocumenTypeName);
	}*/
	
	/***
	 * 
	 * @description 单文件下载
	 * @author xzp
	 * @created 2016-10-10 下午8:27:28
	 * @param request
	 * @param response
	 * @param ID
	 * @throws IOException
	 */
	@RequestMapping("/filedownload")
	@ResponseBody
	public void filedownload(HttpServletRequest request,
			HttpServletResponse response, String ID) throws IOException {
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
			System.err.println("下载出错!"+e);
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
			HttpServletResponse response, String IDs) {
		// HttpSession session = request.getSession();
		response.reset();// 可以加也可以不加,注意加了之后tomcate需要配置UTF-8否则乱码
		/*JSONArray jsonArray = JSONArray..fromObject();*/
		String [] stringArr= IDs.split(",");
		System.out.println(".."+IDs);
		response.setContentType("application/x-download");
		List<Map<String, Object>> list = service.getFilesInfo(stringArr);
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

	/*saveAsHtml();*/
	/**
	 * 
	 * 方法简述：读取文档
	 * @param path
	 * @return  
	 * @author xzp
	 * @throws Exception 
	 * @date 2016年11月24日 下午3:26:26
	 *
	 */
	@RequestMapping("/getWord")
	@ResponseBody
	public String getWord(HttpServletRequest request,HttpServletResponse response, 
			ModelMap model,String ID) throws Exception{		
		String fileTurePath = service.getFilePath(ID);
		/*判断是否有中文地址*/
		boolean isChinese=false;
	    if (fileTurePath == null) 
	    	isChinese= false;
	    for (char c : fileTurePath.toCharArray()) {
	        if (c >= 0x4E00 && c <= 0x9FA5) 
	        	isChinese=true;// 有一个中文字符就返回
	    }
	    String filedisplay;//文件名后缀
	    String path="";//转换后的地址
		if(isChinese==true){//由于中文浏览器不能解读，所以中文地址一律转为myDemo.html，为了提高浏览速度，英文还是原标题展示，避免每次预览都要转换
			/*包含html文件名的地址*/
			int length = fileTurePath.length();
			int x = fileTurePath.lastIndexOf("\\");
			x++;
			filedisplay = fileTurePath.substring(x, length);// word后缀doc、docx
			path=fileTurePath.replace(filedisplay, "myDemo.html");//将含后缀doc等的地址变为含html的地址
			path=path.replace("\\WEB-INF", "");
			File file=new File(path);
			if(file.exists()){//如果文件存在就删除
				file.delete();
			}
			/*转换*/
			wordToHtml a=new wordToHtml();
			a.wordToHtml(fileTurePath, path);
		}
		else{
			int length = fileTurePath.length();
			int x = fileTurePath.lastIndexOf(".");
			x++;
			filedisplay = fileTurePath.substring(x, length);// word后缀doc、docx
			path=fileTurePath.replace(filedisplay, "html");
			path=path.replace("\\WEB-INF", "");
			File file=new File(path);
			if(!file.exists()){//文件不存在就转换				
				wordToHtml a=new wordToHtml();
				a.wordToHtml(fileTurePath, path);
			}		
		}
		
		
		
		/*html文件名*/
		int length1 = path.length();
		int x1 = path.lastIndexOf("\\");
		x1++;
		String filedisplay1 = path.substring(x1, length1);// "给用户提供的下载文件名";	
		return filedisplay1;
	}
	
	
	
	/**
	 * 
	 * 方法简述：删除文档
	 * @param ID
	 * @return  
	 * @author 蒋兴成
	 * @date 2016年11月24日 下午3:26:26
	 *
	 */
	@RequestMapping("/deleteDocumentByID")
	@ResponseBody
	public String deleteDocumentByID(String ID){
		return service.deleteDocumentByID(ID);
	}
	
	/**
	 * 
	 * 方法简述：删除多条文档信息
	 * @param IDs
	 * @return  
	 * @author 蒋兴成
	 * @date 2016年11月24日 下午3:29:41
	 *
	 */
	@RequestMapping("/deleteDocumentByIDs")
	@ResponseBody
	public String deleteDocumentByIDs(String IDs){
		String [] stringArr= IDs.split(",");

		return service.deleteDocumentByIDs(stringArr);

	}
	/**
	 * 
	 * 方法简述：更新文档
	 * @param document
	 * @return  
	 * @author 蒋兴成
	 * @date 2016年11月24日 下午3:26:39
	 *
	 */
	@RequestMapping("/updateDocumentByID")
	@ResponseBody
	public String updateDocumentByID(Document document){
		return service.updateDocumentByID(document, document.getID());
	}
	
	/**
	 * 
	 * 方法简述：分页获取文档数据
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param documentCode
	 * @param documentName
	 * @param documentTypeID
	 * @return  
	 * @author 蒋兴成
	 * @date 2016年11月24日 下午3:26:54
	 *
	 */
	@RequestMapping("/getDocumentByConditionWithPaging")
	@ResponseBody
	public JSONObject getDocumentByConditionWithPaging(int limit, int offset, String order,
			String sort,String documentCode,String documentName,String documentTypeID){
	
		
		Map<String, Object> result=service.getDocumentByConditionWithPaging(limit, offset, order, sort, documentCode, documentName, documentTypeID);
		return JSONObject.fromObject(result);
	}
}
