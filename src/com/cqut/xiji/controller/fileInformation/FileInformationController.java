package com.cqut.xiji.controller.fileInformation;

import java.util.Map;

import javax.annotation.Resource;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.fileInformation.IFileInformationService;

@Controller
@RequestMapping("/fileInformationController")
public class FileInformationController{
	
	@Resource(name="fileInformationService")
	IFileInformationService service;
	
	/**
	 * 
	 * @description 初始化检测报告表
	 * @author fujianfei
	 * @created 2016-10-8 下午8:04:26
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param tableName
	 * @return
	 */
	@RequestMapping("/getWithPaging")
	@ResponseBody
	public JSONObject getWithPaging(int limit,int offset,String order,String sort,String tableName){
		
		System.out.println("访问到了queryDetail.file ");
		Map<String, Object> result = service.getWithPaging(limit,offset,order,sort,tableName);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
	 * @description 设置文件ID
	 * @author fei
	 * @created 2016-10-8 下午8:04:57
	 * @param contractID
	 * @return
	 */
	@RequestMapping("/setcontractID")
	@ResponseBody
	public int setcontractID(String contractID){
		System.out.println(contractID);
		return service.setcontractID(contractID);
	}
	
	/**
	 * 
	 * @description 分配任务下获取文件信息
	 * @author chenyubo
	 * @created 2016年10月13日 下午2:43:03
	 * @param ID
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @return
	 */
	@RequestMapping("/getFileInTaskWithPaging")  
    @ResponseBody
	public JSONObject getFileInTaskWithPaging(String ID, int limit, int offset, String sort, String order){
		Map<String, Object> result = service.getFileInTaskWithPaging(ID,limit,offset,sort,order);
		return JSONObject.fromObject(result);
	}
	/**
	 * 通过文件ID修改备注信息
	 * @author wzj
	 * @date 2016年11月20日 下午9:56:33
	 * @param fileID
	 * @param remarks
	 * @return
	 */
	@RequestMapping("/updateRemarksByID")
	@ResponseBody
	public String updateRemarksByID(String fileID ,String remarks) {
		String result = service.updateRemarksByID( fileID , remarks);
		return result;
	}
	/**
	 * 通过修改文件的状态达到删除的目的（删除记录）
	 * @author wzj
	 * @date 2016年11月20日 下午10:30:47
	 * @param fileID
	 * @return
	 */
	@RequestMapping("/deleteFileByID")
	@ResponseBody
	public String deleteFileByID(String fileID) {
		String result = service.deleteFileByID(fileID);
		return result;
	}
	@RequestMapping("/getFileInReceiptlistWithPaging")  
    @ResponseBody
	public JSONObject getFileInReceiptlistWithPaging(String ID, int limit, int offset, String sort, String order){
		Map<String, Object> result = service.getFileInTaskWithPaging(ID,limit,offset,sort,order);
		return JSONObject.fromObject(result);
	}
	
	@RequestMapping("/getContractFileWithPaging")
	@ResponseBody
	public JSONObject getContractFileWithPaging(int limit,int offset,String order,String sort,String ID){
		
		Map<String, Object> result = service.getContractFileWithPaging(limit,offset,order,sort,ID);
		return JSONObject.fromObject(result);
	}
	
	@RequestMapping("/getContractTemplateFileWithPaging")
	@ResponseBody
	public JSONObject getContractTemplateFileWithPaging(int limit,int offset,String order,String sort){
		
		Map<String, Object> result = service.getContractTemplateFileWithPaging(limit,offset,order,sort);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
     * @discription 获取任务所对应的相关文件信息
     * @author zt       
     * @created 2016-12-16 下午8:52:29     
     * @param taskID
     * @param limit
     * @param offset
     * @param sort
     * @param order
     * @return
	 */
	@RequestMapping("/getFileInTaskViewWithPaging")  
    @ResponseBody
	public JSONObject getFileInTaskViewWithPaging(String taskID, int limit, int offset, String sort, String order){
		Map<String, Object> result = service.getFileInTaskViewWithPaging(taskID,limit,offset,sort,order);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
     * @discription 获取符合条件的文件数据
     * @author zt       
     * @created 2017-4-5 下午10:15:23     
     * @param limit
     * @param offset
     * @param sort
     * @param order
     * @param fileName
     * @param projectID
     * @param uploadName
     * @param beginTime
     * @param endTime
     * @param selectPart
     * @return
	 */
	@RequestMapping("/getFileWithPaging")
	@ResponseBody
	public JSONObject getFileWithPaging(int limit, int offset, String sort,
			String order, String fileName, String projectID, String uploadName,
			String beginTime, String endTime, String selectPart) {
		Map<String, Object> result = service.getFileWithPaging(limit, offset,
				sort, order, fileName, projectID, uploadName, beginTime,
				endTime, selectPart);
		return JSONObject.fromObject(result);
	}	
}
