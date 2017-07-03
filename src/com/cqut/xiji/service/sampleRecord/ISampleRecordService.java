package com.cqut.xiji.service.sampleRecord;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

public interface ISampleRecordService {
	/**
	 * 
	 * @description 根据ID获取样品记录信息
	 * @author wujie
	 * @created 2016年9月26日 下午4:06:19
	 * @param sampleRecordID
	 * @return
	 */
	public Map<String, Object> getSample(String factoryCode);
	/**
	 * @description 判断状态
	 * @param factoryCode
	 * @return
	 */
	public Map<String, Object> addJudge(String factoryCode);
	/**
	 * 
	 * @description 获取所有样品记录信息
	 * @author wujie
	 * @created 2016年9月26日 下午4:08:46
	 * @return
	 */
	public String getSampleRecordAll();
	/**
	 * 
	 * @description 分页获取样品记录信息
	 * @author wujie
	 * @created 2016年9月26日 下午4:11:17
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	public Map<String, Object> getSampleRecordWithPaging(String factoryCode,String sampleName,String specifications,String getMan,int limit, int offset, String order, String sort);
	/**
	 * 
	 * @description 添加一条样品领用信息
	 * @author wujie
	 * @created 2016年9月26日 下午4:28:57
	 * @param factoryCode
	 * @param sampleName
	 * @param specifications
	 * @param getMan
	 * @param getTime
	 * @param returnMan
	 * @param returnTime
	 * @return
	 */
	public String addSampleRecord(String factoryCode, String sampleName,
			String specifications, String getMan, String getTime,
			String type, String remarks);
	/**
	 * 
	 * @description 更新样品记录管理
	 * @author wujie
	 * @created 2016年9月26日 下午4:36:03
	 * @param SampleRecord
	 * @param factoryCode
	 * @param sampleName
	 * @param specifications
	 * @param getMan
	 * @param getTime
	 * @param returnMa
	 * @param returnTime
	 * @return
	 */
	public String updSampleRecord(String ID, String sampleID,
			String factoryCode, String sampleName, String specifications,
			String getManID, String getTime,String type, String remarks);
	
	JSONArray getdatalist();
	/**
	 * 获取样品信息
	 * @param factoryCode
	 * @return
	 */
	public List<Map<String, Object>> getFactoryCode(String factoryCode);
		
	
	
}
