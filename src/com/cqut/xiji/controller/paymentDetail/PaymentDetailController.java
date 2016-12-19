package com.cqut.xiji.controller.paymentDetail;

import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.paymentDetail.IPaymentDetailService;

@Controller
@RequestMapping("/paymentDetailController")
public class PaymentDetailController{
	
	@Resource(name="paymentDetailService")
	IPaymentDetailService service;
	
	@RequestMapping("/getPaymentDetailWithPaging")
	@ResponseBody
	public JSONObject getPaymentDetailWithPaging(String jouranlAccountsID,int limit, int offset, String order, String sort){
		Map<String, Object> result = service.getPaymentDetailWithPaging(jouranlAccountsID,limit,offset,order,sort);
		return JSONObject.fromObject(result);
	}
}
