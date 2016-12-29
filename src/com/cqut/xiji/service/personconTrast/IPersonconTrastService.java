package com.cqut.xiji.service.personconTrast;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.ui.ModelMap;

import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.entity.personconTrast.PersonconTrast;

import net.sf.json.JSONArray;

public interface IPersonconTrastService {

	String getPersonconTrast(String ID);

	JSONArray getdepartmentlist();

	JSONArray getbydepartment(String departmentName);

	String deletePersonconTrastByID(String id);

	String saveFiles(FileInformation fr);


	Map<String, Object> getPersonconTrastWithPaging(int limit, int offset,
			String order, String sort, String condition);

	int savePersonconTrast(PersonconTrast personconTrast, HttpSession session);

	int updatePersonconTrastByID(PersonconTrast personconTrast);

	int auditPersonconTrastByID(PersonconTrast personconTrast);

	int resultPersonconTrastByID(PersonconTrast personconTrast);

	Boolean upload(HttpServletRequest request, HttpServletResponse response,
			ModelMap model) throws IOException;

	
}
