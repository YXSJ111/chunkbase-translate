// ==UserScript==
// @name         Chunkbase 汉化
// @namespace    chunkbase-cn
// @version      2.1
// @description  为 chunkbase.com 提供准确的 Minecraft 中文翻译（支持子串兜底匹配）
// @author       Hermes
// @match        https://www.chunkbase.com/*
// @match        https://chunkbase.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict';

  // ============================================================
  // 翻译词典（分三档：完整匹配 / 短语 / 单词）
  // ============================================================

  // --- 第一档：完整文本精确匹配（优先级最高） ---
  const EXACT = {

    // 导航
    'Home': '首页',
    'Apps': '功能',
    'Mods': '模组',
    'Tuts': '教程',

    // 页面标题
    'Minecraft Apps - Overview': 'Minecraft 功能 — 总览',
    'Seed Map - Minecraft App': '种子地图 — Minecraft 应用',
    'Biome Finder - Minecraft App': '生物群系查找器 — Minecraft 应用',
    'Slime Finder - Minecraft App': '史莱姆区块查找器 — Minecraft 应用',
    'Village Finder - Minecraft App': '村庄查找器 — Minecraft 应用',
    'Chunk Base - Minecraft Apps, Mods and Tutorials': 'Chunk Base — Minecraft 功能、模组与教程',

    // 首页区块标题
    'News': '新闻',
    'Recent': '最近更新',
    'Changed': '已更新',

    // 首页 Twitter 文案
    'Stay up to date and join the discussion: Follow @chunkbase on Twitter!':
      '关注 @chunkbase 获取最新动态并加入讨论！',

    // 完整句子
    'Want to see everything on one map? Check out our': '想在一张地图上查看所有内容？试试我们的',
    'Seed Map App': '种子地图功能',
    'This set of apps allows you to easily view different map features and find points of interest in your minecraft world with just your map seed. Version support varies.':
      '这组功能让你只需输入地图种子，就能轻松查看各种地图特性并在你的 Minecraft 世界中找到兴趣点。各功能支持的版本有所不同。',
    'Spawn Chunks Reader provides a quick and easy way to figure out your world\'s spawn chunks and coordinates by submitting your level.dat file.':
      '出生点区块读取器让你通过提交 level.dat 文件，快速轻松地确定世界的出生点区块和坐标。',
    'With this Seed Finder App, you can find Minecraft seeds based on where you want to have slime chunks.':
      '使用此种子查找器，你可以根据想要的史莱姆区块位置来查找 Minecraft 种子。',
    'This app allows you to create your own superflat presets. Every aspect can be customized. Only for PC.':
      '此应用让你创建自己的超平坦预设。每个方面都可以自定义。仅限 PC 版。',
    'Not sure which blocks can be set on fire or picked up by endermen? The Block Compendium will answer that and much more, giving you a list of all blocks you can use for your next project.':
      '不确定哪些方块可以被点燃或被末影人拿起？方块纲要将回答这个问题以及更多，为你列出下一个项目可用的所有方块。',
    'A collection of apps to help you find the best Minecraft seeds, and locate biomes and structures in your world on an interactive map.':
      '一系列帮助你寻找最佳 Minecraft 种子、在交互式地图上定位生物群系和结构的功能合集。',
    'Not an official Minecraft product. Not approved by or associated with Mojang.':
      '非 Minecraft 官方产品。未经 Mojang 批准或关联。',

    // 分类标签（完整匹配）
    'Chunk Finders': '区块查找器',
    'More Apps': '更多功能',
    'Nether and End': '下界与末地',

    // 动态 UI
    'Load from Save...': '从存档加载...',
    'Loading...': '加载中...',
    'Processing...': '处理中...',
    'No results found.': '未找到结果。',
    'Try adjusting your filters.': '尝试调整筛选条件。',
    'An error occurred.': '发生错误。',
    'Please try again.': '请重试。',
    'Click to copy': '点击复制',
    'Copied!': '已复制！',
    'Right click to place marker': '右键放置标记',
    'Mouse wheel to zoom': '鼠标滚轮缩放',
    'Drag to pan': '拖拽平移',
    'Zoom in': '放大',
    'Zoom out': '缩小',
    'Center map': '居中地图',
    'Toggle fullscreen': '切换全屏',
    'All Rights Reserved.': '保留所有权利。',
    'Let me know if you run into any issues!': '如果遇到任何问题请告诉我！',

    // 版本标签
    'Java 26.1 (LB)': 'Java 26.1 (大型生物群系)',
    'Java 26.2 (Exp.)': 'Java 26.2 (实验性)',
    'Java 26.2 (LB, Exp.)': 'Java 26.2 (大型生物群系, 实验性)',
    'Bedrock 26.30 (Exp.)': '基岩版 26.30 (实验性)',
    'Bedrock 26.0 - 26.20': '基岩版 26.0 - 26.20',

    // 完整新闻条目
    'Updated Sulfur Caves generation for latest snapshot.':
      '更新了最新快照版的硫磺洞穴生成。',
    'Sulfur Caves are now available for Java Snapshots as well.':
      '硫磺洞穴现在也支持 Java 快照版。',
    'Added experimental sulfur caves support for Bedrock Preview versions. You can now also see the rough height ranges of cave biomes in map marker popups.':
      '为基岩预览版添加了实验性硫磺洞穴支持。现在你也可以在地图标记弹窗中查看洞穴生物群系的大致高度范围。',
    'Another feature drop without changes to the seed map. Hope you still enjoy the new map features and the Tiny Takeover update!':
      '又一轮特性更新，种子地图无变化。希望你依然喜欢新的地图功能和 Tiny Takeover 更新！',
    'The map now has a settings menu that allows you to customize it based on recent feedback.':
      '地图现在新增了设置菜单，可以根据最近的反馈进行自定义。',
    'The updated map experience is now enabled by default. Thanks to everyone who tried it, shared feedback, and helped find and fix issues!':
      '更新后的地图体验现已默认启用。感谢所有尝试、分享反馈和帮助发现并修复问题的用户！',
    'An updated map experience is coming to Chunk Base with smoother scrolling, customizable markers, and more! For now, it\'s opt-in at':
      '全新的地图体验即将登陆 Chunk Base，带来更流畅的滚动、可自定义的标记等！目前可在以下地址选择加入：',
    'Have fun with the Mounts of Mayhem drop this holiday season! As a heads-up, the seed map generation is unchanged.':
      '祝你在假期享受 Mounts of Mayhem 更新！提醒一下，种子地图生成没有变化。',
    'I hope everyone\'s enjoying the Copper Age drop! No major changes to the seed map, but if you\'re ever tired of searching for copper, you know where to look :)':
      '希望大家喜欢 Copper Age 更新！种子地图没有重大变化，但如果你厌倦了寻找铜矿，你知道该去哪里找 :)',
    'All maps are updated for the Chase the Skies drop. Have fun!':
      '所有地图已针对 Chase the Skies 更新进行了调整。玩得开心！',
    'Reduced the number of features enabled by default on the seed map. Your selection will now be remembered between sessions. Additionally, added an option to manually save and load marked locations to disk.':
      '减少了种子地图默认启用的特性数量。你的选择现在会在会话之间保留。此外，添加了手动将标记位置保存到磁盘和加载的选项。',
    'Seed maps load significantly faster (~35% overworld, ~60% nether, ~80% End on a typical machine with default settings). Also tweaked Grove/Jagged Peaks colors and added custom world border support.':
      '种子地图加载速度大幅提升（典型机器默认设置下：主世界约 35%，下界约 60%，末地约 80%）。同时微调了丛林/尖峭山峰的颜色，并添加了自定义世界边界支持。',

    // 杂项
    'Site Map': '网站地图',
    'Contact': '联系我们',
    'Legal Notice': '法律声明',
    'Privacy': '隐私政策',
    'Terms': '使用条款',
    'Outdated': '已过时',
    'Popular': '热门',
    '[App]': '[应用]',
    '[Mod]': '[模组]',
    '(MC ': '(MC ',
    'Last Update': '最后更新',
    'The Nether': '下界',
    'The End': '末地',
    'Go': '定位',
    'Go!': '定位',
    'Groups': '分组',
    'Group': '分组',
    'All Biomes': '所有生物群系',
    'All Structures': '所有结构',
    'Surface Biomes': '地表生物群系',
    'Cave Biomes': '洞穴生物群系',
    'Aquatic Biomes': '水生生物群系',
    'Nether Biomes': '下界生物群系',
    'End Biomes': '末地生物群系',
    'Overworld Structures': '主世界结构',
    'Nether Structures': '下界结构',
    'End Structures': '末地结构',
    'Terrain Features': '地形特征',
    'Vegetation': '植被',
    'Miscellaneous': '杂项',

    // Seed Map 设置面板
    'bottom': '底部',
    'Bottom': '底部',
    'Momentum panning': '惯性平移',
    'Map rotation': '地图旋转',
    'Fade in biomes': '生物群系淡入',
    'Copy teleport command': '复制传送指令',
    'Cluster radius': '聚合半径',
    'Concurrency': '并发数',
    'World border': '世界边界',
    'requires reload': '需要重新加载',

    // 设置 tooltip
    'Allows the map to glide to a smooth stop after you swipe or drag it':
      '允许地图在你滑动或拖动后平滑地停止。',
    'Allows you to rotate the map via Shift+Alt+Drag or two-finger rotation gestures on touch devices':
      '允许您通过 Shift + Alt 拖动或触摸设备上的双指旋转手势来旋转地图。',
    'Biomes fade in smoothly when you interact with the map instead of appearing instantly when loaded':
      '当你与地图交互时，生物群落会平滑地淡入，而不是在加载时立即出现',
    "Include '/tp' when copying coordinates to the clipboard":
      "在将坐标复制到剪贴板时包含 '/tp'。",
    "Include '/tp' when copying coordinates to the clipboard.":
      "在将坐标复制到剪贴板时包含 '/tp'。",
    'Merges features close to each other to declutter the map. Current block radius: 16':
      '将彼此接近的特征合并以清理地图。当前块半径：16',
    'Merges features close to each other to declutter the map. Current block radius: 24':
      '将彼此接近的特征合并以清理地图。当前块半径：24',
    'Number of concurrent web workers to load map data. A higher number may improve performance, but may also increase usage of system resources and battery':
      '加载地图数据的并发网络工作线程数量。数量越多可能提高性能，但也可能增加系统资源和电池的使用。',
    'Limits the navigable area and renders a border on the map':
      '限制可通行区域，并在地图上显示边界',
  };

  // --- 第二档：多词短语（用于子串替换，按长度降序排列以优先匹配长短语） ---
  const PHRASES = [
    // Minecraft 结构/特性（长优先）
    ['Pillager Outpost Finder', '掠夺者前哨站查找器'],
    ['Buried Treasure Finder', '埋藏的宝藏查找器'],
    ['Ocean Ruin Finder', '海底废墟查找器'],
    ['Amethyst Geode Finder', '紫水晶洞查找器'],
    ['Desert Temple Finder', '沙漠神殿查找器'],
    ['Jungle Temple Finder', '丛林神庙查找器'],
    ['Ruined Portal Finder', '废弃传送门查找器'],
    ['Mineshaft Finder', '废弃矿井查找器'],
    ['Stronghold Finder', '要塞查找器'],
    ['Mansion Finder', '林地府邸查找器'],
    ['Monument Finder', '海底遗迹查找器'],
    ['Village Finder', '村庄查找器'],
    ['Biome Finder', '生物群系查找器'],
    ['Slime Finder', '史莱姆区块查找器'],
    ['Dungeon Finder', '地牢查找器'],
    ['Shipwreck Finder', '沉船查找器'],
    ['Witch Hut Finder', '女巫小屋查找器'],
    ['Igloo Finder', '雪屋查找器'],
    ['Fossil Finder', '化石查找器'],
    ['Ravine Finder', '峡谷查找器'],
    ['End City Finder', '末地城查找器'],
    ['Bastion Finder', '堡垒遗迹查找器'],
    ['End Gateway Finder', '末地折跃门查找器'],
    ['Ancient City Finder', '远古城市查找器'],
    ['Nether Fortress Finder', '下界要塞查找器'],

    ['Pillager Outpost', '掠夺者前哨站'],
    ['Buried Treasure', '埋藏的宝藏'],
    ['Nether Fortress', '下界要塞'],
    ['Ancient City', '远古城市'],
    ['Amethyst Geode', '紫水晶洞'],
    ['Desert Temple', '沙漠神殿'],
    ['Jungle Temple', '丛林神庙'],
    ['Ruined Portal', '废弃传送门'],
    ['Ocean Ruin', '海底废墟'],
    ['Witch Hut', '女巫小屋'],
    ['End City', '末地城'],
    ['End Gateway', '末地折跃门'],
    ['Slime Chunk', '史莱姆区块'],
    ['Spawn Point', '出生点'],
    ['Spawn Chunks', '出生点区块'],

    // 复合词
    ['Spawn Chunks Reader', '出生点区块读取器'],
    ['Seed Finder for Slime Chunks', '史莱姆区块种子查找器'],
    ['Seed Map', '种子地图'],
    ['Superflat Generator', '超平坦生成器'],
    ['Block Compendium', '方块纲要'],

    // 其他多词短语
    ['Find Buried Treasures', '查找埋藏的宝藏'],
    ['Find Amethyst Geodes', '查找紫水晶洞'],
    ['Find Ancient Cities', '查找远古城市'],
    ['Find Desert Temples', '查找沙漠神殿'],
    ['Find Jungle Temples', '查找丛林神庙'],
    ['Find Ruined Portals', '查找废弃传送门'],
    ['Find Nether Fortresses', '查找下界要塞'],
    ['Find End Gateways', '查找末地折跃门'],
    ['Find Slime Chunks', '查找史莱姆区块'],
    ['Find Witch Huts', '查找女巫小屋'],
    ['Find Ocean Ruins', '查找海底废墟'],
    ['Find Shipwrecks', '查找沉船'],
    ['Find Strongholds', '查找要塞'],
    ['Find Mineshafts', '查找废弃矿井'],
    ['Find Monuments', '查找海底遗迹'],
    ['Find Outposts', '查找掠夺者前哨站'],
    ['Find Mansions', '查找林地府邸'],
    ['Find Dungeons', '查找地牢'],
    ['Find Villages', '查找村庄'],
    ['Find Biomes', '查找生物群系'],
    ['Find End Cities', '查找末地城'],
    ['Find Bastions', '查找堡垒遗迹'],
    ['Find Fossils', '查找化石'],
    ['Find Ravines', '查找峡谷'],
    ['Find Igloos', '查找雪屋'],

    // 通用多词
    ['Chunk Base', 'Chunk Base'],
    ['Minecraft Apps', 'Minecraft 功能'],
    ['Last Update', '最后更新'],
    ['Seed Map', '种子地图'],
    ['map features', '地图特性'],
    ['map seed', '地图种子'],
    ['interactive map', '交互式地图'],
    ['points of interest', '兴趣点'],
    ['Version support', '版本支持'],
    ['world border', '世界边界'],
    ['custom world border', '自定义世界边界'],
    ['Sulfur Caves', '硫磺洞穴'],
    ['sulfur caves', '硫磺洞穴'],
    ['Jagged Peaks', '尖峭山峰'],
    ['Tiny Takeover', 'Tiny Takeover'],
    ['Mounts of Mayhem', 'Mounts of Mayhem'],
    ['Copper Age', 'Copper Age'],
    ['Chase the Skies', 'Chase the Skies'],
    ['snapshot', '快照版'],
    ['preview versions', '预览版'],
    ['Preview versions', '预览版'],
    ['Bedrock Preview', '基岩预览版'],
    ['Java Snapshots', 'Java 快照版'],
    ['Java Snapshot', 'Java 快照版'],
    ['height ranges', '高度范围'],
    ['cave biomes', '洞穴生物群系'],
    ['map marker', '地图标记'],
    ['settings menu', '设置菜单'],
    ['map experience', '地图体验'],
    ['smoother scrolling', '更流畅的滚动'],
    ['customizable markers', '可自定义的标记'],
    ['marked locations', '标记位置'],
    ['default settings', '默认设置'],
    ['typical machine', '典型机器'],
    ['feature drop', '特性更新'],
    ['seed map generation', '种子地图生成'],
    ['significantly faster', '大幅提升'],
    ['Lava pool', '熔岩池'],
    ['Lava Pool', '熔岩池'],
    ['lava pool', '熔岩池'],
    ['Ore Veins', '矿石矿脉'],
    ['ore veins', '矿石矿脉'],
    ['Ore Vein', '矿石矿脉'],
    ['Desert Well', '沙漠水井'],
    ['desert well', '沙漠水井'],
    ['Grid Lines', '网格线'],
    ['grid lines', '网格线'],
    ['Trail Ruins', '古迹废墟'],
    ['trail ruins', '古迹废墟'],
    ['Ocean Ruins', '海底废墟'],
    ['ocean ruins', '海底废墟'],

    // --- 生物群系 / 地形 ---
    // 主世界 — 陆地
    ['Sunflower Plains', '向日葵平原'],
    ['Snowy Plains', '积雪的平原'],
    ['Windswept Hills', '风袭丘陵'],
    ['Windswept Forest', '风袭森林'],
    ['Windswept Gravelly Hills', '风袭沙砾丘陵'],
    ['Windswept Savanna', '风袭热带草原'],
    ['Old Growth Birch Forest', '原始桦木森林'],
    ['Old Growth Pine Taiga', '原始松木针叶林'],
    ['Old Growth Spruce Taiga', '原始云杉针叶林'],
    ['Flower Forest', '繁花森林'],
    ['Birch Forest', '桦木森林'],
    ['Dark Forest', '黑森林'],
    ['Roofed Forest', '黑森林'],
    ['Dark Oak Forest', '黑橡木森林'],
    ['Snowy Taiga', '积雪的针叶林'],
    ['Giant Tree Taiga', '巨型针叶林'],
    ['Bamboo Jungle', '竹林'],
    ['Sparse Jungle', '稀疏丛林'],
    ['Desert Hills', '沙漠丘陵'],
    ['Wooded Hills', '繁茂的丘陵'],
    ['Mushroom Fields', '蘑菇岛'],
    ['Mushroom Field Shore', '蘑菇岛海岸'],
    ['Ice Spikes', '冰刺之地'],
    ['Snowy Tundra', '积雪的冻原'],
    ['Cherry Grove', '樱桃林'],
    ['Mangrove Swamp', '红树林沼泽'],
    ['Eroded Badlands', '风蚀恶地'],
    ['Wooded Badlands', '繁茂的恶地'],
    // 主世界 — 洞穴
    ['Dripstone Caves', '溶洞'],
    ['Lush Caves', '繁茂洞穴'],
    ['Sulfur Caves', '硫磺洞穴'],
    ['Deep Dark', '深暗之域'],
    // 主世界 — 山地
    ['Stony Peaks', '石峰'],
    ['Frozen Peaks', '冰峰'],
    ['Jagged Peaks', '尖峭山峰'],
    ['Snowy Slopes', '积雪山坡'],
    // 主世界 — 水域
    ['Frozen Ocean', '冻洋'],
    ['Deep Frozen Ocean', '冰冻深海'],
    ['Cold Ocean', '冷水海洋'],
    ['Deep Cold Ocean', '冷水深海'],
    ['Lukewarm Ocean', '温水海洋'],
    ['Deep Lukewarm Ocean', '温水深海'],
    ['Warm Ocean', '暖水海洋'],
    ['Deep Ocean', '深海'],
    ['Coral Reef', '珊瑚礁'],
    ['Kelp Forest', '海带森林'],
    ['Stony Shore', '石岸'],
    ['Snowy Beach', '积雪沙滩'],
    // 下界
    ['Basalt Deltas', '玄武岩三角洲'],
    ['Crimson Forest', '绯红森林'],
    ['Warped Forest', '诡异森林'],
    ['Soul Sand Valley', '灵魂沙峡谷'],
    ['Nether Wastes', '下界荒地'],
    // 末地
    ['End Barrens', '末地荒岛'],
    ['End Midlands', '末地中型岛屿'],
    ['End Highlands', '末地高岛'],
    ['Small End Islands', '末地小型岛屿'],

    // --- 变种生物群系 ---
    ['Pale Garden', '苍白花园'],
    ['Savanna Plateau', '热带高原'],
    ['Shattered Savanna', '破碎的热带草原'],
    ['Shattered Savanna Plateau', '破碎的热带高原'],
    ['Badlands Plateau', '恶地高原'],
    ['Modified Badlands Plateau', '变异恶地高原'],
    ['Modified Wooded Badlands Plateau', '变异繁茂恶地高原'],
    ['Desert Lakes', '沙漠湖泊'],
    ['Modified Jungle', '变异丛林'],
    ['Modified Jungle Edge', '变异丛林边缘'],
    ['Tall Birch Hills', '高大桦木丘陵'],
    ['Mountain Edge', '山地边缘'],
    ['Gravelly Mountains', '沙砾山地'],
    ['Gravelly Mountains+', '沙砾山地+'],
    ['Wooded Mountains', '繁茂山地'],
  ];

  // --- 第三档：单词（用于子串替换） ---
  const WORDS = [
    // 导航/页面级
    ['Minecraft', 'Minecraft'],
    ['Mojang', 'Mojang'],

    // 生物群系/结构
    ['Biomes', '生物群系'],
    ['Biome', '生物群系'],
    ['biomes', '生物群系'],
    ['biome', '生物群系'],
    ['Village', '村庄'],
    ['Dungeon', '地牢'],
    ['Stronghold', '要塞'],
    ['Mansion', '林地府邸'],
    ['Monument', '海底遗迹'],
    ['Outpost', '掠夺者前哨站'],
    ['Mineshaft', '废弃矿井'],
    ['Shipwreck', '沉船'],
    ['Igloo', '雪屋'],
    ['Fossil', '化石'],
    ['Ravine', '峡谷'],
    ['Bastion', '堡垒遗迹'],
    ['Treasure', '宝藏'],
    ['treasure', '宝藏'],
    ['Treasures', '宝藏'],

    // 地形/维度
    ['Overworld', '主世界'],
    ['overworld', '主世界'],
    ['Nether', '下界'],
    ['nether', '下界'],

    // 通用 Minecraft
    ['Seed', '种子'],
    ['seed', '种子'],
    ['seeds', '种子'],
    ['Chunk', '区块'],
    ['chunk', '区块'],
    ['chunks', '区块'],
    ['Spawn', '出生点'],
    ['spawn', '出生点'],
    ['Cave', '洞穴'],
    ['cave', '洞穴'],
    ['Caves', '洞穴'],
    ['caves', '洞穴'],
    ['Grove', '丛林'],
    ['grove', '丛林'],
    ['Peaks', '山峰'],
    ['peaks', '山峰'],
    ['Portal', '传送门'],
    ['portal', '传送门'],
    ['Portals', '传送门'],
    ['portals', '传送门'],
    ['Gateway', '折跃门'],
    ['gateway', '折跃门'],
    ['Gateways', '折跃门'],
    ['Temple', '神庙'],
    ['temple', '神庙'],
    ['Temples', '神庙'],
    ['temples', '神庙'],
    ['Hut', '小屋'],
    ['hut', '小屋'],
    ['Huts', '小屋'],
    ['Ruins', '废墟'],
    ['ruins', '废墟'],
    ['Ruin', '废墟'],
    ['ruin', '废墟'],
    ['Geode', '紫水晶洞'],
    ['geode', '紫水晶洞'],
    ['Geodes', '紫水晶洞'],
    ['geodes', '紫水晶洞'],
    ['Fortress', '要塞'],
    ['fortress', '要塞'],
    ['Fortresses', '要塞'],

    // UI 通用
    ['Search', '搜索'],
    ['Clear', '清除'],
    ['Load', '加载'],
    ['Save', '保存'],
    ['Settings', '设置'],
    ['Close', '关闭'],
    ['Copy', '复制'],
    ['Share', '分享'],
    ['Reset', '重置'],
    ['Filter', '筛选'],
    ['Show', '显示'],
    ['Hide', '隐藏'],
    ['All', '全部'],
    ['None', '无'],
    ['Enable', '启用'],
    ['Disable', '禁用'],
    ['Apply', '应用'],
    ['Cancel', '取消'],
    ['Confirm', '确认'],
    ['Delete', '删除'],
    ['Edit', '编辑'],
    ['Export', '导出'],
    ['Import', '导入'],
    ['Download', '下载'],
    ['Upload', '上传'],
    ['Submit', '提交'],
    ['Go', '定位'],
    ['Go!', '定位'],
    ['Random', '随机'],
    ['Version', '版本'],
    ['Dimension', '维度'],
    ['Features', '特性'],
    ['Coordinates', '坐标'],
    ['coordinate', '坐标'],
    ['coordinates', '坐标'],
    ['Marker', '标记'],
    ['marker', '标记'],
    ['Markers', '标记'],
    ['markers', '标记'],
    ['Popup', '弹窗'],
    ['popup', '弹窗'],
    ['Popups', '弹窗'],

    // 通用
    ['Apps', '功能'],
    ['app', '功能'],
    ['apps', '功能'],
    ['App', '功能'],
    ['Mods', '模组'],
    ['Tutorials', '教程'],
    ['tutorials', '教程'],
    ['tutorial', '教程'],
    ['Finder', '查找器'],
    ['Finder', '查找器'],
    ['Finders', '查找器'],
    ['finder', '查找器'],
    ['finders', '查找器'],
    ['Map', '地图'],
    ['map', '地图'],
    ['Maps', '地图'],
    ['maps', '地图'],
    ['World', '世界'],
    ['world', '世界'],
    ['Worlds', '世界'],
    ['Block', '方块'],
    ['block', '方块'],
    ['Blocks', '方块'],
    ['blocks', '方块'],
    ['End', '末地'],
    ['Bedrock', '基岩版'],
    ['Snapshot', '快照版'],
    ['Snapshots', '快照版'],
    ['Update', '更新'],
    ['update', '更新'],
    ['Updates', '更新'],
    ['updates', '更新'],
    ['Feature', '特性'],
    ['feature', '特性'],
    ['features', '特性'],
    ['Generation', '生成'],
    ['generation', '生成'],
    ['Custom', '自定义'],
    ['custom', '自定义'],
    ['Default', '默认'],
    ['default', '默认'],
    ['Support', '支持'],
    ['support', '支持'],
    ['supports', '支持'],
    ['Enabled', '已启用'],
    ['enabled', '已启用'],
    ['Disabled', '已禁用'],
    ['disabled', '已禁用'],
    ['Experimental', '实验性'],
    ['experimental', '实验性'],
    ['Experience', '体验'],
    ['experience', '体验'],
    ['Feedback', '反馈'],
    ['feedback', '反馈'],
    ['Issues', '问题'],
    ['issues', '问题'],
    ['Session', '会话'],
    ['session', '会话'],
    ['Sessions', '会话'],
    ['sessions', '会话'],
    ['Location', '位置'],
    ['location', '位置'],
    ['Locations', '位置'],
    ['locations', '位置'],
    ['Option', '选项'],
    ['option', '选项'],
    ['Options', '选项'],
    ['options', '选项'],
    ['Scrolling', '滚动'],
    ['scrolling', '滚动'],
    ['Smooth', '流畅'],
    ['smooth', '流畅'],
    ['Smoother', '更流畅'],
    ['smoother', '更流畅'],
    ['Customizable', '可自定义'],
    ['customizable', '可自定义'],
    ['Opt-in', '选择加入'],
    ['Tweaked', '微调'],
    ['tweaked', '微调'],
    ['Colors', '颜色'],
    ['colors', '颜色'],
    ['Border', '边界'],
    ['border', '边界'],
    ['Faster', '更快'],
    ['faster', '更快'],
    ['Machine', '机器'],
    ['machine', '机器'],
    ['Typical', '典型'],
    ['typical', '典型'],
    ['Heads-up', '提醒'],
    ['Unchanged', '无变化'],
    ['unchanged', '无变化'],
    ['Reduced', '减少'],
    ['reduced', '减少'],
    ['Remembered', '保留'],
    ['remembered', '保留'],
    ['Additionally', '此外'],
    ['additionally', '此外'],
    ['Manually', '手动'],
    ['manually', '手动'],
    ['Disk', '磁盘'],
    ['disk', '磁盘'],
    ['Recent', '最近'],
    ['New', '新增'],
    ['News', '新闻'],
    ['About', '关于'],
    ['Contact', '联系'],
    ['Privacy', '隐私'],
    ['Terms', '条款'],
    ['Official', '官方'],
    ['official', '官方'],
    ['Product', '产品'],
    ['product', '产品'],
    ['Approved', '批准'],
    ['approved', '批准'],
    ['Associated', '关联'],
    ['associated', '关联'],
    ['Copyright', '版权'],
    ['copyright', '版权'],
    ['Rights', '权利'],
    ['Reserved', '保留'],
    ['reserved', '保留'],
    ['Overview', '总览'],
    ['overview', '总览'],
    ['Popular', '热门'],
    ['popular', '热门'],
    ['Outdated', '已过时'],
    ['outdated', '已过时'],
    ['presets', '预设'],
    ['Presets', '预设'],
    ['compendium', '纲要'],
    ['Compendium', '纲要'],
    ['endermen', '末影人'],
    ['Endermen', '末影人'],
    ['superflat', '超平坦'],
    ['Superflat', '超平坦'],
    ['Quick', '快速'],
    ['quick', '快速'],
    ['Easy', '轻松'],
    ['easy', '轻松'],
    ['Figure out', '确定'],
    ['figure out', '确定'],
    ['submitting', '提交'],
    ['Submitting', '提交'],
    ['level.dat', 'level.dat'],
    ['Discussion', '讨论'],
    ['discussion', '讨论'],
    ['Enjoy', '享受'],
    ['enjoy', '享受'],
    ['Holiday', '假期'],
    ['season', '季节'],
    ['Major', '重大'],
    ['major', '重大'],
    ['Changes', '变化'],
    ['changes', '变化'],
    ['Tired', '厌倦'],
    ['tired', '厌倦'],
    ['Searching', '寻找'],
    ['searching', '寻找'],
    ['Copper', '铜矿'],
    ['copper', '铜矿'],
    ['Rough', '大致'],
    ['rough', '大致'],
    ['Range', '范围'],
    ['range', '范围'],
    ['Ranges', '范围'],
    ['ranges', '范围'],
    ['Height', '高度'],
    ['height', '高度'],
    ['Heights', '高度'],
    ['heights', '高度'],
    ['Drop', '更新'],
    ['drop', '更新'],
    ['Lava', '熔岩'],
    ['lava', '熔岩'],
    ['Ore', '矿石'],
    ['ore', '矿石'],
    ['Veins', '矿脉'],
    ['veins', '矿脉'],
    ['Vein', '矿脉'],
    ['vein', '矿脉'],
    ['Well', '水井'],
    ['well', '水井'],
    ['Terrain', '地形'],
    ['terrain', '地形'],
    ['Grid', '网格'],
    ['grid', '网格'],
    ['Trail', '古迹'],
    ['trail', '古迹'],
    ['Trails', '古迹'],
    ['trails', '古迹'],
    ['Apple', 'Apple'],

    // --- 地形/生物群系单词 ---
    ['Plains', '平原'],
    ['plains', '平原'],
    ['Desert', '沙漠'],
    ['desert', '沙漠'],
    ['Forest', '森林'],
    ['forest', '森林'],
    ['Taiga', '针叶林'],
    ['taiga', '针叶林'],
    ['Jungle', '丛林'],
    ['jungle', '丛林'],
    ['Swamp', '沼泽'],
    ['swamp', '沼泽'],
    ['Savanna', '热带草原'],
    ['savanna', '热带草原'],
    ['Badlands', '恶地'],
    ['badlands', '恶地'],
    ['Mountains', '山地'],
    ['mountains', '山地'],
    ['Mountain', '山'],
    ['mountain', '山'],
    ['Ocean', '海洋'],
    ['ocean', '海洋'],
    ['River', '河流'],
    ['river', '河流'],
    ['Beach', '海滩'],
    ['beach', '海滩'],
    ['Tundra', '冻原'],
    ['tundra', '冻原'],
    ['Hills', '丘陵'],
    ['hills', '丘陵'],
    ['Meadow', '草甸'],
    ['meadow', '草甸'],
    ['Mangrove', '红树林'],
    ['mangrove', '红树林'],
    ['Bamboo', '竹子'],
    ['bamboo', '竹子'],
    ['Snowy', '积雪的'],
    ['snowy', '积雪的'],
    ['Frozen', '冰冻的'],
    ['frozen', '冰冻的'],
    ['Cold', '寒冷的'],
    ['cold', '寒冷的'],
    ['Warm', '温暖的'],
    ['warm', '温暖的'],
    ['Lukewarm', '温的'],
    ['lukewarm', '温的'],
    ['Deep', '深的'],
    ['deep', '深的'],
    ['Windswept', '风袭的'],
    ['windswept', '风袭的'],
    ['Wooded', '繁茂的'],
    ['wooded', '繁茂的'],
    ['Eroded', '风蚀的'],
    ['eroded', '风蚀的'],
    ['Sparse', '稀疏的'],
    ['sparse', '稀疏的'],
    ['Flower', '繁花'],
    ['flower', '繁花'],
    ['Birch', '桦木'],
    ['birch', '桦木'],
    ['Dark', '深色'],
    ['dark', '深色'],
    ['Pine', '松木'],
    ['pine', '松木'],
    ['Spruce', '云杉'],
    ['spruce', '云杉'],
    ['Oak', '橡木'],
    ['oak', '橡木'],
    ['Giant', '巨型'],
    ['giant', '巨型'],
    ['Sunflower', '向日葵'],
    ['sunflower', '向日葵'],
    ['Mushroom', '蘑菇'],
    ['mushroom', '蘑菇'],
    ['Ice', '冰'],
    ['ice', '冰'],
    ['Snow', '雪'],
    ['snow', '雪'],
    ['Dripstone', '滴水石'],
    ['dripstone', '滴水石'],
    ['Lush', '繁茂'],
    ['lush', '繁茂'],
    ['Sulfur', '硫磺'],
    ['sulfur', '硫磺'],
    ['Coral', '珊瑚'],
    ['coral', '珊瑚'],
    ['Kelp', '海带'],
    ['kelp', '海带'],
    ['Basalt', '玄武岩'],
    ['basalt', '玄武岩'],
    ['Crimson', '绯红'],
    ['crimson', '绯红'],
    ['Warped', '诡异'],
    ['warped', '诡异'],
    ['Wastes', '荒地'],
    ['wastes', '荒地'],
    ['Barrens', '荒岛'],
    ['barrens', '荒岛'],
    ['Midlands', '中型岛屿'],
    ['midlands', '中型岛屿'],
    ['Highlands', '高岛'],
    ['highlands', '高岛'],
    ['Shore', '海岸'],
    ['shore', '海岸'],
    ['Reef', '礁'],
    ['reef', '礁'],
    ['Valley', '山谷'],
    ['valley', '山谷'],
    ['Delta', '三角洲'],
    ['delta', '三角洲'],
    ['Islands', '岛屿'],
    ['islands', '岛屿'],
    ['Slopes', '山坡'],
    ['slopes', '山坡'],

    // 变种生物群系单词
    ['Pale', '苍白'],
    ['pale', '苍白'],
    ['Plateau', '高原'],
    ['plateau', '高原'],
    ['Edge', '边缘'],
    ['edge', '边缘'],
    ['Modified', '变异'],
    ['modified', '变异'],
    ['Tall', '高大'],
    ['tall', '高大'],
    ['Gravelly', '沙砾'],
    ['gravelly', '沙砾'],
    ['Gravel', '沙砾'],
    ['gravel', '沙砾'],
    ['Shattered', '破碎'],
    ['shattered', '破碎'],
    ['Lakes', '湖泊'],
    ['lakes', '湖泊'],
    ['Lake', '湖'],
    ['lake', '湖'],

    // 分组相关
    ['Groups', '分组'],
    ['groups', '分组'],
    ['Group', '分组'],
    ['group', '分组'],
    ['Aquatic', '水生'],
    ['aquatic', '水生'],
    ['Underground', '地下'],
    ['underground', '地下'],
    ['Surface', '地表'],
    ['surface', '地表'],
    ['Temperate', '温带'],
    ['temperate', '温带'],
    ['Vegetation', '植被'],
    ['vegetation', '植被'],
    ['Miscellaneous', '杂项'],
    ['miscellaneous', '杂项'],
    ['Structures', '结构'],
    ['structures', '结构'],
    ['Structure', '结构'],
    ['structure', '结构'],

    // 补充术语
    ['land', '陆地'],
    ['Land', '陆地'],
    ['woodlands', '林地'],
    ['Woodlands', '林地'],
    ['Woodland', '林地'],
    ['woodland', '林地'],
    ['swamps', '沼泽'],
    ['Swamps', '沼泽'],
    ['sandy', '沙地'],
    ['Sandy', '沙地'],
    ['water', '水域'],
    ['Water', '水域'],
    ['legacy', '旧版'],
    ['Legacy', '旧版'],
    ['farm animals', '农场动物'],
    ['Farm Animals', '农场动物'],
    ['Farm animal', '农场动物'],
    ['frogs', '青蛙'],
    ['Frogs', '青蛙'],
    ['Frog', '青蛙'],
    ['frog', '青蛙'],
    ['highlight', '高亮'],
    ['Highlight', '高亮'],

    // 设置面板单词
    ['bottom', '底部'],
    ['Bottom', '底部'],
    ['momentum', '惯性'],
    ['Momentum', '惯性'],
    ['panning', '平移'],
    ['Panning', '平移'],
    ['rotation', '旋转'],
    ['Rotation', '旋转'],
    ['fade', '淡入'],
    ['Fade', '淡入'],
    ['teleport', '传送'],
    ['Teleport', '传送'],
    ['command', '指令'],
    ['Command', '指令'],
    ['cluster', '聚合'],
    ['Cluster', '聚合'],
    ['radius', '半径'],
    ['Radius', '半径'],
    ['concurrency', '并发'],
    ['Concurrency', '并发'],
    ['concurrent', '并发'],
    ['Concurrent', '并发'],
    ['workers', '工作线程'],
    ['Workers', '工作线程'],
    ['performance', '性能'],
    ['Performance', '性能'],
    ['resources', '资源'],
    ['Resources', '资源'],
    ['battery', '电池'],
    ['Battery', '电池'],
    ['requires', '需要'],
    ['Requires', '需要'],
    ['reload', '重新加载'],
    ['Reload', '重新加载'],
    ['glide', '滑动'],
    ['Glide', '滑动'],
    ['swipe', '滑动'],
    ['Swipe', '滑动'],
    ['drag', '拖拽'],
    ['Drag', '拖拽'],
    ['gestures', '手势'],
    ['Gestures', '手势'],
    ['touch', '触屏'],
    ['Touch', '触屏'],
    ['devices', '设备'],
    ['Devices', '设备'],
    ['declutter', '减少杂乱'],
    ['Declutter', '减少杂乱'],
    ['navigable', '可导航'],
    ['Navigable', '可导航'],
    ['renders', '渲染'],
    ['Renders', '渲染'],
    ['limits', '限制'],
    ['Limits', '限制'],
    ['glide to a smooth stop', '平滑停止'],
    ['web workers', 'Web Worker'],
    ['Web Workers', 'Web Worker'],
    ['block radius', '方块半径'],
    ['system resources', '系统资源'],

    // 设置 tooltip 子串
    ['navigable area', '可导航区域'],
    ['renders a border on the map', '在地图上渲染边界'],
    ['renders a border', '渲染边界'],
    ['concurrent web workers', '并发 Web Worker'],
    ['load map data', '加载地图数据'],
    ['improve performance', '提升性能'],
    ['increase usage of system resources and battery', '增加系统资源和电池的消耗'],
    ['copying coordinates', '复制坐标'],
    ['to the clipboard', '到剪贴板'],
    ['fade in smoothly', '平滑淡入'],
    ['instead of appearing instantly when loaded', '而非加载后立即显示'],
    ['appearing instantly', '立即显示'],
    ['rotate the map', '旋转地图'],
    ['two-finger rotation gestures', '双指旋转手势'],
    ['rotation gestures', '旋转手势'],
    ['touch devices', '触屏设备'],
    ['swipe or drag', '滑动或拖拽'],
    ['smooth stop', '平滑停止'],
    ['Higher number', '较高的值'],
    ['A higher number', '较高的值'],
    ['may improve', '可能提升'],
    ['may also increase', '也可能增加'],
    ['when loaded', '加载后'],
    ['when you interact', '交互时'],

    // tooltip 常用词
    ['Allows', '允许'],
    ['allows', '允许'],
    ['Number of', '数量'],
    ['number of', '数量'],
    ['Number', '数量'],
    ['number', '数量'],
    ['Include', '包含'],
    ['include', '包含'],
    ['data', '数据'],
    ['Data', '数据'],
    ['usage', '使用量'],
    ['Usage', '使用量'],
    ['via', '通过'],
    ['Via', '通过'],
    ['or', '或'],
    ['Or', '或'],
    ['when copying', '复制时'],
    ['When copying', '复制时'],
    ['Shift+Alt+Drag', 'Shift+Alt+拖拽'],
    ['Shift + Alt + Drag', 'Shift+Alt+拖拽'],
    ['two-finger', '双指'],
    ['two finger', '双指'],
    ['Two-finger', '双指'],
    ['interact with the map', '与地图交互'],
    ['interact with', '交互'],
    ['map instead', '地图'],
    ['appearing instantly', '立即显示'],
    ['to glide', '滑行'],
    ['after you', '在你'],
    ['you swipe', '你滑动'],
    ['drag it', '拖拽它'],
    ['load map', '加载地图'],
    ['map data', '地图数据'],
    ['web workers to load', 'Web Worker 来加载'],
    ['may improve performance', '可能提升性能'],
    ['increase usage', '增加使用量'],
    ['of system resources', '系统资源'],
    ['and battery', '和电池'],
    ['the navigable', '可导航'],
    ['navigable area and', '可导航区域并'],
    ['a border on', '边界在'],
    ['border on the map', '地图上的边界'],
    ['copying coordinates to', '复制坐标到'],
    ['coordinates to the clipboard', '坐标到剪贴板'],
    ['Include /tp', '包含 /tp'],
    ['/tp when copying', '/tp 复制时'],
    ['Biomes fade', '生物群系淡入'],
    ['fade in smoothly when', '平滑淡入当'],
    ['smoothly when you interact', '平滑地在交互时'],
    ['when you interact with', '在你与...交互时'],
    ['appearing instantly when loaded', '加载后立即显示'],
    ['rotate the map via', '通过...旋转地图'],
    ['rotation gestures on', '旋转手势在'],
    ['gestures on touch devices', '触屏设备手势'],
    ['to glide to a', '滑行到'],
    ['glide to a smooth', '滑行至平滑'],
    ['smooth stop after', '平滑停止在'],
    ['stop after you swipe', '在你滑动后停止'],
    ['swipe or drag it', '滑动或拖拽它'],

    // 更多变体
    ['Web Worker to', 'Web Worker 来'],
    ['web worker to', 'Web Worker 来'],
    ['Web Worker', 'Web Worker'],
    ['web worker', 'Web Worker'],
    ['Worker to load', 'Worker 来加载'],
    ['worker to load', 'Worker 来加载'],
    ['but', '但'],
    ['But', '但'],
    ['may also', '也可能'],
    ['May also', '也可能'],
    ['and battery', '和电池'],
    ['And battery', '和电池'],
    ['of system', '的系统'],
    ['Of system', '的系统'],
    ['increase usage of', '增加使用量'],
    ['resources and', '资源和'],

    // === 强制翻译：设置 tooltip 整句 + 碎片 ===
    ['Allows the map to glide to a smooth stop after you swipe or drag it.',
      '允许地图在你滑动或拖动后平滑地停止。'],
    ['Allows the map to glide to a smooth stop after you swipe or drag it',
      '允许地图在你滑动或拖动后平滑地停止。'],
    ['glide to a smooth stop after you swipe or drag it',
      '在你滑动或拖动后平滑地停止'],
    ['Allows the map to glide to a smooth stop',
      '允许地图平滑地停止'],
    ['after you swipe or drag it', '在你滑动或拖动后'],

    ['Allows you to rotate the map via Shift+Alt+Drag or two-finger rotation gestures on touch devices.',
      '允许您通过 Shift + Alt 拖动或触摸设备上的双指旋转手势来旋转地图。'],
    ['Allows you to rotate the map via Shift+Alt+Drag or two-finger rotation gestures on touch devices',
      '允许您通过 Shift + Alt 拖动或触摸设备上的双指旋转手势来旋转地图。'],
    ['rotate the map via Shift+Alt+Drag or two-finger rotation gestures',
      '通过 Shift + Alt 拖动或双指旋转手势来旋转地图'],
    ['or two-finger rotation gestures on touch devices',
      '或触摸设备上的双指旋转手势'],

    ['Biomes fade in smoothly when you interact with the map instead of appearing instantly when loaded',
      '当你与地图交互时，生物群落会平滑地淡入，而不是在加载时立即出现'],
    ['fade in smoothly when you interact with the map',
      '当你与地图交互时平滑地淡入'],
    ['instead of appearing instantly when loaded',
      '而不是在加载时立即出现'],

    ["Include '/tp' when copying coordinates to the clipboard.",
      "在将坐标复制到剪贴板时包含 '/tp'。"],
    ["Include '/tp' when copying coordinates to the clipboard",
      "在将坐标复制到剪贴板时包含 '/tp'。"],
    ["when copying coordinates to the clipboard", '将坐标复制到剪贴板时'],

    ['Merges features close to each other to declutter the map. Current block radius: 24',
      '将彼此接近的特征合并以清理地图。当前块半径：24'],
    ['Merges features close to each other to declutter the map. Current block radius: 16',
      '将彼此接近的特征合并以清理地图。当前块半径：16'],
    ['Merges features close to each other to declutter the map',
      '将彼此接近的特征合并以清理地图'],
    ['Current block radius:', '当前块半径：'],
    ['declutter the map', '清理地图'],

    ['Number of concurrent web workers to load map data. A higher number may improve performance, but may also increase usage of system resources and battery.',
      '加载地图数据的并发网络工作线程数量。数量越多可能提高性能，但也可能增加系统资源和电池的使用。'],
    ['Number of concurrent web workers to load map data. A higher number may improve performance, but may also increase usage of system resources and battery',
      '加载地图数据的并发网络工作线程数量。数量越多可能提高性能，但也可能增加系统资源和电池的使用。'],
    ['Number of concurrent web workers to load map data',
      '加载地图数据的并发网络工作线程数量'],
    ['A higher number may improve performance, but may also increase usage of system resources and battery',
      '数量越多可能提高性能，但也可能增加系统资源和电池的使用'],
    ['increase usage of system resources and battery',
      '增加系统资源和电池的使用'],

    ['Limits the navigable area and renders a border on the map',
      '限制可通行区域，并在地图上显示边界'],
    ['renders a border on the map', '在地图上显示边界'],
    ['Limits the navigable area', '限制可通行区域'],

    // 补充通用术语
    ['application', '应用'],
    ['Application', '应用'],
    ['applications', '应用'],
    ['Applications', '应用'],
    ['utility', '工具'],
    ['Utility', '工具'],
    ['utilities', '工具'],
    ['Utilities', '工具'],
    ['tool', '工具'],
    ['Tool', '工具'],
    ['tools', '工具'],
    ['Tools', '工具'],
  ];

  // ============================================================
  // 构建子串替换正则（短语 + 单词，按长度降序避免部分匹配）
  // ============================================================

  // 合并短语和单词为一个列表，按英文长度降序排列
  const allTerms = PHRASES.concat(WORDS);
  allTerms.sort((a, b) => b[0].length - a[0].length);

  // 构建一个大的正则，所有 term 用 | 连接（按长度降序已在排序中体现）；
  // 使用 \b 边界避免把 "End" 匹配成 "Endermen" 的一部分，但注意像 "level.dat" 中的 . 会打断 \b。
  // 解决方案：用捕获组分别匹配，不依赖 \b，用排序保证长匹配优先。

  function buildSubstringRegex(terms) {
    // 转义正则特殊字符；仅对首尾是单词字符的 term 加 \b 边界
    const escaped = terms.map(([en]) => {
      const escaped_en = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const left = /^\w/.test(en) ? '\\b' : '';
      const right = /\w$/.test(en) ? '\\b' : '';
      return left + escaped_en + right;
    });
    return new RegExp(escaped.join('|'), 'g');
  }

  const SUBSTRING_RE = buildSubstringRegex(allTerms);

  // 构建查找表：英文 → 中文
  const substringMap = {};
  for (const [en, cn] of allTerms) {
    // 每个英文只保留最长匹配时的翻译（因为已经按长度排序，先到先得）
    if (!(en in substringMap)) {
      substringMap[en] = cn;
    }
  }

  // ============================================================
  // 翻译引擎
  // ============================================================

  // 翻译缓存（Canvas 高频调用，避免重复正则匹配）
  const translationCache = new Map();
  const MAX_CACHE_SIZE = 500;

  function translateText(text) {
    // 检查缓存
    const cached = translationCache.get(text);
    if (cached !== undefined) return cached;

    let result;

    // 第一档：完整精确匹配
    if (EXACT.hasOwnProperty(text)) {
      result = EXACT[text];
    } else {
      // trim 后完整匹配（保留首尾空白）
      const trimmed = text.trim();
      if (trimmed !== text && EXACT.hasOwnProperty(trimmed)) {
        const leading = text.match(/^\s*/)[0];
        const trailing = text.match(/\s*$/)[0];
        result = leading + EXACT[trimmed] + trailing;
      } else {
        // 第二档：子串匹配
        result = text;
        const matches = [];
        let match;
        SUBSTRING_RE.lastIndex = 0;
        while ((match = SUBSTRING_RE.exec(text)) !== null) {
          matches.push({ start: match.index, end: match.index + match[0].length, en: match[0] });
        }
        if (matches.length > 0) {
          matches.sort((a, b) => a.start - b.start);
          const filtered = [];
          for (const m of matches) {
            if (filtered.length === 0 || m.start >= filtered[filtered.length - 1].end) {
              filtered.push(m);
            } else if (m.end - m.start > filtered[filtered.length - 1].end - filtered[filtered.length - 1].start) {
              filtered[filtered.length - 1] = m;
            }
          }
          const parts = [];
          let lastEnd = 0;
          for (const m of filtered) {
            parts.push(text.slice(lastEnd, m.start));
            parts.push(substringMap[m.en] || m.en);
            lastEnd = m.end;
          }
          parts.push(text.slice(lastEnd));
          result = parts.join('');
        }
      }
    }

    // 存入缓存（限制大小）
    if (translationCache.size >= MAX_CACHE_SIZE) {
      translationCache.clear();
    }
    translationCache.set(text, result);
    return result;
  }

  function translateAttribute(node, attrName) {
    if (node.hasAttribute && node.hasAttribute(attrName)) {
      const value = node.getAttribute(attrName);
      const translated = translateText(value);
      if (translated !== value) {
        node.setAttribute(attrName, translated);
      }
    }
  }

  function translateNode(node) {
    try {
    if (node.nodeType === Node.TEXT_NODE) {
      const translated = translateText(node.textContent);
      if (translated !== node.textContent) {
        node.textContent = translated;
      }
    } else if (
      node.nodeType === Node.ELEMENT_NODE &&
      !['SCRIPT', 'STYLE', 'TEXTAREA'].includes(node.tagName)
    ) {
      translateAttribute(node, 'placeholder');
      translateAttribute(node, 'title');
      translateAttribute(node, 'aria-label');
      for (const child of node.childNodes) {
        translateNode(child);
      }
    }
    } catch (error) {
      // 静默处理，不中断整个翻译流程
    }
  }

  function translatePage() {
    translateNode(document.body);
  }

  // ============================================================
  // 初始翻译 + 动态内容监听
  // ============================================================

  if (document.body) {
    translatePage();
  } else {
    document.addEventListener('DOMContentLoaded', translatePage);
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      // 新增节点
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          translateNode(node);
        } else if (node.nodeType === Node.TEXT_NODE) {
          const translated = translateText(node.textContent);
          if (translated !== node.textContent) {
            node.textContent = translated;
          }
        }
      }
      // 已有文本节点内容变化（如鼠标移动时坐标/群系实时更新）
      if (mutation.type === 'characterData') {
        const translated = translateText(mutation.target.textContent);
        if (translated !== mutation.target.textContent) {
          mutation.target.textContent = translated;
        }
      }
      // 属性变化
      if (mutation.type === 'attributes' && mutation.target.nodeType === Node.ELEMENT_NODE) {
        translateAttribute(mutation.target, mutation.attributeName);
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['placeholder', 'title', 'aria-label'],
  });

  // 拦截 Canvas 文字绘制，用翻译后的文字重新绘制
  (function setupCanvasInterceptor() {
    const origFillText = CanvasRenderingContext2D.prototype.fillText;
    const origStrokeText = CanvasRenderingContext2D.prototype.strokeText;

    function intercept(canvas, text, x, y, origFn) {
      const str = String(text);
      const translated = translateText(str);
      if (translated !== str) {
        // 直接绘制翻译后的文字
        origFn.call(canvas.getContext('2d'), translated, x, y);
      } else {
        origFn.call(canvas.getContext('2d'), str, x, y);
      }
    }

    CanvasRenderingContext2D.prototype.fillText = function (text, x, y, maxWidth) {
      intercept(this.canvas, text, x, y, origFillText);
    };

    CanvasRenderingContext2D.prototype.strokeText = function (text, x, y, maxWidth) {
      intercept(this.canvas, text, x, y, origStrokeText);
    };
  })();

  const exactCount = Object.keys(EXACT).length;
  const termCount = Object.keys(substringMap).length;
  console.log('[Chunkbase汉化] 已加载：完整匹配 ' + exactCount + ' 条 + 术语子串 ' + termCount + ' 条');

})();
