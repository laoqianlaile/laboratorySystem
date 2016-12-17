package com.cqut.xiji.controller.upload;
/*package com.cqut.controller.upload;  
  
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.cqut.entity.systemfile.SystemFile;
import com.cqut.service.systemfile.SystemFileService;
import com.cqut.tool.json.JsonTool;
import com.cqut.tool.util.EntityIDFactory;
import com.cqut.tool.util.FileTool;
import com.cqut.tool.util.PropertiesTool;
  

 *//**
 * 该类已弃用
 * 被FileController替换
 * @author cm
 *
 */
/*
 * @Controller
 * 
 * @RequestMapping("/uploadController") public class uploadController {
 * 
 * @Resource(name="systemFileService") SystemFileService service;
 * 
 * String path = ""; //String path = PropertiesTool.getSystemPram("uploadPath");
 * 
 * //String ftpPath = PropertiesTool.getSystemPram("ftpPath");
 * 
 * @RequestMapping(value="/fileUpload")
 * 
 * @ResponseBody public String fileUpload(@RequestParam MultipartFile myfile,
 * HttpServletRequest request, HttpServletResponse response) throws IOException{
 * 
 * if(!myfile.isEmpty()){ String originalFilename =
 * myfile.getOriginalFilename(); System.out.println("文件原名: " +
 * originalFilename); System.out.println("文件名称: " + myfile.getName());
 * System.out.println("文件长度: " + myfile.getSize()); System.out.println("文件类型: "
 * + myfile.getContentType()); try {
 * 
 * String fileID = EntityIDFactory.createId(); String fileName;
 * if(originalFilename.lastIndexOf(".") >= 0) { fileName = fileID +
 * originalFilename.substring(originalFilename.lastIndexOf(".")); } else {
 * fileName = fileID ; }
 * 
 * System.out.println(fileName);
 * 
 * File parent = new File(path); if(!parent.exists()){ parent.mkdirs(); }
 * 
 * myfile.transferTo(new File(path, fileName));
 * 
 * 
 * SystemFile file = new SystemFile(); file.setID(fileID);
 * 
 * 
 * file.setFILENAME(fileName); file.setFILESIZE(myfile.getSize());
 * file.setFILETYPE(myfile.getContentType()); file.setNEWTIME(new Date());
 * 
 * 
 * file.setSAVEPATH(path + "\\" + fileName);
 * 
 * service.save(file);
 * 
 * Map<String,String> result = new HashMap<String, String>(); result.put("path",
 * FileTool.getImgRoute(fileName)); result.put("ID", file.getID());
 * 
 * return JsonTool.toJson(result); } catch (IOException e) {
 * System.out.println("文件[" + myfile.getOriginalFilename() + "]上传失败,堆栈轨迹如下");
 * e.printStackTrace(); } } // }
 * 
 * return null; }
 * 
 * }
 */