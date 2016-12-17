package com.cqut.xiji.controller.sampleInformation;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.cqut.xiji.service.sampleInformation.ISampleInformationService;

@Controller
@RequestMapping("/sampleInformationController")
public class SampleInformationController{
	
	@Resource(name="sampleInformationService")
	ISampleInformationService service;
}
