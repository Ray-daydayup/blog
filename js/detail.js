/*
 * @Author       : Ray
 * @Date         : 2020-04-15 08:18:35
 * @LastEditors  : Ray
 * @LastEditTime : 2020-04-28 20:17:14
 * @FilePath     : \myblog\js\detail.js
 * @Description  : 获取md文件
 */
(function () {
	var parent = document.querySelector("#markdownBody");
	var tocContainer = document.querySelector("#tocContainer");
	md.use(window.markdownItTocDoneRight, {
		containerClass: "toc",
		containerId: "toc",
		listType: "ul",
		listClass: "listClass",
		itemClass: "itemClass",
		linkClass: "linkClass",
		callback: function (html, ast) {
			tocContainer.innerHTML = html;
		},
	});

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			// console.log(xhr.responseText);
			var result = md.render(xhr.responseText);
			parent.innerHTML = result;
		}
	};
	xhr.open("GET", `./articles/${getQueryString("url")}`, true);
	xhr.send();
})();
