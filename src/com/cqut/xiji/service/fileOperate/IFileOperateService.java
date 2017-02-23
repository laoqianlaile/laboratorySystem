package com.cqut.xiji.service.fileOperate;

import java.util.List;
import java.util.Map;

import com.cqut.xiji.entity.fileInformation.FileInformation;

public interface IFileOperateService {
	public Map<String, Object> getFileInfoWithPaging(int limit, int offset,
			String order, String sort, String fileName);

	public String getFilePath(String ID);

	public List<Map<String, Object>> getFilesInfo(String[] iDs);

	public boolean deleteFiles(String[] iDs);

	public boolean saveFiles(FileInformation fr);

	public List<Map<String, Object>> getFileType();


	public List<Map<String, Object>> getFileSubtypeName(int ID, String tableName);
	
	public Map<String, Object> getFileInfoBybelongtoIDWithPaging(int limit, int offset,
			String order, String sort, String belongtoID); 
/**
 * 设置文件所属ID
 * @author wzj
 * @date 2016年11月27日 下午7:15:03
 * @param fileIDS
 * @param belongtoID
 * @return
 */
	public String setBelongtoID(String fileIDS, String belongtoID);
	
	public Map<String,Object> getFileDecryptPassword(String ID);
}
