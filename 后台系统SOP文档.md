# 牛耕部落小程序后台系统 SOP 文档

## 一、系统概述

### 1.1 项目简介
**项目名称**：牛耕部落 - 归野  
**项目类型**：会员专属服务平台（小程序前端）  
**核心定位**：为高端会员提供梯田民宿预订、有机农产品配送管理及溯源服务

### 1.2 核心功能
- **部落（Home）**：信息聚合，展示会员状态、配送进度、农场实时环境
- **市集（Market）**：会员专属购物，突出会员价与新品优先权
- **家书（Letter）**：农场笔记与资讯，建立用户与土地的情感连接
- **山居（Homestay）**：民宿权益核销，展示梯田景观，简化预约流程
- **我的（Profile）**：个人中心，地址管理、管家服务、订单管理

### 1.3 技术栈
- **前端框架**：React 19.2.0
- **开发语言**：TypeScript 5.8.2
- **构建工具**：Vite 6.2.0
- **UI 库**：Lucide React（图标库）
- **图表库**：Recharts 3.5.1
- **样式方案**：Tailwind CSS（内联样式）

---

## 二、技术架构

### 2.1 项目结构
```
牛耕部落---归野/
├── App.tsx                 # 主应用入口，路由管理
├── index.tsx              # React 应用挂载点
├── index.html             # HTML 入口文件
├── types.ts               # TypeScript 类型定义
├── constants.tsx          # 常量数据（Mock 数据）
├── vite.config.ts         # Vite 构建配置
├── tsconfig.json          # TypeScript 配置
├── package.json           # 项目依赖配置
├── components/            # 公共组件
│   ├── BrandLogo.tsx      # 品牌 Logo 组件
│   └── TabBar.tsx         # 底部导航栏组件
└── views/                 # 页面视图组件
    ├── HomeView.tsx       # 首页（部落）
    ├── MarketView.tsx     # 市集页面
    ├── LetterView.tsx     # 家书页面
    ├── HomestayView.tsx   # 山居页面
    ├── ProfileView.tsx    # 个人中心
    ├── SettingsView.tsx  # 设置页面
    ├── AccountSecurityView.tsx    # 账户安全
    ├── NotificationSettingsView.tsx  # 通知设置
    ├── MessageCenterView.tsx         # 消息中心
    ├── CustomerServiceView.tsx       # 客服中心
    ├── MembershipIntroView.tsx       # 会员介绍
    ├── MembershipPaymentView.tsx     # 会员支付
    ├── GuardianCertificateView.tsx   # 守护证书
    ├── BenefitsManualView.tsx        # 权益手册
    └── SecondaryViews.tsx            # 二级页面（详情页等）
```

### 2.2 路由架构
系统采用**状态驱动的路由管理**，通过 `ViewState` 类型定义所有页面状态：

```typescript
type ViewState = 
  | { type: 'main'; tab: TabType }                    // 主页面（5个Tab）
  | { type: 'product-detail'; id: number }           // 商品详情
  | { type: 'room-detail'; id: number }               // 房间详情
  | { type: 'note-detail'; id: number }               // 笔记详情
  | { type: 'orders' }                                 // 订单列表
  | { type: 'benefits' }                               // 权益详情
  | { type: 'settings' }                               // 设置页面
  | { type: 'account-security'; from: string }          // 账户安全
  | { type: 'notification-settings'; from: string }   // 通知设置
  | { type: 'messages' }                               // 消息中心
  | { type: 'customer-service' }                       // 客服中心
  | { type: 'membership-intro'; from: string }         // 会员介绍
  | { type: 'membership-payment'; tierId: string }    // 会员支付
  | { type: 'certificate' }                            // 守护证书
```

### 2.3 数据模型
核心数据类型定义在 `types.ts`：

- **User**：用户信息（会员等级、头像、有效期、配送状态等）
- **Product**：商品信息（价格、会员价、图片、详情等）
- **Room**：民宿房间信息
- **FieldNote**：农场笔记
- **Order**：订单信息
- **WeatherData**：天气数据

---

## 三、功能模块详解

### 3.1 首页（部落 - HomeView）
**功能点**：
- 会员状态展示（黑金会员/游客）
- 月度配送进度（备货中/运输中/已送达）
- 农场实时环境数据（温度、湿度曲线图）
- 月度好米推荐（12个月，按季节分类）
- 农场笔记列表

**关键组件**：
- 会员卡片轮播
- 配送状态卡片
- 环境数据图表（Recharts）
- 月度好米卡片（横向滚动）

### 3.2 市集（MarketView）
**功能点**：
- 商品分类展示（农产品/茶叶/手工艺品）
- 会员专享价格标识
- 商品详情页（故事、规格、品鉴笔记）
- 权益手册入口

