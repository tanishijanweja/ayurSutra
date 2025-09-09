import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Bell, Activity, BarChart3, Users, CheckCircle, ArrowRight, Star, ChevronDown, Clock, Shield, Zap } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Automated Therapy Scheduling",
      description: "Smart scheduling system that adapts to patient needs and practitioner availability"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Pre & Post Procedure Notifications",
      description: "Timely reminders and guidance for optimal therapy preparation and recovery"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Real-Time Therapy Tracking",
      description: "Monitor patient progress with live updates and comprehensive health metrics"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Visualization Tools",
      description: "Interactive charts and progress bars for clear insights into treatment efficacy"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Integrated Feedback Loop",
      description: "Seamless communication between practitioners and patients for better outcomes"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Data Management",
      description: "HIPAA-compliant storage ensuring patient privacy and data protection"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      role: "Ayurvedic Practitioner",
      content: "This software has revolutionized how I manage Panchakarma therapies. The automated scheduling alone saves me hours each week.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Wellness Center Director",
      content: "The digital tracking and visualization tools have improved our therapy adherence rates dramatically. Our patients love the reminders!",
      rating: 5
    },
    {
      name: "Dr. Amit Verma",
      role: "Senior Ayurveda Consultant",
      content: "Finally, a platform that respects traditional Ayurvedic principles while embracing modern technology. Truly transformative!",
      rating: 5
    }
  ];

  const stats = [
    { value: "$16B", label: "Market Size by 2026", icon: <Zap className="w-5 h-5" /> },
    { value: "40%", label: "Improved Therapy Adherence", icon: <Activity className="w-5 h-5" /> },
    { value: "80%", label: "Reduced Scheduling Errors", icon: <Shield className="w-5 h-5" /> },
    { value: "10K+", label: "Active Practitioners", icon: <Users className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-emerald-50 via-white to-amber-50">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">ॐ</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                AyurTech
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-emerald-600 transition-colors">Home</a>
              <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-700 hover:text-emerald-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-emerald-600 transition-colors">Contact</a>
              <button className="px-4 py-2 text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-all">
                Login
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all">
                Book a Session
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-1">
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded">Home</a>
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded">Features</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded">About</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded">Contact</a>
              <button className="w-full px-4 py-2 text-emerald-600 border border-emerald-600 rounded-lg">
                Login
              </button>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg">
                Book a Session
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full">
                <span className="text-emerald-700 text-sm font-medium">🌿 Trusted by 10,000+ Practitioners</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Modern Panchakarma
                </span>
                <br />
                <span className="text-gray-800">Management for</span>
                <br />
                <span className="text-gray-800">Authentic Healing</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Integrating ancient Ayurveda traditions with digital efficiency 
                for exceptional patient care and treatment outcomes.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-white text-emerald-600 border-2 border-emerald-200 rounded-xl font-semibold hover:bg-emerald-50 transition-all flex items-center">
                  Learn More
                  <ChevronDown className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-all">
                    <Clock className="w-8 h-8 text-emerald-500 mb-2" />
                    <p className="text-sm font-semibold">Quick Setup</p>
                    <p className="text-xs text-gray-500">5 min onboarding</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-all">
                    <Shield className="w-8 h-8 text-teal-500 mb-2" />
                    <p className="text-sm font-semibold">Secure</p>
                    <p className="text-xs text-gray-500">HIPAA Compliant</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-all">
                    <Users className="w-8 h-8 text-emerald-500 mb-2" />
                    <p className="text-sm font-semibold">Collaborative</p>
                    <p className="text-xs text-gray-500">Team features</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-all">
                    <BarChart3 className="w-8 h-8 text-teal-500 mb-2" />
                    <p className="text-sm font-semibold">Analytics</p>
                    <p className="text-xs text-gray-500">Real-time insights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Transforming Traditional Challenges</h2>
            <p className="text-xl text-gray-600">Bridging the gap between ancient wisdom and modern efficiency</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-6 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <X className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-red-900 mb-2">Manual Scheduling</h3>
              <p className="text-gray-600">Time-consuming appointment management and frequent scheduling conflicts</p>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-100 rounded-2xl p-6 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <X className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-yellow-900 mb-2">Inconsistent Quality</h3>
              <p className="text-gray-600">Difficulty maintaining standardized therapy protocols across practitioners</p>
            </div>
            <div className="bg-emerald-50 border-2 border-emerald-100 rounded-2xl p-6 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-900 mb-2">Digital Solution</h3>
              <p className="text-gray-600">Automated scheduling, real-time tracking, and standardized protocols</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Powerful Features for Modern Ayurveda</h2>
            <p className="text-xl text-gray-600">Everything you need to deliver exceptional Panchakarma treatments</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, intuitive process for practitioners and patients</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Patient Registration", desc: "Quick onboarding with health history" },
              { step: 2, title: "Auto-Scheduling", desc: "Smart therapy session planning" },
              { step: 3, title: "Track Progress", desc: "Real-time updates and reminders" },
              { step: 4, title: "Monitor & Optimize", desc: "Analytics-driven improvements" }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-emerald-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-600 to-teal-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Impact by the Numbers</h2>
            <p className="text-xl text-emerald-100">Join the digital revolution in Ayurvedic healthcare</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {stat.icon}
                </div>
                <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-emerald-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Trusted by leading Ayurvedic practitioners worldwide</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 shadow-xl">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-xl text-gray-700 italic mb-6">"{testimonials[activeTestimonial].content}"</p>
              <div className="text-center">
                <p className="font-semibold text-gray-800">{testimonials[activeTestimonial].name}</p>
                <p className="text-gray-600">{testimonials[activeTestimonial].role}</p>
              </div>
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeTestimonial ? 'bg-emerald-600 w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-teal-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Bring Ayurveda into the Digital Era
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of practitioners delivering better care with modern technology
          </p>
          <button className="px-10 py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center mx-auto">
            Get Started Today
            <ArrowRight className="ml-3 w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">ॐ</span>
                </div>
                <span className="font-bold text-xl">AyurTech</span>
              </div>
              <p className="text-gray-400">Modern solutions for traditional healing</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@ayurtech.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Follow us:</li>
                <li className="flex space-x-4 mt-2">
                  <a href="#" className="hover:text-white transition-colors">FB</a>
                  <a href="#" className="hover:text-white transition-colors">TW</a>
                  <a href="#" className="hover:text-white transition-colors">LI</a>
                  <a href="#" className="hover:text-white transition-colors">IG</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 AyurTech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;