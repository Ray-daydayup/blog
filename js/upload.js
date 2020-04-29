/*
 * @Author       : Ray
 * @Date         : 2020-04-29 10:22:33
 * @LastEditors  : Ray
 * @LastEditTime : 2020-04-29 20:29:14
 * @FilePath     : \myblog\js\upload.js
 * @Description  : file content
 */
(function () {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			const data = JSON.parse(xhr.responseText);
			const [categoryList, tagsList, articles] = data;
			// console.log(categoryList, tagsList, articles);
			insertItem(categoryList, "#category", function () {
				submitJson(categoryList, tagsList, articles);
			});
			insertItem(tagsList, "#tags", function () {
				submitJson(categoryList, tagsList, articles);
			});
			insertItem(articles, "#articles", function () {
				submitJson(categoryList, tagsList, articles);
			});
		}
	};
	xhr.open("GET", "./data/articles.json", true);
	xhr.send();
	function submitJson(categoryList, tagsList, articles) {
		let jsonData = JSON.stringify([categoryList, tagsList, articles]);
		let formData = new FormData();
		formData.append("jsonData", jsonData);
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				console.log(xhr.responseText);
			}
		};

		xhr.open("POST", "./upload.php", true);
		xhr.send(formData);
	}
	function insertItem(list, selector, callback) {
		let oldChildSelector = `${selector} .tags-card`;
		let parent = updateItem(list, selector, oldChildSelector);

		// const parent = document.getElementById(selector.replace("#",'')).getElementsByClassName('tags-card')[0];
		const record = document.querySelector(`${selector}+form .record`);
		const newItem = document.querySelector(`${selector}+form .newItem`);
		const ensure = document.querySelector(`${selector}+form .ensure`);
		const submit = document.querySelector(`${selector}+form .submit`);
		const reset = document.querySelector(`${selector}+form .reset`);
		const noteTip = document.querySelector(`${selector}+form .noteTip`);
		let tempDelete = [];
		let tempAdd = [];
		let tempAddId = [];
		parent.onclick = function (e) {
			parentClick(e);
		};
		if (newItem) {
			newItem.addEventListener("input", function (e) {
				if (newItem.value.trim() === "") {
					noteTip.innerText = "请填写内容";
					return;
				} else {
					noteTip.innerText = "";
				}
			});
		}
		if (ensure) {
			ensure.addEventListener("click", function (e) {
				const title = newItem.value.trim();
				if (title === "") {
					noteTip.innerText = "请填写内容";
					return;
				}
				newItem.value = "";
				let id = Date.now();
				tempAddId.push(id);
				tempAdd.push({
					id,
					title,
				});
				let div = document.createElement("div");
				div.style.color = "#20B384";
				div.innerText = `添加 -> ${title}`;
				record.appendChild(div);
				let span = document.createElement("span");
				span.innerHTML = `${title}<i data-id="${id}">X</i>`;
				parent.appendChild(span);
			});
		}

		submit.addEventListener("click", function (e) {
			if (record.innerHTML === "") {
				return;
			}
			list.push(...tempAdd);
			tempDelete.forEach((id) => {
				let index = list.findIndex((item) => item.id === id);
				list.splice(index, 1);
			});
			//父元素被替换了，事件委托失效，因为引用类型
			parent = updateItem(list, selector, oldChildSelector);
			parent.onclick = function (e) {
				parentClick(e);
			};
			tempAddId = [];
			tempAdd = [];
			tempDelete = [];
			record.innerHTML = "";
			if (noteTip) {
				noteTip.innerText = "";
			}
			callback();
		});
		reset.addEventListener("click", function (e) {
			if (record.innerHTML === "") {
				return;
			}
			const items = parent.querySelectorAll("span");
			items.forEach((span) => {
				span.style.display = "inline-block";
				if (tempAddId.includes(span.children[0].dataset.id * 1)) {
					parent.removeChild(span);
				}
			});
			tempAddId = [];
			tempAdd = [];
			tempDelete = [];
			record.innerHTML = "";
			if (noteTip) {
				noteTip.innerText = "";
			}
		});
		/**
		 * @description: 事件委托点击事件
		 * @param {type} 事件对象e
		 * @return: undefined
		 */

		function parentClick(e) {
			if (e.target.tagName === "I") {
				tempDelete.push(e.target.dataset.id * 1);
				let span = e.target.parentNode;
				e.target.parentNode.style.display = "none";
				let div = document.createElement("div");
				div.style.color = "#cf1322";
				div.innerText = `删除 -> ${span.textContent.replace("X", "")}`;
				record.appendChild(div);
			} else {
				return;
			}
		}
		/**
		 * @description:
		 * @param {Array} 待现实的列表
		 * @param {String} 父元素的选择器
		 * @param {String} 待替换的子元素选择器
		 * @return: dom父元素
		 */

		function updateItem(list, selector, oldChildSelector) {
			let itemLink = "";
			if (list.length === 0) {
				itemLink = `span{没有内容}`;
			} else {
				itemLink = list
					.map((item) => `(span{${item.title}}>i[data-id="${item.id}]{X})`)
					.join("+");
			}
			const str = `div[class="tags-card]>(${itemLink})`;
			element.replaceChild(
				selector,
				oldChildSelector,
				element.generateDomObjArr(str)[0]
			);
			return document.querySelector(oldChildSelector);
		}
	}
})();
