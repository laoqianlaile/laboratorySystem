package com.cqut.xiji.service.client;


import java.util.Map;

import javax.servlet.http.HttpSession;

import com.cqut.xiji.entity.client.Client;


public interface IClientService {

	


	String updateStatus(String reviewStatus, String clientID);


	Map<String, Object> getRegistryWithPaging(int limit, int offset,
			String order, String sort, String reCompyName, String reUserName,
			String reReviewStatus, String isTouchReviewStatus);
	

	public String clientLogin(Client client,HttpSession session);

	public String addPersonnel(String clientNo, String password, String companyID,
			String mobilePhone, String fixedTelephone, String manage,
			String representative, String company, String remarks,
			String idCard1, String idCard2);


	public Map<String, Object> getPersonage(String articleID);


	public String getClientPassword(String clientNo);

    public String changePassword(Client client);


	public String changePersonnel(String clientNo,String clientID,String clientPassword,String companyID, String companyName,
			String address, String mobilePhone, String manage,
			String representative, String companyType, String remarks,
			String idCardLicense, String idCardAptitude);


	public String clientlogout(Client client, HttpSession session);


	public String findPassword(String clientNo1, String phoneNumber);

}
