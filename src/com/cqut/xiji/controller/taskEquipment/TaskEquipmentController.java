package com.cqut.xiji.controller.taskEquipment;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.cqut.xiji.service.taskEquipment.ITaskEquipmentService;

@Controller
@RequestMapping("/taskEquipmentController")
public class TaskEquipmentController{
	
	@Resource(name="taskEquipmentService")
	ITaskEquipmentService service;
}
