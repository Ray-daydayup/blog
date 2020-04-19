/*
 * @Author       : Ray
 * @Date         : 2020-04-19 10:41:45
 * @LastEditors  : Ray
 * @LastEditTime : 2020-04-19 10:42:18
 * @FilePath     : \myblog\js\commonFooter.js
 * @Description  : file content
 */
(function () {
	var footerDom = {
		tagName: "footer",
		prop: {
			class: "common-footer",
		},
		children: [
			{
				tagName: "div",
				prop: {
					class: "container",
				},
				children: [
					{
						tagName: "div",
						prop: {
							class: "row",
						},
						children: [
							{
								tagName: "h5",
								children: [
									{
										tagName: "span",
										textNode: "备案号:",
									},
									{
										tagName: "a",
										textNode: "苏ICP备20011704号",
										prop: {
											href: "http://beian.miit.gov.cn",
											target: "_blank",
											rel: "noopener noreferrer",
										},
									},
								],
							},
							{
								tagName: "h5",
								children: [
									{
										tagName: "span",
										textNode: "©本博客参考",
									},
									{
										tagName: "a",
										textNode: "辣椒の酱",
										prop: {
											href: "https://removeif.github.io/removeif-demo/",
											target: "_blank",
										},
									},
									{
										tagName: "span",
										textNode: "的博客进行修改",
									},
								],
							},
							{
								tagName: "h5",
								textNode:
									"© 版权说明：[本网站所有内容均收集于互联网或自己创作,",
							},
							{
								tagName: "h5",
								children: [
									{
										tagName: "span",
										textNode: "方便于网友与自己学习交流，如有侵权，请",
									},
									{
										tagName: "a",
										textNode: "留言",
										prop: {
											href:
												"http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&amp;email=-oSKjJqfh5qfh4uOvpiRhpOfl5LQnZGT",
											target: "_blank",
										},
									},
									{
										tagName: "span",
										textNode: "，立即处理]",
									},
								],
							},
						],
					},
				],
			},
		],
	};
	element.appendChild("body", footerDom);
})();
