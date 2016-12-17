package com.cqut.xiji.service.template;

import java.util.List;
import java.util.Map;

import com.cqut.xiji.entity.template.Template;

public interface ITemplateService {

	Map<String, Object> getTemplateWithPage(String nAME,String STATE,
			String uPLOADTIME1, String uPLOADTIME2, int limit, int offset,
			String order, String sort);

	String delTemplate(String templateIDs);
	
	public String updNoPasstemplate(String ID,String SUGGEST,String verifyMan);
	public String updPasstemplate(String ID,String SUGGEST,String verifyMan);

	String addTemplate(String templateName, String templateRemarks,
			String templateType, String fileID, String uploaderID);
	
}
