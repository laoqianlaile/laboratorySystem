package com.cqut.xiji.controller.permission;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.cqut.xiji.service.permission.IPermissionService;

@Controller
@RequestMapping("/permissionController")
public class PermissionController{
	
	@Resource(name="permissionService")
	IPermissionService service;
}
