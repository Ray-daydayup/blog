/*
 * @Author       : Ray
 * @Date         : 2020-04-24 09:19:29
 * @LastEditors  : Ray
 * @LastEditTime : 2020-04-30 16:58:00
 * @FilePath     : \myblog\js\main.js
 * @Description  : file content
 */
(function () {
	insertCommonHeader();
	insertCommonFooter();
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			const data = JSON.parse(xhr.responseText);
			const [categoryList, tagsList, articles] = data;
			insertPersonCard(articles.length, categoryList.length, tagsList.length);
			insertRecentCard(articles);
			insertCategoryCard(categoryList);
			insertTagsCard(tagsList);
			if (location.href.includes("detail")) {
				insertNoteTip(articles, categoryList, tagsList);
			}
			if (location.href.includes("archive")) {
				archive(articles);
			}
			if (location.href.includes("tags")) {
				insertMainTags(tagsList, articles);
			}
			if (location.href.includes("categories")) {
				insertMainCategory(categoryList, articles);
			}
			if (document.querySelector("#articles-flag")) {
				articles.forEach((item) => insertArticle(item, categoryList, tagsList));
			}
			document.querySelector("#mask").style.display = "none";
		}
	};
	xhr.open("GET", "./data/articles.txt", true);
	xhr.send();
})();
