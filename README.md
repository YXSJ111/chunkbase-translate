# Chunkbase 汉化插件 🎯

专为 [chunkbase.com](https://www.chunkbase.com/) 准备的 Minecraft 中文翻译用户脚本。

> 还在对着满屏英文的种子地图发愁吗？这个脚本帮你一键汉化！

## ✨ 功能特点

- **全站汉化** — 导航、功能页面、设置面板...能翻的基本都翻了
- **三级翻译引擎** — 完整精确匹配 → 短语匹配 → 单词匹配，层层兜底，不漏翻
- **动态内容监听** — 实时更新的坐标、生物群系名称也会自动翻译
- **Canvas 拦截** — 连地图上绘制的文字也能汉化，覆盖率拉满
- **翻译缓存** — 高频调用的文本不走重复匹配，流畅不卡顿

## 📦 安装方法

1. 确保浏览器安装 [Tampermonkey](https://www.tampermonkey.net/) 扩展
2[点击此处安装脚本](https://github.com/YXSJ111/chunkbase-translate/raw/main/chunkbase-cn.user.js)（或者手动复制 `chunkbase-cn.user.js` 的内容粘贴到 Tampermonkey 新建脚本中）
3打开 [chunkbase.com](https://www.chunkbase.com/)，享受中文界面！

## 🧩 翻译内容

| 分类 | 内容 |
|------|------|
| 🧭 导航/页面 | 首页、功能列表、教程、新闻 |
| 🗺️ 种子地图 | UI 文本、设置面板、标记、弹窗 |
| 🌿 生物群系 | 主世界/下界/末地全部生物群系 |
| 🏛️ 结构 | 要塞、村庄、神庙、矿井等全部结构 |
| 📖 完整句子 | 新闻条目、功能介绍、tooltip 说明 |
| 🎨 Canvas 文字 | 地图上绘制的实时文本 |

## 🔧 技术细节

- 通过 `MutationObserver` 监听 DOM 变化，实时翻译动态加载的内容
- 三档翻译优先级：`EXACT`（完整匹配）→ `PHRASES`（短语）→ `WORDS`（单词）
- Canvas 通过拦截 `fillText` / `strokeText` 实现翻译
- 内置缓存机制，避免重复正则匹配

## 📝 说明

非 Minecraft 官方产品，未经 Mojang 批准或关联。

---

> *"打开 Chunkbase 发现全是中文的那一刻，感觉世界都清晰了。"* — 某个不愿透露姓名的 MC 玩家
