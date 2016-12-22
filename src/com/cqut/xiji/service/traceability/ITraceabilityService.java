package com.cqut.xiji.service.traceability;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.ui.ModelMap;

import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.entity.traceability.Traceability;

public interface ITraceabilityService {

	public int saveTracebility(Traceability traceability, HttpSession session);

	public int deleteTracebilityByID(String ID);

	public int deleteTracebilityByIDs(String[] IDs);

	public int updateTracebilityByID(Traceability traceability);

	public Map<String, Object> getTraceabilityWithPaging(int limit, int offset,
			String order, String sort, String condition);

	public int getCountByCondition(String condition);

	public int auditTracebilityByID(Traceability traceability);

	public Map<String, Object> getTraceabilityResultWithPaging(int limit,
			int offset, String order, String sort, String condition);

	public Boolean upload(HttpServletRequest request,
			HttpServletResponse response, ModelMap model) throws IOException;

	String saveFiles(FileInformation fr);
}
