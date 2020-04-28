/*
 * @Author       : Ray
 * @Date         : 2020-04-28 19:45:56
 * @LastEditors  : Ray
 * @LastEditTime : 2020-04-28 20:14:17
 * @FilePath     : \myblog\js\commonFunction.js
 * @Description  : file content
 */
function insertCommonHeader() {
	return new Promise((resolve, reject) => {
		const str1 = `a[href="./index.html]{首页}+a[href="./archive.html]{归档}+a[href="./tags.html]{标签}+a[href="./categories.html]{分类}+a[href="./about.html]{关于}`;
		const str2 = `(a[href="https://github.com/Ray-daydayup/blog,target="_blank]>i[class="iconfont icon-github-fill])+(a[href="javascript:;]>i[class="iconfont icon-search])`;
		/**
		 * 符号含义: '>' 父子关系  '+' 兄弟关系  '[]' 属性  '{}' 文本  '()'优先运算
		 * 符号优先级：'()'大于 '>' 等于 '+' 大于 '[]' 等于 '{}'
		 * 解析思路 ：从左到右解析
		 *          - 任何符号之间的纯字母都是标签名
		 *          - '()'解析的函数
		 *          - '[]'解析的函数
		 *          - '{}'解析的函数
		 */
		element.generateDomObjArr(str1).forEach((item) => {
			element.appendChild(".common-header nav .menu-left", item);
			element.appendChild(".common-header nav .menu-not-lg", item);
		});
		element.generateDomObjArr(str2).forEach((item) => {
			element.appendChild(".common-header nav .menu-right", item);
			element.appendChild(".common-header nav .menu-not-lg", item);
		});
	});
}

function insertCommonFooter() {
	return new Promise((resolve, reject) => {
		const footerDom = {
			tagName: "footer",
			prop: {
				class: "common-footer",
			},
			children: [
				{
					tagName: "div",
					prop: {
						class: "container",
					},
					children: [
						{
							tagName: "div",
							prop: {
								class: "row",
							},
							children: [
								{
									tagName: "h5",
									children: [
										{
											tagName: "span",
											textNode: "备案号:",
										},
										{
											tagName: "a",
											textNode: "苏ICP备20011704号",
											prop: {
												href: "http://beian.miit.gov.cn",
												target: "_blank",
												rel: "noopener noreferrer",
											},
										},
									],
								},
								{
									tagName: "h5",
									children: [
										{
											tagName: "span",
											textNode: "©本博客参考",
										},
										{
											tagName: "a",
											textNode: "辣椒の酱",
											prop: {
												href: "https://removeif.github.io/removeif-demo/",
												target: "_blank",
											},
										},
										{
											tagName: "span",
											textNode: "的博客进行修改",
										},
									],
								},
								{
									tagName: "h5",
									textNode:
										"© 版权说明：[本网站所有内容均收集于互联网或自己创作,",
								},
								{
									tagName: "h5",
									children: [
										{
											tagName: "span",
											textNode: "方便于网友与自己学习交流，如有侵权，请",
										},
										{
											tagName: "a",
											textNode: "留言",
											prop: {
												href:
													"http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=-oSKjJqfh5qfh4uOvpiRhpOfl5LQnZGT",
												target: "_blank",
											},
										},
										{
											tagName: "span",
											textNode: "，立即处理]",
										},
									],
								},
							],
						},
					],
				},
			],
		};
		element.appendChild("body", footerDom);
	});
}

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
			.map(
				(item) =>
					`a[href="./detail.html?url=${item.url}&id=${item.id}]{${item.title}}`
			)
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
			.map((item) => `a[href="./categories.html?id=${item.id}]{${item.title}}`)
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
//index.html的插入文章列表
function insertArticle(article, categoryList, tagsList) {
	return new Promise((resolve, reject) => {
		const imgBox = `div[class="img-box]>img[src="https://picsum.photos/1440/900/?random=${Math.random()
			.toString()
			.substr(3)}]`;
		const noteTips = `(div[class="note-tips]>(i[class="iconfont icon-time-circle]+h6[class="font-regular]{${article.time}}))+(a[href="./detail.html?url=${article.url}&id=${article.id},class="title]>h2{${article.title}})+p{${article.abstract}}`;
		const category = categoryList.find((item) => item.id === article.category);
		const tags = tagsList.filter((item) => article.tags.includes(item.id));
		const tagsLink = tags
			.map((item) => `a[href="./tags.html?id=${item.id}]{${item.title}}`)
			.join("+");
		const categoryNav = `div[class="category-nav]>(div[class="level-item]>i[class="iconfont icon-folder]+a[href="./categories.html?id=${category.id}]{${category.title}})+(div[class="level-item]>i[class="iconfont icon-tags]+${tagsLink})`;
		const str = `div[class="card-container]>div[class="card-content]>(${imgBox})+div[class="abstract]>${noteTips}+${categoryNav}`;
		element.appendChild("#articles-flag", element.generateDomObjArr(str)[0]);
	});
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return r[2];
	return null;
}
