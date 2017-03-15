package com.cqut.xiji.controller.article;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.entity.article.Article;
import com.cqut.xiji.service.article.IArticleService;

@Controller
@RequestMapping("/articleController")
public class ArticleController {

	@Resource(name = "articleService")
	IArticleService service;

	/**
	 * 
	 * 方法简述：新增文章
	 * 
	 * @param article
	 * @return “true” or "false"
	 * @author 蒋兴成
	 * @date 2016年10月4日 下午4:11:51
	 * 
	 */
	@RequestMapping("/addArticle")
	@ResponseBody
	public String addArticle(Article article) {
		return service.addArticle(article);
	}

	/**
	 * 
	 * 方法简述：根据ID删除文章(若要删除多个数据，请自行添加方法)
	 * 
	 * @param articleID
	 * @return “true” or "false"
	 * @author 蒋兴成
	 * @date 2016年10月4日 下午4:12:19
	 * 
	 */
	@RequestMapping("/deleteArticleByID")
	@ResponseBody
	public String deleteArticleByID(String articleID) {
		return service.deleteArticleByID(articleID);
	}

	/**
	 * 
	 * 方法简述：更新文章
	 * 
	 * @param article
	 * @return “true” or "false"
	 * @author 蒋兴成
	 * @date 2016年10月4日 下午4:12:58
	 * 
	 */
	@RequestMapping("/updateArticle")
	@ResponseBody
	public String updateArticle(Article article) {
		return service.updateArticle(article);
	}

	/**
	 * 
	 * 方法简述：根据条件分页获取文章数据
	 * 
	 * @param rows
	 * @param page
	 * @param order
	 * @param sort
	 * @param artTitle
	 *            文章标题
	 * @param artColumn
	 *            文章类型
	 * @param artPublisher
	 *            发布人
	 * @return Map
	 * @author 蒋兴成
	 * @throws UnsupportedEncodingException
	 * @date 2016年10月4日 下午4:13:17
	 * 
	 */
	@RequestMapping("/getArticleWithPaging")
	@ResponseBody
	public JSONObject getArticleWithPaging(int limit, int offset, String order,
			String sort, String artTitle, String artColumn,
			String artPublisher, String artCaseType)
			throws UnsupportedEncodingException {

		if (!artTitle.equals("null"))
			artTitle = URLDecoder.decode(artTitle, "utf-8");
		if (!artColumn.equals("null"))
			artColumn = URLDecoder.decode(artColumn, "utf-8");
		if (!artPublisher.equals("null"))
			artPublisher = URLDecoder.decode(artPublisher, "utf-8");
		if (!artCaseType.equals("null"))
			artCaseType = URLDecoder.decode(artCaseType, "utf-8");

		System.out.println("limit ======== " + limit);
		System.out.println("offset ======== " + offset);
		System.out.println("order ======== " + order);
		System.out.println("sort ======== " + sort);
		System.out.println("artTitle ======== " + artTitle);
		System.out.println("artColumn ======== " + artColumn);
		System.out.println("artPublisher ======== " + artPublisher);
		System.out.println("artCaseType ======== " + artCaseType);

		return JSONObject.fromObject(service.getArticleWithPaging(limit,
				offset, order, sort, artTitle, artColumn, artPublisher,
				artCaseType));
	}

	/**
	 * 
	 * 方法简述：获取新闻中心第一条数据
	 * 
	 * @return
	 * @author 蒋兴成
	 * @date 2016年10月10日 下午3:27:31
	 * 
	 */
	@RequestMapping("/getFirstNews")
	@ResponseBody
	public JSONObject getFirstNews() {
		return service.getFirstNews();
	}

	/**
	 * 方法简述：根据条件（文章id，文章题目或者文章类型）读取文章详情
	 * 
	 * @param articleID
	 *            文章id
	 * @param artTitle
	 *            文章题目
	 * @param artColumn
	 *            文章栏目
	 * @return JSONObject
	 * @author 刘敏
	 * @date 2016年10月10日 下午3:27:31
	 * @throws UnsupportedEncodingException
	 */

	@RequestMapping("/getArticle")
	@ResponseBody
	public JSONArray getArticle(String articleID, String artTitle,
			String artColumn, String artCaseType)
			throws UnsupportedEncodingException {
		/* System.out.println(artTitle); */
		if (articleID != null)
			articleID = URLDecoder.decode(articleID, "utf-8");
		if (artTitle != null)
			artTitle = URLDecoder.decode(artTitle, "utf-8");
		if (artColumn != null)
			artColumn = URLDecoder.decode(artColumn, "utf-8");
		if (artCaseType != null)
			artCaseType = URLDecoder.decode(artCaseType, "utf-8");

		return JSONArray.fromObject(service.getArticle(articleID, artTitle,
				artColumn, artCaseType));
	}
}
