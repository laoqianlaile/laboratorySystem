package com.cqut.xiji.service.paymentDetail;

import javax.annotation.Resource;
import net.sf.json.JSONArray;
import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.paymentDetail.PaymentDetail;
import com.cqut.xiji.service.base.SearchService;

import com.cqut.xiji.tool.treeNode.Node;
import com.cqut.xiji.tool.treeNode.NodeList;
import com.cqut.xiji.tool.util.EntityIDFactory;

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
