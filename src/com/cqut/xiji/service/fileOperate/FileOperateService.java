package com.cqut.xiji.service.fileOperate;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.role.Role;
import com.cqut.xiji.entity.testReport.TestReport;
import com.cqut.xiji.entity.fileInformation.FileInformation;

@Service
public class FileOperateService extends SearchService implements
		IFileOperateService {

	@Resource(name = "entityDao")
	EntityDao entityDao;

	@Resource(name = "searchDao")
	SearchDao searchDao;

	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "fileInformation";
	}

	@Override
	public String getBasePrimaryKey() {
		return "ID";
	}

	@Override
	public Map<String, Object> getFileInfoWithPaging(int limit, int offset,
			String order, String sort, String fileName) {
		int index = limit;
		int pageNum = offset / limit + 1;
		String tableName = "fileInformation";
		String[] properties = new String[] { "ID", "belongtoID", "fileName",
				"path", "content", "uploaderID",
				"DATE_FORMAT(uploadTime,'%Y-%m-%d  %H:%i:%s') AS uploadTime",
				"state", "type", "remarks", };
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tableName, null, null, " 1=1 ", null, "uploadTime",
				sort, index, pageNum);
		int count = entityDao.getByCondition(" 1=1 ", Role.class).size();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);

		return map;
	}
	
	@Override
	public List<Map<String, Object>> getFileType(){
	   String condition = " levelType=0 order by ID asc ";
	   List<Map<String, Object>> result = baseEntityDao.findByCondition(new String[]{"name,ID"}, condition, "filetype");
		return result;
	}
	
	@Override
	public List<Map<String, Object>> getFileSubtypeName(int ID,String tableName){
		String condition = " levelType = 1 and fileTypeId = "+ID;
		List<Map<String, Object>> result = baseEntityDao.findByCondition(new String[]{"name"}, condition, tableName);
		return result;
	}
	
	@Override
	public String getFilePath(String ID) {
		Map<String, Object> file = baseEntityDao.getByID(ID, "ID",
				"fileInformation");
		if (file == null) {
			return "nofile";
		} else {
			String path = (String) file.get("path");
			if (path != null) {
				if (path.length() == 0) {
					return "nofile";
				} else {
					return path;
				}
			} else {
				return "nofile";
			}
		}
	}


	@Override
	public List<Map<String, Object>> getFilesInfo(String[] IDs) {
		String filesids = "";
		List<Map<String, Object>> result = null;
		if (IDs.length > 0) {
			filesids = IDs[0];
		}
		if (IDs.length >= 2) {
			for (int i = 1; i < IDs.length; i++) {
				filesids += "," + IDs[i];
			}
		}
		String condition = " ID IN " + " ( " + filesids + " )";
		result = baseEntityDao.findByCondition(new String[] { "path","type",
				"fileName" }, condition, "fileInformation");
		return result;
	}

	@Override
	public boolean saveFiles(FileInformation fr) {
		return baseEntityDao.save(fr) == 1 ? true : false;
	}

	@Override
	public boolean deleteFiles(String[] IDs) {
		String ids = "";
		int deleteSucessCount = 0;
		if (IDs.length > 0) {
			ids = IDs[0];
		}
		if (IDs.length >= 2) {
			for (int i = 1; i < IDs.length; i++) {
				ids += "," + IDs[i];
			}
		}
		for(int i = 0 ;i < IDs.length; i++){
			FileInformation fr =  entityDao.getByID(IDs[i],FileInformation.class);
			fr.setState(1);
			if(baseEntityDao.updatePropByID(fr, IDs[i]) == 1){
				deleteSucessCount++;
			} 
		}
		if(deleteSucessCount == IDs.length){
			return true;
		}else{
			return false;
		}

	}
    /**
     * 设置文件所属ID
     * @author wzj
     * @date 2016年11月27日 下午7:16:39
     *
     */
	@Override
	public String setBelongtoID(String fileIDS, String belongtoID) {
		// TODO Auto-generated method stub
		int counter = 0;
		if(fileIDS == null || fileIDS.equals(""))
			return "false";
		if(belongtoID == null || belongtoID.equals(""))
			return "false";
		String[] ids = fileIDS.split(",");
		System.out.println(fileIDS);
		System.out.println(Arrays.toString(ids));
		for (int i = 0; i < ids.length; i++) {
			FileInformation fileInformation = entityDao.getByID(ids[i], FileInformation.class);
			if(fileInformation != null ){
				fileInformation.setBelongtoID(belongtoID);
				counter += entityDao.updatePropByID(fileInformation, ids[i]);
			}
		
		}
		
		return counter == ids.length ? "true" : "false";
	}

	@Override
	public Map<String, Object> getFileInfoBybelongtoIDWithPaging(int limit,
			int offset, String order, String sort, String belongtoID) {
		// TODO Auto-generated method stub
		int index = limit;
		int pageNum = offset / limit;
		String tableName = "fileInformation";
		String[] properties = new String[] { "ID", "belongtoID", "fileName",
				"path", "content", "uploaderID",
				"DATE_FORMAT(uploadTime,'%Y-%m-%d  %H:%i:%s') AS uploadTime",
				"state", "type", "remarks", };
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tableName, null, null, " 1=1 and belongtoID = '" + belongtoID + "'", null, "uploadTime",
				sort, index, pageNum);
		int count = entityDao.getByCondition(" 1=1 and belongtoID = '" + belongtoID + "'", FileInformation.class).size();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);

		return map;
	}


}
