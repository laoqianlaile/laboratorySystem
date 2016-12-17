package com.cqut.xiji.service.linkReSample;

import java.util.List;
import java.util.Map;

public interface ILinkReSampleService {

	Map<String, Object> getlinkReSampleInforWithPaging(String ID, int limit,
			int offset, String sort, String order);
	
	List<Map<String, Object>> getRequire(String ID);
	
	public String updlinkReSampleInForInReturn(String ID,String linkID,String testID,String factoryCode,String sampleName,String specifications,String nameCn,String createTime);
	
	public String delLinkReSample(String linkID);
	
	public String addLinkSample(String ID,String receiptlistID);
	
	public List<Map<String, Object>> getSampleID(String qrcode);
	
}
