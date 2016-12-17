package com.cqut.xiji.service.sample;

import java.util.List;
import java.util.Map;

import com.cqut.xiji.entity.sample.Sample;

public interface ISampleService {

    /**
     * 
     * @author wzj
     * @date 2016年10月21日 下午7:25:33
     * @param roleIDs
     * @return
     */
	String delSample(String roleIDs);
	String getSample(String sampleID);
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
	public List<Map<String, Object>> getSampleInfor(String qrcode);
	String isExitFactory(String factoryCode); //查看样品编号是否存在
	/**
	 * wzj
	 */
	
	
}
