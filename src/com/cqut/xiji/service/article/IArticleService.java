package com.cqut.xiji.service.article;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import com.cqut.xiji.entity.article.Article;

public interface IArticleService {

	public String addArticle(Article article);

	public String deleteArticleByID(String articleID);

	public String updateArticle(Article article);

	public Map<String, Object> getArticleWithPaging(int rows, int page,
			String order, String sort, String artTitle, String artColumn,
			String artPublisher, String artCaseType);

	public int getTotalByCondition(String condition);

	public List<Article> getArticle(String articleID, String artTitle,
			String artColumn, String artCaseType);

	public JSONObject getFirstNews();

	Map<String, Object> getSecondsNewsWithPaging(int rows, int page,
			String order, String sort);

}
