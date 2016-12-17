package com.cqut.xiji.service.paymentDetail;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.service.base.SearchService;

@Service
public class PaymentDetailService extends SearchService implements IPaymentDetailService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "paymentDetail";
	}

	@Override
	public String getBasePrimaryKey() {
		return "paymentDetail.ID";
	}
	
}
