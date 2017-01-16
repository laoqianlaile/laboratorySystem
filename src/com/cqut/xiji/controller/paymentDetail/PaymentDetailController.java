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
	 * 通过流水账ID 分页初始化支付详情
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
	 * 更新支付详情
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
	public String upPaymentDetail(String payMentDetailID,String receiptlistID,String drawID,String PayMoney,String remarks){
		String result = service.upPaymentDetail(payMentDetailID,receiptlistID,drawID,PayMoney,remarks);
		return result;
	}
	
	
	/**
	 * 新增支付详情
	 * 
	 * @author zkl
	 * @param jouranlAccountID
	 * @param employeeID
	 * @param drawID
	 * @param receiptlistID
	 * @param payMoney
	 * @return
	 */
	@RequestMapping("/addPaymentDetail")
	@ResponseBody
	public String addPaymentDetail(String jouranlAccountID,String employeeID,String drawID,String receiptlistID,String payMoney,String remarks){
		String result = service.addPaymentDetail(jouranlAccountID,employeeID,drawID,receiptlistID,payMoney,remarks);
		return result;
	}
	
	
	/**
	 * 删除支付详情
	 * 
	 * @author zkl
	 * @param paymentDetailID
	 * @return
	 */
	@RequestMapping("/delPaymentDetail")
	@ResponseBody
	public String delPaymentDetail(String paymentDetailID){
		String result = service.delPaymentDetail(paymentDetailID);
		return result;
	}
}
