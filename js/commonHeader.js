/*
 * @Author       : Ray
 * @Date         : 2020-04-23 10:27:34
 * @LastEditors  : Ray
 * @LastEditTime : 2020-04-23 10:28:34
 * @FilePath     : \myblog\js\commonHeader.js
 * @Description  : file content
 */
(function () {
	var str1 = `a[href=./index.html]{首页}+a[href=./archive.html]{归档}+a[href=./tags.html]{标签}+a[href=./categories.html]{分类}+a[href=./about.html]{关于}`;
	var str2 = `(a[href=https://github.com/Ray-daydayup/blog,target=_blank]>i[class=iconfont icon-github-fill])+(a[href=javascript:;]>i[class=iconfont icon-search])`;
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
})();
