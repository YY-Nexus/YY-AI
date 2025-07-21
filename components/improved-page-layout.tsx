"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Brain,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Play,
  Volume2,
  Share2,
  MoreHorizontal,
  MessageSquare,
  Sparkles,
  Cpu,
  Database,
  ImageIcon,
  Video,
  Music,
  FileText,
  Code,
  Palette,
  GraduationCap,
  Stethoscope,
  Activity,
  Languages,
  MessageCircle,
  Globe2,
  Home,
  Thermometer,
  Wifi,
  Sun,
  Moon,
  LogOut,
  User,
  CreditCardIcon as CardIcon,
  Clock,
  Plus,
  Save,
  Book,
  StepForwardIcon as Progress,
  BoxIcon as Button,
  ArrowRightIcon as Right,
  PiIcon as Ph,
  LightbulbIcon as Light,
  MountainSnowIcon as Ski,
} from "lucide-react"
import { SmartChatDialog } from "@/components/smart-chat-dialog"
import { LoginDialog } from "@/components/auth/login-dialog"
import { NotificationPanel } from "@/components/notification-panel"

export function ImprovedPageLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
    setIsLoginOpen(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${isDarkMode ? "dark" : ""}`}
    >
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo 和标题 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  YYC³ AI Platform
                </h1>
                <p className="text-xs text-gray-500">深栈智能，万象归元</p>
              </div>
            </div>
          </div>

          {/* 中间导航 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <Home className="w-4 h-4 mr-2" />
              首页
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <Cpu className="w-4 h-4 mr-2" />
              智能引擎
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <ImageIcon className="w-4 h-4 mr-2" />
              图像生成
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <Video className="w-4 h-4 mr-2" />
              视频创作
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <Music className="w-4 h-4 mr-2" />
              音乐制作
            </Button>
          </nav>

          {/* 右侧操作区 */}
          <div className="flex items-center space-x-2">
            {/* 搜索按钮 */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Search className="w-4 h-4" />
            </Button>

            {/* 通知按钮 */}
            <Button variant="ghost" size="sm" onClick={() => setIsNotificationOpen(true)} className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* 主题切换 */}
            <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* 用户菜单 */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                    <User className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">用户名</p>
                      <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>个人资料</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CardIcon className="mr-2 h-4 w-4" />
                    <span>账单</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>设置</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>退出登录</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => setIsLoginOpen(true)} size="sm">
                登录
              </Button>
            )}

            {/* 移动端菜单按钮 */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="container py-4 space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="w-4 h-4 mr-2" />
                首页
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Cpu className="w-4 h-4 mr-2" />
                智能引擎
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <ImageIcon className="w-4 h-4 mr-2" />
                图像生成
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Video className="w-4 h-4 mr-2" />
                视频创作
              </Button>
              <Button variant="ghost" className="w-4 h-4 mr-2">
                音乐制作
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* 主要内容区域 */}
      <main className="container mx-auto px-4 py-8">
        {/* 欢迎横幅 */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-8 text-white mb-8">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI 驱动
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <Zap className="w-3 h-3 mr-1" />
                    实时响应
                  </Badge>
                </div>
                <h2 className="text-4xl font-bold">欢迎来到 YYC³ AI 平台</h2>
                <p className="text-xl text-white/90 max-w-2xl">
                  深栈智能技术，万象归元创新。体验下一代人工智能助手，让创意无界，让智慧无限。
                </p>
                <div className="flex items-center space-x-4 pt-4">
                  <Button
                    onClick={() => setIsChatOpen(true)}
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-white/90"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    开始对话
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    观看演示
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-64 h-64 relative">
                  <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="absolute inset-4 bg-white/20 rounded-full animate-ping"></div>
                  <div className="absolute inset-8 bg-white/30 rounded-full flex items-center justify-center">
                    <Brain className="w-32 h-32 text-white/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-transparent"></div>
        </div>

        {/* 功能标签页 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="engine">智能引擎</TabsTrigger>
            <TabsTrigger value="image">图像生成</TabsTrigger>
            <TabsTrigger value="video">视频创作</TabsTrigger>
            <TabsTrigger value="music">音乐制作</TabsTrigger>
            <TabsTrigger value="more">更多功能</TabsTrigger>
          </TabsList>

          {/* 概览标签页 */}
          <TabsContent value="overview" className="space-y-6">
            {/* 统计卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">总用户数</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234,567</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12.5%</span> 较上月
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI 对话次数</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8,901,234</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+23.1%</span> 较上月
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">生成内容数</CardTitle>
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">456,789</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+18.7%</span> 较上月
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">系统响应时间</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0.8s</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">-15.2%</span> 较上月
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 功能特性网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Brain className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">智能对话</CardTitle>
                      <CardDescription>多轮对话，上下文理解</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    基于大语言模型的智能对话系统，支持多轮对话、上下文理解、情感分析等高级功能。
                  </p>
                  <Button className="w-full" onClick={() => setIsChatOpen(true)}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    开始对话
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">图像生成</CardTitle>
                      <CardDescription>AI 驱动的图像创作</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    使用先进的扩散模型技术，根据文本描述生成高质量的图像作品。
                  </p>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Palette className="w-4 h-4 mr-2" />
                    创作图像
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Video className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">视频创作</CardTitle>
                      <CardDescription>智能视频生成与编辑</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    AI 辅助的视频创作工具，支持自动剪辑、特效添加、字幕生成等功能。
                  </p>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Video className="w-4 h-4 mr-2" />
                    制作视频
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Music className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">音乐制作</CardTitle>
                      <CardDescription>AI 音乐创作助手</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    智能音乐创作工具，支持旋律生成、和声编配、节奏制作等功能。
                  </p>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Music className="w-4 h-4 mr-2" />
                    创作音乐
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">文档处理</CardTitle>
                      <CardDescription>智能文档分析与生成</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    AI 驱动的文档处理工具，支持文档摘要、翻译、格式转换等功能。
                  </p>
                  <Button className="w-full bg-transparent" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    处理文档
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Code className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">代码助手</CardTitle>
                      <CardDescription>AI 编程辅助工具</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">智能代码生成、调试、优化工具，支持多种编程语言和框架。</p>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Code className="w-4 h-4 mr-2" />
                    编程助手
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 智能引擎标签页 */}
          <TabsContent value="engine" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cpu className="w-5 h-5" />
                    <span>模型性能监控</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>GPU 使用率</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>内存使用率</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>推理速度</span>
                      <span>1.2s/token</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5" />
                    <span>模型库</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {[
                        { name: "GPT-4 Turbo", status: "运行中", usage: "高" },
                        { name: "Claude-3 Opus", status: "待机", usage: "中" },
                        { name: "Gemini Pro", status: "运行中", usage: "低" },
                        { name: "LLaMA-2 70B", status: "维护中", usage: "无" },
                        { name: "Mistral 7B", status: "运行中", usage: "中" },
                      ].map((model, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{model.name}</p>
                            <p className="text-sm text-gray-500">使用率: {model.usage}</p>
                          </div>
                          <Badge
                            variant={
                              model.status === "运行中"
                                ? "default"
                                : model.status === "待机"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {model.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>实时性能指标</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">99.9%</div>
                    <p className="text-sm text-gray-500">系统可用性</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">0.8s</div>
                    <p className="text-sm text-gray-500">平均响应时间</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">1.2M</div>
                    <p className="text-sm text-gray-500">日处理请求</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 图像生成标签页 */}
          <TabsContent value="image" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>图像生成工作台</CardTitle>
                    <CardDescription>使用 AI 创作精美图像</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        </div>
                      ))}
                    </div>
                    <Button className="w-full">
                      <Palette className="w-4 h-4 mr-2" />
                      生成新图像
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">生成设置</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">图像尺寸</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>1024x1024</option>
                        <option>1024x768</option>
                        <option>768x1024</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">艺术风格</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>写实主义</option>
                        <option>印象派</option>
                        <option>抽象艺术</option>
                        <option>动漫风格</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">质量等级</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>标准</option>
                        <option>高质量</option>
                        <option>超高质量</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">最近生成</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* 视频创作标签页 */}
          <TabsContent value="video" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>视频项目</CardTitle>
                  <CardDescription>管理您的视频创作项目</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "产品介绍视频", duration: "2:30", status: "渲染中" },
                      { name: "教程演示", duration: "5:45", status: "已完成" },
                      { name: "品牌宣传片", duration: "1:20", status: "编辑中" },
                    ].map((project, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                            <Video className="w-4 h-4 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium">{project.name}</p>
                            <p className="text-sm text-gray-500">时长: {project.duration}</p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            project.status === "已完成"
                              ? "default"
                              : project.status === "编辑中"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    新建项目
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>视频模板</CardTitle>
                  <CardDescription>选择预设模板快速开始</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {["产品展示", "教育培训", "社交媒体", "企业宣传", "活动记录", "个人 Vlog"].map(
                      (template, index) => (
                        <div
                          key={index}
                          className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                        >
                          <div className="text-center">
                            <Video className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                            <p className="text-sm font-medium">{template}</p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 音乐制作标签页 */}
          <TabsContent value="music" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>音乐工作站</CardTitle>
                    <CardDescription>AI 辅助音乐创作</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* 播放器界面 */}
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">当前作品</h3>
                          <p className="text-sm text-gray-600">未命名作品 #1</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-center space-x-4 mb-4">
                        <Button size="sm" variant="outline">
                          <SkipForward className="w-4 h-4 rotate-180" />
                        </Button>
                        <Button size="lg" className="rounded-full">
                          <Play className="w-6 h-6" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <SkipForward className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>0:00</span>
                          <span>3:24</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                    </div>

                    {/* 音轨列表 */}
                    <div className="space-y-3">
                      <h4 className="font-medium">音轨</h4>
                      {[
                        { name: "主旋律", instrument: "钢琴", volume: 80 },
                        { name: "和声", instrument: "弦乐", volume: 60 },
                        { name: "节奏", instrument: "鼓组", volume: 70 },
                        { name: "贝斯", instrument: "电贝斯", volume: 65 },
                      ].map((track, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{track.name}</p>
                            <p className="text-sm text-gray-500">{track.instrument}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Volume2 className="w-4 h-4 text-gray-400" />
                            <div className="w-20">
                              <Progress value={track.volume} className="h-1" />
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      添加音轨
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">AI 生成</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">音乐风格</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>流行音乐</option>
                        <option>古典音乐</option>
                        <option>爵士乐</option>
                        <option>电子音乐</option>
                        <option>摇滚乐</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">情绪</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>快乐</option>
                        <option>忧伤</option>
                        <option>激昂</option>
                        <option>平静</option>
                        <option>神秘</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">节拍 (BPM)</label>
                      <input type="range" min="60" max="180" defaultValue="120" className="w-full" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>60</span>
                        <span>120</span>
                        <span>180</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Sparkles className="w-4 h-4 mr-2" />
                      生成音乐
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">乐器库</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {["钢琴", "吉他", "小提琴", "鼓组", "贝斯", "长笛", "萨克斯", "合成器"].map(
                        (instrument, index) => (
                          <Button key={index} variant="outline" size="sm" className="text-xs bg-transparent">
                            {instrument}
                          </Button>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">最近作品</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {["夏日回忆", "城市夜景", "森林漫步"].map((title, index) => (
                        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <Music className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{title}</span>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Play className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* 更多功能标签页 */}
          <TabsContent value="more" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 智慧医疗 */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">智慧医疗</CardTitle>
                      <CardDescription>AI 健康助手</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">智能健康监测、疾病预测、用药提醒等医疗健康服务。</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>健康评分</span>
                      <span className="text-green-600">85/100</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    <Activity className="w-4 h-4 mr-2" />
                    健康检测
                  </Button>
                </CardContent>
              </Card>

              {/* 言语翻译 */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Languages className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">言语翻译</CardTitle>
                      <CardDescription>多语言智能翻译</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">支持100+语言的实时翻译，语音翻译，文档翻译等功能。</p>
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge variant="secondary">中文</Badge>
                    <ArrowRight className="w-4 h-4" />
                    <Badge variant="secondary">English</Badge>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Globe2 className="w-4 h-4 mr-2" />
                    开始翻译
                  </Button>
                </CardContent>
              </Card>

              {/* 万象社区 */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">万象社区</CardTitle>
                      <CardDescription>创作者交流平台</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">与全球创作者分享作品、交流经验、获得灵感的社区平台。</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold">1.2M</div>
                      <div className="text-xs text-gray-500">用户</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">50K</div>
                      <div className="text-xs text-gray-500">作品</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">500</div>
                      <div className="text-xs text-gray-500">在线</div>
                    </div>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    加入社区
                  </Button>
                </CardContent>
              </Card>

              {/* 智慧云呼 */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">智慧云呼</CardTitle>
                      <CardDescription>AI 通讯服务</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">智能语音通话、视频会议、AI 客服等通讯解决方案。</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>通话质量</span>
                      <span className="text-green-600">优秀</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>延迟</span>
                      <span>&lt; 50ms</span>
                    </div>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    发起通话
                  </Button>
                </CardContent>
              </Card>

              {/* 智能家居 */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Home className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">智能家居</CardTitle>
                      <CardDescription>家庭自动化控制</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">智能设备控制、环境监测、安全防护等家居智能化服务。</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Thermometer className="w-4 h-4 text-blue-500" />
                      <span>22°C</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                      <span>3/8 开启</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>安全</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Wifi className="w-4 h-4 text-blue-500" />
                      <span>已连接</span>
                    </div>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    设备控制
                  </Button>
                </CardContent>
              </Card>

              {/* 教育培训 */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">教育培训</CardTitle>
                      <CardDescription>AI 个性化学习</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">个性化学习路径、智能题库、学习进度跟踪等教育服务。</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>学习进度</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>已完成 15/20 课程</span>
                      <span>剩余 5 课程</span>
                    </div>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Book className="w-4 h-4 mr-2" />
                    继续学习
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* 底部状态栏 */}
        <div className="mt-12 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">系统运行正常</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{currentTime.toLocaleString("zh-CN")}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">1,234 在线用户</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">响应时间: 0.8s</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 浮动操作按钮 */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsChatOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </div>

      {/* 对话框组件 */}
      <SmartChatDialog open={isChatOpen} onOpenChange={setIsChatOpen} />
      <LoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} onLogin={handleLogin} />
      <NotificationPanel open={isNotificationOpen} onOpenChange={setIsNotificationOpen} />
    </div>
  )
}
