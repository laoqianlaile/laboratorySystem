package com.cqut.xiji.controller.documentType;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.entity.documentType.DocumentType;
import com.cqut.xiji.service.documentType.IDocumentTypeService;

@Controller
@RequestMapping("/documentTypeController")
public class DocumentTypeController{
	
	@Resource(name="documentTypeService")
	IDocumentTypeService service;
	
	/**
	 * 表格出初始化
	 * @author fujianfei
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param tableName
	 * @return
	 */
	@RequestMapping("/getdocumentWithPaging")
	@ResponseBody
	public JSONObject getdocumentWithPaging(int limit, int offset,String order, String sort, String tableName){
		System.out.println("访问到了1 "+ "<br />");
		Map<String, Object> result = service.getdocumentWithPaging(limit, offset, order, sort, tableName);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 修改
	 * @author fujianfei
	 * @param ID
	 * @param documentTypeCode
	 * @param documentTypeName
	 * @param scope
	 * @return
	 */
	@RequestMapping("/updata")
	@ResponseBody
	public int updata(String ID ,String documentTypeCode,String documentTypeName,String scope){
		System.out.println("ID="+ID+":documentTypeCode="+documentTypeCode+":documentTypeName="+documentTypeName+":scope="+scope);
		return service.updata(ID, documentTypeCode, documentTypeName, scope);
	}
	
	
	/**
	 * 删除
	 * @author 付建飞
	 * @param idstr
	 * @return
	 */
	@RequestMapping("/delete")
	@ResponseBody
	public int delete(String idstr){
		return service.delete(idstr);
	}
	
	/**
	 * 增加
	 * @author 付建飞
	 * @param documentTypeCode
	 * @param documentTypeName
	 * @param scope
	 * @return
	 */
	@RequestMapping("/add")
	@ResponseBody
	public int add(String documentTypeCode,String documentTypeName,String scope){
		return service.add(documentTypeCode, documentTypeName, scope);
	}
	
	
	/**
	 * 搜索
	 * @author 付建飞
	 * @param sdocumentCode
	 * @param sdocumenTypeName
	 * @return
	 */
	@RequestMapping("search")
	@ResponseBody
	public int search(String sdocumentCode,String sdocumenTypeName){
		System.out.println("sdocumentCode="+sdocumentCode);
		System.out.println("sdocumenTypeName="+sdocumenTypeName);
		return service.search(sdocumentCode, sdocumenTypeName);
	}
	
	/**
	 * 
	 * 方法简述：获取所有的文档类别实体信息
	 * @return  
	 * @author 蒋兴成
	 * @date 2016年11月24日 下午3:23:00
	 *
	 */
	@RequestMapping("getDocumentTypes")
	@ResponseBody
	public JSONArray getDocumentTypes() {
		List<DocumentType> list = service.getDocumentTypes();
		return JSONArray.fromObject(list);
	}
}
