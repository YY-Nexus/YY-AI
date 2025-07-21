"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SmartChatDialog } from "@/components/smart-chat-dialog"
import {
  Brain,
  ImageIcon,
  Video,
  Music,
  MessageSquare,
  Zap,
  Users,
  Star,
  ArrowRight,
  Sparkles,
  Shield,
  Cloud,
  ChevronRight,
  Play,
  Calendar,
  Check,
  Tag,
  Book,
} from "lucide-react"
import { ImprovedPageLayout } from "@/components/improved-page-layout"

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const features = [
    {
      icon: Brain,
      title: "智能引擎",
      description: "强大的AI核心，支持多模态理解与生成",
      href: "/engine",
      color: "from-purple-500 to-blue-500",
      stats: "99.9% 准确率",
    },
    {
      icon: ImageIcon,
      title: "图像生成",
      description: "AI驱动的图像创作与编辑工具",
      href: "/image",
      color: "from-pink-500 to-rose-500",
      stats: "10M+ 图片生成",
    },
    {
      icon: Video,
      title: "视频创作",
      description: "智能视频生成与后期处理",
      href: "/video",
      color: "from-orange-500 to-red-500",
      stats: "4K 高清输出",
    },
    {
      icon: Music,
      title: "音乐制作",
      description: "AI音乐创作与音频处理",
      href: "/music",
      color: "from-green-500 to-emerald-500",
      stats: "专业级音质",
    },
  ]

  const stats = [
    { label: "活跃用户", value: "1M+", icon: Users },
    { label: "AI模型", value: "50+", icon: Brain },
    { label: "处理请求", value: "100M+", icon: Zap },
    { label: "满意度", value: "98%", icon: Star },
  ]

  const testimonials = [
    {
      name: "张明",
      role: "创意总监",
      company: "数字艺术工作室",
      content: "YYC³平台彻底改变了我们的创作流程，AI助手的智能程度令人惊叹。",
      avatar: "/placeholder.svg?height=40&width=40&text=张明",
      rating: 5,
    },
    {
      name: "李华",
      role: "产品经理",
      company: "科技创新公司",
      content: "从概念到实现，YYC³帮助我们快速原型化想法，大大提升了工作效率。",
      avatar: "/placeholder.svg?height=40&width=40&text=李华",
      rating: 5,
    },
    {
      name: "王芳",
      role: "独立开发者",
      company: "自由职业",
      content: "作为个人开发者，YYC³让我能够独立完成以前需要团队才能做的项目。",
      avatar: "/placeholder.svg?height=40&width=40&text=王芳",
      rating: 5,
    },
  ]

  const recentUpdates = [
    {
      title: "YYC³ Music 2.0 发布",
      description: "全新的音乐生成算法，支持更多音乐风格",
      date: "2024年1月15日",
      type: "功能更新",
      badge: "新功能",
    },
    {
      title: "智能引擎性能优化",
      description: "响应速度提升50%，准确率达到99.9%",
      date: "2024年1月10日",
      type: "性能优化",
      badge: "优化",
    },
    {
      title: "多语言支持扩展",
      description: "新增支持15种语言的AI对话功能",
      date: "2024年1月5日",
      type: "功能扩展",
      badge: "扩展",
    },
  ]

  return (
    <ImprovedPageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80" />

        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                <Sparkles className="w-3 h-3 mr-1" />
                AI驱动的创作平台
              </Badge>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              YYC³ AI平台
            </h1>

            <p className="text-xl lg:text-2xl mb-4 text-blue-100">深栈智能，万象归元</p>

            <p className="text-lg mb-8 text-blue-200 max-w-2xl mx-auto leading-relaxed">
              融合前沿AI技术，打造全方位智能创作生态。从概念到实现，从创意到产品，让每一个想法都能成为现实。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                onClick={() => setIsChatOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                开始对话
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full backdrop-blur-sm bg-transparent"
              >
                <Play className="w-5 h-5 mr-2" />
                观看演示
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-blue-300" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">核心功能</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              四大核心模块，覆盖创作全流程，让AI成为您最得力的创作伙伴
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {feature.stats}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600 hover:text-purple-700 p-0"
                      onClick={() => (window.location.href = feature.href)}
                    >
                      探索 <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">技术架构</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">基于最新AI技术栈，构建稳定可靠的智能服务平台</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">AI核心引擎</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    大语言模型 (LLM)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    多模态理解
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    深度学习框架
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    实时推理优化
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">云端基础设施</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    弹性计算集群
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    分布式存储
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    负载均衡
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    自动扩缩容
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">安全与隐私</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    端到端加密
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    数据隐私保护
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    访问控制
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    合规认证
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">用户评价</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">来自全球用户的真实反馈，见证YYC³的卓越表现</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">
                        {testimonial.role} · {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">最新动态</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">持续创新，不断进步，为您带来更好的AI体验</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {recentUpdates.map((update, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{update.title}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {update.badge}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3 leading-relaxed">{update.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {update.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            {update.type}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                        查看详情 <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">准备开始您的AI创作之旅？</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">加入数百万用户的行列，体验前所未有的AI创作体验</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setIsChatOpen(true)}
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              立即开始
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full backdrop-blur-sm bg-transparent"
            >
              <Book className="w-5 h-5 mr-2" />
              了解更多
            </Button>
          </div>
        </div>
      </section>

      {/* Smart Chat Dialog */}
      <SmartChatDialog open={isChatOpen} onOpenChange={setIsChatOpen} />
    </ImprovedPageLayout>
  )
}
