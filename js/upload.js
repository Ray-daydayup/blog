/*
 * @Author       : Ray
 * @Date         : 2020-04-29 10:22:33
 * @LastEditors  : Ray
 * @LastEditTime : 2020-04-30 15:56:20
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
			insertSelect(categoryList, "#categorySelect", ".categorySelected");
			insertSelect(tagsList, "#tagsSelect", ".tagsSelected");
			submitArticle("#article-form", ".submit-btn", function (tempData) {
				// console.log("tempData :>> ", tempData);
				articles.unshift(tempData);
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
	/**
	 * @description: 生成新增文章的标签和分类
	 * @param {Array} list
	 * @param {String} 下拉框id(#tagsSelect)
	 * @param {String} note 提示的类名
	 * @return:
	 */
	function insertSelect(list, selector, noteSelector) {
		if (list.length === 0) {
			return;
		}
		const str = list
			.map((item) => `<option value="${item.id}">${item.title}</option>`)
			.join("");
		const select = document.querySelector(selector);
		const noteTip = document.querySelector(noteSelector);
		select.innerHTML = str;
		const selectedOptions = select.selectedOptions;
		if (selectedOptions.length > 0) {
			noteTip.innerHTML = [...selectedOptions]
				.map((item) => `<span>${item.text}</span>`)
				.join("");
		}
		console.log("selectedOptions.length :>> ", selectedOptions.length);
		select.oninput = function (e) {
			if (selectedOptions.length > 0) {
				noteTip.innerHTML = [...selectedOptions]
					.map((item) => `<span>${item.text}</span>`)
					.join("");
			}
		};
	}

	/**
	 * @description: 绑定提交事件，获取
	 * @param {String} 表单id选择器
	 * @param {String} 按钮类选择器
	 * @param {Function} 回调函数
	 * @return:
	 */
	function submitArticle(formSelector, btnSelector, callback) {
		const submitBtn = document.querySelector(`${formSelector} ${btnSelector}`);
		const form = document.querySelector(formSelector);
		const formElements = form.querySelectorAll(`${formSelector} [name]`);
		const noteV = form.querySelector(".noteV");
		const fileInput = form.querySelector('[name="file"]');
		fileInput.oninput = function () {
			console.log("this.files[0] :>> ", this.files[0]);
			form.querySelector('[name="title"]').value = this.files[0].name.replace(
				".md",
				""
			);
			form.querySelector('[name="time"]').value = formatDate(
				new Date(this.files[0].lastModified)
			);
		};
		submitBtn.addEventListener("click", function (e) {
			let tempData = { id: Date.now() };
			let fileElement = [];
			let flag = [...formElements].every((item) => {
				if (item.name === "file") {
					if (item.files.length === 0) {
						noteV.value = "请上传文件";
						return false;
					}
					fileElement.push(item.files[0]);
					tempData["url"] = item.files[0].name;
				} else if (item.name === "tags") {
					if (item.value === "") {
						noteV.value = "未选标签";
						return false;
					}
					tempData[item.name] = [...item.selectedOptions].map(
						(item) => item.value * 1
					);
				} else if (item.name === "category") {
					tempData[item.name] = item.value * 1;
				} else {
					if (item.value === "") {
						noteV.value = "标题or日期or摘要未填";
						return false;
					}
					tempData[item.name] = item.value;
				}
				return true;
			});
			if (!flag) {
				return;
			}
			noteV.value = "";
			callback(tempData);
			let formData = new FormData();
			formData.append("file", fileElement[0]);
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4 && xhr.status == 200) {
					console.log(xhr.responseText);
				}
			};

			xhr.open("POST", "./uploadFile.php", true);
			xhr.send(formData);
		});
		function formatDate(now) {
			let year = now.getFullYear();
			let month =
				now.getMonth() + 1 >= 10
					? now.getMonth() + 1
					: `0${now.getMonth() + 1}`;
			let date = now.getDate() >= 10 ? now.getDate() : `0${now.getDate()}`;
			console.log(year);
			return year + "-" + month + "-" + date;
		}
	}
})();
