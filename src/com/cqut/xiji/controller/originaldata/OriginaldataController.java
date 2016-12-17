package com.cqut.xiji.controller.originaldata;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.originaldata.IOriginaldataService;

@Controller
@RequestMapping("/originaldataController")
public class OriginaldataController{
	
	@Resource(name="originaldataService")
	IOriginaldataService service;
}
