package com.cqut.xiji.service.sampleRecord;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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
import com.cqut.xiji.entity.employee.Employee;
import com.cqut.xiji.entity.sample.Sample;
import com.cqut.xiji.entity.sampleRecord.SampleRecord;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class SampleRecordService extends SearchService implements
		ISampleRecordService {

	@Resource(name = "entityDao")
	EntityDao entityDao;

	@Resource(name = "searchDao")
	SearchDao searchDao;

	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "sampleRecord";
	}

	@Override
	public String getBasePrimaryKey() {
		return "sampleRecord.ID";
	}

	@Override
	public Map<String, Object>  getSample(String factoryCode) {
			String[] properties = new String[] { "sample.ID","sample.sampleName","sample.specifications"};

			String condition = "1 = 1 " + "and sample.factoryCode= '"
					+ factoryCode + "'";
			List<Map<String, Object>> list = entityDao.findByCondition(properties, condition, Sample.class);
			if (list != null  && list.size() >0) {
				Map<String, Object>  map =list.get(0) ;
                return map;
			} else return null;
	}
	@Override
	public Map<String, Object> addJudge(String factoryCode) {
		String[] properties = new String[] { "sample.state"};

		String condition = "1 = 1 " + "and sample.factoryCode= '"
				+ factoryCode + "'";
		List<Map<String, Object>> list = entityDao.findByCondition(properties, condition, Sample.class);
		if (list != null  && list.size() >0) {
			Map<String, Object>  map =list.get(0) ;
            return map;
		} else return null;
}
		
	
	@Override
	public String getSampleRecordAll() {
		List<SampleRecord> resultList = entityDao.getByCondition(" 1=1 ",
				SampleRecord.class);
		return resultList.toString();
	}

	@Override
	public Map<String, Object> getSampleRecordWithPaging(String factoryCode,
			String sampleName, String specifications, String getMan, int limit,
			int offset, String order, String sort) {
		int index = limit;
		int pageNum = offset / limit;
		String tableName = "sampleRecord";
		String[] properties = new String[] {
				"sampleRecord.ID",
				"sample.ID as sampleID",
				"sampleRecord.getMan as getManID",
				"sampleRecord.returnMan as returnManID",
				"sampleRecord.factoryCode",
				// "receiptlist.receiptlistCode",
				"sampleRecord.remarks",
				"sample.sampleName",
				"sample.specifications",
				"case when sampleRecord.Type=0 then '领样'"
						+ "when sampleRecord.Type=1 then '还样' end  as Type ",
				"case when sample.state=0 then '未领用'"
						+ "when sample.state=1 then '领用' end  as state ",
				"employee2.employeeName AS getMan",
				"DATE_FORMAT(sampleRecord.getTime,'%Y-%m-%d %H:%i:%s') as getTime",
				"employee.employeeName as returnMan",
				"DATE_FORMAT(sampleRecord.returnTime,'%Y-%m-%d %H:%i:%s') as returnTime" };
		String joinEntity = // " left join sampleInformation on sampleRecord.sampleInformationID = sampleInformation.ID "
		" left join sample on sampleRecord.factoryCode = sample.factoryCode "
				// +" left join receiptlist on sample.receiptlistID = receiptlist.ID"
				+ " left join employee on sampleRecord.returnMan = employee.ID"
				+ " left join employee as employee2 on sampleRecord.getMan = employee2.ID";
		String condition = " 1 = 1  ";
		if (factoryCode != null && !factoryCode.equals("")) {
			condition += " and sample.factoryCode like '%" + factoryCode
					+ "%'  ";
		}
		if (sampleName != null && !sampleName.equals("")) {
			condition += " and  sampleName like '%" + sampleName + "%'  ";
		}

		if (specifications != null && !specifications.equals("")) {
			condition += " and specifications like '%" + specifications
					+ "%'  ";
		}

		if (getMan != null && !getMan.equals("")) {
			condition += " and employee2.employeeName like '%" + getMan + "%'  ";
		}

		// if(receiptlistCode != null && !receiptlistCode.equals("")){
		// condition+=" and receiptlistCode like '%"+receiptlistCode+"%'  ";
		// }

		List<Map<String, Object>> result = originalSearchWithpaging(properties,
				tableName, joinEntity, null, condition, false, null, order,
				sort, index, pageNum);
		int count = getForeignCountWithJoin(joinEntity, null, condition, false);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);

		return map;
	}

	@Override
	public JSONArray getdatalist() {

		String[] properties = new String[] { "ID", "employeeName" };
		return JSONArray.fromObject(entityDao.findByCondition(properties,
				"1=1", Employee.class));

	}

	@Override
	public String addSampleRecord(String factoryCode, String sampleName,
			String specifications, String getMan, String getTime,
			String type, String remarks) {
		SampleRecord sampleRecord = new SampleRecord();
		sampleRecord.setID(EntityIDFactory.createId());
		sampleRecord.setFactoryCode(factoryCode);

		if (!getTime.equals("") && getTime != null) {
			sampleRecord.setGetTime(StrToDate(getTime));
		} else {
			sampleRecord.setGetTime(null);
		}
		sampleRecord.setRemarks(remarks);
		sampleRecord.setGetMan(getMan);
		try {
			sampleRecord.setType(Integer.parseInt(type));
			System.out.println(type);
		} catch (Exception e) {
			e.printStackTrace();
		}

		int result = entityDao.save(sampleRecord);
		String[] properties = new String[] { "sample.ID", };
		String condition = "1 = 1 " + "and sample.factoryCode= '" + factoryCode
				+ "'";

		String str = (String) entityDao
				.findByCondition(properties, condition, Sample.class).get(0)
				.get("ID");
		Sample sample = entityDao.getByID(str, Sample.class);
		if(type.equals("0")){
			sample.setState(1);
		}else {
			sample.setState(0);
		}
		int result1 = entityDao.updatePropByID(sample, str);

		return result + "" + result1 + "";

	}

	@Override
	public String updSampleRecord(String ID, String sampleID,
			String factoryCode, String sampleName, String specifications,
			String getManID, String getTime,String type, String remarks) {
		SampleRecord sampleRecord = entityDao.getByID(ID, SampleRecord.class);
		String SGF=sampleRecord.getFactoryCode();
		sampleRecord.setFactoryCode(factoryCode);
		sampleRecord.setGetMan(getManID);
		sampleRecord.setGetTime(StrToDate(getTime));
		sampleRecord.setRemarks(remarks);
		try {
			sampleRecord.setType(Integer.parseInt(type));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		int result = entityDao.updatePropByID(sampleRecord, ID);
			if(!factoryCode.equals(SGF)){
			Sample sample = entityDao.getByID(sampleID, Sample.class);
			int state = sample.getState();
			if (state == 0) {
				sample.setState(1);
			} else {
				sample.setState(0);
			}
			int Sresult = entityDao.updatePropByID(sample, sampleID);
			String[] properties = new String[] { "sample.ID", };
			String condition = "1 = 1 " + "and sample.factoryCode= '" + factoryCode
					+ "'";

			String str = (String) entityDao
					.findByCondition(properties, condition, Sample.class).get(0)
					.get("ID");
			Sample sample1 = entityDao.getByID(str, Sample.class);
			if(type.equals("0")){
				sample1.setState(1);
			}else {
				sample1.setState(0);
			}
			int result1 = entityDao.updatePropByID(sample1, str);
			}else{
				System.out.println(".............");
			}
			
		

		return result+"";
	}
	@Override
	public List<Map<String, Object>> getFactoryCode(String factoryCode) {
		String[] properties = new String[] {"factoryCode"};
		String condition = "factoryCode like '%" + factoryCode + "%'";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Sample.class);
		return result;
	}


	/**
	 * 字符串转换成日期
	 * 
	 * @param str
	 * @return date
	 */
	public static Date StrToDate(String str) {

		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = null;
		try {
			date = format.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	

}
