/*
 * @Author       : Ray
 * @Date         : 2020-04-15 08:18:35
 * @LastEditors  : Ray
 * @LastEditTime : 2020-04-28 09:02:42
 * @FilePath     : \myblog\js\detail.js
 * @Description  : 获取md文件
 */
(function () {
	// let url =
	// console.log("window.location.href :>> ", GetQueryString("url"));
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
	xhr.open("GET", `./articles/${GetQueryString("url")}`, true);
	xhr.send();

	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return r[2];
		return null;
	}
})();
