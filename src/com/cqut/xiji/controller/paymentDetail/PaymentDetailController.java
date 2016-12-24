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
	/**
	 * 
	 * 支付详情分页展示
	 * 
	 * @author zkl
	 * @param jouranlAccountsID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getPaymentDetailWithPaging")
	@ResponseBody
	public JSONObject getPaymentDetailWithPaging(String jouranlAccountsID,int limit, int offset, String order, String sort){
		Map<String, Object> result = service.getPaymentDetailWithPaging(jouranlAccountsID,limit,offset,order,sort);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
	 * 更新支付详细
	 * 
	 * @author zkl
	 * @param payMentDetailID
	 * @param receiptlistID
	 * @param receiptlistCode
	 * @param drawID
	 * @param PayMoney
	 * @param remarks
	 * @return
	 */
	@RequestMapping("/upPaymentDetail")
	@ResponseBody
	public String upPaymentDetail(String payMentDetailID,String receiptlistID, String receiptlistCode,String drawID,String PayMoney,String remarks){
		String result = service.upPaymentDetail(payMentDetailID,receiptlistID,receiptlistCode,drawID,PayMoney,remarks);
		return result;
	}
}
