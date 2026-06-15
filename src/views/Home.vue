
<template>
  <div class="home-container">
    <!-- 左侧导航栏 -->
    <aside class="sidebar" :class="{ collapsed: isSidebarCollapsed }">
      <div class="sidebar-header">
        <img  src="@/assets/home/imgs/img1.png" alt="数据助手" class="header-logo" v-if="!isSidebarCollapsed">
        <span v-if="!isSidebarCollapsed" class="sidebar-logo">数据助手</span>
        <el-icon
            class="collapse-btn"
            @click="toggleSidebar"
        >
          <Fold />
        </el-icon>
      </div>

      <div class="sidebar-content">
        <!-- 新建对话按钮 -->
        <el-button
            type="primary"
            class="new-chat-btn"
            @click="startNewChat"
            :style="{ width: isSidebarCollapsed ? '' : '90%' }"
        >
          <el-icon v-if="isSidebarCollapsed" style="position: relative;top:-1px"><Plus /></el-icon>
          <el-icon v-if="!isSidebarCollapsed" style="position: relative;right:10px;top:-1px"><Plus /></el-icon> <span v-if="!isSidebarCollapsed">新建对话</span>
        </el-button>

        <!-- 导航菜单 -->
        <el-menu
            :default-active="activeMenu"
            class="nav-menu"
            @select="handleMenuSelect"
            :collapse="isSidebarCollapsed"
            :unique-opened="true"
        >
          <!-- 用数集市 -->
          <el-menu-item index="market" @click="goToMarket">
            <el-icon><ShoppingBag /></el-icon>
            <span>用数集市</span>
          </el-menu-item>

          <!-- 知识问答 -->
          <el-sub-menu index="knowledge">
            <template #title>
              <el-icon><QuestionFilled /></el-icon>
              <span>知识问答</span>
            </template>
            <el-menu-item index="find-asset" @click="selectScene('knowledge', 'find-asset')">找资产</el-menu-item>
            <el-menu-item index="ask-asset" @click="selectScene('knowledge', 'ask-asset')">问资产</el-menu-item>
            <el-menu-item index="model-manage" @click="selectScene('knowledge', 'model-manage')">模型管理</el-menu-item>
          </el-sub-menu>

          <!-- 技能增强 -->
          <el-sub-menu index="skill">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>技能增强</span>
            </template>
            <el-menu-item index="write-code" @click="selectScene('skill', 'write-code')">写代码</el-menu-item>
            <el-menu-item index="analyze-code" @click="selectScene('skill', 'analyze-code')">析代码</el-menu-item>
            <el-menu-item index="modify-code" @click="selectScene('skill', 'modify-code')">改代码</el-menu-item>
          </el-sub-menu>

          <!-- 营销推动 -->
          <el-sub-menu index="marketing">
            <template #title>
              <el-icon><Promotion /></el-icon>
              <span>营销推动</span>
            </template>
            <el-menu-item index="customer-insight" @click="selectScene('marketing', 'customer-insight')">客户洞察</el-menu-item>
            <el-menu-item index="enterprise-insight" @click="selectScene('marketing', 'enterprise-insight')">企业洞察</el-menu-item>
            <el-menu-item index="map-customer" @click="selectScene('marketing', 'map-customer')">地图拓客</el-menu-item>
          </el-sub-menu>

          <!-- 管理决策 -->
          <el-sub-menu index="decision">
            <template #title>
              <el-icon><DataAnalysis /></el-icon>
              <span>管理决策</span>
            </template>
            <el-menu-item index="business-analysis" @click="selectScene('decision', 'business-analysis')">经营分析</el-menu-item>
          </el-sub-menu>

          <!-- 历史对话 -->
          <el-sub-menu index="history">
            <template #title>
              <el-icon><ChatDotRound /></el-icon>
              <span>历史对话</span>
            </template>
            <el-menu-item
                v-for="history in historyList"
                :key="history.id"
                :index="'history-' + history.id"
                @click="loadHistory(history.id)"
            >
              <div class="history-item-content">
                <div class="history-avatar">{{ history.avatar }}</div>
                <div class="history-text-wrapper">
                  <p class="history-text">{{ history.title }}</p>
                  <span class="history-time">{{ history.time }}</span>
                </div>
              </div>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </aside>

    <!-- 主内容区 -->
    <div class="main-wrapper">
      <!-- 顶部Header -->
      <header class="top-header">

        <div class="header-right">
          <el-dropdown trigger="click">
            <div class="user-info">
              <el-avatar size="small"><User /></el-avatar>
              <span class="user-name">某某</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>

      <!-- 内容展示区 -->
      <main class="content-area">
        <!-- 首页 - 卡片导航 -->
        <div v-if="currentPage === 'home'" class="home-page">
          <div class="welcome-section">
            <div style="position: relative;top:5px; margin-right: 20px"><img src="@/assets/home/imgs/img8.png" alt="机器人" class="welcome-avatar"></div>
            <div class="welcome-avatar-shadow">
              <h1 class="welcome-title"><span class="gradient-text">你好，我是工晓数</span>，你身边的超级用数助手！</h1>
              <p class="welcome-subtitle">工晓数已全面接入DeepSeek，一句话开启你的数智之旅~</p>
            </div>

          </div>

          <!-- 四大核心场景卡片 -->
          <div class="scene-cards">
            <el-card
                class="scene-card"
                v-for="scene in sceneCards"
                :key="scene.key"
                @click="selectScene(scene.parentKey, scene.key)"
            >
              <div class="card-header">
                <h3 class="card-title">{{ scene.name }}</h3>
              </div>
              <div class="card-content">
                <p>{{ scene.description }}</p>
                <div class="card-footer">
                  <span class="enter-link">点击进入 <i class="el-icon-right"></i></span>
                </div>
              </div>
              <div class="card-image-wrapper">
                <img :src="scene.image" :alt="scene.name" class="card-image">
              </div>
            </el-card>
          </div>
        </div>

        <!-- 用数集市页面 -->
        <div v-else-if="currentPage === 'market'" class="market-page">
          <div class="market-header">
            <h2 class="market-title gradient-text">用数集市</h2>
            <div class="market-search">
              <el-input
                  v-model="searchKeyword"
                  placeholder="请输入场景名称进行搜索"
                  class="search-input"
                  clearable
              >
                <template #suffix>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
              <el-dropdown @command="handleCreateScene" class="create-dropdown">
                <el-button class="create-agent-btn">
                  <el-icon><Plus /></el-icon>
                  <span>创建场景</span>
                  <el-icon class="el-icon--right"><ArrowDown /></el-icon>
                </el-button>
                <template #dropdown v-if="hasCreatePermission">
                  <el-dropdown-menu>
                    <el-dropdown-item command="flexible">
                      <el-icon><TrendCharts /></el-icon>
                      <span>灵活问数流水线</span>
                    </el-dropdown-item>
                    <el-dropdown-item command="report">
                      <el-icon><DataBoard /></el-icon>
                      <span>分析报告流水线</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>

          <!-- 标签页 -->
          <el-tabs v-model="activeTab" class="market-tabs">
            <el-tab-pane label="全部" name="all"></el-tab-pane>
            <el-tab-pane label="知识问答" name="knowledge"></el-tab-pane>
            <el-tab-pane label="技能增强" name="skill"></el-tab-pane>
            <el-tab-pane label="营销推动" name="marketing"></el-tab-pane>
            <el-tab-pane label="决策管理" name="decision"></el-tab-pane>
            <el-tab-pane label="我的应用" name="my"></el-tab-pane>
            <el-tab-pane label="灵活问数" name="flexible"></el-tab-pane>
            <el-tab-pane label="分析报告" name="report"></el-tab-pane>
          </el-tabs>

          <!-- 场景卡片列表 -->
          <div class="market-cards">
            <el-row :gutter="20">
              <el-col :span="8" v-for="item in filteredMarketItems" :key="item.id">
                <el-card
                    class="market-card"
                    shadow="hover"
                    @click="handleMarketCardClick(item)"
                >
                  <div class="market-card-content">
                    <div class="market-card-main">
                      <h4 class="market-card-title">{{ item.name }}</h4>
                      <p class="market-card-desc">{{ item.description }}</p>
                      <div class="market-card-stats">
                        <span><i class="el-icon-view"></i> {{ item.views }}</span>
                        <span><i class="el-icon-chat-dot-round"></i> {{ item.comments }}</span>
                      </div>
                    </div>
                    <div class="market-card-bg" :style="{ background: item.bgGradient }"></div>
                  </div>
                </el-card>
                <el-tooltip
                    v-if="!item.hasPermission"
                    class="permission-tooltip"
                    effect="dark"
                    content="您无此场景使用权限，请联系【管理员姓名/部门】开通"
                    placement="top"
                >
                  <div class="no-permission-mask"></div>
                </el-tooltip>
              </el-col>
            </el-row>
          </div>

          <!-- 分页 -->
          <div class="pagination-wrapper">
            <el-pagination
                layout="prev, pager, next, jumper"
                :total="160"
                :page-size="9"
                background
            />
          </div>
        </div>

        <!-- 场景对话页面 -->
        <div v-else-if="currentPage === 'scene'" class="scene-page">
          <div class="welcome-section">
            <div style="position: relative;top:5px; margin-right: 20px"><img src="@/assets/home/imgs/img8.png" alt="机器人" class="welcome-avatar"></div>
            <div class="welcome-avatar-shadow">
              <h1 class="welcome-title"><span class="gradient-text">你好，我是工晓数</span>，你身边的超级用数助手！</h1>
              <p class="welcome-subtitle">工晓数已全面接入DeepSeek，一句话开启你的数智之旅~</p>
            </div>

          </div>

          <!-- 推荐问题 -->
          <div style="display: flex;justify-content: center">
          <div class="recommend-section" v-if="recommendQuestions.length > 0">
            <p class="recommend-title">您可以尝试问我以下问题</p>
            <div class="recommend-grid">
              <el-card
                  v-for="(question, index) in recommendQuestions"
                  :key="index"
                  class="recommend-card"
                  @click="handleQuestionClick(question)"
              >
                <div class="question-text">"{{ question.text }}"</div>
                <div class="question-tag">{{ question.category }}</div>
              </el-card>
            </div>
          </div>
        </div></div>
      </main>

      <!-- 底部全局输入框 -->
      <div class="bottom-input" v-if="currentPage !== 'market'">
        <div class="input-card">
          <!-- 场景选择器 - 横向排列 -->
          <div class="scene-tabs-top" v-if="currentPage === 'scene'">
            <div
                v-for="scene in currentParentScenes"
                :key="scene.key"
                @click="switchSceneFromInput(scene.key)"
            >
              <span class="scene-tab-btn" :class="{ active: scene.key === currentScene }">
                <el-icon><component :is="getSceneIconComponent(scene.key)" /></el-icon>
                {{ scene.name }}
              </span>
            </div>
          </div>

          <!-- 输入框容器 -->
          <div class="input-container">
            <el-input
                v-model="userInput"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 6 }"
                :placeholder="inputPlaceholder"
                class="chat-textarea"
                @keydown.native="handleKeyDown"
                @focus="handleInputFocus"
                @blur="handleInputBlur"
            ></el-input>

            <!-- @召唤面板 -->
            <transition name="slide-up">
              <div class="at-panel" v-if="currentPage === 'home' && showAtPanel ">
                <div class="panel-header">
                  <span>搜索场景名称</span>
                  <el-icon class="panel-icon"><RefreshRight /></el-icon>
                  <span class="panel-hint">支持通过@召唤有权限的场景</span>
                </div>
                <div class="panel-list">
                  <div
                      v-for="(item, index) in atSceneList"
                      :key="index"
                      class="panel-item"
                      :class="{ active: atSelectedIndex === index }"
                      @mouseenter="atSelectedIndex = index"
                      @click="handleAtSelect(item)"
                  >
                    <div class="item-icon" :style="{ background: item.color }">
                      <el-icon><component :is="getAtIconComponent(item.icon)" /></el-icon>
                    </div>
                    <div class="item-content">
                      <div class="item-title">{{ item.name }}</div>
                      <div class="item-desc">{{ item.description }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>

            <!-- 底部操作栏 -->
            <div class="input-actions-inside">
              <div class="action-left">
                <el-icon class="action-icon" title="上传文件"><Paperclip /></el-icon>
              </div>
              <el-button
                  type="primary"
                  circle
                  class="send-button"
                  @click="sendMessage"
              >
                <el-icon><Top /></el-icon>
              </el-button>
            </div>
          </div>
        </div>
        <p class="input-hint">内容由工晓数AI生成，请仔细甄别</p>
      </div>
    </div>

    <!-- 权限提示弹窗 -->
    <el-dialog
        title="权限提示"
        :visible.sync="showPermissionDialog"
        width="400px"
        custom-class="permission-dialog"
    >
      <div class="permission-content">
        <i class="el-icon-warning permission-icon"></i>
        <p>{{ permissionMessage }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showPermissionDialog = false">确定</el-button>
      </span>
    </el-dialog>

    <!-- 客群圈选弹窗 -->
    <el-dialog
        title="我的客群圈选"
        :visible.sync="showCustomerDialog"
        width="500px"
    >
      <div class="dialog-content">
        <p>我的客群圈选</p>
      </div>
    </el-dialog>

    <!-- 申请审批进度弹窗 -->
    <el-dialog
        title="我的申请审批进度"
        :visible.sync="showApprovalDialog"
        width="500px"
    >
      <div class="dialog-content">
        <p>我的申请审批进度（功能开发中...）</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  ShoppingBag,
  QuestionFilled,
  Setting,
  Promotion,
  DataAnalysis,
  ChatDotRound,
  User,
  Plus,
  ArrowDown,
  TrendCharts,
  DataBoard,
  Search,
  Paperclip,
  Microphone,
  Top,
  Warning,
  Edit,
  Tools,
  OfficeBuilding,
  Location,
  Document,
  Fold,
  RefreshRight,
  Reading,
  DocumentCopy,
  Files
} from '@element-plus/icons-vue'
import {sendAiMessage} from "@/api/message.ts";

export default {
  name: 'Home',
  components: {
    ShoppingBag,
    QuestionFilled,
    Setting,
    Promotion,
    DataAnalysis,
    ChatDotRound,
    User,
    Plus,
    ArrowDown,
    TrendCharts,
    DataBoard,
    Search,
    Paperclip,
    Microphone,
    Top,
    Warning,
    Edit,
    Tools,
    OfficeBuilding,
    Location,
    Document,
    Fold,
    RefreshRight,
    Reading,
    DocumentCopy,
    Files
  },
  data() {
    return {
      // 侧边栏状态
      isSidebarCollapsed: false,

      // 当前页面
      currentPage: 'home', // home, market, scene

      // 菜单和场景
      activeMenu: 'home',
      currentParentKey: '',
      currentScene: '',

      // 用户输入
      userInput: '',

      // 搜索和标签
      searchKeyword: '',
      activeTab: 'all',

      // 文本是否溢出
      isTextOverflow: false,

      // @召唤面板
      showAtPanel: false,
      atSelectedIndex: 0,
      atSceneList: [
        {
          name: '文档翻译',
          description: '简介说明示例示例示例示例示例,示例示例示例示例示例示例示例示例示例示例示例示例',
          icon: 'Document',
          color: '#7C5CFC'
        },
        {
          name: '文档翻译',
          description: '简介说明示例示例示例示例示例,示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例',
          icon: 'Reading',
          color: '#A855F7'
        },
        {
          name: '文档翻译',
          description: '简介说明示例示例示例示例示例,示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例',
          icon: 'Document',
          color: '#D946EF'
        },
        {
          name: '文档翻译',
          description: '简介说明示例示例示例示例示例,示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例示例',
          icon: 'DocumentCopy',
          color: '#7C5CFC'
        },
        {
          name: '文档翻译',
          description: '简介说明示例示例示例示例示例,示例示例示例示例示例示例示例示例示例示例示例',
          icon: 'Files',
          color: '#A855F7'
        }
      ],

      // 推荐问题
      recommendQuestions: [],

      // 弹窗控制
      showPermissionDialog: false,
      permissionMessage: '',
      showCustomerDialog: false,
      showApprovalDialog: false,

      // 权限控制
      hasCreatePermission: true,

      // 历史对话数据
      historyList: [
        { id: 1, title: '历史对话记录3', time: '2024.10.10 10:00:00', avatar: '历' },
        { id: 2, title: '一个苹果', time: '2024.10.10 10:00:00', avatar: '一' },
        { id: 3, title: '超爱聊天的企鹅', time: '2024.10.10 10:00:00', avatar: '超' },
        { id: 4, title: '历史对话记录2', time: '2024.10.10 10:00:00', avatar: '历' },
        { id: 5, title: '历史对话记录1', time: '2024.10.10 10:00:00', avatar: '历' },
      ],

      // 场景卡片配置
      sceneCards: [
        {
          key: 'write-code',
          parentKey: 'skill',
          name: '写代码',
          description: '智谱最新模型GLM5首发体验',
          image: '@/assets/home/imgs/img4.png'
        },
        {
          key: 'ai-chat',
          parentKey: 'skill',
          name: '智能对话',
          description: '智涌Team不止聊天，还能办事',
          image: '@/assets/home/imgs/img5.png'
        },
        {
          key: 'smart-word',
          parentKey: 'skill',
          name: '智能Word',
          description: '全行素材模板库深度定制',
          image: '@/assets/home/imgs/img6.png'
        },
        {
          key: 'smart-ppt',
          parentKey: 'skill',
          name: '智能PPT',
          description: '一站式写作服务',
          image: '@/assets/home/imgs/img7.png'
        }
      ],

      // 用数集市数据
      marketItems: [
        { id: 1, name: '摘要生成', description: '简介说明示例示例示例示例示例，示例示例示例示例示例示例示例示例...', icon: 'el-icon-document', bgGradient: 'linear-gradient(135deg, rgba(124,92,252,0.1) 0%, rgba(168,85,247,0.1) 100%)', views: 121, comments: 121, author: '软件开发中心', hasPermission: true, category: 'all' },
        { id: 2, name: '摘要生成', description: '简介说明示例示例示例示例示例，示例示例示例示例示例示例示例示例示例...', icon: 'el-icon-reading', bgGradient: 'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(217,70,239,0.1) 100%)', views: 121, comments: 121, author: '软件开发中心', hasPermission: true, category: 'knowledge' },
        { id: 3, name: '摘要生成', description: '简介说明示例示例示例示例示例，示例示例示例示例示例示例示例示例示例...', icon: 'el-icon-document', bgGradient: 'linear-gradient(135deg, rgba(124,92,252,0.1) 0%, rgba(168,85,247,0.1) 100%)', views: 121, comments: 121, author: '软件开发中心', hasPermission: true, category: 'skill' },
        { id: 4, name: '摘要生成', description: '简介说明示例示例示例示例示例，示例示例示例示例示例示例示例示例示例...', icon: 'el-icon-document', bgGradient: 'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(217,70,239,0.1) 100%)', views: 121, comments: 121, author: '软件开发中心', hasPermission: true, category: 'marketing' },
        { id: 5, name: '摘要生成', description: '简介说明示例示例示例示例示例，示例示例示例示例示例示例示例示例示例...', icon: 'el-icon-reading', bgGradient: 'linear-gradient(135deg, rgba(124,92,252,0.1) 0%, rgba(168,85,247,0.1) 100%)', views: 121, comments: 121, author: '软件开发中心', hasPermission: true, category: 'decision' },
        { id: 6, name: '示例示例示例示例', description: '简介说明示例示例示例示例示例，示例示例示例示例示例示例示例示例示例...', icon: 'el-icon-document', bgGradient: 'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(217,70,239,0.1) 100%)', views: 121, comments: 121, author: '软件开发中心', hasPermission: false, category: 'all' },
      ],

      // 场景配置
      sceneConfig: {
        knowledge: {
          name: '知识问答',
          scenes: [
            { key: 'find-asset', name: '找资产' },
            { key: 'ask-asset', name: '问资产' },
            { key: 'model-manage', name: '模型管理' }
          ]
        },
        skill: {
          name: '技能增强',
          scenes: [
            { key: 'write-code', name: '写代码' },
            { key: 'analyze-code', name: '析代码' },
            { key: 'modify-code', name: '改代码' }
          ]
        },
        marketing: {
          name: '营销推动',
          scenes: [
            { key: 'customer-insight', name: '客户洞察' },
            { key: 'enterprise-insight', name: '企业洞察' },
            { key: 'map-customer', name: '地图拓客' }
          ]
        },
        decision: {
          name: '管理决策',
          scenes: [
            { key: 'business-analysis', name: '经营分析' }
          ]
        }
      }
    }
  },

  computed: {
    showLogo() {
      return this.currentPage !== 'home';
    },

    currentParentScenes() {
      if (!this.currentParentKey || !this.sceneConfig[this.currentParentKey]) {
        return [];
      }
      return this.sceneConfig[this.currentParentKey].scenes;
    },

    currentSceneName() {
      const scenes = this.currentParentScenes;
      const scene = scenes.find(s => s.key === this.currentScene);
      return scene ? scene.name : '';
    },

    filteredMarketItems() {
      let items = this.marketItems;

      // 按标签过滤
      if (this.activeTab !== 'all') {
        if (this.activeTab === 'my') {
          items = items.filter(item => item.author === '软件开发中心');
        } else {
          items = items.filter(item => item.category === this.activeTab);
        }
      }

      // 按搜索关键词过滤
      if (this.searchKeyword) {
        items = items.filter(item =>
            item.name.includes(this.searchKeyword) ||
            item.description.includes(this.searchKeyword)
        );
      }

      return items;
    },

    inputPlaceholder() {
      if (this.currentPage === 'home') {
        return '可查询知识问答、技能增强、营销推动、管理决策等相关用数问题，支持@召唤用数场景。按下Enter发送/按下Alt(shift)+Enter换行';
      } else if (this.currentPage === 'scene') {
        return '可咨询企业文化、组织架构、规章制度、业务办理等方面的问题';
      }
      return '请输入您的问题...';
    }
  },

  methods: {
    // 切换侧边栏
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },

    // 新建对话
    startNewChat() {
      this.currentPage = 'home';
      this.activeMenu = 'home';
      this.userInput = '';
      this.showAtPanel = false;
      this.$message.success('已创建新对话');
    },

    // 菜单选择
    handleMenuSelect(index) {
      // 子菜单点击由各自的方法处理
    },

    // 进入用数集市
    goToMarket() {
      this.currentPage = 'market';
      this.activeMenu = 'market';
    },

    // 选择场景
    selectScene(parentKey, sceneKey) {
      this.currentPage = 'scene';
      this.currentParentKey = parentKey;
      this.currentScene = sceneKey;
      this.activeMenu = sceneKey;
      this.loadRecommendQuestions();
    },

    // 切换场景
    switchScene(parentKey, sceneKey) {
      this.currentParentKey = parentKey;
      this.currentScene = sceneKey;
      this.activeMenu = sceneKey;
    },

    // 获取场景图标
    getSceneIcon(sceneKey) {
      const iconMap = {
        'write-code': 'Edit',
        'analyze-code': 'Search',
        'modify-code': 'Tools',
        'find-asset': 'Search',
        'ask-asset': 'QuestionFilled',
        'model-manage': 'Setting',
        'customer-insight': 'User',
        'enterprise-insight': 'OfficeBuilding',
        'map-customer': 'Location',
        'business-analysis': 'DataAnalysis'
      };
      return iconMap[sceneKey] || 'Document';
    },

    // 获取场景图标组件
    getSceneIconComponent(sceneKey) {
      const iconMap = {
        'write-code': 'Edit',
        'analyze-code': 'Search',
        'modify-code': 'Tools',
        'find-asset': 'Search',
        'ask-asset': 'QuestionFilled',
        'model-manage': 'Setting',
        'customer-insight': 'User',
        'enterprise-insight': 'OfficeBuilding',
        'map-customer': 'Location',
        'business-analysis': 'DataAnalysis'
      };
      return iconMap[sceneKey] || 'Document';
    },

    // 从输入框切换场景
    switchSceneFromInput(sceneKey) {
      console.log('从输入框切换场景',this.currentParentKey,'==>2',sceneKey)
      this.switchScene(this.currentParentKey, sceneKey);
    },

    // 加载历史对话
    loadHistory(id) {
      const history = this.historyList.find(h => h.id === id);
      if (history) {
        this.$message.info(`加载对话: ${history.title}`);
      }
    },

    // 发送消息
    async sendMessage() {
      if (!this.userInput.trim()) {
        this.$message.warning('请输入内容');
        return;
      }
      this.$message.success('消息已发送，语义识别匹配场景中...');

      const {code,msg, data} = await sendAiMessage(this.userInput)

      console.log(code,msg, data)

      this.userInput = '';
      this.showAtPanel = false;
    },

    // 键盘事件
    handleKeyDown(e) {
      if (e.key === 'Enter' && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        this.sendMessage();
      }
    },

    // 输入框焦点事件
    handleInputFocus() {
      // 检测是否输入了@
      if (this.userInput.includes('@')) {
        this.showAtPanel = true;
      }
    },

    handleInputBlur() {
      // 延迟关闭，让点击事件先执行
      setTimeout(() => {
        this.showAtPanel = false;
      }, 200);
    },

    // @召唤面板选择
    handleAtSelect(item) {
      this.userInput = this.userInput.replace(/@$/, `@${item.name} `);
      this.showAtPanel = false;
    },

    // 获取@召唤面板图标组件
    getAtIconComponent(iconName) {
      const iconMap = {
        'Document': 'Document',
        'Reading': 'Reading',
        'DocumentCopy': 'DocumentCopy',
        'Files': 'Files'
      };
      return iconMap[iconName] || 'Document';
    },

    // 创建场景
    handleCreateScene(command) {
      if (command === 'flexible') {
        this.$message.info('跳转至灵活问数流水线配置页');
      } else if (command === 'report') {
        this.$message.info('跳转至分析报告流水线配置页');
      }
    },

    // 用数集市卡片点击
    handleMarketCardClick(item) {
      if (item.hasPermission) {
        this.$message.success(`跳转至: ${item.name}`);
      } else {
        this.permissionMessage = `您无此场景使用权限，请联系【管理员姓名/部门】开通`;
        this.showPermissionDialog = true;
      }
    },

    // 检查文本是否溢出
    checkTextOverflow(element) {
      this.isTextOverflow = element.scrollHeight > element.clientHeight;
    },

    // 加载推荐问题（动态获取）
    async loadRecommendQuestions() {
      // 模拟异步接口调用
      const data = await this.fetchRecommendQuestions();
      this.recommendQuestions = data;
    },

    // 获取推荐问题数据
    fetchRecommendQuestions() {
      // 模拟接口返回数据
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { text: '查询对公客户清单应该使用哪张表？', category: '知识问答' },
            { text: '查询对公客户清单应该使用哪张表？', category: '知识问答' },
            { text: '查询对公客户清单应该使用哪张表？', category: '知识问答' },
            { text: '查询对公客户清单应该使用哪张表？', category: '知识问答' }
          ]);
        }, 300);
      });
    },

    // 点击推荐问题
    handleQuestionClick(question) {
      this.userInput = question.text;
      this.$message.info(`已填入问题：${question.text}`);
    },

    // 打开客群圈选
    openCustomerDialog() {
      this.showCustomerDialog = true;
    },

    // 打开审批进度
    openApprovalDialog() {
      this.showApprovalDialog = true;
    }
  },

  mounted() {
    // 在组件挂载后检查文本溢出
    this.$nextTick(() => {
      const descElements = document.querySelectorAll('.market-card-desc');
      descElements.forEach(el => {
        this.checkTextOverflow(el);
      });
    });
  }
}
</script>

