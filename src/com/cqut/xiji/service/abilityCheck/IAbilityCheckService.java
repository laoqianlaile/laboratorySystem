package com.cqut.xiji.service.abilityCheck;

import java.text.ParseException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.cqut.xiji.entity.abilityCheck.AbilityCheck;
import com.cqut.xiji.entity.fileInformation.FileInformation;

public interface IAbilityCheckService {
	public String addAbilityCheck(AbilityCheck abilityCheck, HttpSession session);
	public int deleteAbilityCheckByID(String[] abilitycheckID);
	public String updateAbilityCheck(AbilityCheck abilityCheck) throws ParseException;
	public Map<String, Object> getAbilityCheckWithPaging(int limit, int offset, String order,
			String sort, String condition) throws ParseException;
	public JSONArray getTableName(String tableName);
	public String saveFiles(FileInformation fr);
	public String updateAbilityCheckByCondition(AbilityCheck abilityCheck);
}
