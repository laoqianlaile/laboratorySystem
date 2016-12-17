package com.cqut.xiji.controller.contract;

import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.contract.IContractService;

@Controller
@RequestMapping("/contractController")
public class ContractController{
	
	@Resource(name="contractService")
	IContractService service;
	
	/**
	 * 
	 * @description 初始化数据
	 * @author hujiajun
	 * @created 2016-10-17 下午9:30:39
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @param contractName
	 * @param contractCode
	 * @param employeeName
	 * @param companyName
	 * @param startTime
	 * @param endTime
	 * @param oppositeMen
	 * @param linkPhone
	 * @param state
	 * @return
	 */
	@RequestMapping("/getContractWithPaging2")  
    @ResponseBody
	public JSONObject getContractWithPaging2(int limit, int offset, String sort, String order, String contractName, String contractCode, String employeeName, String companyName, String startTime, String endTime, String oppositeMen, String linkPhone, int state){
		Map<String, Object> result = service.getContractWithPaging2(limit,offset,sort,order,contractName,contractCode,employeeName,companyName,startTime,endTime,oppositeMen,linkPhone,state);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * @description 添加新合同
	 * @author hujiajun
	 * @created 2016-10-17 下午9:30:39
	 * @param contractName
	 * @param companyName
	 * @param oppositeMen
	 * @param linkPhone
	 * @param employeeName
	 * @param signAddress
	 * @return
	 */
	@RequestMapping("/addContract")  
    @ResponseBody
	public String addContract(String contractName, String companyName, String oppositeMen,String linkPhone, String employeeName, String signAddress,String startTime,String signTime, String endTime){
		String result = service.addContract(contractName, companyName, oppositeMen, linkPhone, employeeName, signAddress, startTime, signTime, endTime);
		return result;
	}
	
	/**
	 * @description 删除合同
	 * @author hujiajun
	 * @created 2016-10-17 下午9:31:13
	 * @param contractCodes
	 * @return
	 */
	@RequestMapping("/delContract")  
    @ResponseBody
	public String delContract(String contractCodes){
		String result = service.delContract(contractCodes);
		return result;
	}
	
	/**
	 * @description 通过合同编码得到ID
	 * @author hujiajun
	 * @created 2016-10-17 下午9:31:59
	 * @param contractCode
	 * @return
	 */
	@RequestMapping("/getIdByCode")  
    @ResponseBody
	public String getIdByCode(String contractCode){
		List<Map<String, Object>> result = service.getIdByCode(contractCode);
		return JSONArray.fromObject(result).toString();
	}
	
	@RequestMapping("/getContractByCode")  
    @ResponseBody
	public String getContractByCode(String contractCode){
		List<Map<String, Object>> result = service.getContractByCode(contractCode);
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * @description 更新合同信息
	 * @author hujiajun
	 * @created 2016-10-17 下午9:33:41
	 * @param ID
	 * @param contractCode
	 * @param contractName
	 * @param companyName
	 * @param oppositeMen
	 * @param linkPhone
	 * @param employeeName
	 * @param signAddress
	 * @param startTime
	 * @param signTime
	 * @param endTime
	 * @param contractAmount
	 * @param isClassified
	 * @param classifiedLevel
	 * @param state
	 * @return
	 */
    @RequestMapping("/updContract")  
    @ResponseBody
	public String updContract(String ID, String contractCode,String contractName, String companyName, String oppositeMen,String linkPhone, String employeeName, String signAddress,String startTime,String signTime, String endTime,double contractAmount,int isClassified,int classifiedLevel,int state){
		String result = service.updContract(ID, contractCode, contractName, companyName, oppositeMen, linkPhone, employeeName, signAddress, startTime, signTime, endTime, contractAmount, isClassified, classifiedLevel, state);
		return result;
	}
	
    /**
     * 
     * @description 添加审核意见
     * @author hujiajun
     * @created 2016-10-22 下午5:24:50
     * @param ID
     * @param viewpoint
     * @param state
     * @return
     */
    @RequestMapping("/auditContract")  
    @ResponseBody
	public int auditContract(String ID, String viewpoint, int state){
		int result = service.auditContract(ID,viewpoint,state);
		return result;
	}
    
	/**
	 * 
	 * @description 初始化表格
	 * @author fujianfei
	 * @created 2016-10-8 下午7:55:23
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param tableName
	 * @return
	 */
	@RequestMapping("/getContractWithPaging")
	@ResponseBody
	public JSONObject getContractWithPaging(int limit, int offset,String order, String sort, String tableName){
		
		System.out.println("访问到了1 "+ "<br />");
		Map<String, Object> result = service.getContractWithPaging(limit, offset, order, sort, tableName);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
	 * @description 发送验证码
	 * @author fujianfei
	 * @created 2016-10-8 下午7:55:07
	 * @param phnumber
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/sendSms")
	@ResponseBody
	public String sendSms(String phnumber) throws Exception{
		DefaultHttpClient httpClient = new DefaultHttpClient();
        String url = "https://api.netease.im/sms/sendcode.action";
        HttpPost httpPost = new HttpPost(url);
        
        String appKey = "e88821cfc09446e698163f193feb03ed";
        String appSecret = "0836ea59c6bc";
        String nonce =  "12345";
        String curTime = String.valueOf((new Date()).getTime() / 1000L);
        String checkSum = ContractController.getCheckSum(appSecret, nonce ,curTime);//参考 计算CheckSum的java代码
        
        // 设置请求的header
        System.out.println("checkSum："+checkSum);
        httpPost.addHeader("AppKey", appKey);
        httpPost.addHeader("Nonce", nonce);
        httpPost.addHeader("CurTime", curTime);
        httpPost.addHeader("CheckSum", checkSum);
        httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        
        // 设置请求的参数
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
        nvps.add(new BasicNameValuePair("mobile",phnumber));
        httpPost.setEntity(new UrlEncodedFormEntity(nvps, "utf-8"));

        // 执行请求
        HttpResponse response = httpClient.execute(httpPost);
        
        // 打印执行结果
        System.out.println("打印发送结果");
        //System.out.println(EntityUtils.toString(response.getEntity(), "utf-8"));
        String stringResult = new String(EntityUtils.toString(response.getEntity(), "utf-8"));
        JSONObject  jasonObject = JSONObject.fromObject(stringResult);
        Map map = jasonObject;
        String returncode= map.get("code").toString();
        System.out.println(returncode);
        return returncode;
	}
	
	/**
	 * 
	 * @description 校验验证码
	 * @author fujianfei
	 * @created 2016-10-8 下午7:54:25
	 * @param phnumber
	 * @param code
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/checkver")
	@ResponseBody
	public String checkver(String phnumber,String code) throws Exception{
		DefaultHttpClient httpClient = new DefaultHttpClient();
        String url = "https://api.netease.im/sms/verifycode.action";
        HttpPost httpPost = new HttpPost(url);

        String appKey = "e88821cfc09446e698163f193feb03ed";
        String appSecret = "0836ea59c6bc";
        String nonce =  "12345";
        String curTime = String.valueOf((new Date()).getTime() / 1000L);
        String checkSum = ContractController.getCheckSum(appSecret, nonce ,curTime);//参考 计算CheckSum的java代码
        // 设置请求的header
        System.out.println("checkSum："+checkSum);
        httpPost.addHeader("AppKey", appKey);
        httpPost.addHeader("Nonce", nonce);
        httpPost.addHeader("CurTime", curTime);
        httpPost.addHeader("CheckSum", checkSum);
        httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        // 设置请求的参数
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
        nvps.add(new BasicNameValuePair("mobile",phnumber));
        nvps.add(new BasicNameValuePair("code",code));
        httpPost.setEntity(new UrlEncodedFormEntity(nvps, "utf-8"));

        // 执行请求
        HttpResponse response1 = httpClient.execute(httpPost);
        // 打印执行结果
        System.out.println("验证打印验证结果");
        String stringResult = new String(EntityUtils.toString(response1.getEntity(), "utf-8"));
        JSONObject  jasonObject = JSONObject.fromObject(stringResult);
        Map map = jasonObject;
        String returncode= map.get("code").toString();
        System.out.println(returncode);
        //   System.out.println(EntityUtils.toString(response1.getEntity(), "utf-8"));
        return returncode;
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
	
	/**
	 * 获得公司信息
	 * @author hzz
	 * @date 2016年11月30日 中午12:40:15
	 * @param contractCode
	 * @return
	 */
	@RequestMapping("/getcompanyInforByCode")  
    @ResponseBody
	public String getcompanyInforByCode(String contractCode){
		System.out.println(contractCode);
		List<Map<String, Object>> result = service.getcompanyInforByCode(contractCode);
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * 获取合同ID、合同编码、合同名称、合同金额
	 * 
	 * @author zkl
	 * @return
	 */
	@RequestMapping("/getContract")
	@ResponseBody
	public String getContract(){
		List<Map<String, Object>> result = service.getContract();
		return JSONArray.fromObject(result).toString();
	}
}
