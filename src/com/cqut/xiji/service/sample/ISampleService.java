package com.cqut.xiji.service.sample;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

public interface ISampleService {

    /**
     * 
     * @author wzj
     * @date 2016年10月21日 下午7:25:33
     * @param roleIDs
     * @return
     */
	String delSample(String roleIDs);
	Map<String, Object> getSampleWithPaging(String factoryCode,String sampleName,String sampleType, String giveMan, String takeMan,String receiptlistCode, String startTime, String endTime,
			int limit, int offset, String order, String sort);//分页初始化数据
	String addLinkSample(String factoryCode, String sampleName, String sampleType,
			String receiptlistCode, String remarks, String unit);//增加样品信息
	String updateLinkSample(String ID, String sampleName,String factoryCode, String sampleType,
			String remarks, String unit, String linkID, String reID); //包括交接单号
	String updateSample(String ID, String sampleName,String factoryCode, String sampleType,
			String remarks, String unit); //单纯的修改样品信息
	String delLinkReSample(String linkIDs);
	boolean isExitByCodeName(String sampleCode,String sampleName); //通过判断名称 编码 型号 是否存在
	String getSampleByID(String sampleID);
	public List<Map<String, Object>> getSampleInfor(String qrcode);
	String addSample(String factoryCode, String sampleName, String sampleType,String remarks, String unit); //新增样品
	String isExitFactory(String factoryCode); //查看样品编号是否存在
	List<Map<String, Object>> getSampleListByCodeLimit(String sampleCode); //模糊搜索样品通过名称或者样品编码
	public void   exportSample (HttpServletRequest request,HttpServletResponse response) ; //导出样品信息
	public  List<Map<String, Object>> getAllSample(int total);   //获取前面N条样品信息  -1 代表所有
	int importExcel(CommonsMultipartFile file, HttpServletRequest req,HttpServletResponse response); //导入样品信息
	/**
	 * 
	 * features or effect
	 * @author wzj
	 * @date 2017年5月18日 上午9:42:15
	 * @param codeOrName
	 * @return
	 */
	
	public List<Map<String, Object>> getSampleMsg(String codeOrName);

	public Map<String, Object> getSampleWithPagingINmanhour(String factoryCode,String sampleName,String specifications,int limit, int offset,
			String order, String sort);
	public List<Map<String, Object>> getSampleImforByFactoryCode(String factoryCode);
	public List<Map<String, Object>> getSampleImforBySampleName(String sampleName);
	public List<Map<String, Object>> getSampleImforBySpecifications(String specifications);
	String updateManHour(String ID, double laborHour);
	public String addSampleInManHour(String factoryCode,String sampleName, String specifications, double laborHour);
	
	public boolean updateSampleNameByID(String sampleID, String sampleName);


}
