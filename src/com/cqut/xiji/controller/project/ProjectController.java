package com.cqut.xiji.controller.project;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.cqut.xiji.service.project.IProjectService;

@Controller
@RequestMapping("/projectController")
public class ProjectController{
	
	@Resource(name="projectService")
	IProjectService service;
	
	
}
