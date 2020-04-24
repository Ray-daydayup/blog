/*
 * @Author       : Ray
 * @Date         : 2020-04-24 09:19:29
 * @LastEditors  : Ray
 * @LastEditTime : 2020-04-24 10:21:01
 * @FilePath     : \myblog\js\commonCard.js
 * @Description  : file content
 */
(function () {
	const userImg = `(div[class=user-img]>img[src=./favicon.ico])+h2[class=font-regular]{Raydaydayup}+p{👉好好学习，天天向上👈}`;
	const navStatistics = `nav[class=row nav-statistics]>(a[href=./index.html,class=col-4-sm]>h6[class=font-regular]{文章}+h2[class=font-regular]{16})+(a[href=./categories.html,class=col-4-sm]>h6[class=font-regular]{分类}+h2[class=font-regular]{5})+(a[href=./tags.html,class=col-4-sm]>h6[class=font-regular]{标签}+h2[class=font-regular]{6})`;
	const followMe = `a[target=_blank,href=https://github.com/Ray-daydayup,class=row nav-github]>i[class=iconfont icon-github-fill]+span{关注我}`;
	const navContact = `nav[class=row nav-contact]>(a[href=javascript:;,class=col-4-sm]>i[class=iconfont icon-QQ])+(a[href=javascript:;,class=col-4-sm]>i[class=iconfont icon-wechat-fill])+(a[target=_blank,href=http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&amp;email=-oSKjJqfh5qfh4uOvpiRhpOfl5LQnZGT,class=col-4-sm]>i[class=iconfont icon-mail-fill])`;
	const words = `hr+div[class=words]>p[class=font-heavy]{应付生活中各种问题的勇气}+p[class=font-heavy]{能说明一个人如何定义生活的意义}+p{——阿德勒}`;
	const str = `div[class=card-content personal-info]>(${userImg})+(${navStatistics})+(${followMe})+(${navContact})+(${words})`;
	element.appendChild(
		".person-card-flag",
		element.generateDomObjArr(str)[0],
		true
	);
})();
