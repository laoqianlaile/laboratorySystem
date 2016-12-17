package com.cqut.xiji.controller.registry;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.cqut.xiji.service.registry.IRegistryService;

@Controller
@RequestMapping("/registerController")
public class RegistryController{
	
	@Resource(name="registryService")
	IRegistryService service;
	
	/*@RequestMapping("/getRegistryWithPaging")  
    @ResponseBody
	public JSONObject getRegistryWithPaging(int limit, int offset, String order, String sort, String reCompyName,String reUserName,String reReviewStatus ) throws UnsupportedEncodingException{
		Map<String, Object> result = service.getRegistryWithPaging(limit,offset,sort,order,reCompyName,reUserName,reReviewStatus);
		System.out.println("Registrycontroller:"+JSONObject.fromObject(result));
		return JSONObject.fromObject(result);
	}*/
}
