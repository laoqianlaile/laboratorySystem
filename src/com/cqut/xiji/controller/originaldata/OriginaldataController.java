package com.cqut.xiji.controller.originaldata;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.cqut.xiji.service.originaldata.IOriginaldataService;

@Controller
@RequestMapping("/originaldataController")
public class OriginaldataController{
	
	@Resource(name="originaldataService")
	IOriginaldataService service;
}
