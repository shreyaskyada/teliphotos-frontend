"use client";
import {
  ArrowRight,
  Camera,
  Check,
  Cloud,
  Download,
  Eye,
  Folder,
  Heart,
  ImagePlus,
  LayoutGrid,
  MessageSquare,
  Play,
  Shield,
  Smartphone,
  Sparkles,
  Upload,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const handleGetStarted = () => {
    window.location.href = "/login";
  };
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: LayoutGrid,
      title: "Beautiful Gallery View",
      description: "Browse your photos in a clean, visual gallery instead of scrolling through Telegram chats",
      color: "from-violet-500 to-purple-600",
    },
    {
      icon: MessageSquare,
      title: "Telegram Powered",
      description: "Log in with your Telegram account and your photos are stored directly in your own Telegram channel",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: Upload,
      title: "Easy Photo Upload",
      description: "Upload photos through our interface and they're saved to your personal Telegram channel automatically",
      color: "from-green-500 to-emerald-600",
    },
  ];

  const useCases = [
    {
      icon: Camera,
      title: "Personal Photo Gallery",
      description:
        "Keep your photos organized in dedicated Telegram channels and browse them in a beautiful gallery view.",
    },
    {
      icon: Users,
      title: "Multiple Channels",
      description:
        "Create separate channels for different albums — vacations, family, events — and switch between them easily.",
    },
    {
      icon: Folder,
      title: "Always Accessible",
      description:
        "Your photos live in your Telegram account, so you can access them from any device, anytime.",
    },
  ];

  const highlights = [
    { icon: LayoutGrid, label: "Gallery View" },
    { icon: Upload, label: "Easy Upload" },
    { icon: Shield, label: "Your Telegram Account" },
    { icon: Smartphone, label: "Mobile Friendly" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-y-auto overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/25 overflow-hidden">
              <Image src="/logo.png" alt="Telephotos" width={48} height={48} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                Telephotos
              </h1>
              <p className="text-xs text-slate-400">Photo Gallery for Telegram</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-slate-300 hover:text-white transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-slate-300 hover:text-white transition-colors duration-300"
            >
              How It Works
            </a>
            <a
              href="#support"
              className="text-slate-300 hover:text-white transition-colors duration-300"
            >
              Support
            </a>
          </div>

          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-violet-500/25 flex items-center space-x-2 group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`space-y-8 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              {" "}
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-300">
                    Personal Photo Gallery for Telegram
                  </span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                    Your Photos,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    Beautifully Organized
                  </span>
                </h1>

                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                  Upload and browse your photos in a beautiful gallery.
                  Your photos are stored in your own Telegram channel —
                  private, accessible, and always yours.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-2xl shadow-violet-500/25 flex items-center justify-center space-x-3 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <button className="flex items-center justify-center space-x-3 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 group">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Watch Demo</span>
                </button>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-slate-400">
                    Photos stored in your own Telegram channel
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              {" "}
              <div className="relative">
                {/* Main Phone Mockup */}
                <div className="relative mx-auto w-80 h-[600px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-slate-950 rounded-[2.5rem] overflow-hidden relative">
                    {/* Status Bar */}
                    <div className="flex items-center justify-between px-6 py-3 text-xs text-slate-400">
                      <span>9:41</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                        <div className="w-6 h-3 border border-white rounded-sm">
                          <div className="w-4 h-1 bg-white rounded-sm m-0.5"></div>
                        </div>
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="px-4 py-2">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden">
                          <Image src="/logo.png" alt="Telephotos" width={32} height={32} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-sm">
                            Telephotos
                          </h3>
                          <p className="text-xs text-slate-400">1,247 photos</p>
                        </div>
                      </div>

                      {/* Photo Grid */}
                      <div className="grid grid-cols-3 gap-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                          <div
                            key={i}
                            className="aspect-square bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-lg animate-pulse"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-2xl shadow-lg animate-bounce">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-2xl shadow-lg animate-bounce delay-1000">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="relative z-10 px-6 py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, index) => (
              <div key={index} className="text-center group flex flex-col items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-7 h-7 text-violet-400" />
                </div>
                <div className="text-slate-300 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Why Choose Telephotos?
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              A beautiful gallery for your photos, powered by
              Telegram
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 transition-all duration-500 cursor-pointer ${
                  activeFeature === index
                    ? "ring-2 ring-violet-500/50 bg-white/10"
                    : ""
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Cloud,
                title: "Access Anywhere",
                desc: "Your photos are in Telegram — view from any device",
              },
              {
                icon: Smartphone,
                title: "Mobile Friendly",
                desc: "Optimized for mobile browsing",
              },
              {
                icon: Eye,
                title: "Channel Overview",
                desc: "See all your photo channels at a glance",
              },
              {
                icon: Download,
                title: "Quick Download",
                desc: "Save media to your device anytime",
              },
              {
                icon: Heart,
                title: "Favorites",
                desc: "Mark your best photos",
              },
              {
                icon: Folder,
                title: "Channel-Based Albums",
                desc: "Organize by creating separate channels",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="relative z-10 px-6 py-20 bg-white/5 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300 font-medium">
                  Simple 3-Step Process
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  How Telephotos Works
                </span>
              </h2>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Log in with your Telegram account, create a channel for
                your photos, and start uploading. We store your photos
                directly in your Telegram channel and show them in a
                beautiful gallery.
              </p>

              <div className="space-y-4">
                {[
                  "Log in securely with your Telegram account",
                  "Create a channel to organize your photos",
                  "Upload photos — they go straight to your Telegram channel",
                  "Browse your photos in a beautiful gallery view",
                  "Download or view your photos anytime",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-white/10">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LayoutGrid className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Your Photo Gallery
                  </h3>
                  <p className="text-slate-400">
                    Photos from your Telegram channel, beautifully displayed
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-slate-300">Telegram Login</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-slate-300">Channel Created</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-slate-300">Photos Uploaded</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Perfect For
              </span>
            </h2>
            <p className="text-xl text-slate-400">
              Whether it's personal memories or creative projects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <useCase.icon className="w-7 h-7 text-violet-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {useCase.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free to Use Section */}
      <section
        id="free-service"
        className="relative z-10 px-6 py-20 bg-white/5 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Everything You Need
              </span>
            </h2>
            <p className="text-xl text-slate-400">
              A better way to manage your Telegram photos
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Main Card */}
            <div className="bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border-2 border-violet-500/30 rounded-3xl p-12 text-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-violet-500/25">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-5xl font-bold text-white mb-4">
                  Photo Gallery
                </h3>
                <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Upload photos to your personal Telegram channel and
                  browse them in a beautiful gallery. Simple, private,
                  and always accessible.
                </p>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center space-x-3 mb-3">
                      <ImagePlus className="w-6 h-6 text-violet-400" />
                      <h4 className="font-semibold text-white">
                        Upload & Browse
                      </h4>
                    </div>
                    <p className="text-slate-400 text-sm">
                      Upload photos and view them in a gallery layout
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center space-x-3 mb-3">
                      <Users className="w-6 h-6 text-cyan-400" />
                      <h4 className="font-semibold text-white">
                        Multi-Channel Support
                      </h4>
                    </div>
                    <p className="text-slate-400 text-sm">
                      Create and manage multiple photo channels
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center space-x-3 mb-3">
                      <Shield className="w-6 h-6 text-green-400" />
                      <h4 className="font-semibold text-white">
                        Your Account, Your Data
                      </h4>
                    </div>
                    <p className="text-slate-400 text-sm">
                      Photos stored in your own Telegram channel
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center space-x-3 mb-3">
                      <Download className="w-6 h-6 text-pink-400" />
                      <h4 className="font-semibold text-white">
                        Download Anytime
                      </h4>
                    </div>
                    <p className="text-slate-400 text-sm">
                      Download your photos whenever you need them
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-2xl shadow-violet-500/25 flex items-center justify-center space-x-3 mx-auto group"
                >
                  <span>Try Telephotos Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Why Telephotos Section */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-white mb-6">
                Why Telephotos?
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center mx-auto">
                    <Heart className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-white">
                    Telegram-Native
                  </h4>
                  <p className="text-slate-400 text-sm">
                    Built specifically for Telegram users
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center mx-auto">
                    <Eye className="w-6 h-6 text-green-400" />
                  </div>
                  <h4 className="font-semibold text-white">Beautiful Interface</h4>
                  <p className="text-slate-400 text-sm">
                    A premium gallery experience for your media
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="font-semibold text-white">Simple & Fast</h4>
                  <p className="text-slate-400 text-sm">
                    Upload, browse, and download with ease
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
              Start Building Your Photo Gallery
            </span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Create your personal photo gallery powered by Telegram.
            Upload, browse, and organize your photos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-2xl shadow-violet-500/25 flex items-center justify-center space-x-3 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="flex items-center justify-center space-x-3 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              <MessageSquare className="w-5 h-5" />
              <span>Contact Support</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="support"
        className="relative z-10 border-t border-white/10 px-6 py-16"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center overflow-hidden">
                  <Image src="/logo.png" alt="Telephotos" width={40} height={40} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Telephotos</h3>
                  <p className="text-xs text-slate-400">Photo Gallery for Telegram</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                A personal photo gallery for your Telegram channel
                media. Upload, browse, and organize with ease.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#free-service" className="hover:text-white transition-colors">
                    Overview
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="mailto:telephotos.app@gmail.com" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-400 text-sm">
              © 2024 Telephotos. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
