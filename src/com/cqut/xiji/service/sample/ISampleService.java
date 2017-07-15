package com.cqut.xiji.service.sample;

import java.util.List;
import java.util.Map;

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
	String getSampleByCode(String sampleCode);
	String getSampleByID(String sampleID);
	public List<Map<String, Object>> getSampleInfor(String qrcode);
	String addSample(String factoryCode, String sampleName, String sampleType,String remarks, String unit); //新增样品
	String isExitFactory(String factoryCode); //查看样品编号是否存在
	List<Map<String, Object>> getSampleListByCodeLimit(String sampleCode); //根据样品编号搜索样品-限制5条以内
	
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
