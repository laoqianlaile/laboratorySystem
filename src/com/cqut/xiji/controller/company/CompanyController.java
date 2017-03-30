package com.cqut.xiji.controller.company;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.http.HTTPException;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.cqut.xiji.service.company.ICompanyService;

@Controller
@RequestMapping("/companyController")
public class CompanyController {

	@Resource(name = "companyService")
	ICompanyService service;

	@RequestMapping("/getCompanyWithPaging")
	@ResponseBody
	public JSONObject getRoleWithPaging(int limit, int offset, String order,
			String sort, String roleName) {
		Map<String, Object> result = service.getCompanyWithPaging(limit,
				offset, sort, order, roleName);
		return JSONObject.fromObject(result);
	}

	@RequestMapping("/addCompany")
	@ResponseBody
	public String addCompany(String NAME, String CONTACTOR,
			String CONTACTPHONE, String TELEPHONE, String ADDRESS,
			String SCOPE, String CREATTIMES, String REMARKES) {
		String result = service.addCompany(NAME, CONTACTOR, CONTACTPHONE,
				TELEPHONE, ADDRESS, SCOPE, CREATTIMES, REMARKES);
		return result;
	}

	@RequestMapping("/delCompany")
	@ResponseBody
	public String delCompany(String COMPANYID) {
		String result = service.delCompany(COMPANYID);
		return result;
	}

	@RequestMapping("/updCompany")
	@ResponseBody
	public String updCompany(String COMPANYID, String NAME, String CONTACTOR,
			String CONTACTPHONE, String TELEPHONE, String ADDRESS,
			String SCOPE, String CREATTIMES, String REMARKES) {
		String result = service.updCompany(COMPANYID, NAME, CONTACTOR,
				CONTACTPHONE, TELEPHONE, ADDRESS, SCOPE, CREATTIMES, REMARKES);
		return result;
	}

	@RequestMapping("/upload")
	@ResponseBody
	public String upload(
			@RequestParam(value = "file", required = false) MultipartFile file,
			HttpServletRequest request, HttpServletResponse response,
			ModelMap model) {

		// request.getSession().getServletContext().getRealPath("upload");
		// 项目在容器中实际发布运行的根路径
		if (file == null || file.isEmpty()) {
			return "null";
		} else {
			String path = null;// 文件路径
			String type = null;// 文件类型
			String fileName = file.getOriginalFilename();// 文件原名称
			System.out.println("上传的文件原名称:" + fileName);
			// 判断文件类型
			type = fileName.indexOf(".") != -1 ? fileName.substring(
					fileName.lastIndexOf(".") + 1, fileName.length()) : null;
			if (type != null) {
				if ("DOC".equals(type.toUpperCase())
						|| "DOCX".equals(type.toUpperCase())) {
					// 设置存放文件的路径
					path = "F:\\作业";
					System.out.println("存放WORD文档的路径:" + path);
					File targetFile = new File(path, fileName);
					if (!targetFile.exists()) {
						targetFile.mkdirs();
					}
					// 转存文件到指定的路径
					try {
						file.transferTo(targetFile);
					} catch (IllegalStateException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					System.out.println("文件成功上传到指定目录下");

					try {
						request.getRequestDispatcher(
								"../module/jsp/company/companyManage.jsp")
								.forward(request, response);
					} catch (ServletException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					return "OK";

				} else {
					System.out.println("文档不符合格式,请重新上传");
					return null;
				}
			}
			/*
			 * model.addAttribute("fileUrl", request.getContextPath() +
			 * "/upload/" + fileName);
			 */

		}// 第一个else的括号
		return "nothing to do";
	}

	@RequestMapping("/dowload")
	@ResponseBody
	public ResponseEntity<byte[]> update() throws HTTPException {
		/*
		 * String filePath = "‪C:\\Users\\zt\\Desktop\\test.docx"; File file =
		 * new File(filePath);
		 */
		String filePath = "f:" + File.separator + "检测项目1.docx";
		File file = new File(filePath);
		HttpHeaders headers = new HttpHeaders();
		try {
			headers.setContentDispositionFormData("attachment", new String(file.getName().getBytes("utf-8"), "ISO8859-1"));
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	//	headers.setContentDispositionFormData("attachment", file.getName());

		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

		
		
		ResponseEntity<byte[]> responseEntity = null;

		try {
			responseEntity = new ResponseEntity<byte[]>(
					FileUtils.readFileToByteArray(file), headers, HttpStatus.OK);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return responseEntity;
	}

	/**
	 * @description 得到公司名称及ID
	 * @author LJ
	 * @created 2016-10-17 下午9:42:46
	 * @return
	 */
	@RequestMapping("/getCompanyName")
    @ResponseBody
	public String getCompanyName(String companyName){
		List<Map<String, Object>> result = service.getCompanyName(companyName);
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * @description 得到公司信息
	 * @author LJ
	 * @created 2016-10-17 下午9:43:37
	 * @param companyName
	 * @return
	 */
	@RequestMapping("/getCompanyMsg")  
    @ResponseBody
	public String getCompanyMsg(String companyName){
		List<Map<String, Object>> result = service.getCompanyMsg(companyName);
		return JSONArray.fromObject(result).toString();
	}
	/**
	 * 通过公司ID获取公司信息
	 * @author wzj
	 * @date 2016年11月21日 下午2:38:09
	 * @param comID
	 * @return
	 */
	@RequestMapping("/getCompanyInformation")  
    @ResponseBody
	public String getCompanyInformation(String comID){
		Map<String, Object> result = service.getCompanyInformation(comID);
		return JSONObject.fromObject(result).toString();
	}
	@RequestMapping("/getComListByName")  
    @ResponseBody
	public String getComListByName(String companyName){
		List<Map<String, Object>> result = service.getComListByName(companyName);
		return JSONArray.fromObject(result).toString();
	}
}
