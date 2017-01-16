package com.cqut.xiji.service.paymentDetail;

import java.util.Map;

import com.cqut.xiji.entity.paymentDetail.PaymentDetail;

public interface IPaymentDetailService {

	Map<String, Object> getPaymentDetailWithPaging(String jouranlAccountsID,int limit, int offset,
			String order, String sort);

	String upPaymentDetail(String payMentDetailID,String receiptlistID,
			String drawID, String payMoney, String remarks);

	String addPaymentDetail(String jouranlAccountID, String employeeID,
			String drawID, String receiptlistID, String payMoney, String remarks);

	String delPaymentDetail(String paymentDetailID);
	
}
