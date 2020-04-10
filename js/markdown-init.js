const md = window
	.markdownit({
		html: true,
		linkify: true,
		breaks: true,
		typographer: true,

		highlight: function (str, lang) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return (
						'<pre class="hljs"><code>' +
						hljs.highlight(lang, str, true).value +
						"</code></pre>"
					);
				} catch (__) {}
			}

			return (
				'<pre class="hljs"><code>' +
				md.utils.escapeHtml(str) +
				"</code></pre>"
			);
		},
	})
	.use(window.markdownitSub)
	.use(window.markdownitSup)
	.use(window.markdownitFootnote)
	.use(window.markdownitDeflist)
	.use(window.markdownitTaskLists)
	.use(window.markdownitMark)
	.use(window.markdownItAnchor, {
		permalink: true,
		permalinkClass: "anchor",
		permalinkBefore: true,
		permalinkSymbol: '<span class="octicon octicon-link"></span>',
	})
	.use(window.markdownItTocDoneRight, {
		containerClass: "toc",
		containerId: "toc",
		listType: "ul",
		listClass: "listClass",
		itemClass: "itemClass",
		linkClass: "linkClass",
		callback: function (html, ast) {
			// left.innerHTML = html;
		},
	});
