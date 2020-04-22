/*
 * @Author       : Ray
 * @Date         : 2020-04-19 09:18:28
 * @LastEditors  : Ray
 * @LastEditTime : 2020-04-22 17:34:41
 * @FilePath     : \myblog\js\element.js
 * @Description  : file content
 */
(function (window) {
	var element = {
		insertBefore: function (parenSelector, refSelector, domObj) {
			var parent = document.querySelector(parenSelector);
			var refNode = document.querySelector(refSelector);
			parent.insertBefore(this.render(domObj), refNode);
		},
		appendChild: function (parenSelector, domObj) {
			// console.log(this.render(domObj));
			if (parenSelector === "body") {
				document.body.appendChild(this.render(domObj));
			} else {
				var parent = document.querySelector(parenSelector);
				parent.appendChild(this.render(domObj));
			}
		},
		replaceChild: function (parenSelector, oldSelector, domObj) {
			var parent = document.querySelector(parenSelector);
			var oldNode = document.querySelector(oldSelector);
			parent.replaceChild(this.render(domObj), oldNode);
		},
		render: function (domObj) {
			if (domObj.tagName) {
				var el = document.createElement(domObj.tagName);
				var textNode = domObj.textNode
					? document.createTextNode(domObj.textNode)
					: document.createTextNode("");
				el.appendChild(textNode);
				if (domObj.prop && JSON.stringify(domObj.prop) !== "{}") {
					var props = domObj.prop;
					for (var propName in props) {
						var propValue = props[propName];
						el.setAttribute(propName, propValue);
					}
				}
				if (domObj.children && domObj.children.length !== 0) {
					domObj.children.forEach((item) => {
						el.appendChild(this.render(item));
					});
				}
				return el;
			} else {
				throw new Error("No tagName!");
			}
		},
	};
	window.element = element;
})(window);
