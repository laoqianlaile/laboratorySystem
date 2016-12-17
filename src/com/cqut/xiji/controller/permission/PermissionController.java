package com.cqut.xiji.controller.permission;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.permission.IPermissionService;

@Controller
@RequestMapping("/permissionController")
public class PermissionController{
	
	@Resource(name="permissionService")
	IPermissionService service;
}
