/*
 * @Author       : Ray
 * @Date         : 2020-04-19 09:18:28
 * @LastEditors  : Ray
 * @LastEditTime : 2020-04-24 13:28:36
 * @FilePath     : \myblog\js\element.js
 * @Description  : file content
 */
(function (window) {
	var element = {
		generateDomObjArr: function (str) {
			const result = [];
			const head = [];
			let currentLevel = 0;
			let pointer = result;
			head.push(pointer);
			let astArr = ast(str);
			astArr.forEach((item, index) => {
				if (item.level > currentLevel) {
					currentLevel = item.level;
					astArr[index - 1].children = [];
					pointer = astArr[index - 1].children;
					head.push(pointer);
				}
				if (item.level < currentLevel) {
					currentLevel = item.level;
					pointer = head[currentLevel];
					head.splice(currentLevel + 1, Infinity);
				}
				pointer.push(item);
			});
			return result;
			function ast(str) {
				let startLevel = 0;
				const stack = [];
				return match(str, "", startLevel);

				function match(str, lastCharacter, startLevel) {
					let level = startLevel;
					const result = [];
					var tagName = "";
					var prop = {};
					var textNode = "";
					do {
						if (str[0] === "+") {
							lastCharacter = str[0];
							str = str.replace("+", "");
						}
						if (str[0] === ">") {
							lastCharacter = str[0];
							str = str.replace(">", "");
							level++;
						}
						if (str[0] === "(") {
							lastCharacter = str[0];
							str = str.replace("(", "");
							stack.push(level);
						}
						if (str[0] === ")") {
							lastCharacter = str[0];
							str = str.replace(")", "");
							level = stack.pop();
						}
						if (/\w/.test(str[0]) && str !== "") {
							lastCharacter = str[0];
							tagName = str.match(/\w+/)[0];
							str = str.replace(/\w+/, "");
						}
						if (str[0] === "{") {
							lastCharacter = str[0];
							textNode = str.match(/\{(.+?)\}/)[1];
							str = str.replace(/\{(.+?)\}/, "");
						}
						if (str[0] === "[") {
							lastCharacter = str[0];
							let arr = str.match(/\[(.+?)\]/)[1].split(",");
							arr.forEach((item) => {
								let tempArr = item.split('="');
								prop[tempArr[0]] = tempArr[1];
							});
							str = str.replace(/\[(.+?)\]/, "");
						}
					} while (
						str !== "" &&
						str[0] !== ">" &&
						str[0] !== "+" &&
						str[0] !== ")"
					);
					if (tagName !== "") {
						result.push({
							level,
							tagName,
							prop,
							textNode,
						});
					}
					if (str === "") {
						return result;
					} else {
						let tempArr = match(str, lastCharacter, level);
						result.push(...tempArr);
					}
					return result;
				}
			}
		},
		insertBefore: function (parenSelector, refSelector, domObj) {
			var parent = document.querySelector(parenSelector);
			var refNode = document.querySelector(refSelector);
			parent.insertBefore(this.render(domObj), refNode);
		},
		appendChild: function (parenSelector, domObj, isAll = false) {
			if (parenSelector === "body") {
				document.body.appendChild(this.render(domObj));
			} else if (isAll) {
				document.querySelectorAll(parenSelector).forEach((item) => {
					item.appendChild(this.render(domObj));
				});
			} else {
				let parent = document.querySelector(parenSelector);
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
