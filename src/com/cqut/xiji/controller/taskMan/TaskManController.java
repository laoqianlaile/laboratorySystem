package com.cqut.xiji.controller.taskMan;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.taskMan.ITaskManService;

@Controller
@RequestMapping("/taskManController")
public class TaskManController{
	
	@Resource(name="taskManService")
	ITaskManService service;
}
