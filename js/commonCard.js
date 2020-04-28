/*
 * @Author       : Ray
 * @Date         : 2020-04-24 09:19:29
 * @LastEditors  : Ray
 * @LastEditTime : 2020-04-28 09:11:39
 * @FilePath     : \myblog\js\commonCard.js
 * @Description  : file content
 */
(function (window) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			const data = JSON.parse(xhr.responseText);
			const [categoryList, tagsList, articles] = data;
			window.data = {
				categoryList,
				tagsList,
				articles,
			};
			insertPersonCard(articles.length, categoryList.length, tagsList.length);
			insertRecentCard(articles);
			insertCategoryCard(categoryList);
			insertTagsCard(tagsList);
			if (document.querySelector("#articles-flag")) {
				articles.forEach((item) => insertArticle(item, categoryList, tagsList));
			}
		}
	};
	xhr.open("GET", "./data/articles.json", true);
	xhr.send();

	function insertPersonCard(n1, n2, n3) {
		return new Promise((resolve, reject) => {
			const userImg = `(div[class="user-img]>img[src="./favicon.ico])+h2[class="font-regular]{Raydaydayup}+p{👉好好学习，天天向上👈}`;
			const navStatistics = `nav[class="row nav-statistics]>(a[href="./index.html,class="col-4-sm]>h6[class="font-regular]{文章}+h2[class="font-regular]{${n1}})+(a[href="./categories.html,class="col-4-sm]>h6[class="font-regular]{分类}+h2[class="font-regular]{${n2}})+(a[href="./tags.html,class="col-4-sm]>h6[class="font-regular]{标签}+h2[class="font-regular]{${n3}})`;
			const followMe = `a[target="_blank,href="https://github.com/Ray-daydayup,class="row nav-github]>i[class="iconfont icon-github-fill]+span{关注我}`;
			const navContact = `nav[class="row nav-contact]>(a[href="javascript:;,class="col-4-sm]>i[class="iconfont icon-QQ])+(a[href="javascript:;,class="col-4-sm]>i[class="iconfont icon-wechat-fill])+(a[target="_blank,href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=-oSKjJqfh5qfh4uOvpiRhpOfl5LQnZGT,class="col-4-sm]>i[class="iconfont icon-mail-fill])`;
			const words = `hr+div[class="words]>p[class="font-heavy]{应付生活中各种问题的勇气}+p[class="font-heavy]{能说明一个人如何定义生活的意义}+p{——阿德勒}`;
			const str = `div[class="card-content personal-info]>(${userImg})+(${navStatistics})+(${followMe})+(${navContact})+(${words})`;
			element.appendChild(
				".person-card-flag",
				element.generateDomObjArr(str)[0],
				true
			);
		});
	}
	function insertRecentCard(recentArticle) {
		return new Promise((resolve, reject) => {
			const articleLink = recentArticle
				.map((item) => `a[href="./detail.html?url=${item.url}]{${item.title}}`)
				.join("+");
			const str = `div[class="card-content category-card recent-articles]>h6{最近文章}+(${articleLink})`;
			element.appendChild(
				".recent-card-flag",
				element.generateDomObjArr(str)[0],
				true
			);
		});
	}
	function insertCategoryCard(categoryList) {
		return new Promise((resolve, reject) => {
			const categoryLink = categoryList
				.map(
					(item) => `a[href="./categories.html?id=${item.id}]{${item.title}}`
				)
				.join("+");
			const str = `div[class="card-content category-card]>h6{分类}+(${categoryLink})`;
			element.appendChild(
				".category-card-flag",
				element.generateDomObjArr(str)[0],
				true
			);
		});
	}

	function insertTagsCard(tagsList) {
		return new Promise((resolve, reject) => {
			const tagsLink = tagsList
				.map((item) => `a[href="./tags.html?id=${item.id}]{${item.title}}`)
				.join("+");
			const str = `div[class="card-content tags-card]>h6{标签}+(${tagsLink})`;
			element.appendChild(
				".tags-card-flag",
				element.generateDomObjArr(str)[0],
				true
			);
		});
	}

	function insertArticle(article, categoryList, tagsList) {
		return new Promise((resolve, reject) => {
			const imgBox = `div[class="img-box]>img[src="https://picsum.photos/1440/900/?random=${Math.random()
				.toString()
				.substr(3)}]`;
			const noteTips = `(div[class="note-tips]>(i[class="iconfont icon-time-circle]+h6[class="font-regular]{${article.time}}))+(a[href="./detail.html?url=${article.url},class="title]>h2{${article.title}})+p{${article.abstract}}`;
			const category = categoryList.find(
				(item) => item.id === article.category
			);
			const tags = tagsList.filter((item) => article.tags.includes(item.id));
			const tagsLink = tags
				.map((item) => `a[href="./tags.html?id=${item.id}]{${item.title}}`)
				.join("+");
			const categoryNav = `div[class="category-nav]>(div[class="level-item]>i[class="iconfont icon-folder]+a[href="./categories.html?id=${category.id}]{${category.title}})+(div[class="level-item]>i[class="iconfont icon-tags]+${tagsLink})`;
			const str = `div[class="card-container]>div[class="card-content]>(${imgBox})+div[class="abstract]>${noteTips}+${categoryNav}`;
			element.appendChild("#articles-flag", element.generateDomObjArr(str)[0]);
		});
	}
})(window);
