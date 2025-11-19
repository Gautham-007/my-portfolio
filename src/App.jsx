import React, { useState, useEffect, useRef } from 'react';
// ----------------------------------------------------------------------
// STEP 1: Run "npm install @emailjs/browser" in your terminal
// STEP 2: Uncomment the line below (Remove the // at the start):
import emailjs from '@emailjs/browser'; 
// ----------------------------------------------------------------------

import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ArrowUpRight, 
  Code, 
  LayoutTemplate, 
  Cpu, 
  Server, 
  Sparkles,
  Menu,
  X,
  Globe,
  Briefcase,
  User,
  Database,
  Cloud,
  Lock,
  MonitorPlay,
  ShieldCheck,
  Copy,
  Check,
  Send,
  Phone
} from 'lucide-react';

// --- CONFIGURATION SECTION (EDIT THIS) ---

const EMAILJS_CONFIG = {
  // Go to https://dashboard.emailjs.com/admin/account to find your Public Key
  PUBLIC_KEY: 'Wr-aNI6zuzIbP_0_X', // e.g., 'Wr-aNI6zuzIbP_0_X'

  // Go to https://dashboard.emailjs.com/admin to find your Service ID (e.g., 'service_gmail')
  SERVICE_ID: 'service_vuxeujd', // e.g., 'service_2nlpbqa'

  // Go to https://dashboard.emailjs.com/admin/templates to find your Template ID
  TEMPLATE_ID: 'template_ykr5dtd', // e.g., 'template_8a9s7d6'
};

// --- Data & Content ---

const PROJECT_DATA = [
  {
    id: 'chat-app',
    title: "Encrypted Chat App",
    stack: "WebRTC, AES-256, React, WebSockets",
    icon: Lock,
    colorClass: "bg-gradient-to-tr from-red-900/40 to-orange-900/40",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop", 
    description: "A secure, real-time communication platform featuring end-to-end encryption. Implemented WebRTC for high-quality peer-to-peer audio/video calls and AES-256/RSA algorithms to ensure message confidentiality.",
    features: ["Real-time messaging", "P2P Audio/Video Calls", "End-to-End Encryption", "Secure WebSockets"]
  },
  {
    id: 'netflix-clone',
    title: "Netflix Clone",
    stack: "React, Firebase, TMDB API",
    icon: MonitorPlay,
    colorClass: "bg-gradient-to-tr from-red-600/40 to-black/40",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2069&auto=format&fit=crop",
    description: "A fully functional streaming service clone with dynamic content retrieval. Features user authentication via Firebase, real-time movie data from TMDB API, and a responsive, cinematic UI closely mimicking the original platform.",
    features: ["User Authentication", "Dynamic Movie Trailers", "My List Functionality", "Responsive Design"]
  },
  {
    id: 'college-cms',
    title: "College Mgmt System",
    stack: "PostgreSQL, AJAX, Role-Based Access",
    icon: Database,
    colorClass: "bg-gradient-to-tr from-blue-900/40 to-cyan-900/40",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
    description: "Comprehensive management system for educational institutions. Implemented complex role-based access control (RBAC) for Admins, Faculty, and Students, ensuring data security and streamlined administrative workflows.",
    features: ["Role-Based Access Control", "Real-time Notifications (AJAX)", "Student Performance Analytics", "PostgreSQL Database Optimization"]
  },
  {
    id: 'gov-sites',
    title: "Government Websites",
    stack: "WCAG Compliance, Full-Stack Redesign",
    icon: ShieldCheck,
    colorClass: "bg-gradient-to-tr from-green-900/40 to-emerald-900/40",
    image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2070&auto=format&fit=crop",
    description: "Led the full-stack redesign of critical government portals (NIC). Focused heavily on accessibility standards (WCAG) to ensure inclusivity for all citizens, alongside database optimization for handling high-traffic loads.",
    features: ["WCAG Accessibility Compliance", "High-Traffic Scalability", "Relational Database Design", "Secure Data Handling"]
  }
];

// --- Helper Components ---

