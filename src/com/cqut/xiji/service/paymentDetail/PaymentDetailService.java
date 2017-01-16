package com.cqut.xiji.service.paymentDetail;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.paymentDetail.PaymentDetail;
import com.cqut.xiji.entity.receiptlist.Receiptlist;
import com.cqut.xiji.entity.standard.Standard;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.treeNode.Node;
import com.cqut.xiji.tool.treeNode.NodeList;
import com.cqut.xiji.tool.util.EntityIDFactory;
import com.mysql.fabric.xmlrpc.base.Data;

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

	@Override
	public Map<String, Object> getPaymentDetailWithPaging(String jouranlAccountsID,int limit,
			int offset, String order, String sort) {
		int index = limit;
		int pageNum = offset/limit;
		String baseEntity = "paymentDetail";
		String[] properties = {
				"paymentdetail.ID as paymentdetailID",
				"paymentdetail.employeeID as createrID",
				"paymentdetail.receiptlistID",
				"receiptlist.receiptlistCode",
				"company.companyName",
				"contract.contractCode",
				"contract.contractName",
				"paymentdetail.drawID",
				"drawEmployee.employeeName AS drawName",
				"jouranlaccount.invoice",
				"paymentdetail.payMoney",
				"employee.employeeName",
				"paymentdetail.remarks"
		};
		
		String joinEntity = " LEFT JOIN jouranlaccount ON jouranlaccount.ID = paymentdetail.jouranlAccountID "
				+ " LEFT JOIN contract ON contract.ID = jouranlaccount.contractID "
				+ " LEFT JOIN receiptlist ON receiptlist.ID = paymentdetail.receiptlistID "
				+ " LEFT JOIN company ON company.ID = contract.companyID "
				+ " LEFT JOIN employee as drawEmployee ON drawEmployee.ID = paymentdetail.drawID "
				+ " LEFT JOIN employee ON employee.ID  = jouranlaccount.employeeID ";
		
		Map<String, Object> map = new HashMap<String, Object>();
		if(jouranlAccountsID == null && jouranlAccountsID.isEmpty()){
			return map;
		}
		String condition = " 1 = 1 AND paymentdetail.jouranlAccountID = " + jouranlAccountsID;
		
	    List<Map<String, Object>> result =  originalSearchWithpaging(properties, baseEntity, joinEntity, null, condition, false, null, sort, order, index, pageNum);
	    int count = getForeignCountWithJoin(joinEntity, null, condition, false);
		map.put("total", count);
		map.put("rows", result);
	    
		return map;
	}

	@Override
	public String upPaymentDetail(String payMentDetailID,String receiptlistID,
			String drawID, String payMoney,String remarks) {
		
		PaymentDetail detail = new PaymentDetail();
		
		detail.setDrawID(drawID);
		detail.setPayMoney(Integer.parseInt(payMoney));
		detail.setRemarks(remarks);
		detail.setReceiptlistID(receiptlistID);
		
		int result = entityDao.updatePropByID(detail, payMentDetailID);
		return result + "";
	}

	@Override
	public String addPaymentDetail(String jouranlAccountID, String employeeID,
			String drawID, String receiptlistID, String payMoney,String remarks) {
		PaymentDetail detail = new PaymentDetail();
		
		detail.setID(EntityIDFactory.createId());
		detail.setJouranlAccountID(jouranlAccountID);
		detail.setEmployeeID(employeeID);
		detail.setDrawID(drawID);
		detail.setReceiptlistID(receiptlistID);
		detail.setPayMoney(Double.parseDouble(payMoney) );
		detail.setCreateTime(new Date());
		detail.setRemarks(remarks);
		
		int result = entityDao.save(detail);
		return result + "";
	}

	@Override
	public String delPaymentDetail(String paymentDetailID) {
		if(paymentDetailID == null || paymentDetailID.isEmpty()){
			return 0+"";
		}
		int result = entityDao.deleteByID(paymentDetailID, PaymentDetail.class);
		return result+"";
	}
	
}
