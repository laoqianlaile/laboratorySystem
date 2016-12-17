package com.cqut.xiji.service.personconTrast;

import java.util.Map;

import javax.servlet.http.HttpSession;

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

	
}
