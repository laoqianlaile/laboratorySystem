package com.cqut.xiji.controller.project;

import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.project.IProjectService;

@Controller
@RequestMapping("/projectController")
public class ProjectController{
	
	@Resource(name="projectService")
	IProjectService service;
	
	
}
