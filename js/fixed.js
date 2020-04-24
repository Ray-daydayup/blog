/*
 * @Author       : Ray
 * @Date         : 2020-04-15 11:02:26
 * @LastEditors  : Ray
 * @LastEditTime : 2020-04-23 10:57:28
 * @FilePath     : \myblog\js\fixed.js
 * @Description  : 固定左右标签
 */

window.onscroll = function () {
	fixCard("#left-area", "#center-area");
	fixCard("#right-area", "#center-area");
	function fixCard(ID, scrollID) {
		let card = document.querySelector(ID);
		if (!card) {
			return;
		}
		let startHeight =
			card.offsetHeight - document.documentElement.clientHeight * 0.88;
		let endHeight =
			document.querySelector(scrollID).offsetHeight - card.offsetHeight;
		let scrollHeight =
			startHeight > 0
				? document.documentElement.scrollTop - startHeight
				: document.documentElement.scrollTop - 0;
		if (scrollHeight >= 0 && endHeight > 0) {
			if (scrollHeight <= endHeight) {
				card.style.transform = `translateY(${scrollHeight}px)`;
			} else {
				card.style.transform = `translateY(${endHeight}px)`;
			}
		} else {
			card.style.transform = `translateY(0px)`;
		}
	}
};
