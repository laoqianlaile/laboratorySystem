package com.cqut.xiji.service.template;

import java.util.Map;

public interface ITemplateService {

	Map<String, Object> getTemplateWithPage(String nAME,String STATE,
			String uPLOADTIME1, String uPLOADTIME2, int limit, int offset,
			String order, String sort);
	/**
	 * 获取模板审核的初始化数据
	 * @param nAME
	 * @param STATE
	 * @param uPLOADTIME1
	 * @param uPLOADTIME2
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	public Map<String, Object> getTemplateReviewWithPage(String nAME,String STATE,
			String uPLOADTIME1, String uPLOADTIME2, int limit, int offset,
			String order, String sort);

	String delTemplate(String templateIDs);
	/**
	 * 审核不通过方法
	 * @param ID
	 * @param SUGGEST
	 * @param verifyMan
	 * @return
	 */
	public String updNoPasstemplate(String ID,String SUGGEST,String verifyMan);
	/**
	 * 审核通过方法
	 * @param ID
	 * @param SUGGEST
	 * @param verifyMan
	 * @return
	 */
	public String updPasstemplate(String ID,String SUGGEST,String verifyMan);

	String addTemplate(String templateName, String templateRemarks,
			String templateType,String standardIDs, String fileID, String uploaderID);
	String upSubmitTemplate(String templateIDs);
	
}
