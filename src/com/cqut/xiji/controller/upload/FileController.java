package com.cqut.xiji.controller.upload;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.cqut.xiji.service.article.IArticleService;
import com.cqut.xiji.tool.util.EntityIDFactory;
import com.cqut.xiji.tool.util.PropertiesTool;

@Controller
@RequestMapping("/controller")
public class FileController {

	@Resource(name = "articleService")
	IArticleService service;

	/*
	 * LinkedList<FileMeta> files = new LinkedList<FileMeta>(); FileMeta
	 * fileMeta = null;
	 * 
	 * String imgPath = PropertiesTool.getSystemPram("imgPath"); String filePath
	 * = PropertiesTool.getSystemPram("filePath");
	 * 
	 * static String imgRoute = PropertiesTool.getSystemPram("imgRoute");
	 * 
	 * static String fileRoute = PropertiesTool.getSystemPram("fileRoute");
	 */
	/**
	 * @param request
	 *            pathName:如 projectA/wordFile 前后不加斜杠
	 * @param response
	 * @return List<Map<String, Object>> FileID StaffID FileName FileUrl
	 *         author:maoxiaoming date:2016-6-22
	 * 
	 */
	@RequestMapping("/upload2")
	@ResponseBody
	public String upload2(HttpServletRequest request,
			HttpServletResponse response, String pathName) {
		// 创建一个通用的多部分解析器
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
				request.getSession().getServletContext());
		// 判断 request 是否有文件上传,即多部分请求
		/*
		 * String StaffID =
		 * request.getSession().getAttribute("USERID").toString();
		 */
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		if (multipartResolver.isMultipart(request)) {
			// 转换成多部分request

			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
			List<MultipartFile> files = multiRequest.getFiles("files");
			System.out.println("files:" + files.size());
			// 取得request中的所有文件名
			int index = 0;
			/* File_Record [] file_Records=new File_Record[files.size()]; */
			while (files.size() > index) {
				// 记录上传过程起始时的时间，用来计算上传时间
				int pre = (int) System.currentTimeMillis();
				// 取得上传文件
				MultipartFile file = files.get(index);
				if (file != null) {
					// 取得当前上传文件的文件名称
					String myFileName = file.getOriginalFilename();
					// 如果名称不为“”,说明该文件存在，否则说明该文件不存在
					if (!myFileName.trim().equals("")) {
						System.out.println(myFileName);
						// 重命名上传后的文件名
						String fileName = myFileName;
						// 定义上传路径
						String path;
						String separator = System.getProperty("file.separator");
						if (pathName != null && !pathName.equals("")) {
							path = PropertiesTool.getSystemPram("filePath")
									+ separator + pathName + separator
									+ fileName;
						} else
							path = "E:\\superc102" + separator + fileName;
						File parent;
						if (pathName != null && !pathName.equals("")) {
							parent = new File(
									PropertiesTool.getSystemPram("filePath")
											+ separator + pathName);
						} else
							parent = new File("E:\\superc102");
						if (!parent.exists()) {
							parent.mkdirs();
						}
						/*
						 * System.setProperty("sun.jnu.encoding","ANSI_X3.4-1968"
						 * ); try { //path=new String(path.getBytes(),"UTF-8");
						 * path=new String(path.getBytes(),"ANSI_X3.4-1968"); }
						 * catch (UnsupportedEncodingException e1) { // TODO
						 * Auto-generated catch block e1.printStackTrace(); }
						 */
						File localFile = new File(path);
						try {
							file.transferTo(localFile);
						} catch (IllegalStateException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
					String id = EntityIDFactory.createId();
					Map<String, Object> map = new HashMap<String, Object>();
					/*
					 * File_Record file_Record = new File_Record();
					 * file_Record.setID(id); file_Record.setFILEID(id);
					 * file_Record.setFILENAME(myFileName);
					 * file_Record.setSTAFFID(StaffID);
					 * file_Record.setFILEURL(pathName+"/"+myFileName);
					 * file_Records[index]=file_Record;
					 */

					map.put("FileID", id);
					/* map.put("StaffID", StaffID); */
					map.put("FileName", myFileName);
					map.put("FileUrl", "img/" + myFileName);
					list.add(map);

				/*	Article article = new Article();
					article.setArtPicturegis("img/" + myFileName);
					service.updateArticle(article);*/
					/* service.saveEntities(file_Records); */
					/*
					 * 文件名id路径：文件名StaffID
					 */
				} else {
					System.out.println(index + " is null");
				}
				// 记录上传该文件后的时间

				int finaltime = (int) System.currentTimeMillis();
				System.out.println(finaltime - pre);
				index++;
			}
		}
		return JSONArray.fromObject(list).toString();
	}

	@RequestMapping(value = "/showImg")
	@ResponseBody
	public FileInputStream showImg(String url) throws FileNotFoundException {
		File f = new File(url);
		if (f.exists()) {
			FileInputStream out = new FileInputStream(url);
			return out;
		}
		return null;
	}
	/*
	 * @RequestMapping(value = "/uploadImg")
	 * 
	 * @ResponseBody public String uploadImg(MultipartHttpServletRequest
	 * request, HttpServletResponse response) {
	 * 
	 * // 如果上传目录不存在，则创建 File parent = new File(imgPath); if (!parent.exists()) {
	 * parent.mkdirs(); }
	 * 
	 * return upload(request, response, imgPath, imgRoute); }
	 */

	/*
	 * @RequestMapping(value = "/uploadFile")
	 * 
	 * @ResponseBody public String uploadFile(MultipartHttpServletRequest
	 * request, HttpServletResponse response) {
	 * 
	 * // 如果上传目录不存在，则创建 File parent = new File(filePath); if (!parent.exists())
	 * { parent.mkdirs(); }
	 * 
	 * return upload(request, response, filePath, fileRoute); }
	 * 
	 * 
	 * private String upload(MultipartHttpServletRequest request,
	 * HttpServletResponse response, String path, String route) { // 1. build an
	 * iterator Iterator<String> itr = request.getFileNames();
	 * 
	 * List<FileMeta> result = new ArrayList<FileMeta>();
	 * 
	 * // 2. get each file while (itr.hasNext()) { // 2.1 get next MultipartFile
	 * MultipartFile mpf = request.getFile(itr.next()); if (!mpf.isEmpty()) { //
	 * 得到文件名 String originalFilename = mpf.getOriginalFilename();
	 * 
	 * System.out.println("文件原名: " + originalFilename);
	 * System.out.println("文件名称: " + mpf.getName()); System.out.println("文件长度: "
	 * + mpf.getSize()); System.out.println("文件类型: " + mpf.getContentType());
	 * try {
	 * 
	 * String fileID = EntityIDFactory.createId(); String fileName;
	 * 
	 * if (originalFilename.lastIndexOf(".") >= 0) { //
	 * 文件名包括后缀，则FileName以FileID加后缀 fileName = fileID +
	 * originalFilename.substring(originalFilename .lastIndexOf(".")); } else {
	 * fileName = fileID; }
	 * 
	 * // 文件上传 mpf.transferTo(new File(path, fileName));
	 * 
	 * 
	 * // 创建systemFile SystemFile file = new SystemFile(); file.setID(fileID);
	 * 
	 * file.setFILENAME(fileName); file.setFILESIZE(mpf.getSize());
	 * file.setFILETYPE(mpf.getContentType()); file.setNEWTIME(new Date());
	 * file.setORIGINALNAME(originalFilename); // 保留原始名
	 * 
	 * file.setSAVEPATH(path + "\\" + fileName);
	 * 
	 * service.save(file);
	 * 
	 * 
	 * FileMeta meta = new FileMeta();
	 * 
	 * meta.setFileName(originalFilename); meta.setFileID(file.getID());
	 * meta.setFilePath(route + fileName);
	 * 
	 * // 返回Json result.add(meta);
	 * 
	 * } catch (IOException e) { System.out.println("文件[" +
	 * mpf.getOriginalFilename() + "]上传失败,堆栈轨迹如下"); e.printStackTrace(); } }
	 * 
	 * }
	 * 
	 * return JSONArray.fromObject(result).toString(); }
	 *//**
	 * 文件下载
	 * 
	 * @param fileID
	 * @throws UnsupportedEncodingException
	 * @throws IOException
	 */
	/*
	 * 
	 * @RequestMapping(value = "/downFile") public ResponseEntity<byte[]>
	 * downFile(String fileID) throws UnsupportedEncodingException {
	 * 
	 * HttpHeaders headers = new HttpHeaders();
	 * headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
	 * 
	 * SystemFile systemFile = service.getSystemFileByID(fileID);
	 * 
	 * String f = new String(systemFile.getORIGINALNAME().getBytes("utf-8"),
	 * "iso-8859-1");
	 * 
	 * // 下载名 headers.setContentDispositionFormData("attachment", f);
	 * 
	 * File file = new File(FileTool.getDownPath(systemFile.getFILENAME()));
	 * 
	 * byte[] bytes = null; try { bytes = FileUtils.readFileToByteArray(file); }
	 * catch (IOException e1) { e1.printStackTrace(); return null; }
	 * 
	 * if (bytes == null) { return null; }
	 * 
	 * return new ResponseEntity<byte[]>(bytes, headers, HttpStatus.OK); }
	 * 
	 * 
	 * 
	 * @RequestMapping("/downFile")方法过于原始，使用j2ee原始接口HttpServletResponse，并不友好
	 * public void download(HttpServletResponse res) throws IOException {
	 * OutputStream os = res.getOutputStream(); try { res.reset(); String f =
	 * new String("涔涔".getBytes("gb2312"), "iso-8859-1");
	 * res.setHeader("Content-Disposition", "attachment;filename="+f+".txt");
	 * res.setContentType("application/octet-stream; charset=utf-8"); File file
	 * = new File("D:/123.txt");
	 * 
	 * os.write(FileUtils.readFileToByteArray(file)); os.flush(); } finally { if
	 * (os != null) { os.close(); } } }
	 */
}