**商品类型**：
- 月度权益商品（免费配送）
- 会员专享商品（折扣价）
- 限时商品

### 3.3 家书（LetterView）
**功能点**：
- 农场笔记列表
- 笔记分类（农事/新品/食谱）
- 笔记详情页（图文混排）
- 作者信息展示

### 3.4 山居（HomestayView）
**功能点**：
- 民宿房间列表
- 会员免费住宿权益展示
- 房间详情（设施、价格、图片）
- 预约功能入口

**房间类型**：
- 观景木屋
- 亲子树屋
- 山居别墅

### 3.5 个人中心（ProfileView）
**功能点**：
- 用户信息展示（头像、姓名、会员等级）
- 会员卡片（有效期、续费入口）
- 优惠券/稻穗分/兑换中心/邀请有礼/用户调研
- 订单管理（待付款/待发货/待收货/待评价/退款售后）
- 功能入口（购物车/地址/收藏/发票/关于）
- 好物推荐（瀑布流布局）

**关键特性**：
- 支持会员/游客两种状态切换
- 会员权益可视化展示
- 订单状态实时更新

### 3.6 设置模块
**AccountSecurityView（账户安全）**：
- 用户信息编辑
- 手机号绑定
- 账户切换（会员/游客）

**SettingsView（设置）**：
- 账户安全入口
- 通知设置入口
- 其他系统设置

**NotificationSettingsView（通知设置）**：
- 推送通知开关
- 消息分类设置

**MessageCenterView（消息中心）**：
- 系统通知列表
- 消息分类（订单/活动/系统）
- 未读消息标识

**CustomerServiceView（客服中心）**：
- 客服入口
- 常见问题
- 在线咨询

### 3.7 会员模块
**MembershipIntroView（会员介绍）**：
- 会员权益说明
- 会员等级对比
- 支付入口

**MembershipPaymentView（会员支付）**：
- 会员套餐选择
- 支付流程
- 价格展示

**GuardianCertificateView（守护证书）**：
- 会员证书展示
- 证书下载/分享

**BenefitsManualView（权益手册）**：
- 权益详细说明
- 使用规则

---

## 四、开发规范

### 4.1 代码规范
1. **组件命名**：使用 PascalCase，如 `HomeView.tsx`
2. **文件组织**：按功能模块划分，视图组件放在 `views/`，公共组件放在 `components/`
3. **类型定义**：所有类型统一在 `types.ts` 中定义
4. **常量数据**：Mock 数据统一在 `constants.tsx` 中管理

### 4.2 样式规范
- 使用 Tailwind CSS 工具类
- 颜色系统：使用自定义颜色 `plough-green-*`（品牌色）
- 字体：标题使用 `font-serif`（衬线体），正文使用 `font-sans`
- 圆角：卡片使用 `rounded-xl` 或 `rounded-2xl`
- 间距：使用 Tailwind 标准间距系统

### 4.3 组件开发规范
1. **Props 接口**：每个组件必须定义 `Props` 接口
2. **类型安全**：使用 TypeScript 严格模式
3. **组件拆分**：复杂组件拆分为子组件
4. **状态管理**：使用 React Hooks（useState）

### 4.4 Git 提交规范
- 提交信息使用中文
- 格式：`功能描述：具体修改内容`
- 示例：`优化优惠券卡片图标：统一使用橙色渐变风格`

---

## 五、开发环境搭建

### 5.1 环境要求
- **Node.js**：建议使用 LTS 版本（18.x 或更高）
- **包管理器**：npm 或 yarn
- **编辑器**：推荐 VS Code

### 5.2 安装步骤
```bash
# 1. 克隆项目
git clone https://github.com/BVTRay/niugeng.git
cd 牛耕部落---归野

# 2. 安装依赖
npm install

# 3. 配置环境变量（如需要）
# 创建 .env.local 文件，配置 GEMINI_API_KEY（如需要）

# 4. 启动开发服务器
npm run dev

# 5. 访问应用
# 浏览器打开 http://localhost:3000
```

### 5.3 构建生产版本
```bash
# 构建
npm run build

# 预览构建结果
npm run preview
```

---

## 六、部署流程

### 6.1 构建配置
- **构建工具**：Vite
- **输出目录**：`dist/`
- **端口配置**：开发环境 3000（可在 `vite.config.ts` 修改）

### 6.2 部署步骤
1. **本地构建**
   ```bash
   npm run build
   ```

2. **上传 dist 目录**到服务器或静态托管服务

3. **配置 Web 服务器**（如 Nginx）
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /path/to/dist;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

### 6.3 部署平台推荐
- **Vercel**：已配置，可直接部署
- **Netlify**：支持静态站点部署
- **GitHub Pages**：适合开源项目

