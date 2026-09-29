# 计算机网络实验一 · 静态网页制作

个人静态网站，纯手写 HTML + CSS + JavaScript，无任何第三方依赖，可直接部署到 GitHub Pages。

---

## 一、目录结构

```
计算机网络/
├── index.html        首页（自我简介）
├── hometown.html     家乡简介
├── study.html        学习分享
├── life.html         生活随拍
├── css/
│   └── style.css     全站统一样式表（含明/暗主题、响应式、打印样式）
├── js/
│   └── main.js       全站交互脚本
├── images/           图片资源（按页面命名，各页面互不共用）
│   ├── hero.jpg            首页全屏封面        ✓ 已放好
│   ├── avatar.jpg          头像                ✓ 已放好
│   ├── hometown-1.jpg      家乡页主图          ✓ 已放好
│   ├── hometown-banner.jpg 家乡页横幅(宝鸡市区) ✓ CC BY-SA
│   ├── hometown-2.jpg      家乡相册：太白山     ✓ CC BY-SA
│   ├── hometown-3.jpg      家乡相册：法门寺     ✓ CC0
│   ├── hometown-4.jpg      家乡相册：何尊       ✓ CC0
│   ├── hometown-5.jpg      家乡相册：石鼓阁     ✓ CC0
│   ├── study-1.jpg         学习页配图          ✓ 已放好
│   ├── life-1.jpg          生活页照片墙第 1 张 ✓ 已放好
│   ├── life-goal.jpg       生活页「小目标」配图 ✓ 已放好（900×1200 竖幅）
│   ├── life-2~5.jpg        生活页照片墙 4 张   ✓ 已放好
│   └── bigbackground.jpg   封面原图（备份，可删）
├── .nojekyll         部署到 GitHub Pages 时需要（跳过 Jekyll 处理）
└── README.md         本说明文件
```

---

### 首页结构

首页是「**全屏封面 → 下滑进入正文**」的落地页式布局：

1. **全屏封面**（`.hero-full`）：整屏照片铺满视口，中央叠加姓名与一句话简介，
   顶部导航栏此时是**透明 + 白色文字**浮在照片上，底部有跳动的「向下滚动」提示。
2. **正文**：鼠标下滑，封面滚过之后，导航栏自动变为原来的毛玻璃白底样式
   （逻辑在 [js/main.js](js/main.js) 的 `initHeaderScroll`）。
   封面与正文的切换阈值是「视口高度 − 页头高度」，任何屏幕尺寸下都对齐。

封面照片用 `object-fit: cover` 填充，所以**任何比例的图都不会变形**；
若照片中部细节太杂影响阅读，可调 [css/style.css](css/style.css) 里
`.hero-full-overlay` 的渐变色加深遮罩。

其他三个页面（家乡 / 学习 / 生活）保持不变，仍是常规的吸顶导航 + 内容区。

---

## 二、如何预览

**方式一：直接双击** `index.html` 用浏览器打开。
此时地址栏是 `file://`，不经过 HTTP，页脚的协议徽章会显示「本地文件（未经过 HTTP）」。

**方式二（推荐）：启动本地服务器**，这样页脚才能显示真实的 HTTP 版本号（如 `HTTP/1.1`）。

最省事：**双击本目录下的 `启动预览.bat`**。它会自动开服务器并打开浏览器，
关掉那个黑窗口就停止服务。实验要求第 3 条（检查 HTTP 版本号）必须用这种方式看。

也可以手动敲命令：

```bash
# 进入项目目录后，任选一种：
python -m http.server 8000      # Python 自带，浏览器访问 http://localhost:8000
npx serve                       # 需要 Node.js
```

> ⚠️ 改这个 `.bat` 时注意：中文 Windows 的 cmd 按 GBK 解析批处理文件，
> 所以文件必须存成 **GBK 编码**（不是 UTF-8），否则中文会把命令拆错、直接报错。

---

## 三、如何部署到 GitHub Pages

实验要求提供「个人主页网址」，推荐用 GitHub Pages（免费、稳定）。

```bash
# 1. 在 GitHub 网页端新建仓库，仓库名必须是  molizzzz.github.io
# 2. 在本目录下初始化并推送
git init
git add .
git commit -m "feat: 计算机网络实验一 静态网页"
git branch -M main
git remote add origin https://github.com/molizzzz/molizzzz.github.io.git
git push -u origin main
```

