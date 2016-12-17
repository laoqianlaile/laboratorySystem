package com.cqut.xiji.controller.fileType;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.fileType.IFileTypeService;

@Controller
@RequestMapping("/fileTypeController")
public class FileTypeController{
	
	@Resource(name="fileTypeService")
	IFileTypeService service;
}
