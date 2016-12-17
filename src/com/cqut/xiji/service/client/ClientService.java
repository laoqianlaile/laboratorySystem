package com.cqut.xiji.service.client;


import java.net.URLDecoder;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;






























import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.article.Article;
import com.cqut.xiji.entity.client.Client;
import com.cqut.xiji.entity.company.Company;
import com.cqut.xiji.entity.registry.Registry;
import com.cqut.xiji.entity.role.Role;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;
@Service
public class ClientService extends SearchService implements IClientService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "client";
	}

	@Override
	public String getBasePrimaryKey() {
		return "client.ID";
	}
	@Override
	public Map<String, Object> getRegistryWithPaging(int limit, int offset,
			String order, String sort,String reCompyName,String reUserName,String reReviewStatus,String isTouchReviewStatus) {
		// TODO Auto-generated method stub
		int index = limit;
		int pageNum = offset/limit + 1;
		String tableName = "company";
		String[] allProperties = new String[]{
			"client.id id",
			"clientNo",
			"password",
			"reviewStatus",
			"companyName",
            "address",
            "businessLicence",
            "qulicationPic",
            "phoneNumber",
            "scope",
            "legal",
            "type",
            "remarks",
		};
		String clientTableName = "client";
		List<Map<String, Object>> result;
		String condition= null;
		String statusCondition=null;
		if(reReviewStatus.equals("未审核"))///审核状态 0:未审核  1：通过  2：不通过
			statusCondition = " reviewStatus='0' ";
		else if(reReviewStatus.equals("通过"))
			statusCondition = " reviewStatus='1' ";
		else if(reReviewStatus.equals("不通过"))
			statusCondition = " reviewStatus='2' ";
		else if(reReviewStatus.equals("全部"))
			statusCondition = null;
		
		
		if(isTouchReviewStatus.equals("null")){//判断是否只触发reviewStatus筛选事件
		if(reCompyName.equals("null")&&reUserName.equals("null")){
			 String s = "1=1";
		     result = entityDao.searchWithpaging(allProperties, clientTableName, "left join company on client.companyId=company.id", null, s, null, order, sort, index, pageNum);
		}
		else {
			 /* condition+=" reReviewStatus='"+reReviewStatus+"' and";*/
		      if(!reCompyName.equals("null")&&reUserName.equals("null")){
			     condition = " company.companyName='"+reCompyName+"'";
		      }
		      else if(reCompyName.equals("null")&&!reUserName.equals("null")){
		    	  condition = " clientNo='"+reUserName+"'"; 
		      }
		      else 
		    	  condition = " company.companyName='"+reCompyName
					 +"' and clientNo='"+reUserName+"' ";
		    	 
			     result = entityDao.searchWithpaging(allProperties, clientTableName, "left join company on client.companyId=company.id", null, condition, null, order, sort, index, pageNum);
		 }
		}
		else{ 
			 
				
			/*String condition1 = " reviewStatus='"+reReviewStatus+"'";*/
			result = entityDao.searchWithpaging(allProperties, clientTableName, "left join company on client.companyId=company.id", null, statusCondition, null, order, sort, index, pageNum);
		}
		Map<String,Object> map1 = new HashMap<String, Object>();
		for(int i=0;i<result.size();i++){
			map1=result.get(i);
			if(map1.get("reviewStatus").equals("0"))
				map1.put("reviewStatus","未审核");
			else if(map1.get("reviewStatus").equals("1"))
				map1.put("reviewStatus","通过");
			else
				map1.put("reviewStatus","不通过");
		}
		int count;
		if(isTouchReviewStatus.equals("null")){
		if(condition==null)
		 count = entityDao.getByCondition(" 1=1 ", Client.class).size();
		else {
			 /*count = entityDao.getByCondition(condition, Client.class).size();*/
			 count = entityDao.getForeignCount("client.id","client", "left join company on client.companyId=company.id",null, condition);
		 }
		}
		else{
			 /*String condition1 = " reviewStatus='"+reReviewStatus+"'";*/
			 count = entityDao.getForeignCount("client.id","client", "left join company on client.companyId=company.id",null, statusCondition);
		}
		
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		return map;
	}
	@Override
	public String  updateStatus(String reviewStatus,String clientID){
		Client client = new Client();
		client.setReviewStatus(reviewStatus);
		int result = entityDao.updatePropByID(client, clientID);
		System.out.println("result:"+result);
		
		return result+"";
	}
	

	@Override
	public String clientLogin(Client client, HttpSession session) {
		// TODO Auto-generated method stub
		if(client != null){
			List<Client> clients = entityDao.getByCondition(" 1 = 1", Client.class);
			for(int i = 0; i < clients.size(); i++){
				if(client.getClientNo().equals(clients.get(i).getClientNo()) && 
						client.getPassword().equals(clients.get(i).getPassword())&&clients.get(i).getReviewStatus().equals("1")){
					session.setAttribute("clientNo", client.getClientNo());
					session.setAttribute("password", client.getPassword());
					return "true";
				}
			}
		}
		return "false";

	}
	
	@Override
	public String addPersonnel(String clientNo,String password,String companyID,String mobilePhone,String fixedTelephone,
    		String manage,String representative,String company,String remarks,String idCardLicense,String idCardAptitude){
		Client client = new Client();
		Company company2 = new Company();
		String id = EntityIDFactory.createId();
		String id1 = EntityIDFactory.createId();
		client.setID(id);
		client.setClientNo(clientNo);
		client.setPassword(password);
		client.setCreateTime(new Date());
		client.setCompanyID(id1);
		client.setReviewStatus("0");
		
		company2.setID(id1);
		company2.setCompanyName(companyID);
		company2.setAddress(mobilePhone);
		company2.setMobilephone(fixedTelephone);
		company2.setBusinessLicence(idCardLicense);
		company2.setLegal(representative);
		company2.setScope(manage);
		company2.setQulicationPic(idCardAptitude);
		company2.setRemarks(remarks);
		company2.setType(Integer.parseInt(company));
		
		int result = entityDao.save(client);
		return result+" " + entityDao.save(company2);
	}

	@Override
	public Map<String, Object> getPersonage(String clientNo) {
		String condition = " 1 = 1 ";
		if (clientNo != null && !clientNo.trim().toString().equals("null")) {
			condition = " 1 = 1 and clientNo =  '" + clientNo + "'";
		} 
		
		List<Map<String, Object>> enList = searchDao.searchForeign(
				new String[]{
						"client.ID AS ID",
						"password",
						"companyID",
						"clientNo",
						"password",
						"company.ID AS ID",
						"companyName",
						"phoneNumber",
						"qulicationPic",
						"address",
						"legal",
						"businessLicence",
						"scope",
						"type",
						"remarks"
						},
				"client",
				" join company on client.companyID = company.ID"
				, null, null, condition);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("client",enList);
	    return map;
	}

	@Override
	public String getClientPassword(String clientNo) {
		String condition = " 1 = 1 ";
		if (clientNo != null && !clientNo.trim().toString().equals("null")) {
			condition = " 1 = 1 and clientNo =  '" + clientNo + "'";
		}
		List<Client> result = entityDao.getByCondition(condition,
				Client.class);
		System.out.println("bfhdndjvnfbhjf-----------" + result.toString());
		if (result.size() <= 0) {
			return "";
		} else
			return JSONArray.fromObject(result).toString();
	}

	@Override
	public String changePassword(Client client) {
		return entityDao.updatePropByID(client, client.getID()) == 1 ? "true"
				: "false";
	}

	@Override
	public String changePersonnel(String clientNo,String clientID,String clientPassword,String companyID, String companyName,
			String mobilePhone, String fixedTelephone, String manage,
			String representative, String companyType, String remarks,
			String idCardLicense, String idCardAptitude) {
		Company company2 = new Company();
		Client client = new Client();
		
		client.setID(clientID);
		client.setClientNo(clientNo);
		client.setPassword(clientPassword);
		client.setCreateTime(new Date());
		client.setCompanyID(companyID);
		client.setReviewStatus("0");
		
		company2.setID(companyID);
		company2.setCompanyName(companyName);
		company2.setAddress(mobilePhone);
		company2.setMobilephone(fixedTelephone);
		company2.setBusinessLicence(idCardLicense);
		company2.setLegal(representative);
		company2.setScope(manage);
		company2.setQulicationPic(idCardAptitude);
		company2.setRemarks(remarks);
		company2.setType(Integer.parseInt(companyType));
		entityDao.updatePropByID(client, client.getID());
		return entityDao.updatePropByID(company2, company2.getID()) == 1 ? "true"
				: "false";
	}

	@Override
	public String clientlogout(Client client, HttpSession session) {
		// TODO Auto-generated method stub
		session.removeAttribute("clientNo");
		session.removeAttribute("password");
		  return "true";
	}

	@Override
	public String findPassword(String clientNo,String phoneNumber) {
		String condition = " 1 = 1 ";
		if (clientNo != null && !clientNo.trim().toString().equals("null")) {
			condition = " 1 = 1 and clientNo =  '" + clientNo + "'";
		} 
		
		List<Map<String, Object>> enList = searchDao.searchForeign(
				new String[]{
						"client.ID AS ID",
						"clientNo",
						"password",
						"company.ID AS ID",
						"phoneNumber",
						},
				"client",
				" join company on client.companyID = company.ID"
				, null, null, condition);
		if(phoneNumber.equals(enList.get(0).get("phoneNumber"))){
			try {
				sendSuccessMessage((String)enList.get(0).get("phoneNumber"),(String)enList.get(0).get("clientNo"),(String)enList.get(0).get("password"));
			} catch (Exception e) {
				e.printStackTrace();
			}
			return "true";
		}
	    return "false";
	}
	
	/**
	 * 
	 * @description 发送更改密码的短信
	 * @author 李龙順
	 * @created 2016-10-14 下午16:15
	 * @param phnumber content
	 * @return
	 * @throws Exception
	 */
	public String sendSuccessMessage(String phnumber,String accountName,String password) throws Exception{
		accountName = URLDecoder.decode(accountName,"utf-8");
		DefaultHttpClient httpClient = new DefaultHttpClient();
        String url = "https://api.netease.im/sms/sendtemplate.action";
        HttpPost httpPost = new HttpPost(url);
        
        String appKey = "4c1f5298892a30736838d8858b33938e";
        String appSecret = "c09c739d40cf";
        String nonce =  "12345";
        String curTime = String.valueOf((new Date()).getTime() / 1000L);
        String checkSum = this.getCheckSum(appSecret, nonce ,curTime);//参考 计算CheckSum的java代码
        
        // 设置请求的header
        System.out.println("checkSum："+checkSum);
        httpPost.addHeader("AppKey", appKey);
        httpPost.addHeader("Nonce", nonce);
        httpPost.addHeader("CurTime", curTime);
        httpPost.addHeader("CheckSum", checkSum);
        httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        phnumber="['"+phnumber+"']";
        String content = "";
        content="['"+accountName+"','"+password+"']";
    	System.out.println("phone："+phnumber+" content:"+content);
        // 设置请求的参数
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
        nvps.add(new BasicNameValuePair("templateid","3030278"));
        nvps.add(new BasicNameValuePair("mobiles",phnumber));
        nvps.add(new BasicNameValuePair("params",content));
        httpPost.setEntity(new UrlEncodedFormEntity(nvps, "utf-8"));

        // 执行请求
        HttpResponse response = httpClient.execute(httpPost);
        
        // 打印执行结果
        System.out.println("打印发送结果");
        System.out.println("____"+EntityUtils.toString(response.getEntity(),"utf-8"));
        return "ttt";
	}

	
	
	/**
	 * 
	 * @description 获取checkSUM
	 * @author fujianfei
	 * @created 2016-10-8 下午7:58:31
	 * @param appSecret
	 * @param nonce
	 * @param curTime
	 * @return
	 */
	public static String getCheckSum(String appSecret, String nonce, String curTime) {
        return encode("sha1", appSecret + nonce + curTime);
    }
	
	public static String getMD5(String requestBody) {
        return encode("md5", requestBody);
    }
	
	private static String encode(String algorithm, String value) {
        if (value == null) {
            return null;
        }
        try {
            MessageDigest messageDigest
                    = MessageDigest.getInstance(algorithm);
            messageDigest.update(value.getBytes());
            return getFormattedText(messageDigest.digest());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
	
	private static String getFormattedText(byte[] bytes) {
        int len = bytes.length;
        StringBuilder buf = new StringBuilder(len * 2);
        for (int j = 0; j < len; j++) {
            buf.append(HEX_DIGITS[(bytes[j] >> 4) & 0x0f]);
            buf.append(HEX_DIGITS[bytes[j] & 0x0f]);
        }
        return buf.toString();
    }
	
	private static final char[] HEX_DIGITS = { '0', '1', '2', '3', '4', '5',
        '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
   
	
}
                          