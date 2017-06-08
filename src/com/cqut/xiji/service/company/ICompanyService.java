package com.cqut.xiji.service.company;

import java.util.List;
import java.util.Map;

import com.cqut.xiji.entity.company.Company;

public interface ICompanyService {
	public Map<String, Object> getCompanyWithPaging(int limit, int offset,
			String order, String sort, String roleName);

	public String addCompany(String NAME, String CONTACTOR,
			String CONTACTPHONE, String TELEPHONE, String ADDRESS,
			String SCOPE, String CREATTIMES, String REMARKES);

	public String delCompany(String COMPANYID);

	public String updCompany(String COMPANYID, String NAME, String CONTACTOR,
			String CONTACTPHONE, String TELEPHONE, String ADDRESS,
			String SCOPE, String CREATTIMES, String REMARKES);

	public Company setValue(String COMPANYID, String NAME, String CONTACTOR,
			String CONTACTPHONE, String TELEPHONE, String ADDRESS,
			String SCOPE, String CREATTIMES, String REMARKES);

	public List<Map<String, Object>> getCompanyMsg(String companyName);

	public List<Map<String, Object>> getCompanyName(String companyName);
   /**
    * 通过公司ID获取公司信息
    * @author wzj
    * @date 2016年11月21日 下午2:37:58
    * @param comID
    * @return
    */
	public Map<String, Object> getCompanyInformation(String comID);

List<Map<String, Object>> getComListByName(String companyName); //通过名字模糊搜索公司
public Map<String, Object> getCompanyWithPage(String companyName,String address,String linkMan,
		 int limit, int offset,String order, String sort);
public String addCompanywj(String companyName,String linkMan,String mobilePhone,
		String scope,String address,String fax,String emailbox);
public String updCompanywj(String ID,String companyName,String linkMan,String mobilePhone,
		String scope,String address,String fax,String emailbox);

}
