"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Mic,
  Send,
  Upload,
  MicOff,
  Loader2,
  Lightbulb,
  Search,
  X,
  Volume2,
  AlertCircle,
  Settings,
  Play,
  RotateCcw,
  Square,
  Trash2,
} from "lucide-react"

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

interface VoiceSettings {
  rate: number
  pitch: number
  volume: number
  voice: string
}

interface CustomVoice {
  id: string
  name: string
  audioBlob: Blob
  duration: number
}

export function SmartChatDialog({ open, onOpenChange }: SmartChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechRecognition, setSpeechRecognition] = useState<any>(null)
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [speechError, setSpeechError] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const [aiStatus, setAiStatus] = useState<"idle" | "thinking" | "responding">("idle")
  const [sendingAnimation, setSendingAnimation] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [showVoiceSettings, setShowVoiceSettings] = useState(false)
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    rate: 1.0,
    pitch: 1.0,
    volume: 0.8,
    voice: "default",
  })
  const [isRecordingCustomVoice, setIsRecordingCustomVoice] = useState(false)
  const [customVoices, setCustomVoices] = useState<CustomVoice[]>([])
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])
  const [isPlayingPreview, setIsPlayingPreview] = useState(false)
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null)

  const speedPresets = [
    { label: "慢速", value: 0.7 },
    { label: "常规", value: 1.0 },
    { label: "快速", value: 1.3 },
    { label: "极快", value: 1.6 },
  ]

  useEffect(() => {
    if (!searchValue.trim()) {
      setFilteredMessages(messages)
    } else {
      const filtered = messages.filter((message) => message.content.toLowerCase().includes(searchValue.toLowerCase()))
      setFilteredMessages(filtered)
    }
  }, [messages, searchValue])

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
        setTimeout(() => speakText(text), 500)
        callback?.()
      }
    }, 50)

    return timer
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [filteredMessages, typingText])

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

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setSendingAnimation(true)
    setTimeout(() => setSendingAnimation(false), 800)

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsProcessing(true)
    setAiStatus("thinking")

    setTimeout(() => {
      const responseText = generateAIResponse(currentInput)

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

  const checkNetworkStatus = (): boolean => {
    return navigator.onLine
  }

  const getErrorMessage = (error: string): string => {
    switch (error) {
      case "network":
        return "网络连接问题，请检查网络后重试"
      case "not-allowed":
        return "麦克风权限被拒绝，请在浏览器设置中允许麦克风访问"
      case "no-speech":
        return "未检测到语音，请重新尝试"
      case "audio-capture":
        return "麦克风无法访问，请检查设备连接"
      case "service-not-allowed":
        return "语音服务不可用"
      case "language-not-supported":
        return "不支持当前语言"
      default:
        return "语音识别出现问题，请重试"
    }
  }

  useEffect(() => {
    const checkSpeechSupport = () => {
      const recognition = "webkitSpeechRecognition" in window || "SpeechRecognition" in window
      const synthesis = "speechSynthesis" in window
      setSpeechSupported(recognition && synthesis)

      if (recognition) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        const recognitionInstance = new SpeechRecognition()

        recognitionInstance.continuous = false
        recognitionInstance.interimResults = true
        recognitionInstance.lang = "zh-CN"
        recognitionInstance.maxAlternatives = 1

        recognitionInstance.onstart = () => {
          setIsListening(true)
          setSpeechError("")
          console.log("语音识别开始")
        }

        recognitionInstance.onresult = (event: any) => {
          let finalTranscript = ""
          let interimTranscript = ""

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript
            } else {
              interimTranscript += transcript
            }
          }

          if (finalTranscript) {
            setInputValue(finalTranscript)
            setRetryCount(0)
          }
        }

        recognitionInstance.onerror = (event: any) => {
          console.error("语音识别错误:", event.error, event.message)
          setIsListening(false)

          const errorMsg = getErrorMessage(event.error)
          setSpeechError(errorMsg)

          if (event.error === "network" && retryCount < 2) {
            setTimeout(() => {
              if (checkNetworkStatus()) {
                setRetryCount((prev) => prev + 1)
                setSpeechError("网络重连中，正在重试...")
              }
            }, 2000)
          }
        }

        recognitionInstance.onend = () => {
          setIsListening(false)
          console.log("语音识别结束")
        }

        recognitionInstance.onnomatch = () => {
          setSpeechError("未识别到有效语音，请重新尝试")
          setIsListening(false)
        }

        setSpeechRecognition(recognitionInstance)
      }

      if (synthesis) {
        setSpeechSynthesis(window.speechSynthesis)

        const loadVoices = () => {
          const availableVoices = window.speechSynthesis.getVoices()
          setVoices(availableVoices)

          const chineseVoice = availableVoices.find(
            (voice) => voice.lang.includes("zh") || voice.lang.includes("CN") || voice.name.includes("Chinese"),
          )
          setSelectedVoice(chineseVoice || availableVoices[0])

          if (chineseVoice || availableVoices[0]) {
            setVoiceSettings((prev) => ({
              ...prev,
              voice: (chineseVoice || availableVoices[0]).name,
            }))
          }
        }

        setTimeout(loadVoices, 100)
        window.speechSynthesis.onvoiceschanged = loadVoices
      }
    }

    if (open) {
      checkSpeechSupport()
    }
  }, [open, retryCount])

  const toggleVoiceRecognition = () => {
    if (!speechSupported || !speechRecognition) {
      setSpeechError("您的浏览器不支持语音识别功能，请使用Chrome、Edge或Safari浏览器")
      return
    }

    if (!checkNetworkStatus()) {
      setSpeechError("网络连接不可用，语音识别需要网络支持")
      return
    }

    if (isListening) {
      speechRecognition.stop()
      setIsListening(false)
      setSpeechError("")
    } else {
      try {
        setSpeechError("")
        speechRecognition.start()
      } catch (error) {
        console.error("启动语音识别失败:", error)
        setSpeechError("语音识别启动失败，请检查麦克风权限")
      }
    }
  }

  const speakText = (text: string) => {
    if (!speechSupported || !speechSynthesis || !selectedVoice) {
      console.warn("语音合成不可用")
      return
    }

    speechSynthesis.cancel()

    const maxLength = 200
    const textSegments = text.length > maxLength ? text.match(new RegExp(`.{1,${maxLength}}`, "g")) || [text] : [text]

    let currentSegment = 0

    const speakSegment = () => {
      if (currentSegment >= textSegments.length) {
        setIsSpeaking(false)
        return
      }

      const utterance = new SpeechSynthesisUtterance(textSegments[currentSegment])
      utterance.voice = selectedVoice
      utterance.rate = voiceSettings.rate
      utterance.pitch = voiceSettings.pitch
      utterance.volume = voiceSettings.volume

      utterance.onstart = () => {
        setIsSpeaking(true)
      }

      utterance.onend = () => {
        currentSegment++
        if (currentSegment < textSegments.length) {
          setTimeout(speakSegment, 100)
        } else {
          setIsSpeaking(false)
        }
      }

      utterance.onerror = (event) => {
        console.error("语音合成错误:", event.error)
        setIsSpeaking(false)
      }

      speechSynthesis.speak(utterance)
    }

    speakSegment()
  }

  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const startCustomVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)

      setMediaRecorder(recorder)
      setAudioChunks([])
      setRecordingDuration(0)
      setIsRecordingCustomVoice(true)

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks((prev) => [...prev, event.data])
        }
      }

      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop())
        setIsRecordingCustomVoice(false)
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current)
        }
      }

      recorder.start()

      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("录制失败:", error)
      setSpeechError("无法访问麦克风，请检查权限设置")
    }
  }

  const stopCustomVoiceRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop()
    }
  }

  const saveCustomVoice = (name: string) => {
    if (audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" })
      const customVoice: CustomVoice = {
        id: Date.now().toString(),
        name: name || `自定义语音 ${customVoices.length + 1}`,
        audioBlob,
        duration: recordingDuration,
      }

      setCustomVoices((prev) => [...prev, customVoice])
      setAudioChunks([])
      setRecordingDuration(0)
    }
  }

  const playCustomVoicePreview = (voice: CustomVoice) => {
    if (previewAudio) {
      previewAudio.pause()
      setPreviewAudio(null)
      setIsPlayingPreview(false)
    }

    const audio = new Audio(URL.createObjectURL(voice.audioBlob))
    setPreviewAudio(audio)
    setIsPlayingPreview(true)

    audio.onended = () => {
      setIsPlayingPreview(false)
      setPreviewAudio(null)
    }

    audio.play()
  }

  const deleteCustomVoice = (voiceId: string) => {
    setCustomVoices((prev) => prev.filter((voice) => voice.id !== voiceId))
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const clearSearch = () => {
    setSearchValue("")
  }

  const clearSpeechError = () => {
    setSpeechError("")
  }

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
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

          @keyframes recordingPulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.7;
            }
            100% {
              transform: scale(1);
              opacity: 1;
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

          .recording-pulse {
            animation: recordingPulse 1s ease-in-out infinite;
          }
        `}</style>

        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white/95 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-bold">YYC³</span>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">YYC³ 云枢智能助手</h2>
                <p className="text-gray-600 text-sm">深栈智能，万象归元</p>
              </div>
              <div
                className={`status-indicator ${
                  aiStatus === "thinking" || aiStatus === "responding" ? "status-thinking" : "status-idle"
                }`}
              />
              {isSpeaking && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={stopSpeaking}
                  className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full p-2 ml-2"
                  title="停止语音播放"
                >
                  <MicOff className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVoiceSettings(!showVoiceSettings)}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2"
              title="语音设置"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {showVoiceSettings && (
          <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 bg-gray-50/95 backdrop-blur-xl">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">语音设置</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">语音选择</Label>
                  <Select
                    value={voiceSettings.voice}
                    onValueChange={(value) => {
                      const voice = voices.find((v) => v.name === value)
                      if (voice) {
                        setSelectedVoice(voice)
                        setVoiceSettings((prev) => ({ ...prev, voice: value }))
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="选择语音" />
                    </SelectTrigger>
                    <SelectContent>
                      {voices
                        .filter((voice) => voice.lang.includes("zh") || voice.lang.includes("CN"))
                        .map((voice) => (
                          <SelectItem key={voice.name} value={voice.name}>
                            {voice.name} ({voice.lang})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">语速控制</Label>
                  <div className="flex gap-2 mb-2">
                    {speedPresets.map((preset) => (
                      <Button
                        key={preset.label}
                        variant={voiceSettings.rate === preset.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setVoiceSettings((prev) => ({ ...prev, rate: preset.value }))}
                        className="text-xs"
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>慢</span>
                      <span>当前: {voiceSettings.rate.toFixed(1)}x</span>
                      <span>快</span>
                    </div>
                    <Slider
                      value={[voiceSettings.rate]}
                      onValueChange={([value]) => setVoiceSettings((prev) => ({ ...prev, rate: value }))}
                      min={0.5}
                      max={2.0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">音调控制</Label>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>低</span>
                      <span>当前: {voiceSettings.pitch.toFixed(1)}</span>
                      <span>高</span>
                    </div>
                    <Slider
                      value={[voiceSettings.pitch]}
                      onValueChange={([value]) => setVoiceSettings((prev) => ({ ...prev, pitch: value }))}
                      min={0.5}
                      max={2.0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">音量控制</Label>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>小</span>
                      <span>当前: {Math.round(voiceSettings.volume * 100)}%</span>
                      <span>大</span>
                    </div>
                    <Slider
                      value={[voiceSettings.volume]}
                      onValueChange={([value]) => setVoiceSettings((prev) => ({ ...prev, volume: value }))}
                      min={0.1}
                      max={1.0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">自定义语音</Label>

                <div className="flex items-center gap-3">
                  {!isRecordingCustomVoice ? (
                    <Button
                      onClick={startCustomVoiceRecording}
                      className="bg-red-500 hover:bg-red-600 text-white"
                      size="sm"
                    >
                      <Mic className="w-4 h-4 mr-2" />
                      开始录制
                    </Button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={stopCustomVoiceRecording}
                        className="bg-red-500 hover:bg-red-600 text-white recording-pulse"
                        size="sm"
                      >
                        <Square className="w-4 h-4 mr-2" />
                        停止录制
                      </Button>
                      <span className="text-sm text-red-600 font-mono">{formatRecordingTime(recordingDuration)}</span>
                    </div>
                  )}

                  {audioChunks.length > 0 && !isRecordingCustomVoice && (
                    <Button onClick={() => saveCustomVoice("")} variant="outline" size="sm">
                      保存录音
                    </Button>
                  )}
                </div>

                {customVoices.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-600">已保存的语音</Label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {customVoices.map((voice) => (
                        <div key={voice.id} className="flex items-center justify-between p-2 bg-white rounded border">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{voice.name}</span>
                            <span className="text-xs text-gray-500">{formatRecordingTime(voice.duration)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              onClick={() => playCustomVoicePreview(voice)}
                              variant="ghost"
                              size="sm"
                              className="p-1 h-6 w-6"
                              disabled={isPlayingPreview}
                            >
                              <Play className="w-3 h-3" />
                            </Button>
                            <Button
                              onClick={() => deleteCustomVoice(voice.id)}
                              variant="ghost"
                              size="sm"
                              className="p-1 h-6 w-6 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => speakText("这是语音测试，您可以听到当前的语音设置效果。")}
                  variant="outline"
                  size="sm"
                  disabled={isSpeaking}
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  测试语音
                </Button>
                <Button
                  onClick={() =>
                    setVoiceSettings({ rate: 1.0, pitch: 1.0, volume: 0.8, voice: selectedVoice?.name || "default" })
                  }
                  variant="outline"
                  size="sm"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  重置设置
                </Button>
              </div>
            </div>
          </div>
        )}

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

        <div className="flex-1 flex flex-col min-h-0">
          {searchValue && (
            <div className="flex-shrink-0 px-6 py-2 bg-blue-50 border-b border-blue-100">
              <p className="text-sm text-blue-600">
                {filteredMessages.length > 0
                  ? `找到 ${filteredMessages.length} 条包含"${searchValue}"的消息`
                  : `未找到包含"${searchValue}"的消息`}
              </p>
            </div>
          )}

          {speechError && (
            <div className="flex-shrink-0 px-6 py-2 bg-red-50 border-b border-red-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-600">{speechError}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSpeechError}
                  className="text-red-600 hover:text-red-800 p-1 h-6 text-xs"
                >
                  关闭
                </Button>
              </div>
            </div>
          )}

          {sendingAnimation && (
            <div className="flex-shrink-0 px-6 py-2 bg-purple-50 border-b border-purple-100">
              <div className="flex items-center gap-2">
                <div className="progress-bar rounded-full"></div>
                <span className="text-sm text-purple-600">数据传输中...</span>
              </div>
            </div>
          )}

          {isListening && (
            <div className="flex-shrink-0 px-6 py-2 bg-green-50 border-b border-green-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600">正在录音中，请说话...</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleVoiceRecognition}
                  className="text-green-600 hover:text-green-800 p-1 h-6 text-xs ml-2"
                >
                  停止录音
                </Button>
              </div>
            </div>
          )}

          {isSpeaking && (
            <div className="flex-shrink-0 px-6 py-2 bg-blue-50 border-b border-blue-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-600">正在播放语音...</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={stopSpeaking}
                  className="text-blue-600 hover:text-blue-800 p-1 h-6 text-xs ml-2"
                >
                  停止播放
                </Button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-6">
                {typingText && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-4 rounded-2xl bg-gray-100 text-gray-800 border border-gray-200 relative">
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {typingText}
                        <span className="inline-block w-2 h-5 bg-gray-400 ml-1 animate-pulse"></span>
                      </p>
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
                      {message.type === "assistant" && (
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-gray-500">{message.timestamp.toLocaleTimeString()}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => speakText(message.content)}
                            className="text-gray-400 hover:text-blue-500 p-1 h-6 w-6"
                            title="播放语音"
                            disabled={isSpeaking}
                          >
                            <Volume2 className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                      {message.type === "user" && (
                        <p className={`text-xs mt-2 ${message.type === "user" ? "text-white/70" : "text-gray-500"}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {isProcessing && !typingText && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 border border-gray-200 p-4 rounded-2xl relative">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                        <span className="text-sm typing-placeholder">▌▌▌ 正在构建创意矩阵...</span>
                      </div>
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
                className={`absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 rounded-full transition-all duration-300 ${
                  isListening ? "text-red-500 bg-red-50 animate-pulse" : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={toggleVoiceRecognition}
                disabled={isProcessing}
                title={isListening ? "点击停止录音" : "点击开始语音输入"}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleFileUpload}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full w-10 h-10 p-0 transition-all duration-300"
              disabled={isProcessing}
            >
              <Upload className="w-4 h-4" />
            </Button>

            <Button
              type="button"
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isProcessing}
              className={`bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full w-10 h-10 p-0 transition-all duration-300 ${
                isFocused && inputValue.trim() ? "send-button-active" : ""
              }`}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

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

export default SmartChatDialog
