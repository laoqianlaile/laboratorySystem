package com.cqut.xiji.service.article;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.article.Article;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class ArticleService extends SearchService implements IArticleService {

	@Resource(name = "entityDao")
	EntityDao entityDao;

	@Resource(name = "searchDao")
	SearchDao searchDao;

	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "article";
	}

	@Override
	public String getBasePrimaryKey() {
		return "article.articleID";
	}

	@Override
	public String addArticle(Article article, HttpSession session) {
		return entityDao.save(article) == 1 ? "true" : "false";
	}

	@Override
	public String deleteArticleByID(String articleID) {
		return entityDao.deleteByID(articleID, Article.class) == 1 ? "true"
				: "false";
	}

	@Override
	public String updateArticle(Article article) {
		return entityDao.updatePropByID(article, article.getArticleID()) == 1 ? "true"
				: "false";
	}

	@Override
	public Map<String, Object> getArticleWithPaging(int rows, int page,
			String order, String sort, String artTitle, String artColumn,
			String artPublisher, String artCaseType) {
		// 根据文章名称，文章栏目，发布人查询
		String condition = " 1 = 1 ";
		if (artTitle != null && !artTitle.trim().toString().equals("null")) {
			condition = " 1 = 1 and artTitle like  '%" + artTitle + "%'  ";
		} else if (artColumn != null
				&& !artColumn.trim().toString().equals("null")) {
			condition = " 1 = 1 and artColumn = '" + artColumn + "'";
		} else if (artPublisher != null
				&& !artPublisher.trim().toString().equals("null")) {
			condition = " 1 = 1 and artPublisher = '" + artPublisher + "'";
		} else if (artCaseType != null
				&& !artCaseType.trim().toString().equals("null")) {
			condition = " 1 = 1 and artCaseType like '%" + artCaseType + "%'";
		}

		int index = rows;
		int pageNum = page / rows;
		// 获取总数
		int count = getTotalByCondition(condition);

		 List<Map<String, Object>> ens = entityDao
				.searchWithpaging(
						new String[] {
								"articleID",// ID
								"artTitle",// 文章标题
								"artColumn",// 文章栏目
								"DATE_FORMAT(artCregisattime,'%Y-%m-%d') artCregisattime",// 创建日期
								"artCaseType",// 案例类型
								"artPublisher",// 发布者
								"artContent",// 内容
								"artPicturegis",// 图片
								"artRemark"// 备注
								,"path"//路劲
						}, "article", " left JOIN fileinformation ON fileinformation.belongtoID = article.articleID", null, condition, null, sort, order,
						index, pageNum);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", ens);
		return map;
	}

	@Override
	public Map<String, Object> getSecondsNewsWithPaging(int rows, int page,
			String order, String sort) {
		// 根据文章名称，文章栏目，发布人查询
		String condition = " 1 = 1 and artColumn = '新闻中心' ";

		int index = rows;
		int pageNum = page / rows;
		// 获取总数
		int count = getTotalByCondition(condition);
		List<Map<String, Object>> ens = entityDao
				.searchWithpaging(
						new String[] {
								"articleID",// ID
								"artTitle",// 文章标题
								"artColumn",// 文章栏目
								"DATE_FORMAT(artCregisattime,'%Y-%m-%d %H:%i:%S') artCregisattime",// 创建日期
								"artCaseType",// 案例类型
								"artPublisher",// 发布者
								"artContent",// 内容
								"artPicturegis",// 图片
								"artRemark"// 备注
						}, "article", null, null, condition, null, sort, order,
						index, pageNum);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", ens);
		return map;
	}

	@Override
	public int getTotalByCondition(String condition) {
		return entityDao.getCountByCondition(condition, Article.class);
	}

	@Override
	public JSONObject getFirstNews() {
		String condition = " articleID in(select min(articleID) from article where artColumn = '新闻中心') ";
		List<Article> artices = entityDao.getByCondition(condition,
				Article.class);
		if (artices != null && artices.size() > 0)
			return JSONObject.fromObject(artices.get(0));
		return null;
	}

	

	@Override
	public List<Article> getArticle(String articleID, String artTitle,
			String artColumn, String artCaseType) {
		String condition = " 1 = 1 ";
		if (artTitle != null && !artTitle.trim().toString().equals("null")) {
			condition = " 1 = 1 and artTitle =  '" + artTitle + "'";
		} else if (artColumn != null
				&& !artColumn.trim().toString().equals("null")) {
			condition = " 1 = 1 and artColumn = '" + artColumn + "'";
		} else if (articleID != null
				&& !articleID.trim().toString().equals("null")) {
			condition = " 1 = 1 and articleID = '" + articleID + "'";
		} else if (artCaseType != null
				&& !artCaseType.trim().toString().equals("null")) {
			condition = " 1 = 1 and artCaseType like '%" + artCaseType + "%'";
		}
		
		
		List<Article> result = entityDao.getByCondition(condition,
				Article.class);
		if (result.size() <= 0) {
			return null;
		} else
			return result;
	}
	
	@Override
	public Map<String, Object> getClassicCase(String artCaseType) {
		String condition = " 1 = 1 and artCaseType = '" + artCaseType + "'";
		List<Map<String, Object>> result = entityDao.searchForeign(new String[] {
				"articleID",// ID
				"artTitle",// 文章标题
				"artColumn",// 文章栏目
				"DATE_FORMAT(artCregisattime,'%Y-%m-%d') artCregisattime",// 创建日期
				"artCaseType",// 案例类型
				"artPublisher",// 发布者
				"artContent",// 内容
				"artPicturegis",// 图片
				"artRemark"// 备注
				,"path"//路劲
			},
			"article", 
			" left JOIN fileinformation ON fileinformation.belongtoID = article.articleID", 
			null, 
			condition);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("rows", result);
		return map;
	}

}
