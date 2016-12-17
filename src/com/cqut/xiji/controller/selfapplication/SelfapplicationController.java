package com.cqut.xiji.controller.selfapplication;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Date;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.entity.selfapplication.Selfapplication;
import com.cqut.xiji.service.selfapplication.ISelfapplicationService;



@Controller
@RequestMapping("/selfapplicationController")
public class SelfapplicationController{
	
	@Resource(name="selfapplicationService")
	ISelfapplicationService service;
	
	
	@RequestMapping("/getSelfApplicationWithPaging")  
    @ResponseBody
	public JSONObject getSelfApplicationWithPaging(int limit, int offset, String order, String sort, String selfSampleName,String selfCompanyName,String selfHasContact) throws UnsupportedEncodingException{
		 selfSampleName = URLDecoder.decode(selfSampleName,"utf-8");
		 selfCompanyName = URLDecoder.decode(selfCompanyName,"utf-8");
		 selfHasContact = URLDecoder.decode(selfHasContact,"utf-8");
		 
		Map<String, Object> result = service.getSelfApplicationWithPaging(limit,offset,order,sort,selfSampleName,selfCompanyName,selfHasContact);
		return JSONObject.fromObject(result);
	}
	
	@RequestMapping("/getSelfByCondition")  
    @ResponseBody
	public JSONObject getSelfByCondition( String selfSampleName,String selfCompanyName,String selfHasContact ) {
		System.out.println("getSelfByCondition"+" "+selfSampleName+" "+selfCompanyName+" "+selfHasContact);
		
		Map<String, Object> result=null;
		return JSONObject.fromObject(result);
	}

	@RequestMapping("/contact")  
    @ResponseBody
	public int contact(String selfApplyID){
		Selfapplication selfapplication = new Selfapplication();
		selfapplication.setSelfEntryData(new Date());
		selfapplication.setSelfHasContact("1");
		selfapplication.setSelfApplyID(selfApplyID);
		return service.contact(selfapplication);
	}

	@RequestMapping("/getSelfApplicationWithPaging1")  
    @ResponseBody
	public JSONObject getSelfApplicationWithPaging1(int limit, int offset, String order, String sort, String selfSampleName,String selfCompanyName,String selfHasContact ) throws UnsupportedEncodingException{
		 selfSampleName = URLDecoder.decode(selfSampleName,"utf-8");
		 selfCompanyName = URLDecoder.decode(selfCompanyName,"utf-8");
		 selfHasContact = URLDecoder.decode( selfHasContact,"utf-8");
		Map<String, Object> result = service.getSelfApplicationWithPaging(limit,offset,order,sort,selfSampleName,selfCompanyName,selfHasContact);
		System.out.println("Selfcontroller:"+JSONObject.fromObject(result));
		return JSONObject.fromObject(result);
	}

	

	@RequestMapping("/getSelfApplicationWithPaging2")  
    @ResponseBody
	public JSONObject getSelfApplicationWithPaging2(int limit, int offset, String order, String sort, HttpSession session) throws UnsupportedEncodingException{
		Map<String, Object> result = service.getSelfApplicationWithPaging2(limit,offset,sort,order,session);
		System.out.println("Selfcontroller:"+limit);
		System.out.println("Selfcontroller:"+offset);
		System.out.println("Selfcontroller:"+sort);
		System.out.println("Selfcontroller:"+JSONObject.fromObject(result));
		return JSONObject.fromObject(result);
	}
	
	@RequestMapping("/addSelfApplication")  
    @ResponseBody
	public String addSelfApplication(String selfSampleName, String selfDetection, String selfContact, String selfContactPhone, String selfRemork, HttpSession session) throws UnsupportedEncodingException{
		selfSampleName = URLDecoder.decode(selfSampleName,"utf-8");
		selfDetection = URLDecoder.decode(selfDetection,"utf-8");
		selfContact = URLDecoder.decode(selfContact,"utf-8");
		selfRemork = URLDecoder.decode(selfRemork,"utf-8");
		
		Selfapplication selfapplication = new Selfapplication(selfSampleName, selfDetection, selfContact, selfContactPhone, selfRemork);
		
		String result = service.addSelfApplication(selfapplication, session);
		return result;
	}
	
}
