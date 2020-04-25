/*
 * @Author       : Ray
 * @Date         : 2020-04-25 10:13:08
 * @LastEditors  : Ray
 * @LastEditTime : 2020-04-25 10:29:29
 * @FilePath     : \myblog\js\loadScript.js
 * @Description  : file content
 */
(function () {
	Promise.all([
		loadScript("./js/commonHeader.js"),
		loadScript("./js/commonCard.js"),
		loadScript("./js/commonFooter.js"),
	]).then(
		(res) => {
			document.querySelector("#mask").style.display = "none";
		},
		(err) => {
			console.log("脚本加载错误!");
		}
	);

	function loadScript(src) {
		return new Promise((resolve, reject) => {
			let script = document.createElement("script");
			script.src = src;
			script.onload = () => resolve(script);
			script.onerror = (err) => reject(err);
			document.head.append(script);
		});
	}
})();
