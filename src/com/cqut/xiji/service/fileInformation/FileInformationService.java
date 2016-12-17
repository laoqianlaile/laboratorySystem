package com.cqut.xiji.service.fileInformation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.service.base.SearchService;

@Service
public class FileInformationService extends SearchService implements IFileInformationService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	public String recontractID="";
	@Override
	public String getBaseEntityName() {
		return "fileInformation";
	}

	@Override
	public String getBasePrimaryKey() {
		return "fileInformation.ID";
	}
	
	/**
	 * 
	 * @description 初始化检测报告表
	 * @author fujianfei
	 * @created 2016-10-8 下午8:05:20
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param tableName
	 * @return
	 * @see com.cqut.xiji.service.fileInformation.IFileInformationService#getWithPaging(int, int, java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, Object> getWithPaging(int limit,int offset,String order,String sort,String tableName){
		System.out.println("file222" + "<br />");
		int index = limit;
		int pageNum = offset/limit + 1;
		String tablename = "fileinformation";
		String[] properties = new String[]{
				"ID",
				"fileName",
				"uploadTime"
		};
		System.out.println(recontractID);
		String condition = "type=4"+"\t"+"and"+"\t"+"belongtoID="+"\""+recontractID+"\"";
		System.out.println(condition);
		List<Map<String, Object>> result = entityDao.searchWithpaging(properties, tablename, null, null, condition, null, order, sort, index, pageNum);
		int count = entityDao.getByCondition(condition, FileInformation.class).size();
		String receive ="";
		String receName="";
		for (Map<String, Object> m : result)  
	    { 
			receName =m.get("fileName").toString();
			receive="<span class='tabledata'>" + m.get("uploadTime").toString() + "</span>";
	    	m.put("fileName","<img class='point-image' src='Portal/images/point_triangle.png' />"+"<span class='tablevalue'>" + m.get("fileName")+"</span>" + receive+"<img class='downloadpng' src='Portal/images/downlosd_icon.png' />");
	    	m.put("filename", receName);
	       
	    }
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows",result);

		return map;
	}

	/**
	 * 
	 * @description 获取文件ID
	 * @author fei
	 * @created 2016-10-8 下午8:05:40
	 * @param contractID
	 * @return
	 * @see com.cqut.xiji.service.fileInformation.IFileInformationService#setcontractID(java.lang.String)
	 */
	@Override
	public int setcontractID(String contractID) {
		this.recontractID=contractID;
		return 1;
	};
	
	/**
	 * 
	 * @description 分配任务下获取文件信息
	 * @author chenyubo
	 * @created 2016年10月13日 下午2:42:29
	 * @param ID
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @return
	 * @see com.cqut.xiji.service.fileInformation.IFileInformationService#getFileInTaskWithPaging(java.lang.String, int, int, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, Object> getFileInTaskWithPaging(String ID, int limit, int offset, String sort, String order){
		int index = limit;
		int pageNum = offset/limit;
		String tableName = "fileInformation";
		String[] properties = new String[]{
			"fileInformation.ID",
			"fileInformation.fileName",
			"date_format(fileInformation.uploadTime,'%Y-%m-%e') as uploadTime",
			"fileInformation.remarks",
			"fileInformation.path"
		};
		
		String condition = "1 = 1 "
				+ "and fileInformation.belongToID = '" + ID + "'";
		
		List<Map<String, Object>> result  = entityDao.searchWithpaging(properties, tableName, null, null, condition, null, sort, order, index, pageNum);
		int count = entityDao.getForeignCount(getBasePrimaryKey(), tableName, null, null, condition);
		
//		List<Map<String, Object>> result = originalSearchWithpaging(properties, tableName, null, foreignEntitys, condition, false, null, sort, order, index, pageNum);
//		int count = getForeignCount(foreignEntitys, condition, false);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		return map;
	}
    /**
     * 
     * 通过文件ID修改备注信息
     * @author wzj
     * @date 2016年11月20日 下午9:58:41
     *
     */
	@Override
	public String updateRemarksByID(String fileID, String remarks) {
		// TODO Auto-generated method stub
		if(fileID == null || fileID.equals(""))
			return "false";
		FileInformation fileInformation = entityDao.getByID(fileID, FileInformation.class);
		fileInformation.setRemarks(remarks);
		return entityDao.updatePropByID(fileInformation, fileID) == 1 ? "true" :"false";
	}
    /**
     * 
     * 通过文件ID删除文件记录
     * @author wzj
     * @date 2016年11月22日 上午1:56:33
     *
     */
	@Override
	public String deleteFileByID(String fileID) {
		// TODO Auto-generated method stub
		if(fileID == null || fileID.equals(""))
			return "false";
		/*
		 * return entityDao.deleteByID(fileID, FileInformation.class) == 1 ? "true" : "fasle";
		 * 
		 * */
		FileInformation fileInformation = entityDao.getByID(fileID, FileInformation.class);
		fileInformation.setState(1);
		int retur = entityDao.updatePropByID(fileInformation, fileID);
		return retur == 1 ? "true" : "false";
	}
	

	
	@Override
	public Map<String, Object> getFileInReceiptlistWithPaging(String ID, int limit, int offset, String sort, String order){
		int index = limit;
		int pageNum = offset/limit + 1;
		String tableName = "fileInformation";
		String[] properties = new String[]{
			"fileInformation.ID",
			"fileInformation.fileName",
			"date_format(fileInformation.uploadTime,'%Y-%m-%e') as uploadTime",
			"fileInformation.remarks",
		};
		
		String condition = "1 = 1 "
				+ "and fileInformation.belongToID = " + ID;
		
		List<Map<String, Object>> result  = entityDao.searchWithpaging(properties, tableName, null, null, condition, null, sort, order, index, pageNum);
		int count = entityDao.getForeignCount(getBasePrimaryKey(), tableName, null, null, condition);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		return map;
	}

	@Override
	public Map<String, Object> getContractFileWithPaging(int limit, int offset,
			String order, String sort, String ID){
		int index = limit;
		int pageNum = offset/limit + 1;
		String tableName = "fileInformation";
		String[] properties = new String[]{
			"fileInformation.ID",
			"fileInformation.fileName",
			"employee.employeeName",
			"fileInformation.uploaderID",
			"date_format(fileInformation.uploadTime,'%Y-%m-%e') as uploadTime",
			"case when fileInformation.state = 0 then '未提交' " + 
			"when fileInformation.state = 1 then '待审核' " + 
			"when fileInformation.state = 2 then '通过' " + 
			"when fileInformation.state = 3 then '驳回' end as state",
			"fileInformation.remarks"
		};
		String joinEntity = " LEFT JOIN employee ON fileInformation.uploaderID = employee.ID ";
		
		String condition = "1 = 1 ";
		
		if(ID != null && !ID.isEmpty()){
			condition = " and fileInformation.belongToID = " + ID;
		}
		
		List<Map<String, Object>> result  = entityDao.searchWithpaging(properties, tableName, joinEntity, null, condition, null, sort, order, index, pageNum);
		int count = entityDao.getForeignCount(getBasePrimaryKey(), tableName, null, null, condition);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		return map;
	}
	
	@Override
	public Map<String, Object> getFileInSampleWithPaging(String taskID, int limit, int offset, String sort, String order){
		int index = limit;
		int pageNum = offset/limit;
		String tableName = "fileInformation";
		String[] properties = new String[]{
			"fileInformation.ID AS ID",
			"fileInformation.fileName AS fileName",
			"date_format(fileInformation.uploadTime,'%Y-%m-%d %H:%i:%s') as uploadTime",
			"fileInformation.remarks AS remarks",
		};
		String condition = " 1 = 1 and fileInformation.belongToID = " + taskID;
		List<Map<String, Object>> result  = entityDao.searchWithpaging(properties, tableName, null, null, condition, null, sort, order, index, pageNum);
		int count = entityDao.getForeignCount(getBasePrimaryKey(), tableName, null, null, condition);		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);	
		return map;
	}
}
