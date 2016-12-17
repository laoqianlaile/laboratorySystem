package com.cqut.xiji.service.standardType;

import java.util.Arrays;
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
import com.cqut.xiji.entity.standard.Standard;
import com.cqut.xiji.entity.standardType.StandardType;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.treeNode.Node;
import com.cqut.xiji.tool.treeNode.NodeList;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class StandardTypeService extends SearchService implements
		IStandardTypeService {

	@Resource(name = "entityDao")
	EntityDao entityDao;

	@Resource(name = "searchDao")
	SearchDao searchDao;

	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "standardType";
	}

	@Override
	public String getBasePrimaryKey() {
		return "standardType.ID";
	}

	@Override
	public Map<String, Object> getStandardTypeWithPaging(
			String STANDARDTYPECODE, String STANDARDTYPENAME, int limit,
			int offset, String order, String sort) {

		int index = limit;
		int pageNum = offset / limit;

		String tableName = "StandardType";
		String[] properties = new String[] { "standardType.ID",
				"standardType.STANDARDTYPECODE",
				"standardType.STANDARDTYPENAME", 
				"DATE_FORMAT(standardType.CREATETIME,'%Y-%m-%d ') as CREATETIME ", 
				};

		String condition = " 1 = 1 ";
		if (STANDARDTYPECODE != null && STANDARDTYPECODE != "") {
			condition += " and standardType.STANDARDTYPECODE LIKE  '%"
					+ STANDARDTYPECODE + "%' ";
		}

		if (STANDARDTYPENAME != null && STANDARDTYPENAME != "") {
			condition += " and standardType.STANDARDTYPENAME LIKE  '%"
					+ STANDARDTYPENAME + "%' ";
		}

		List<Map<String, Object>> result = originalSearchWithpaging(properties,
				tableName, null, null, condition, false, null, sort, order,
				index, pageNum);
		int count = entityDao
				.getCountByCondition(condition, StandardType.class);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;

	}

	@Override
	public String addStandard(String standardTypeCode, String standardTypeName) {

		StandardType standardType = new StandardType();
		
		standardType.setID(EntityIDFactory.createId());
		standardType.setStandardTypeCode(standardTypeCode);
		standardType.setStandardTypeName(standardTypeName);
		Date date = new Date();
		standardType.setCreateTime(date);
		
		int result = entityDao.save(standardType);

		return result + "";
	}

	@Override
	public String upStandardType(String standardTypeID ,String standardTypeCode,
			String standardTypeName) {
		StandardType standardType = new StandardType();
		
		standardType.setStandardTypeCode(standardTypeCode);
		standardType.setStandardTypeName(standardTypeName);
		
		int result = entityDao.updatePropByID(standardType, standardTypeID);
		return result + "";
	}

	@Override
	public String delStandardType(String StandardTypeIDs) {
		if(StandardTypeIDs == null || StandardTypeIDs.isEmpty()){
			System.out.println("数据为空");
			return 0+"";
		}
		String[] ids = StandardTypeIDs.split(",");
		System.out.println(Arrays.toString(ids));
		int result = entityDao.deleteEntities(ids,StandardType.class);
		return result+"";
	}

}
