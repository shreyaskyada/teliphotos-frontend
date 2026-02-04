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
  Infinity,
  Lock,
  MessageSquare,
  Play,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Timer,
  Users,
} from "lucide-react";
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
      icon: Shield,
      title: "End-to-End Encryption",
      description: "Your photos are encrypted before leaving your device",
      color: "from-violet-500 to-purple-600",
    },
    {
      icon: MessageSquare,
      title: "Telegram Integration",
      description: "Seamlessly sync with your Telegram channels",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: Users,
      title: "Private Channels",
      description: "Organize photos in custom private channels",
      color: "from-green-500 to-emerald-600",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Photography Enthusiast",
      content:
        "Finally, a secure way to store and organize my photos. The Telegram integration is brilliant!",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Mike Chen",
      role: "Content Creator",
      content:
        "Love how I can create different channels for different projects. Super organized and secure.",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emma Davis",
      role: "Family Organizer",
      content:
        "Perfect for sharing family photos privately. The encryption gives me peace of mind.",
      rating: 5,
      avatar: "ED",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "2M+", label: "Photos Stored" },
    { number: "99.9%", label: "Uptime" },
    { number: "256-bit", label: "Encryption" },
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
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/25">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                Teliphotos
              </h1>
              <p className="text-xs text-slate-400">Secure Photo Vault</p>
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
              href="#security"
              className="text-slate-300 hover:text-white transition-colors duration-300"
            >
              Security
            </a>
            <a
              href="#pricing"
              className="text-slate-300 hover:text-white transition-colors duration-300"
            >
              Pricing
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
                    Trusted by 50,000+ users worldwide
                  </span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                    Your Photos,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    Perfectly Secure
                  </span>
                </h1>

                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                  Store, organize, and share your precious memories with
                  military-grade encryption. Seamlessly integrated with Telegram
                  for the ultimate privacy experience.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-2xl shadow-violet-500/25 flex items-center justify-center space-x-3 group"
                >
                  <span>Start Free Today</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <button className="flex items-center justify-center space-x-3 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 group">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Watch Demo</span>
                </button>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full border-2 border-slate-950 flex items-center justify-center text-xs font-bold"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-slate-400">
                    Join thousands of happy users
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
                        <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl flex items-center justify-center">
                          <Camera className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-sm">
                            Teliphotos
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

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
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
                Why Choose Teliphotos?
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Experience the perfect blend of security, convenience, and
              powerful organization tools
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
                title: "Cloud Sync",
                desc: "Access from anywhere",
              },
              {
                icon: Smartphone,
                title: "Mobile First",
                desc: "Optimized for mobile",
              },
              {
                icon: Eye,
                title: "Privacy Controls",
                desc: "You control who sees what",
              },
              {
                icon: Download,
                title: "Easy Export",
                desc: "Download anytime",
              },
              {
                icon: Heart,
                title: "Favorites",
                desc: "Mark your best photos",
              },
              {
                icon: Folder,
                title: "Smart Organization",
                desc: "AI-powered sorting",
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

      {/* Security Section */}
      <section
        id="security"
        className="relative z-10 px-6 py-20 bg-white/5 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300 font-medium">
                  Bank-Level Security
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Your Privacy is Our Priority
                </span>
              </h2>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                We use the same encryption standards as banks and government
                agencies. Your photos are encrypted before they leave your
                device.
              </p>

              <div className="space-y-4">
                {[
                  "256-bit AES encryption",
                  "Zero-knowledge architecture",
                  "End-to-end encryption",
                  "GDPR compliant",
                  "Regular security audits",
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
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Encrypted Storage
                  </h3>
                  <p className="text-slate-400">
                    Your data is protected at every level
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-slate-300">Device Encryption</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-slate-300">Transport Security</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-slate-300">Server Protection</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Loved by Users Worldwide
              </span>
            </h2>
            <p className="text-xl text-slate-400">
              See what our community has to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full flex items-center justify-center font-bold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Service Highlight */}
      <section
        id="free-service"
        className="relative z-10 px-6 py-20 bg-white/5 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Completely Free Forever
              </span>
            </h2>
            <p className="text-xl text-slate-400">
              No hidden fees, no subscriptions, no limits
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Main Free Service Card */}
            <div className="bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border-2 border-violet-500/30 rounded-3xl p-12 text-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-violet-500/25">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-5xl font-bold text-white mb-4">
                  100% Free
                </h3>
                <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  We believe privacy and security should be accessible to
                  everyone. That's why Teliphotos is completely free with no
                  hidden costs.
                </p>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center space-x-3 mb-3">
                      <Infinity className="w-6 h-6 text-violet-400" />
                      <h4 className="font-semibold text-white">
                        Unlimited Storage
                      </h4>
                    </div>
                    <p className="text-slate-400 text-sm">
                      Store as many photos and videos as you want
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center space-x-3 mb-3">
                      <Users className="w-6 h-6 text-cyan-400" />
                      <h4 className="font-semibold text-white">
                        Unlimited Channels
                      </h4>
                    </div>
                    <p className="text-slate-400 text-sm">
                      Create as many private channels as you need
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center space-x-3 mb-3">
                      <Shield className="w-6 h-6 text-green-400" />
                      <h4 className="font-semibold text-white">
                        Full Encryption
                      </h4>
                    </div>
                    <p className="text-slate-400 text-sm">
                      Bank-level security for all your memories
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center space-x-3 mb-3">
                      <Timer className="w-6 h-6 text-pink-400" />
                      <h4 className="font-semibold text-white">
                        No Time Limits
                      </h4>
                    </div>
                    <p className="text-slate-400 text-sm">
                      Keep your photos safe forever, no expiration
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-2xl shadow-violet-500/25 flex items-center justify-center space-x-3 mx-auto group"
                >
                  <span>Start Using Free Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Why Free Section */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-white mb-6">
                Why is Teliphotos Free?
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center mx-auto">
                    <Heart className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-white">
                    Privacy is a Right
                  </h4>
                  <p className="text-slate-400 text-sm">
                    We believe everyone deserves secure photo storage
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6 text-green-400" />
                  </div>
                  <h4 className="font-semibold text-white">Community Driven</h4>
                  <p className="text-slate-400 text-sm">
                    Built by the community, for the community
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="font-semibold text-white">Open Source</h4>
                  <p className="text-slate-400 text-sm">
                    Transparent, secure, and always improving
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
              Start Securing Your Memories Today
            </span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Join thousands of users who trust Teliphotos with their precious
            photos and videos - completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-2xl shadow-violet-500/25 flex items-center justify-center space-x-3 group"
            >
              <span>Get Started Free</span>
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
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Teliphotos</h3>
                  <p className="text-xs text-slate-400">Secure Photo Vault</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                The most secure way to store and organize your photos with
                seamless Telegram integration - completely free.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Why Free
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-400 text-sm">
              © 2024 Teliphotos. All rights reserved.
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
