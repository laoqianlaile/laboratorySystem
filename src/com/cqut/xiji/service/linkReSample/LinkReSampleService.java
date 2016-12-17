package com.cqut.xiji.service.linkReSample;

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
import com.cqut.xiji.entity.company.Company;
import com.cqut.xiji.entity.linkReSample.LinkReSample;
import com.cqut.xiji.entity.sample.Sample;
import com.cqut.xiji.entity.testProject.TestProject;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.treeNode.Node;
import com.cqut.xiji.tool.treeNode.NodeList;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class LinkReSampleService extends SearchService implements
		ILinkReSampleService {

	@Resource(name = "entityDao")
	EntityDao entityDao;

	@Resource(name = "searchDao")
	SearchDao searchDao;

	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "linkReSample";
	}

	@Override
	public String getBasePrimaryKey() {
		return "linkReSample.ID";
	}

	/**
	 * @description 获取交接单中样品
	 * @author hzz
	 * @date 2016年 10月19日 晚上 19:15:49
	 */
	@Override
	public Map<String, Object> getlinkReSampleInforWithPaging(String ID,
			int limit, int offset, String sort, String order) {
		int index = limit;
		int pageNum = offset / limit;
		String[] properties = new String[] {
				"sample.ID",
				"linkReSample.ID AS linkID",
				"sample.factoryCode",
				"sample.sampleName",
				"sample.specifications",
				"testProject.nameCn",
				"testProject.ID AS testID",
				"date_format(linkReSample.createTime,'%Y-%m-%d') as createTime", };

		String joinEntity = " left join sample on linkReSample.sampleID =sample.ID "
				+ " left join task on sample.ID =task.sampleID "
				+ " left join testProject on task.testProjectID = testProject.ID ";
		String condition = "1 = 1 and linkReSample.receiptlistID = " + ID;
		
		List<Map<String, Object>> result = searchPagingWithJoin(properties,
				joinEntity, null, condition, false, index, pageNum);
		int count = getForeignCountWithJoin(joinEntity, null, condition, false);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);

		return map;
	}

	@Override
	public List<Map<String, Object>> getRequire(String ID) {
		String tableName = "linkReSample";
		String[] properties = new String[] { "task.require", };
		String[] foreignEntitys = new String[] { "sample", "task" };

		String condition = "linkReSample.ID= " + ID
				+ " and linkReSample.sampleID = sample.ID"
				+ " and task.sampleID = sample.ID";

		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				tableName, null, foreignEntitys, condition);

		return result;
	}

	/**
	 * @description  更新交接单中样品信息
	 * @author hzz
	 * @date 2016年 11月12日  早上09:30:15
	 */
	@Override
	public String updlinkReSampleInForInReturn(String ID, String linkID,
			String testID, String factoryCode, String sampleName,
			String specifications, String nameCn, String createTime) {
		if (ID == null || ID.equals("")) {
			return "false";
		}
		Sample sample = entityDao.getByID(ID, Sample.class);
		if (sample == null)
			return "false";
		sample.setFactoryCode(factoryCode);
		sample.setSampleName(sampleName);
		sample.setSpecifications(specifications);
		if (linkID == null || linkID.equals("")) {
			return "false";
		}
		LinkReSample linksample = entityDao.getByID(linkID, LinkReSample.class);
		if (linksample == null)
			return "false";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date createTime1 = null;
		try {
			createTime1 = sdf.parse(createTime);
			System.out.println(createTime1);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		if (createTime1 != null) {
			linksample.setCreateTime(createTime1);
		}

		if (testID == null || testID.equals("")) {
			return "false";
		}
		System.out.println(testID);
		TestProject testproject = entityDao.getByID(testID, TestProject.class);
		if (testproject == null)
			return "false";
		testproject.setNameCn(nameCn);
		return entityDao.updatePropByID(sample, ID)
				+ entityDao.updatePropByID(linksample, linkID)
				+ entityDao.updatePropByID(testproject, testID) == 3 ? "true"
				: "false";

	}

	/**
	 * @description  删除交接单中的样品
	 * @author hzz
	 * @date  2016年11月16日 早上 10:38:52
	 */
	@Override
	public String delLinkReSample(String linkID) {
		System.out.println(linkID);
		return entityDao.deleteByID(linkID, LinkReSample.class) == 1 ? "true"
				: "false";
	}

	/**
	 * @description  录入样品
	 * @author hzz
	 * @date  2016年11月17日晚上 20:23:10
	 */
	@Override
	public String addLinkSample(String ID, String receiptlistID) {
		LinkReSample linkReSample = null;
		linkReSample = new LinkReSample();
		linkReSample.setID(EntityIDFactory.createId());
		linkReSample.setSampleID(ID);
		linkReSample.setReceiptlistID(receiptlistID);
		linkReSample.setCreateTime(new Date());
		return entityDao.save(linkReSample) == 1 ? "true" : "false";
	}

	/**
	 * @description 获取样品ID
	 * @author hzz 
	 * @date 2016年11月17日 晚上22:37:58
	 */
	@Override
	public List<Map<String, Object>> getSampleID(String qrcode) {
		String[] properties = new String[] {"ID"};
		String condition = "qrcode=" + qrcode;
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Sample.class );
		return result;
	}

}