推送完成后等待 1～2 分钟，访问 `https://molizzzz.github.io/` 即可看到站点。

> 页面资源全部使用**相对路径**，因此放在仓库根目录或子目录都能正常显示。
> 如果放在仓库的 `/docs` 子目录，需在仓库 Settings → Pages 中把 Source 设为 `main / docs`。

推送后再访问线上地址，页脚徽章就能读出 GitHub Pages 实际使用的协议版本（通常为 **HTTP/2**，这是完成实验要求第 3 条的直接证据）。

---

## 四、实验要求对照

| 实验要求 | 本站落实情况 |
|---|---|
| 内容充实、主题自定 | 四个页面：自我简介 / 家乡 / 学习 / 生活 |
| **三个超链接（必做）** | 导航栏 4 个内链，每页另有 3 个以上外链（MDN、RFC、维基等） |
| **包含图片（必做）** | 所有页面均含 `<img>`，首页有头像，另有两处相册墙（`<figure>` + `<figcaption>`） |
| 界面美观和谐 | 统一设计系统、明/暗主题、卡片悬浮动效、响应式布局 |
| 尝试多种设计元素 | 超链接 ✓ 图片 ✓ 表格 ✓（基本信息表 / 美食表 / 课程表） div 布局 ✓ 列表 ✓ 时间线 ✓ 引用块 ✓ 表单样式 ✓ |
| 检查网页 HTTP 版本号 | `js/main.js` 通过 `PerformanceNavigationTiming.nextHopProtocol` 自动检测，显示在**页脚徽章**中 |
| 了解 git 常规操作 | 见上文部署步骤 |

---

## 五、发布前还要做的事

1. **上传前把两个目录排除掉**：`原图备份/`（手机原图，体积大）和 `启动预览.bat`
   （本地预览用，部署后没用了）。已经在 `.gitignore` 里挡好了，`git status` 里不会再出现它们。

> 署名已统一：封面大标题与信息表、页脚、`<meta name="author">` 均为「朱羽凡」，
> 自我介绍那句写作「你好，我是朱羽凡（zhiyu）」，网名保留在括号里。

### 图片现状

所有页面**已经没有占位图**，`images/` 里的图片全部是真实照片且都被引用。

| 文件 | 内容 | 说明 |
|---|---|---|
| `hometown-2 ~ 5.jpg` | 太白山 / 法门寺 / 何尊 / 石鼓阁 | 来自 Wikimedia Commons，自由许可，页面底部已署名 |
| `life-1 ~ 5.jpg` | 樱花 / 咖啡 / 晚霞 / 火锅 / 小橘 | 自己拍的 |
| `life-goal.jpg` | 「大学期间的小目标」旁的竖幅配图 | 自己拍的，900×1200 |

> **换图时记得同步改 HTML 里的后缀**（例如把 `images/life-2.svg` 改成 `images/life-2.jpg`）。
> **各页面的图片是互相独立的**，同一个位置只对应一个文件，不会出现"改一处、好几页一起变"的情况。
> 首页那三张导航卡片图分别指向 `hometown-1.jpg` / `study-1.jpg` / `life-1.jpg`——
   > 这是**有意的**，卡片本来就该展示对应页面的封面图。
3. **改名**：把四个 HTML 里的 `张三`、`PB********`、`PB********@mail.ustc.edu.cn` 换成自己的信息，
   并修改 `<meta name="author">`。
4. **部署**：按上文推到 GitHub Pages，拿到个人主页网址。

---

## 六、实验报告提交（另需准备）

提交一个 PDF 文件，命名为 **`PB********-张三-计网实验一.pdf`**，内容包括：

- 姓名
- 学号
- 个人主页网址（GitHub Pages 地址）
- 网页的 HTTP 版本号（打开线上站点，读页脚徽章）

发送至：**nhpcc_2025@163.com**
截止时间：**2026/10/8 23:59:59**

> 小技巧：本站在浏览器中按 `Ctrl+P` 打印时会自动隐藏导航栏并转成适合阅读的版式，
> 可以直接「打印为 PDF」用于报告截图或存档。