const Toast = ({ message, show, type = 'success', onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000); // 4 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const isError = type === 'error';

  return (
    <div className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 animate-fade-in-up border ${isError ? 'bg-red-900/90 border-red-700 text-white' : 'bg-white border-white text-black'}`}>
      {isError ? <X size={20} /> : <Check size={20} className="text-green-600" />}
      <span className="font-medium text-sm">{message}</span>
    </div>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 bg-neutral-800 rounded-full transition-colors z-10 bg-black/50 backdrop-blur-md">
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

// --- Main Components ---

const Navbar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-neutral-950/90 backdrop-blur-md py-3 border-b border-neutral-800' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className="text-2xl font-bold text-white tracking-tight hover:text-neutral-300 transition-colors">
          Gautham<span className="text-neutral-500">.dev</span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {['Home', 'About', 'Work', 'Contact'].map((item) => (
            <button 
              key={item} 
              onClick={() => handleNavClick(item.toLowerCase())} 
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white p-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 absolute w-full">
          <div className="px-6 py-4 flex flex-col space-y-4">
            {['Home', 'About', 'Work', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => handleNavClick(item.toLowerCase())}
                className="text-left text-neutral-400 hover:text-white text-lg font-medium cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const BentoCard = ({ children, className = "", title, subtitle, icon: Icon, href, onClick, hoverEffect = true }) => (
  <div 
    onClick={onClick}
    className={`group relative bg-neutral-900 rounded-3xl p-6 border border-neutral-800 transition-all duration-300 overflow-hidden flex flex-col 
    ${hoverEffect ? 'hover:border-neutral-600 hover:shadow-2xl hover:-translate-y-1' : ''} 
    ${onClick || href ? 'cursor-pointer' : ''} 
    ${className}`}
  >
    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {(href || onClick) && <ArrowUpRight className="text-white w-6 h-6" />}
    </div>
    
    <div className="flex justify-between items-start mb-4 z-10">
      <div className="flex flex-col">
         {subtitle && <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">{subtitle}</span>}
         {title && <h3 className="text-xl font-bold text-white group-hover:text-neutral-200 transition-colors">{title}</h3>}
      </div>
      {Icon && <Icon className="text-neutral-500 w-6 h-6 group-hover:text-white transition-colors" />}
    </div>
    
    <div className="flex-grow relative z-10">
      {children}
    </div>

    {hoverEffect && (
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-500 pointer-events-none"></div>
    )}
  </div>
);

const SocialLink = ({ icon: Icon, href, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    aria-label={label}
    className="flex items-center justify-center w-12 h-12 bg-neutral-800 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-110 cursor-pointer"
  >
    <Icon size={20} />
  </a>
);

const ServiceItem = ({ icon: Icon, title }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-neutral-800/50 rounded-2xl hover:bg-neutral-800 transition-colors text-center group cursor-default">
    <Icon className="text-neutral-400 group-hover:text-white transition-colors mb-2 w-8 h-8" />
    <span className="text-neutral-300 text-sm font-medium group-hover:text-white">{title}</span>
  </div>
);

const ProjectCard = ({ title, stack, icon: Icon, colorClass, onClick, image }) => (
  <div 
    onClick={onClick}
    className="bg-neutral-800 rounded-xl p-4 group/project hover:bg-neutral-700 transition-colors cursor-pointer h-full flex flex-col active:scale-95 duration-200"
  >
    <div className="h-32 w-full bg-neutral-700 rounded-lg mb-3 overflow-hidden relative shrink-0">
        {image ? (
            <div className="w-full h-full relative">
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover group-hover/project:scale-110 transition-transform duration-500" 
                />
                {/* Overlay for text readability just in case */}
                <div className="absolute inset-0 bg-black/10 group-hover/project:bg-transparent transition-colors"></div>
            </div>
        ) : (
            <div className={`absolute inset-0 ${colorClass} flex items-center justify-center text-neutral-200 group-hover/project:scale-110 transition-transform duration-500`}>
                <Icon size={32} />
            </div>
        )}
    </div>
    <div className="mt-auto">
        <h4 className="font-bold text-white text-sm mb-1 flex items-center justify-between">
            {title}
            <ArrowUpRight size={14} className="opacity-0 group-hover/project:opacity-100 transition-opacity" />
        </h4>
        <p className="text-xs text-neutral-400 line-clamp-2">{stack}</p>
    </div>
  </div>
);

// --- Main App ---

const App = () => {
  const [activeModal, setActiveModal] = useState(null); // 'contact' or project ID
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const copyToClipboard = (text) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) showToast('Email copied to clipboard!', 'success');
      else showToast('Failed to copy email.', 'error');
    } catch (err) {
      console.error('Fallback copy failed', err);
      showToast('Failed to copy email.', 'error');
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Check if running in Preview/Simulation Mode (EmailJS not imported)
    if (typeof emailjs === 'undefined') {
        console.warn("EmailJS is not imported. Running in Simulation Mode.");
        setTimeout(() => {
            setIsSubmitting(false);
            setActiveModal(null);
            setFormData({ name: '', email: '', message: '' });
            showToast('Email sent! (Simulation Mode)', 'success');
        }, 1500);
        return;
    }

    // 2. Check if Configuration is Missing
    if (EMAILJS_CONFIG.SERVICE_ID.includes('YOUR_') || 
        EMAILJS_CONFIG.TEMPLATE_ID.includes('YOUR_') || 
        EMAILJS_CONFIG.PUBLIC_KEY.includes('YOUR_')) {
        
        setIsSubmitting(false);
        alert("CONFIGURATION ERROR:\nYou must update the EMAILJS_CONFIG at the top of the file with your actual keys.");
        return;
    }

    // 3. Real Email Sending Logic
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Gautham',
    };

    emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID, 
      EMAILJS_CONFIG.TEMPLATE_ID, 
      templateParams, 
      EMAILJS_CONFIG.PUBLIC_KEY
    )
      .then((response) => {
         console.log('SUCCESS!', response.status, response.text);
         showToast('Message sent successfully!', 'success');
         setActiveModal(null);
         setFormData({ name: '', email: '', message: '' });
      }, (err) => {
         console.error('FAILED...', err);
         
         // Extract meaningful error message
         let errorMessage = 'Failed to send.';
         if (err.text) errorMessage = err.text;
         else if (err.message) errorMessage = err.message;
         
         // Common error: Authentication
         if (errorMessage.includes('Authentication')) {
             errorMessage = "Authentication Failed. Check your Public Key.";
         }

         showToast(errorMessage, 'error');
      })
      .finally(() => {
         setIsSubmitting(false);
      });
  };

  const selectedProject = PROJECT_DATA.find(p => p.id === activeModal);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-white/20 selection:text-black">
      <Navbar onNavigate={handleScrollTo} />

      {/* Toast Notification */}
      <Toast 
        show={toast.show} 
        message={toast.message} 
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })} 
      />

      {/* Project Details Modal */}
      <Modal isOpen={!!selectedProject} onClose={() => setActiveModal(null)}>
        {selectedProject && (
          <div>
            <div className="h-48 sm:h-64 w-full rounded-2xl mb-6 overflow-hidden relative group">
                {selectedProject.image ? (
                    <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className={`w-full h-full ${selectedProject.colorClass} flex items-center justify-center`}>
                        <selectedProject.icon size={64} className="text-white/80" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80"></div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
            <p className="text-neutral-400 text-sm font-mono mb-6">{selectedProject.stack}</p>
            
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">About</h3>
                    <p className="text-neutral-300 leading-relaxed">{selectedProject.description}</p>
                </div>
                
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Key Features</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedProject.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-neutral-400 text-sm">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="pt-6 border-t border-neutral-800 flex gap-4">
                    <button className="flex-1 bg-white text-black font-bold py-3 rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                        <Github size={18} /> View Code
                    </button>
                    <button className="flex-1 bg-neutral-800 text-white font-bold py-3 rounded-xl hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                        <Globe size={18} /> Live Demo
                    </button>
                </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Contact Form Modal */}
      <Modal isOpen={activeModal === 'contact'} onClose={() => setActiveModal(null)}>
         <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
            <p className="text-neutral-400">Have a project in mind? Let's talk.</p>
         </div>
         
         <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Name</label>
                <input 
                    type="text" 
                    required
                    name="from_name"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-white transition-colors"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Email</label>
                <input 
                    type="email" 
                    required
                    name="from_email"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-white transition-colors"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Message</label>
                <textarea 
                    required
                    name="message"
                    rows="4"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                />
            </div>
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 cursor-pointer"
            >
                {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                ) : (
                    <>Send Message <Send size={18} /></>
                )}
            </button>
         </form>
      </Modal>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-12 space-y-6">
        
        {/* HERO SECTION */}
        <div id="home" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Profile / Intro Card */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-3xl p-8 sm:p-12 flex flex-col justify-center border border-neutral-800 relative overflow-hidden group">
            <div className="z-10 relative">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-neutral-800 border-2 border-neutral-700 flex items-center justify-center overflow-hidden shadow-xl">
                    <User size={40} className="text-neutral-500" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-4 border-neutral-900 rounded-full"></div>
                </div>
                <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-neutral-800/50 border border-neutral-700 text-xs font-bold text-green-400 mb-1 backdrop-blur-sm">Open to work</span>
                    <h2 className="text-white font-bold text-xl">Gautham Theerth S</h2>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                Full-Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-neutral-600">Developer</span>
              </h1>
              <p className="text-neutral-400 text-lg max-w-md mb-8 leading-relaxed">
                Building scalable web applications with Python, Django, React & PostgreSQL. Experienced in Azure DevOps & Secure Systems.
              </p>
              
              <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => setActiveModal('contact')} 
                    className="inline-flex items-center bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-neutral-200 transition-colors hover:scale-105 duration-200 cursor-pointer"
                  >
                    Let's talk <ArrowUpRight className="ml-2 w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleScrollTo('works')}
                    className="inline-flex items-center bg-neutral-800 text-white px-6 py-3 rounded-full font-bold hover:bg-neutral-700 transition-colors border border-neutral-700 cursor-pointer"
                  >
                    View Work
                  </button>
              </div>
            </div>
            
            {/* Decorative Sparkles - Added pointer-events-none to ensure buttons are clickable */}
            <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none z-0">
              <Sparkles size={300} strokeWidth={0.5} />
            </div>
          </div>

          {/* Map / Location Card */}
          <BentoCard 
            title="Kerala, India" 
            subtitle="Based In" 
            className="col-span-1 md:col-span-1 aspect-square md:aspect-auto" 
            icon={Globe}
          >
            <div className="w-full h-full rounded-xl bg-neutral-800 relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 opacity-30">
                 <svg width="100%" height="100%">
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" className="fill-neutral-500" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                 </svg>
              </div>
              <div className="relative z-10 bg-neutral-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-700 text-xs font-mono flex items-center shadow-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                Trivandrum
              </div>
            </div>
          </BentoCard>

          {/* Credentials Card */}
          <BentoCard 
            title="Credentials" 
            subtitle="About Me" 
            onClick={() => handleScrollTo('about')} 
            className="col-span-1 md:col-span-1 bg-neutral-900" 
            icon={User}
          >
             <div className="mt-4 space-y-4">
                 <p className="text-sm text-neutral-400 leading-relaxed">
                     Software Engineer at National Informatics Center. Previously at ZeroNorth. B.Tech in CSE.
                 </p>
                 <div className="flex items-center space-x-2 text-xs font-mono text-neutral-500 uppercase group-hover:text-white transition-colors">
                     <span>Read More</span>
                     <div className="h-px w-8 bg-neutral-700 group-hover:bg-white transition-colors"></div>
                 </div>
             </div>
          </BentoCard>

          {/* Experience Stats */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 grid grid-rows-3 gap-6 h-full" id="about">
            <div className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800 flex flex-col justify-center items-center text-center hover:bg-neutral-800 transition-colors hover:border-neutral-600 group">
               <span className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">2.5+</span>
               <span className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Years Experience</span>
            </div>
            <div className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800 flex flex-col justify-center items-center text-center hover:bg-neutral-800 transition-colors hover:border-neutral-600 group">
               <span className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">10+</span>
               <span className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Projects</span>
            </div>
             <div className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800 flex flex-col justify-center items-center text-center hover:bg-neutral-800 transition-colors hover:border-neutral-600 group">
               <span className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">Azure</span>
               <span className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Cloud Certified</span>
            </div>
          </div>

          {/* Projects Showcase */}
          <div id="works" className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2">
             <BentoCard 
                title="Featured Projects" 
                subtitle="Showcase" 
                className="h-full min-h-[400px]" 
                icon={Briefcase}
                hoverEffect={false}
            >
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PROJECT_DATA.map((project) => (
                        <ProjectCard 
                            key={project.id}
                            {...project}
                            onClick={() => setActiveModal(project.id)}
                        />
                    ))}
                </div>
            </BentoCard>
          </div>

          {/* Services Offering */}
          <BentoCard title="Tech Stack" subtitle="Skills" className="col-span-1 md:col-span-2 lg:col-span-1" icon={Code}>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <ServiceItem icon={LayoutTemplate} title="React & JS" />
              <ServiceItem icon={Server} title="Python/Django" />
              <ServiceItem icon={Database} title="PostgreSQL" />
              <ServiceItem icon={Cloud} title="Azure DevOps" />
            </div>
          </BentoCard>

          {/* Social Profiles */}
          <BentoCard title="Connect" subtitle="Stay With Me" className="col-span-1 md:col-span-2 lg:col-span-1" icon={Mail}>
            <div className="flex flex-wrap gap-4 mt-6 justify-start">
               <SocialLink icon={Linkedin} href="https://linkedin.com" label="LinkedIn" />
               <SocialLink icon={Github} href="https://github.com" label="GitHub" />
               <button 
                  onClick={() => copyToClipboard('gauthamtheerth007@gmail.com')}
                  className="flex items-center justify-center w-12 h-12 bg-neutral-800 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-110 cursor-pointer"
                  aria-label="Copy Email"
                >
                    <Copy size={20} />
               </button>
            </div>
            <div className="mt-6 pt-6 border-t border-neutral-800 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-neutral-400 text-sm">
                    <Mail size={14} />
                    <span>gauthamtheerth007@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400 text-sm">
                    <Phone size={14} />
                    <span>+91 7510130438</span>
                </div>
            </div>
          </BentoCard>

          {/* Footer Call to Action */}
          <div id="contact" className="col-span-1 md:col-span-2 lg:col-span-4 bg-neutral-900 rounded-3xl p-8 sm:p-16 text-center border border-neutral-800 relative overflow-hidden group">
             <div className="relative z-10 flex flex-col items-center transition-transform duration-500 group-hover:-translate-y-2">
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                   Let's build <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">something.</span>
                </h2>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
                    <button 
                        onClick={() => setActiveModal('contact')}
                        className="px-8 py-4 bg-white text-black rounded-full font-bold text-xl hover:bg-neutral-200 transition-all flex items-center gap-2 cursor-pointer"
                    >
                        Start a Project <ArrowUpRight size={20} />
                    </button>
                    <button 
                        onClick={() => copyToClipboard('gauthamtheerth007@gmail.com')}
                        className="px-8 py-4 bg-neutral-800 text-white rounded-full font-bold text-xl hover:bg-neutral-700 transition-all border border-neutral-700 flex items-center gap-2 cursor-pointer"
                    >
                        Copy Email <Copy size={20} />
                    </button>
                </div>

                <div className="flex items-center gap-2 text-neutral-500 text-sm uppercase tracking-widest font-bold">
                   <Sparkles size={16} className="animate-pulse" />
                   <span>Available for freelance</span>
                   <Sparkles size={16} className="animate-pulse" />
                </div>
             </div>
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          </div>

        </div>

        {/* Simple Footer */}
        <footer className="text-center py-8 text-neutral-500 text-sm">
           <p>© {new Date().getFullYear()} Gautham Theerth S. All rights reserved.</p>
           <p className="mt-2">Trivandrum, Kerala, India</p>
        </footer>

      </main>
    </div>
  );
};

export default App;