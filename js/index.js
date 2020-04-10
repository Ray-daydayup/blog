(function () {
	// hljs.initHighlightingOnLoad();
	console.log(window);
	var parent = document.querySelector(".parent");

	// console.dir();
	// console.log(md.renderer.rules.html_block);

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			// console.log(xhr.responseText);
			var result = md.render(xhr.responseText);
			parent.innerHTML = result;
		}
	};
	xhr.open("GET", "./articles/test.md", true);
	xhr.send();
})();
