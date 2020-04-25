/*
 * @Author       : Ray
 * @Date         : 2020-04-24 09:19:29
 * @LastEditors  : Ray
 * @LastEditTime : 2020-04-24 13:33:23
 * @FilePath     : \myblog\js\commonCard.js
 * @Description  : file content
 */
(function () {
	insertPersonCard();
	insertRecentCard();
	insertCategoryCard();
	insertTagsCard();
	function insertPersonCard() {
		return new Promise((resolve, reject) => {
			const userImg = `(div[class="user-img]>img[src="./favicon.ico])+h2[class="font-regular]{Raydaydayup}+p{👉好好学习，天天向上👈}`;
			const navStatistics = `nav[class="row nav-statistics]>(a[href="./index.html,class="col-4-sm]>h6[class="font-regular]{文章}+h2[class="font-regular]{16})+(a[href="./categories.html,class="col-4-sm]>h6[class="font-regular]{分类}+h2[class="font-regular]{5})+(a[href="./tags.html,class="col-4-sm]>h6[class="font-regular]{标签}+h2[class="font-regular]{6})`;
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
	function insertRecentCard() {
		return new Promise((resolve, reject) => {
			const recentArticle = [
				{
					url: "#",
					title: "Github便是免费且好用的CDN，非常适合博客网站使用",
				},
				{
					url: "#",
					title: "Github便是免费且好用的CDN",
				},
				{
					url: "#",
					title: "非常适合博客网站使用",
				},
				{
					url: "#",
					title: "响应式",
				},
			];
			const articleLink = recentArticle
				.map((item) => `a[href="${item.url}]{${item.title}}`)
				.join("+");
			const str = `div[class="card-content category-card recent-articles]>h6{最近文章}+(${articleLink})`;
			element.appendChild(
				".recent-card-flag",
				element.generateDomObjArr(str)[0],
				true
			);
		});
	}
	function insertCategoryCard() {
		return new Promise((resolve, reject) => {
			const categoryList = [
				{
					url: "#",
					title: "前端",
				},
				{
					url: "#",
					title: "摄影",
				},
				{
					url: "#",
					title: "心情",
				},
			];
			const categoryLink = categoryList
				.map((item) => `a[href="${item.url}]{${item.title}}`)
				.join("+");
			const str = `div[class="card-content category-card]>h6{分类}+(${categoryLink})`;
			element.appendChild(
				".category-card-flag",
				element.generateDomObjArr(str)[0],
				true
			);
		});
	}

	function insertTagsCard() {
		return new Promise((resolve, reject) => {
			const tagsList = [
				{
					url: "#",
					title: "前端",
				},
				{
					url: "#",
					title: "JS",
				},
				{
					url: "#",
					title: "CSS",
				},
				{
					url: "#",
					title: "HTML",
				},
				{
					url: "#",
					title: "Vue",
				},
				{
					url: "#",
					title: "Node",
				},
			];
			const tagsLink = tagsList
				.map((item) => `a[href="${item.url}]{${item.title}}`)
				.join("+");
			const str = `div[class="card-content tags-card]>h6{标签}+(${tagsLink})`;
			element.appendChild(
				".tags-card-flag",
				element.generateDomObjArr(str)[0],
				true
			);
		});
	}
})();
