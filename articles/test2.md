## 前言

前段时间一冲动搞了个[腾讯云主机](https://cloud.tencent.com/product/cvm)，最简单的配置那种。买完之后一阵折腾，想着不如整个博客，于是各种博客搭建方案，看着好多漂亮的博客，毅然决定搭建一个自己的博客，正好自己是一个前端新手，写一个这样的博客，正好能锻炼自己，说干就干，开始逐个解决技术难点。

## 什么是栅格系统

在许多前端框架里"许多前端框架里"，我们都能见到css栅格系统，如Bootstrap，pure等等，通过栅格系统可以实现多种设备的响应式布局。那啥是栅格系统？话不多说直接引用。

> 栅格系统（CSS Grids）是一种运用固定的格子设计版面布局，在报刊杂志上尤为常见。
> 如今响应式设计大行其道，对于前端开发，栅格系统可以：
> 
>    - 提高生产力，通过在网格的划分，元素更容易堆放而且在跨浏览器上面具有一致性，使我们可以专心的注意布局而不是兼容上。
>    - 具有灵活性，无论是什么样的布局，都可以拆分到粒度为一个网格的大小。
>    - 支持响应式设计，栅格系统本身能很好的和响应式设计结合在一起，或者说，我们的栅格系统是基于响应式设计的。
> 
> 著作权归作者所有。
> 商业转载请联系作者获得授权,非商业转载请注明出处。
> 原文: https://liaokeyu.com/%E6%8A%80%E6%9C%AF/2017/01/23/%E8%B7%9F%E7%9D%80%E5%86%99%E4%B8%80%E4%B8%AACSS%E6%A0%85%E6%A0%BC%E5%B8%83%E5%B1%80.html

## 响应式实现方案

响应式实现方案有许多种，大家也可以去查查，我的实现想法主要有三个关键点。

- 媒体查询
- 浮动
- 流式布局

### 媒体查询
> 媒体查询（Media Query）是CSS提出来的一个新的属性，通过媒体查询可以查询到screen的宽度，从而指定某个宽度区间的网页布局。

具体实现方式如下:
```css
/*查询屏幕*/
@media screen and 条件 {
}
/*条件的写法*/
/*min-width:只要屏幕宽度超过这个值的设备样式就能生效*/
/*max-width:只要屏幕宽度小于这个值的设备样式就能生效*/

/* 表示可见区域大于1200px样式生效 */
@media screen and (min-width: 1200px) {
  .container {
    width: 1170px;
    background-color: red;
  }
}
/* 表示可见区域大于992px小于1200px样式生效 */
@media screen and (min-width: 992px) and (max-width: 1200px) {
  .container {
    width: 970px;
    background-color: blue;
  }
}
```

### 流式布局

**流式布局**，也叫百分比布局，是移动端开发中经常使用的布局方式之一。

流式布局的特征：

- 宽度自适应，高度写死，并不是百分百还原设计图
- 图标都是固定死大小的，包括字体等也是固定死的。并不是所有的东西都是自适应的。
- 一些大的图片，设置宽度为百分比自适应即可，随着屏幕大小进行变化

**比如，以下代码能实现子盒子在可视区中各占四分之一：**
```html
<body>
    <div class="container">
        <div class="child-one"></div>
        <div class="child-two"></div>
        <div class="child-three"></div>
        <div class="child-four"></div>
    </div>
</body>
```
```CSS
.container {
  width: 100%;
}
.child-one {
  width: 25%;
}
.child-two {
  width: 25%;
}
.child-three {
  width: 25%;
}
.child-four {
  width: 25%;
}
```

## 编程实现

### 定义
当前的主流设备的屏幕从大概尺寸如下：

- 大屏设备(>1200px) 
- 中屏设备(992-1200)
- 小屏设备(768-992)
- 超小屏设备(<768px)

为了自己的博客的布局不需要适配那么多设备，根据实际需求，于是就采用三个宽度来定义**大、中、小屏和超大屏**。

- 小于768px的小屏（sm）
- 大于768px小于960px的中屏（md）
- 大于960px小于1280px的大屏（lg）
- 大于1280px的超大屏

**跟随大众采用 12 栏形式的栅格，所以`-sm-`、`-md-`、`-lg-`形式的样式表示小、中、大屏的样式。**

- **小屏隐藏:** 表示在小屏隐藏，其他屏显示 `hidden-sm`
- **中屏隐藏:** 表示在中屏隐藏，其他屏显示 `hidden-md`
- **大屏隐藏:** 表示在大屏隐藏，其他屏显示 `hidden-lg`
- **小屏显示:** 表示在小屏显示，其他屏隐藏 `visible-sm`
- **中屏显示:** 表示在小屏显示，其他屏隐藏 `visible-md`
- **大屏显示:** 表示在小屏显示，其他屏隐藏 `visible-lg`

### 初始化样式

为了节省计算于是使用了`less`，只是简单应用了嵌套和变量。直接看代码注释👇

```less
/* 设置单位宽度 */
@unit-width: 100%/12;
/* 设置容器居中，宽100% */
.container {
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	/* 盒子內减，减少不必要的宽高计算 */
	* {
		box-sizing: border-box;
	}
}
/* 设置行宽100% */
.row {
	position: relative;
	width: 100%;
	padding: 15px;
}
/*设置各列浮动，以及间隔*/
.row [class^="col"] {
	float: left;
	padding: 15px;
	min-height: 1px;
}
/* 清除浮动 */
.row::after {
	content: "";
	display: table;
	clear: both;
}
```

### 小屏样式
**小屏样式表示在小于768px情况下的样式**
- `col-1`表示在大屏以上的屏幕占 1/12
- `col-1-md`表示在中屏以上的屏幕占 1/12
- `col-1-sm`表示在小屏以上的屏幕占 1/12

```less
/* 大屏和中屏的样式初始样式，
小屏情况下，拥有这些样式的元素会占据一整行，
简而言之，就是依次横着排列变成依次竖着排列 */
.col-1,.col-2,.col-3,.col-4,.col-5,.col-6,
.col-7,.col-8,.col-9,.col-10,.col-11,.col-12,
.col-1-md,.col-2-md,.col-3-md,.col-4-md,
.col-5-md,.col-6-md,.col-7-md,.col-8-md,
.col-9-md,.col-10-md,.col-11-md,.col-12-md {
	width: 12 * @unit-width;
}

/*使用这些样式的元素在小屏情况下*/
.col-1-sm {
	width: @unit-width;
}
.col-2-sm {
	width: 2 * @unit-width;
}
.col-3-sm {
	width: 3 * @unit-width;
}
.col-4-sm {
	width: 4 * @unit-width;
}
.col-5-sm {
	width: 5 * @unit-width;
}
.col-6-sm {
	width: 6 * @unit-width;
}
.col-7-sm {
	width: 7 * @unit-width;
}
.col-8-sm {
	width: 8 * @unit-width;
}
.col-9-sm {
	width: 9 * @unit-width;
}
.col-10-sm {
	width: 10 * @unit-width;
}
.col-11-sm {
	width: 11 * @unit-width;
}
.col-12-sm {
	width: 12 * @unit-width;
}
/* 隐藏 和显示样式*/
.hidden-sm,
.visible-lg,
.visible-md {
	display: none;
}
/* 小屏可见 */
.hidden-md,
.hidden-lg,
.visible-sm {
	display: block;
}
```

### 中屏样式

```less
/* 媒体查询 大于768px生效*/
@media only screen and (min-width: 768px) {
    /* 中屏的容器，版心 */
	.container {
		width: 96%;
	}
	/* 中屏时，该样式会覆盖之前的样式，实现中屏的样式 */
	.col-1-md {
		width: @unit-width;
	}
	.col-2-md {
		width: 2 * @unit-width;
	}
	.col-3-md {
		width: 3 * @unit-width;
	}
	.col-4-md {
		width: 4 * @unit-width;
	}
	.col-5-md {
		width: 5 * @unit-width;
	}
	.col-6-md {
		width: 6 * @unit-width;
	}
	.col-7-md {
		width: 7 * @unit-width;
	}
	.col-8-md {
		width: 8 * @unit-width;
	}
	.col-9-md {
		width: 9 * @unit-width;
	}
	.col-10-md {
		width: 10 * @unit-width;
	}
	.col-11-md {
		width: 11 * @unit-width;
	}
	.col-12-md {
		width: 12 * @unit-width;
	}
	.hidden-sm,
	.hidden-lg,
	.visible-md {
		display: block;
	}
	.hidden-md,
	.visible-sm,
	.visible-lg {
		display: none;
	}
}
```

### 大屏样式

```less
/* 媒体查询 大于960px生效*/
@media only screen and (min-width: 960px) {
    /* 大屏的容器，版心 */
	.container {
		width: 90%;
	}
	/* 大屏时，该样式会覆盖之前的样式，实现大屏的样式 */
	.col-1 {
		width: @unit-width;
	}
	.col-2 {
		width: 2 * @unit-width;
	}
	.col-3 {
		width: 3 * @unit-width;
	}
	.col-4 {
		width: 4 * @unit-width;
	}
	.col-5 {
		width: 5 * @unit-width;
	}
	.col-6 {
		width: 6 * @unit-width;
	}
	.col-7 {
		width: 7 * @unit-width;
	}
	.col-8 {
		width: 8 * @unit-width;
	}
	.col-9 {
		width: 9 * @unit-width;
	}
	.col-10 {
		width: 10 * @unit-width;
	}
	.col-11 {
		width: 11 * @unit-width;
	}
	.col-12 {
		width: 12 * @unit-width;
	}
	.hidden-lg,
	.visible-sm,
	.visible-md {
		display: none;
	}
	.hidden-md,
	.visible-lg {
		display: block;
	}
}
```

### 超大屏样式

```less
/* 超大屏没有适配，直接给个版心就好 */
@media only screen and (min-width: 1280px) {
	.container {
		width: 85%;
		max-width: 1280px;
	}
}
```

## 效果展示
写完样式要做个测试，来看看效果，demo 代码如下：
```html
<style>
        div [class^="col"] {
            border: 2px solid #000;
        }

        .row {
            border: 2px solid red;
        }
</style>
/************************************/
<div class="container">
        <div class="row">
            <div class="col-4">
                <h5>大屏样式</h5>
            </div>
            <div class="col-4-md">
                <h5>中屏样式</h5>
            </div>
            <div class="col-4-sm">
                <h5>小屏样式</h5>
            </div>
        </div>
        <div class="row">
            <div class="col-4-sm hidden-lg">
                <h5>大屏隐藏</h5>
            </div>
            <div class="col-4-sm hidden-md">
                <h5>中屏隐藏</h5>
            </div>
            <div class="col-4-sm hidden-sm">
                <h5>小屏隐藏</h5>
            </div>
        </div>
        <div class="row">
            <div class="col-4-sm visible-lg">
                <h5>大屏显示</h5>
            </div>
            <div class="col-4-sm visible-md">
                <h5>中屏显示</h5>
            </div>
            <div class="col-4-sm visible-sm">
                <h5>小屏显示</h5>
            </div>
        </div>
    </div>

```

![shange-demo](_v_images/20200404202815248_15237.gif)

**大功告成！** ✌

参考文章和开源项目：

- [详解前端响应式布局、响应式图片，与自制栅格系统](https://juejin.im/post/5a179a1851882510b2751071)
- [跟着写一个CSS栅格布局](https://liaokeyu.com/%E6%8A%80%E6%9C%AF/2017/01/23/%E8%B7%9F%E7%9D%80%E5%86%99%E4%B8%80%E4%B8%AACSS%E6%A0%85%E6%A0%BC%E5%B8%83%E5%B1%80.html)
- [A simple, lightweight CSS grid——Simple-Grid](https://github.com/zachacole/Simple-Grid)




