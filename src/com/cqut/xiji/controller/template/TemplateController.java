package com.cqut.xiji.controller.template;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;










import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.template.ITemplateService;


/**
 * 模板管理
 * 
 * @author zkl
 *
 */

@Controller
@RequestMapping("/templateController")
public class TemplateController{
	
	@Resource(name="templateService")
	ITemplateService service;
	
	
	/**
	 * 查询分页展示
	 * 
	 * @author zkl
	 * @param NAME   模板名称
	 * @param UPLOADTIME1  上传时间
	 * @param UPLOADTIME2  上传时间
	 * @return
	 */
	
	@RequestMapping ("/getTemplateWithPage")
	@ResponseBody 
	public JSONObject getTemplateWithPage(String nAME ,String STATE,String uPLOADTIME1, String uPLOADTIME2,int limit, int offset, String order, String sort){
		Map<String, Object> result = service.getTemplateWithPage(nAME,STATE, uPLOADTIME1, uPLOADTIME2, limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	
	/**
	 * 通过模板ID删除模板记录（可删除多个）
	 * @author zkl
	 * @param IDs    多个标准ID构成的字符串
	 * @return               删除成功返回删除的模板信息数，失败返回0
	 */
	@RequestMapping("/delTemplate")
	@ResponseBody
	public String delTemplate(String templateIDs){
		String result = service.delTemplate(templateIDs);
		return result;
	}
	
	
	/**
	 * 上传模板
	 * 
	 * @author zkl
	 * @param TEMPLATENAME
	 * @return  上传成功返回正数，失败返回0
	 */
	@RequestMapping("/addTemplate")
	@ResponseBody
	public String addTemplate(String TemplateName ,String TemplateRemarks,String TemplateType,String fileID,String uploaderID){
		String result = service.addTemplate(TemplateName,TemplateRemarks,TemplateType,fileID,uploaderID);
		return result;
	}
	/**
	 * 
	 * @param ID
	 * @param SUGGEST
	 * @author wj
	 * @return
	 */
	@RequestMapping("/updNoPasstemplate")
	@ResponseBody
	public String updNoPasstemplate(String ID,String SUGGEST,String verifyMan){
		String result = service.updNoPasstemplate(ID,SUGGEST,verifyMan);
		return result;
		
	}
	/**
	 * 
	 * @param ID
	 * @param SUGGEST
	 * @author wj
	 * @return
	 */
	@RequestMapping("/updPasstemplate")
	@ResponseBody
	public String updPasstemplate(String ID,String SUGGEST,String verifyMan){
		String result = service.updPasstemplate(ID,SUGGEST,verifyMan);
		return result;
		
	}
}