<style scoped>
.home-container {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  background: #f5f7fa;
}

/* 渐变色工具类 */
.gradient-text {
  background: linear-gradient(135deg, #7C5CFC 0%, #A855F7 50%, #D946EF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

/* 侧边栏 */
.sidebar {
  width: 240px;
  height: 100vh;
  background: #fff;
  border-right: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
}

.sidebar.collapsed {
  width: 64px;
}

.sidebar-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

.sidebar-logo {
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(135deg, #7C5CFC 0%, #A855F7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.collapse-btn {
  font-size: 20px;
  cursor: pointer;
  color: #666;
  left:5px;
  position: relative;
  transition: transform 0.2s;
}

.collapse-btn:hover {
  color: #7C5CFC;
}

.sidebar.collapsed .collapse-btn {
  transform: rotate(180deg);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;

}


.new-chat-btn {
  margin-bottom: 16px;
  background: linear-gradient(135deg, #7C5CFC 0%, #A855F7 100%);
  border: none;
  margin-left: 10px;
  margin-right: 10px;
}

.new-chat-btn:hover {
  background: linear-gradient(135deg, #6B4FDB 0%, #9645E6 100%);
}

.nav-menu {
  border-right: none;
  background: transparent;
}

.history-item-content {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
}

.history-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7C5CFC 0%, #A855F7 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
}

.history-text-wrapper {
  flex: 1;
  min-width: 0;
}

.history-text {
  font-size: 13px;
  color: #333;
  margin: 0 0 6px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  top: 20px;
}

.history-time {
  font-size: 11px;
  color: #999;
  display: block;
  position: relative;
  top: -15px;
}

/* 主内容区 */
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 顶部Header */
.top-header {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 24px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-logo {
  height: 32px;
}

.header-title {
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(135deg, #7C5CFC 0%, #A855F7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.user-name {
  font-size: 14px;
  color: #666;
}

/* 内容区域 */
.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

/* 首页 */
.home-page {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-section {
  text-align: center;
  margin-bottom: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome-avatar-shadow{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.welcome-avatar {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}

.welcome-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 12px;
}

.welcome-subtitle {
  font-size: 14px;
  color: #999;
}

.scene-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.scene-card {
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.scene-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(124, 92, 252, 0.15);
}

.card-header {
  margin-bottom: 12px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px 0;
  padding: 8px 12px;
  background: linear-gradient(90deg, rgba(124,92,252,0.1) 0%, transparent 100%);
  border-left: 3px solid #7C5CFC;
  display: inline-block;
}

.card-content {
  padding: 0 12px 12px;
}

.card-content p {
  font-size: 13px;
  color: #666;
  margin: 0 0 12px 0;
  line-height: 1.6;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.enter-link {
  font-size: 13px;
  color: #7C5CFC;
  cursor: pointer;
}

.enter-link:hover {
  color: #A855F7;
}

.card-image-wrapper {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 120px;
  height: 120px;
  opacity: 0.8;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 用数集市 */
.market-page {
  max-width: 1200px;
  margin: 0 auto;
}

.market-header {
  margin-bottom: 24px;
}

.market-title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 24px;
  font-weight: bold;
}

.market-search {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
}

.search-input {
  width: 500px;
}

.create-dropdown {
  display: inline-block;
}

.create-agent-btn {
  background: linear-gradient(135deg, #7C5CFC 0%, #A855F7 100%);
  border: none;
  color: #fff;
}

.create-agent-btn:hover {
  background: linear-gradient(135deg, #6B4FDB 0%, #9645E6 100%);
}

.market-tabs {
  margin-bottom: 24px;
}

.market-tabs {
  :deep(.el-tabs__item){
    font-size: 14px;
  }
}

.market-tabs :deep(.el-tabs__item.is-active) {
  background: linear-gradient(135deg, #7C5CFC 0%, #A855F7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
}

.market-tabs :deep(.el-tabs__active-bar) {
  background: linear-gradient(135deg, #7C5CFC 0%, #A855F7 100%);
}

.market-cards {
  margin-bottom: 24px;
  position: relative;
}

.market-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.market-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(124, 92, 252, 0.15);
}

.market-card-content {
  position: relative;
  padding: 16px;
}

.market-card-main {
  position: relative;
  z-index: 1;
}

.market-card-title {
  font-size: 16px;
  color: #333;
  margin: 0 0 8px 0;
  font-weight: bold;
}

.market-card-desc {
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.market-card-stats {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #999;
}

.market-card-stats i {
  margin-right: 4px;
}

.market-card-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: 0;
}

.no-permission-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  z-index: 10;
}

.permission-tooltip :deep(.el-tooltip__popper) {
  max-width: 200px;
}

.pagination-wrapper {
  text-align: center;
}

/* 场景页面 */
.scene-page {
  max-width: 1200px;
  margin: 0 auto;
}

.scene-header {
  margin-bottom: 32px;
}

.scene-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.recommend-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px 10px;
  background: linear-gradient(135deg, rgba(124,92,252,0.1) 0%, rgba(168,85,247,0.1) 100%);
  margin-bottom: 32px;
  width: 850px;
  border-radius: 10px;
}

.recommend-title {
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
  position: relative;
  left: 20px;

}

.recommend-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
}

.recommend-card {
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 8px;
}

.recommend-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(124, 92, 252, 0.15);
}

.question-text {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.question-tag {
  font-size: 12px;
  color: #999;
}

/* 底部输入框 */
.bottom-input {
  background: #f5f7fa;
  border-top: 1px solid #e8e8e8;
  padding: 16px 24px 12px;
}

.input-card {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

/* 顶部场景标签 - 横向排列 */
.scene-tabs-top {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.scene-dropdown-item {
  flex: 1;
  min-width: 120px;
}

.scene-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  justify-content: center;
}

.scene-tab-btn:hover {
  border-color: #7C5CFC;
  color: #7C5CFC;
}

.scene-tab-btn.active {
  background: linear-gradient(135deg, #7C5CFC 0%, #A855F7 100%);
  color: #fff;
  border-color: transparent;
}

.scene-tab-btn i:first-child {
  font-size: 14px;
}

/* 输入框容器 */
.input-container {
  position: relative;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 16px;
}

.chat-textarea {
  width: 100%;
}

.chat-textarea :deep(.el-textarea__inner) {
  border: none;
  resize: none;
  padding: 0;
  font-size: 14px;
  line-height: 1.6;
  box-shadow: none !important;
}

/* @召唤面板 */
.at-panel {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: auto;
  z-index: 100;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
  color: #666;
}

.panel-icon {
  cursor: pointer;
  color: #7C5CFC;
}

.panel-hint {
  margin-left: auto;
  font-size: 12px;
  color: #999;
}

.panel-list {
  padding: 8px 0;
}

.panel-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.panel-item:hover,
.panel-item.active {
  background: #f5f7fa;
}

.item-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  flex-shrink: 0;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 14px;
  color: #333;
  font-weight: 500;
  margin-bottom: 4px;
}

.item-desc {
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 底部操作栏 */
.input-actions-inside {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 12px;
  padding-top: 12px;

}

.action-left {
  display: flex;
  gap: 12px;
}

.action-icon {
  font-size: 36px;
  color: #999;
  cursor: pointer;
  transition: color 0.2s;
  position: relative;
  right: 15px;

}

.action-icon:hover {
  color: #7C5CFC;
}

.send-button {
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #7C5CFC 0%, #A855F7 100%);
  border: none;
}

.send-button:hover {
  background: linear-gradient(135deg, #6B4FDB 0%, #9645E6 100%);
}

.input-hint {
  text-align: center;
  font-size: 12px;
  color: #999;
  margin-top: 8px;
}

/* 权限弹窗 */
.permission-content {
  text-align: center;
  padding: 20px 0;
}

.permission-icon {
  font-size: 48px;
  color: #FFA500;
  margin-bottom: 16px;
}

.permission-content p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

/* 弹窗内容 */
.dialog-content {
  padding: 20px 0;
  text-align: center;
  color: #666;
}

/* 动画 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* 滚动条样式 */
.sidebar-content::-webkit-scrollbar,
.content-area::-webkit-scrollbar,
.at-panel::-webkit-scrollbar {
  width: 6px;
}

.sidebar-content::-webkit-scrollbar-thumb,
.content-area::-webkit-scrollbar-thumb,
.at-panel::-webkit-scrollbar-thumb {
  background: #d9d9d9;
  border-radius: 3px;
}

.sidebar-content::-webkit-scrollbar-thumb:hover,
.content-area::-webkit-scrollbar-thumb:hover,
.at-panel::-webkit-scrollbar-thumb:hover {
  background: #bfbfbf;
}

/* 响应式调整 */
@media (max-width: 1400px) {
  .scene-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1200px) {
  .scene-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .market-card-desc {
    -webkit-line-clamp: 1;
  }
}

@media (max-width: 768px) {
  .scene-cards {
    grid-template-columns: 1fr;
  }

  .recommend-grid {
    grid-template-columns: 1fr;
  }

  .market-search {
    flex-direction: column;
  }

  .search-input {
    width: 100%;
  }
}
</style>