---

## 七、维护指南

### 7.1 日常维护
1. **依赖更新**：定期检查并更新依赖包
   ```bash
   npm outdated
   npm update
   ```

2. **代码审查**：每次提交前检查代码质量
   ```bash
   npm run build  # 检查构建是否成功
   ```

3. **类型检查**：确保 TypeScript 类型正确
   ```bash
   npx tsc --noEmit
   ```

### 7.2 数据管理
- **Mock 数据**：当前使用 `constants.tsx` 中的 Mock 数据
- **数据对接**：后续需要对接真实 API 时，在 `constants.tsx` 中替换为 API 调用
- **状态管理**：如需复杂状态管理，可考虑引入 Redux 或 Zustand

### 7.3 性能优化
1. **代码分割**：使用 React.lazy 进行路由级别的代码分割
2. **图片优化**：使用 WebP 格式，添加懒加载
3. **打包优化**：Vite 已自动进行 Tree Shaking

### 7.4 常见问题排查

**问题1：端口被占用**
```bash
# 修改 vite.config.ts 中的端口号
server: {
  port: 3001,  // 改为其他端口
}
```

**问题2：类型错误**
- 检查 `tsconfig.json` 配置
- 确保所有依赖已正确安装

**问题3：样式不生效**
- 检查 Tailwind CSS 配置
- 确认类名拼写正确

---

## 八、功能扩展指南

### 8.1 添加新页面
1. 在 `views/` 目录创建新组件
2. 在 `types.ts` 中添加对应的 `ViewState` 类型
3. 在 `App.tsx` 中添加路由处理逻辑
4. 在相应页面添加导航入口

### 8.2 添加新功能
1. 定义数据类型（在 `types.ts`）
2. 添加 Mock 数据（在 `constants.tsx`）
3. 创建 UI 组件
4. 集成到现有页面

### 8.3 API 对接
1. 创建 API 服务层（建议新建 `services/` 目录）
2. 使用 `fetch` 或 `axios` 进行 HTTP 请求
3. 替换 Mock 数据为真实 API 调用
4. 添加错误处理和加载状态

---

## 九、安全注意事项

### 9.1 代码安全
- **敏感信息**：不要将 API Key 等敏感信息提交到 Git
- **环境变量**：使用 `.env.local` 管理环境变量
- **依赖安全**：定期检查依赖包的安全漏洞
  ```bash
  npm audit
  npm audit fix
  ```

### 9.2 数据安全
- **用户数据**：确保用户隐私数据加密传输
- **支付安全**：支付相关功能需要 HTTPS 协议
- **输入验证**：所有用户输入需要进行验证和转义

---

## 十、版本管理

### 10.1 Git 工作流
- **主分支**：`main`（生产环境代码）
- **开发分支**：建议创建 `develop` 分支进行开发
- **功能分支**：每个功能创建独立分支，开发完成后合并

### 10.2 版本号规范
- 遵循语义化版本（Semantic Versioning）
- 格式：`主版本号.次版本号.修订号`
- 示例：`1.0.0` → `1.0.1`（修复bug）→ `1.1.0`（新功能）

### 10.3 发布流程
1. 更新 `package.json` 中的版本号
2. 更新 `CHANGELOG.md`（如有）
3. 提交代码并推送到 GitHub
4. 创建 Git Tag
5. 部署到生产环境

---

## 十一、团队协作

### 11.1 代码审查
- 所有代码提交前需要经过代码审查
- 确保代码符合项目规范
- 检查功能完整性和测试覆盖

### 11.2 文档维护
- 及时更新本文档
- 代码注释要清晰明了
- 重要功能变更需要更新文档

### 11.3 沟通渠道
- **GitHub Issues**：用于问题追踪和功能讨论
- **Pull Requests**：用于代码审查和合并
- **项目文档**：重要决策和规范记录在文档中

---

## 十二、附录

### 12.1 相关链接
- **GitHub 仓库**：https://github.com/BVTRay/niugeng.git
- **在线预览**：https://niugeng.vercel.app
- **设计文档**：`design_notes.md`

### 12.2 技术文档
- **React 官方文档**：https://react.dev
- **TypeScript 官方文档**：https://www.typescriptlang.org
- **Vite 官方文档**：https://vitejs.dev
- **Tailwind CSS 文档**：https://tailwindcss.com

### 12.3 联系方式
- **项目维护者**：BVTRay
- **问题反馈**：通过 GitHub Issues 提交

---

## 文档版本历史

| 版本 | 日期 | 修改内容 | 修改人 |
|------|------|----------|--------|
| 1.0.0 | 2024-12 | 初始版本，完整系统文档 | - |

---

**文档最后更新**：2024年12月  
**文档维护者**：开发团队






