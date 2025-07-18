"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, Send, Upload, MicOff, Loader2, Lightbulb, Search } from "lucide-react"
import { LogoIcon } from "@/components/ui/logo"

interface SmartChatDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  isTyping?: boolean
}

export function SmartChatDialog({ open, onOpenChange }: SmartChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const [aiStatus, setAiStatus] = useState<"idle" | "thinking" | "responding">("idle")
  const [sendingAnimation, setSendingAnimation] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 搜索功能
  useEffect(() => {
    if (!searchValue.trim()) {
      setFilteredMessages(messages)
    } else {
      const filtered = messages.filter((message) => message.content.toLowerCase().includes(searchValue.toLowerCase()))
      setFilteredMessages(filtered)
    }
  }, [messages, searchValue])

  // 打字机效果
  const typeWriter = (text: string, callback?: () => void) => {
    let index = 0
    setTypingText("")
    setAiStatus("responding")

    const timer = setInterval(() => {
      if (index < text.length) {
        setTypingText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
        setAiStatus("idle")
        callback?.()
      }
    }, 50)

    return timer
  }

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [filteredMessages, typingText])

  // 初始化欢迎消息
  useEffect(() => {
    if (open && messages.length === 0) {
      const welcomeText = `"云枢"二字蕴含深意，智慧二字如红灯笼，当"言"成为破局算法，"语"便成了未来接口——我们拆解传统数据，用0与1重构内容维度。此刻对机，便是文明升级的总枢纽。

欢迎使用YYC³ AI助手，我可以帮您完成各种创作任务。请告诉我您想要做什么？`

      setAiStatus("responding")
      const timer = typeWriter(welcomeText, () => {
        setMessages([
          {
            id: "welcome",
            type: "assistant",
            content: welcomeText,
            timestamp: new Date(),
          },
        ])
        setTypingText("")
      })

      return () => clearInterval(timer)
    }
  }, [open, messages.length])

  // 发送消息
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    // 发送动效
    setSendingAnimation(true)
    setTimeout(() => setSendingAnimation(false), 800)

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsProcessing(true)
    setAiStatus("thinking")

    // 模拟AI响应
    setTimeout(() => {
      const responseText = generateAIResponse(inputValue)

      const timer = typeWriter(responseText, () => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: responseText,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiResponse])
        setTypingText("")
        setIsProcessing(false)
      })

      return () => clearInterval(timer)
    }, 1000)
  }

  // 生成AI响应
  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("图") || lowerInput.includes("画") || lowerInput.includes("设计")) {
      return "我可以帮您生成各种风格的图片！请描述您想要的图片内容，比如风格、主题、色彩等，我会为您创作出精美的作品。您也可以直接前往相关模块进行详细设置。"
    } else if (lowerInput.includes("翻译") || lowerInput.includes("语言")) {
      return "言语翻译是我的专长！我支持多种语言之间的智能翻译，不仅能准确传达意思，还能保持语言的文化内涵和表达习惯。请告诉我您需要翻译什么内容。"
    } else if (lowerInput.includes("医疗") || lowerInput.includes("健康")) {
      return "云枢医疗系统可以为您提供智能健康咨询和医疗信息服务。我可以帮您分析健康数据、提供医疗建议、解答健康疑问。请注意，我的建议仅供参考，具体诊疗请咨询专业医生。"
    } else if (lowerInput.includes("社区") || lowerInput.includes("交流")) {
      return "万象社区是一个充满创意和智慧的交流平台！在这里，您可以与其他用户分享创作、交流想法、获得灵感。我可以帮您连接到相关的社区功能和讨论话题。"
    } else if (lowerInput.includes("云呼") || lowerInput.includes("通讯")) {
      return "智慧云呼系统提供智能通讯服务，包括语音通话、视频会议、智能客服等功能。我可以帮您建立高效的沟通渠道，提升交流体验。"
    } else if (lowerInput.includes("云枢") || lowerInput.includes("概念")) {
      return `"云枢"是YYC³平台的核心理念，代表着万象归元的智能中枢。在这里，所有的数据、算法、创意都汇聚成一个统一的智能体系。

云枢不仅是技术架构的核心，更是思维模式的革新——它将分散的智能服务整合为一个有机整体，让每一次交互都成为智慧升级的契机。

通过云枢，我们实现了从传统工具到智能伙伴的跨越，让AI不再是冰冷的程序，而是理解您需求、激发您创意的智慧助手。`
    } else {
      return "感谢您的提问！我是YYC³云枢智能助手，可以帮您完成各种任务：智慧云呼通讯服务、云枢医疗健康咨询、言语翻译多语言服务、万象社区创意交流等。请具体告诉我您想要做什么，我会为您提供最合适的解决方案。"
    }
  }

  // 语音识别
  const toggleVoiceRecognition = () => {
    setIsListening(!isListening)
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false)
        setInputValue("语音识别功能开发中...")
      }, 3000)
    }
  }

  // 文件上传
  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  // 清空搜索
  const clearSearch = () => {
    setSearchValue("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[85vh] bg-white/95 backdrop-blur-xl border border-white/20 p-0 overflow-hidden rounded-3xl flex flex-col">
        <style jsx>{`
          @keyframes statusBreathing {
            0% {
              opacity: 0.6;
              background-color: #646cff;
            }
            50% {
              opacity: 1;
              background-color: #ffffff;
            }
            100% {
              opacity: 0.6;
              background-color: #646cff;
            }
          }

          @keyframes focusGlow {
            0% {
              border-color: #e5e7eb;
              box-shadow: 0 0 0 0 rgba(199, 125, 255, 0);
            }
            100% {
              border-color: #c77dff;
              box-shadow: 0 0 0 3px rgba(199, 125, 255, 0.1);
            }
          }

          @keyframes sendButtonFloat {
            0% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-2px) scale(1.05);
            }
            100% {
              transform: translateY(0) scale(1);
            }
          }

          @keyframes sendingCapsule {
            0% {
              transform: translateX(0) scale(1);
              opacity: 1;
            }
            50% {
              transform: translateX(20px) scale(0.8);
              opacity: 0.7;
            }
            100% {
              transform: translateX(40px) scale(0.3);
              opacity: 0;
            }
          }

          @keyframes progressBar {
            0% {
              width: 0%;
            }
            100% {
              width: 100%;
            }
          }

          .status-indicator {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #646cff;
          }

          .status-thinking {
            animation: statusBreathing 1s ease-in-out infinite;
          }

          .status-idle {
            background-color: #646cff;
            opacity: 0.8;
          }

          .input-focused {
            animation: focusGlow 0.3s ease-out forwards;
            background: linear-gradient(90deg, #c77dff 0%, #646cff 100%);
            background-clip: border-box;
          }

          .send-button-active {
            animation: sendButtonFloat 0.5s ease-in-out;
          }

          .sending-animation {
            animation: sendingCapsule 0.8s ease-out forwards;
          }

          .progress-bar {
            height: 2px;
            background: linear-gradient(90deg, #c77dff 0%, #646cff 100%);
            animation: progressBar 2s ease-in-out;
          }

          .typing-placeholder {
            color: #9ca3af;
            font-style: italic;
          }
        `}</style>

        {/* 固定头部区域 - 标题栏 */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white/95 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <LogoIcon size="sm" />
            </div>
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">YYC³ 云枢智能助手</h2>
                <p className="text-gray-600 text-sm">深栈智能，万象归元</p>
              </div>
              {/* 智能状态呼吸灯 */}
              <div
                className={`status-indicator ${
                  aiStatus === "thinking" || aiStatus === "responding" ? "status-thinking" : "status-idle"
                }`}
              />
            </div>
          </div>

          {/* 搜索栏放在标题右侧 */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="搜索聊天记录..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-500 rounded-full text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {searchValue && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600 rounded-full"
                >
                  ×
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 固定功能按钮区域 */}
        <div className="flex-shrink-0 flex items-center justify-center gap-4 px-6 py-3 border-b border-gray-100 bg-white/95 backdrop-blur-xl">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100 rounded-full px-4 py-2">
            <Lightbulb className="w-4 h-4 mr-2" />
            灵感查看
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100 rounded-full px-4 py-2">
            <Search className="w-4 h-4 mr-2" />
            智问搜索
          </Button>
        </div>

        {/* 可滚动的消息区域 */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* 搜索结果提示 */}
          {searchValue && (
            <div className="flex-shrink-0 px-6 py-2 bg-blue-50 border-b border-blue-100">
              <p className="text-sm text-blue-600">
                {filteredMessages.length > 0
                  ? `找到 ${filteredMessages.length} 条包含"${searchValue}"的消息`
                  : `未找到包含"${searchValue}"的消息`}
              </p>
            </div>
          )}

          {/* 数据传输提示 */}
          {sendingAnimation && (
            <div className="flex-shrink-0 px-6 py-2 bg-purple-50 border-b border-purple-100">
              <div className="flex items-center gap-2">
                <div className="progress-bar rounded-full"></div>
                <span className="text-sm text-purple-600">数据传输中...</span>
              </div>
            </div>
          )}

          {/* 消息列表 - 独立滚动区域 */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-6">
                {/* 打字机效果显示区域 */}
                {typingText && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-4 rounded-2xl bg-gray-100 text-gray-800 border border-gray-200 relative">
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {typingText}
                        <span className="inline-block w-2 h-5 bg-gray-400 ml-1 animate-pulse"></span>
                      </p>
                      {/* 进度光条 */}
                      {aiStatus === "responding" && (
                        <div className="absolute right-2 top-2 w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className="progress-bar rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {filteredMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                          : "bg-gray-100 text-gray-800 border border-gray-200"
                      } ${
                        searchValue && message.content.toLowerCase().includes(searchValue.toLowerCase())
                          ? "ring-2 ring-yellow-300 bg-yellow-50"
                          : ""
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {searchValue && message.content.toLowerCase().includes(searchValue.toLowerCase()) ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: message.content.replace(
                                new RegExp(`(${searchValue})`, "gi"),
                                '<mark class="bg-yellow-200 px-1 rounded">$1</mark>',
                              ),
                            }}
                          />
                        ) : (
                          message.content
                        )}
                      </p>
                      <p className={`text-xs mt-2 ${message.type === "user" ? "text-white/70" : "text-gray-500"}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}

                {/* AI处理中指示器 */}
                {isProcessing && !typingText && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 border border-gray-200 p-4 rounded-2xl relative">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                        <span className="text-sm typing-placeholder">▌▌▌ 正在构建创意矩阵...</span>
                      </div>
                      {/* 进度光条 */}
                      <div className="absolute right-2 top-2 w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className="progress-bar rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* 固定底部输入区域 */}
        <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-white/95 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="输入您想要的任何内容..."
                className={`bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-500 rounded-full py-3 px-4 pr-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                  isFocused ? "input-focused" : ""
                } ${sendingAnimation ? "sending-animation" : ""}`}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={isProcessing}
              />
              <Button
                size="sm"
                variant="ghost"
                className={`absolute right-1 top-1 h-8 w-8 p-0 rounded-full transition-all duration-300 ${
                  isListening ? "text-red-500 bg-red-50" : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={toggleVoiceRecognition}
                disabled={isProcessing}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleFileUpload}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-3 transition-all duration-300"
              disabled={isProcessing}
            >
              <Upload className="w-4 h-4" />
            </Button>

            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isProcessing}
              className={`bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full p-3 transition-all duration-300 ${
                isFocused && inputValue.trim() ? "send-button-active" : ""
              }`}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 隐藏的文件输入 */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              setInputValue(`已上传文件：${file.name}，请告诉我需要如何处理？`)
            }
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
