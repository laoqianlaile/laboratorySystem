package com.cqut.xiji.service.selfapplication;

import java.util.Map;

import javax.servlet.http.HttpSession;

import com.cqut.xiji.entity.selfapplication.Selfapplication;

public interface ISelfapplicationService {


	/*Map<String, Object> getSelfApplicationWithPaging(int limit, int offset,
			String order, String sort, String selfSampleName,
			String selfCompanyName, String selfHasContact,
			String isTouchReviewStatus);*/

	int contact(Selfapplication selfapplication);

	Map<String, Object> getSelfApplicationWithPaging(int limit, int offset,
			String order, String sort, String selfSampleName,
			String selfCompanyName, String selfHasContact);
	
	Map<String, Object> getSelfApplicationWithPaging2(int limit, int offset,
			String order, String sort,HttpSession session);

	String addSelfApplication(Selfapplication selfapplication,
			HttpSession session);
	
}
