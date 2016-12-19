package com.cqut.xiji.service.paymentDetail;

import java.util.Map;

import com.cqut.xiji.entity.paymentDetail.PaymentDetail;

public interface IPaymentDetailService {

	Map<String, Object> getPaymentDetailWithPaging(String jouranlAccountsID,int limit, int offset,
			String order, String sort);
	
}
