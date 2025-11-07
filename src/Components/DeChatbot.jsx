import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, MinusCircle } from 'lucide-react';

const DeChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(false);
  const messagesEndRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const hasShownInactivityMessage = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Typing animation effect on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      const welcomeMessage = "Hello 👋! Welcome to Innosphere Consulting – your partner in digital transformation, IT solutions, and business growth across Nigeria. I'm here to guide you, answer your questions, and help you explore our services. How can I assist you today? You can ask about our services, book a consultation, or learn more about us.";
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages([{ type: 'bot', text: welcomeMessage }]);
        setTimeout(() => {
          setShowQuickQuestions(true);
        }, 500);
      }, 2000);
    }
  }, [isOpen]);

  // Inactivity timer
  useEffect(() => {
    if (messages.length > 0 && !hasShownInactivityMessage.current) {
      // Clear existing timer
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }

      // Set new timer for 30 seconds
      inactivityTimerRef.current = setTimeout(() => {
        if (!hasShownInactivityMessage.current) {
          const inactivityMsg = {
            type: 'bot',
            text: "Hey there! 😊 Are you still with me? I'm super excited to help you out! Just type anything and let's chat! 🎉"
          };
          setMessages(prev => [...prev, inactivityMsg]);
          hasShownInactivityMessage.current = true;
        }
      }, 30000); // 30 seconds
    }

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [messages]);

  const resetInactivityTimer = () => {
    hasShownInactivityMessage.current = false;
  };

  const knowledgeBase = {
    company: {
      keywords: ['who are you', 'about', 'innosphere', 'what is innosphere', 'company', 'what is your company'],
      response: `Yay! So happy you asked! 🎈 We're Innosphere Consulting - like the coolest tech helpers in Nigeria! We've been around since 2017 helping businesses do amazing stuff with computers and technology. We work with all kinds of companies - big ones, small ones, schools, banks, even the government! Pretty awesome, right? 😄`
    },
    
    location: {
      keywords: ['location', 'where', 'office', 'address', 'lagos', 'nigeria', 'where are you located', 'where is innosphere'],
      response: `Ooh! We're in Lagos, Nigeria! 🇳🇬 That's our main home base! But guess what? We can work with anyone anywhere because we do lots of video calls and stuff. You can come visit our office if you want, or we can just chat online! Super flexible! 🏢✨`
    },
    
    history: {
      keywords: ['how long', 'been in business', 'experience', 'years', 'established', 'founded when'],
      response: `We started way back in 2017! That's like... a bunch of years ago! We've been helping people with tech stuff for all this time. We've worked with so many cool businesses and learned SO much! 🎂🎉`
    },
    
    industries: {
      keywords: ['industry', 'industries', 'sector', 'serve', 'tech', 'finance', 'education', 'government', 'sme', 'who do you serve'],
      response: `Oh my gosh, we work with EVERYONE! 🌟

💼 Tech companies & startups
🏦 Banks and money people
🎓 Schools and universities
🏛️ Government offices
🎭 Entertainment folks
🏢 Small and medium businesses

Literally everyone! What kind of business are you? Tell me, tell me! 😊`
    },
    
    founder: {
      keywords: ['founder', 'tosin', 'who founded', 'ceo', 'leadership', 'tosin samuel ojo'],
      response: `Our founder is Mr. Tosin Samuel Ojo! He's super smart and has been doing this tech consulting thing for over 10 years! He knows like... EVERYTHING about helping businesses with technology! And he has special security clearance too, which is pretty cool! 🌟👨‍💼`
    },
    
    mission: {
      keywords: ['mission', 'vision', 'values', 'why', 'purpose', 'goal'],
      response: `Ooh, I love talking about this! 💫

Our BIG dream is to help all of Africa get super amazing with technology! We want innovation everywhere!

And what we do every day is help companies get the right tech systems that actually WORK for them - not confusing stuff that nobody understands!

We mix the best ideas from around the world with what really works here in Nigeria! Pretty neat, huh? 🚀✨`
    },
    
    difference: {
      keywords: ['differ', 'different', 'why choose', 'what makes you', 'competitive advantage', 'unique'],
      response: `Oh! What makes us special? Well... we're not just some faraway company that doesn't get it! We REALLY understand how business works in Nigeria! We combine super cool international tech ideas with real solutions that actually work here! We don't just copy-paste stuff - we make it perfect for YOU! 🎯💙`
    },
    
    portfolio: {
      keywords: ['portfolio', 'case study', 'case studies', 'projects', 'examples', 'references', 'testimonials', 'clients'],
      response: `YES! We've done SO many cool projects! 🎨 We helped government offices, banks, schools, and small businesses do amazing things! You can check out our Case Study page to see all the awesome stuff we did! Wanna tell me about YOUR business? I'm so curious! 😄`
    },
    
    clearance: {
      keywords: ['sc cleared', 'clearance', 'certified', 'certification', 'security'],
      response: `Yep yep! Our founder and main consultants have SC Clearance! That's like a special security badge that says we're super trustworthy and can work on important stuff! We follow all the rules and have all the right certifications! 🛡️✅`
    },
    
    international: {
      keywords: ['outside nigeria', 'international', 'global', 'overseas', 'abroad', 'worldwide'],
      response: `Absolutely! Even though we live in Nigeria, we help people EVERYWHERE! 🌍 We can do video calls, help with cloud software, and work on digital transformation projects no matter where you are! Distance is no problem at all! 🚀`
    },
    
    services: {
      keywords: ['service', 'services', 'offer', 'what do you do', 'help with', 'provide', 'solutions'],
      response: `Oh boy, we do SO many cool things! Let me list them! 🎉

• Digital Transformation (making your business super modern!)
• Process Automation (robots doing boring tasks!)
• SaaS/PaaS Development (custom software just for you!)
• IT Consulting & Change Management (helping everyone adapt!)
• Training & Support (teaching your team everything!)
• Brand Management (making you look AWESOME!)
• Digital Marketing (getting everyone to know about you!)

Which one sounds interesting to you? 😊`
    },
    
    digitalTransformation: {
      keywords: ['digital transformation', 'automation', 'process automation', 'streamline', 'integrate', 'productivity'],
      response: `Okay so imagine your business but like... SUPER powered! ⚡ We help you get rid of boring manual stuff, connect all your systems together so they talk to each other, and make everything run smoothly! It's like giving your business superpowers! We make it all work perfectly for Nigerian businesses! Cool, right? 🚀`
    },
    
    saas: {
      keywords: ['saas', 'paas', 'software', 'platform', 'custom software', 'development'],
      response: `This is SO exciting! 💻✨ We build special software JUST for you! It's like having your own custom app that does exactly what you need! Your team can use it anywhere, and you don't need fancy expensive computers! Plus it grows with your business! Wanna see a demo? It's really cool! 🎮`
    },
    
    itConsulting: {
      keywords: ['it consulting', 'change management', 'technology adoption', 'migration', 'stakeholder'],
      response: `Change can be scary, but we make it FUN! 🎪 We help everyone in your company get excited about new technology! We guide you step by step, make sure everyone understands what's happening, and help the transition be super smooth! No stress, all success! 🌈`
    },
    
    training: {
      keywords: ['training', 'support', 'learn', 'ongoing', 'help', 'staff training', 'team training'],
      response: `Oh yes YES! We LOVE teaching! 🎓 We show your team how to use everything, give them manuals and guides, make fun training sessions, and we're always there to help when they need us! Nobody gets left behind - everyone becomes a tech superstar! 🌟 And we keep helping even after the project is done!`
    },
    
    brandMarketing: {
      keywords: ['brand', 'branding', 'brand management', 'marketing', 'digital marketing', 'seo', 'social media', 'content'],
      response: `Let's make you FAMOUS! 🎨🎉

We can help with:
• Making your brand look super cool
• Getting you on Google's first page (SEO!)
• Running your social media like Instagram & Facebook
• Creating awesome content
• Running ads that actually work
• Tracking everything to see what works best!

We'll make everyone want to work with you! Exciting, right? 🚀`
    },
    
    smeServices: {
      keywords: ['sme', 'small business', 'nigerian sme', 'small medium enterprise'],
      response: `Small businesses are our FAVORITE! 💙 We totally get what it's like to run a business in Nigeria - the challenges, the opportunities, everything! We make solutions that fit your budget and actually work in the real Nigerian market! We want to see you GROW! 🌱✨`
    },
    
    customDevelopment: {
      keywords: ['custom software', 'bespoke', 'tailored', 'specific needs'],
      response: `YES! We build whatever you dream up! 🎨💻 Tell us what you need and we'll create software that does EXACTLY that! It'll be secure, it'll grow with you, and it'll be perfect for your business! No two businesses are the same, so no two solutions should be either! Let's build something amazing together! 🚀`
    },
    
    chooseService: {
      keywords: ['which service', 'right service', 'choose', 'recommend'],
      response: `Let's figure it out together! 🤔💡 Book a free chat with us and we'll talk about your business, what you need, what your dreams are, and then we'll recommend the PERFECT package for you! No pressure, just helpful advice! Ready to start? 😊`
    },
    
    process: {
      keywords: ['process', 'how do you work', 'delivery', 'methodology', 'steps', 'workflow'],
      response: `We have 7 super cool steps! 🎯

1. Discovery (we learn about YOU!)
2. Planning (we design the perfect solution!)
3. Validation (we make sure everything's right!)
4. Implementation (we build it!)
5. Training (we teach everyone!)
6. Monitoring (we watch it work!)
7. Ongoing Support (we're always here!)

Most small business projects take about 4-12 weeks! Big ones take longer but we keep you updated every step! 🚀`
    },
    
    timeline: {
      keywords: ['timeline', 'how long', 'duration', 'timeframe', 'project time'],
      response: `Great question! ⏰ For small and medium businesses, it usually takes about 4 to 12 weeks! For bigger, fancier projects it might take longer! But don't worry - we'll tell you exactly how long YOUR project will take when we chat! Everyone's different! Book a consultation and let's figure it out together! 📅✨`
    },
    
    ongoingSupport: {
      keywords: ['ongoing support', 'after project', 'maintenance', 'continued support'],
      response: `We don't just build stuff and disappear! 💙 We stick around! We offer training, fix any problems, make things better over time, and answer all your questions! You can get this through monthly plans! We're like your tech best friend - always there when you need us! 🤝✨`
    },
    
    success: {
      keywords: ['measure success', 'kpi', 'roi', 'metrics', 'results'],
      response: `We love seeing results! 📊✨ We track things like:
• Are you making more money? (ROI!)
• Is everyone actually using the system?
• Are things running smoother?
• Are people happy?

We use fancy KPIs and reports, but basically we make sure you're getting real value! Numbers don't lie! 🎯`
    },
    
    integration: {
      keywords: ['integration', 'integrate', 'existing systems', 'connect systems'],
      response: `We're like tech matchmakers! 💕 We make all your different systems talk to each other nicely! Your old stuff, new stuff, everything works together smoothly! Data flows everywhere it needs to go, and nothing breaks! It's like magic but it's actually just really good engineering! ✨`
    },
    
    workflowAnalysis: {
      keywords: ['workflow', 'process analysis', 'bottleneck', 'efficiency'],
      response: `Oh we LOVE finding problems and fixing them! 🔍 We look at how you do things now, find the slow parts, the confusing parts, the annoying parts... and then BOOM! We recommend ways to make everything faster and easier! It's like a makeover for your business processes! 🎨✨`
    },
    
    optimizeExisting: {
      keywords: ['optimize', 'improve', 'enhance', 'existing system', 'without replacement'],
      response: `Don't throw away the baby with the bathwater! 🛁 If your current system works okay, we can make it work GREAT! We don't force you to replace everything - we just make what you have better, faster, and more connected! Smart upgrades, not wasteful spending! 💡`
    },
    
    pricing: {
      keywords: ['price', 'cost', 'pricing', 'package', 'packages', 'how much', 'fee', 'payment'],
      response: `Let's talk money! 💰

**Standard Package**: Starts at ₦750,000
**Premium Package**: More features & support!
**Enterprise Package**: For the big players!
**Custom/Bespoke**: Mix and match anything you want!

We also do monthly subscriptions, give discounts for long-term deals, and you can pay in parts (30% at start, rest as we finish things)! 

Want exact numbers for YOUR project? Let's book a free consultation! 🎯✨`
    },
    
    customSolutions: {
      keywords: ['custom solution', 'bespoke solution', 'tailored package', 'unique needs'],
      response: `YOUR business is special, so your solution should be too! 🎨 Our Custom/Bespoke package is like a buffet - pick whatever you need! Multiple services, special features, whatever makes sense for YOU! Let's have a discovery call and design something perfect! Ready? 😊✨`
    },
    
    subscription: {
      keywords: ['subscription', 'monthly', 'retainer', 'recurring'],
      response: `Monthly plans are AWESOME! 📅💙 You get:
• Ongoing support whenever you need it
• Regular training updates
• System improvements
• Marketing campaigns running all the time

It's like having a tech team on call! And it grows with you! Pay monthly, get value forever! 🚀`
    },
    
    consultation: {
      keywords: ['consultation', 'schedule', 'appointment', 'meeting', 'book', 'free consultation'],
      response: `Let's chat! It's FREE! 🎉

📧 Email: info@innosphereconsulting.com
📱 WhatsApp: On our website!
🌐 Book Online: Just click the button!

We'll respond super fast (within 24 hours!) and we can meet on Zoom, Teams, or Google Meet! Or in person if you're in Lagos! 

Ready to start your transformation? Let's goooo! 🚀✨`
    },
    
    discount: {
      keywords: ['discount', 'discounts', 'savings', 'long-term'],
      response: `Who doesn't love saving money? 💰✨ Yes! If you sign up for a long time or get multiple services, we'll give you sweet discounts! The more you commit, the more you save! Let's talk and I'll tell you all the ways we can make it affordable! 🎁`
    },
    
    paymentStructure: {
      keywords: ['payment structure', 'how to pay', 'payment terms', 'deposit'],
      response: `Super simple! 💳 Usually it's:
• 30% upfront (to get started!)
• Rest when we hit milestones!
• Or monthly if you prefer!

We're flexible! We'll figure out what works for YOU during our consultation! No scary surprise fees! 😊✨`
    },
    
    scalable: {
      keywords: ['scalable', 'grow', 'growing business', 'expansion'],
      response: `Growing? YAY! 🌱🚀 Our solutions grow WITH you! Need more users? No problem! Need more features? We got you! Want to add more services? Easy peasy! We build everything thinking about tomorrow, not just today! Your success is our success! 💙✨`
    },
    
    combineServices: {
      keywords: ['combine services', 'multiple services', 'bundle'],
      response: `Mix and match time! 🎨 Our Custom/Bespoke package lets you combine ANYTHING you want! Want digital transformation + marketing + training? Done! Want software development + brand management? Perfect! We'll bundle it all up into one awesome package! 🎁✨`
    },
    
    enterprisePricing: {
      keywords: ['enterprise pricing', 'large business', 'big company', 'negotiable'],
      response: `Big businesses get special treatment! 🏢✨ We'll sit down, understand your massive needs, and create custom pricing just for you! Every enterprise is different, so we talk one-on-one to make it perfect! Book a consultation and let's chat about your empire! 👑`
    },
    
    contact: {
      keywords: ['contact', 'reach', 'get in touch', 'email', 'phone', 'call'],
      response: `SO many ways to reach us! Pick your favorite! 🎉

📧 Email: info@innosphereconsulting.com
📱 Phone: +234 XXX XXX XXXX
💬 WhatsApp: Link on our website!
🌐 Website Form: Super easy!

We promise to reply within 24 hours! We're excited to hear from you! 😊💙`
    },
    
    whatsapp: {
      keywords: ['whatsapp', 'chat', 'instant message'],
      response: `WhatsApp is perfect for quick chats! 💬✨ Just click our WhatsApp link on the website and BOOM - instant connection to a real consultant! We love WhatsApp! So fast, so easy! Let's chat! 🚀`
    },
    
    virtual: {
      keywords: ['virtual', 'online meeting', 'remote', 'zoom', 'teams'],
      response: `Virtual meetings are our JAM! 💻✨ We use Zoom, Teams, or Google Meet - whatever you like! Super convenient - you don't even have to leave your office (or home!). Book your time and let's meet in the cloud! ☁️😊`
    },
    
    visitOffice: {
      keywords: ['visit', 'office visit', 'come to office', 'in person'],
      response: `Come see us in person! 🏢 We're in Lagos! Just book an appointment first so we're ready for you! We'd love to meet face-to-face, show you around, and have a good old-fashioned chat! Coffee's on us! ☕😊`
    },
    
    demo: {
      keywords: ['demo', 'demonstration', 'show me', 'preview'],
      response: `DEMOS ARE SO FUN! 🎮✨ We can show you how our SaaS/PaaS platforms work, what digital transformation looks like in action, all the cool stuff! Just book through our consultation page and we'll prepare an awesome demo just for YOU! Get ready to be wowed! 🌟`
    },
    
    newsletter: {
      keywords: ['newsletter', 'subscribe', 'insights', 'blog', 'updates'],
      response: `Stay in the loop! 📬✨ Put your email on our website under Insights/Blog and get monthly goodies:
• Cool tech tips
• Industry news
• Transformation stories
• Helpful guides

Knowledge is power! Let's keep you powered up! 💪😊`
    },
    
    responseTime: {
      keywords: ['response time', 'how fast', 'quickly', 'how soon'],
      response: `We're FAST! ⚡ We try to respond within 24 hours to everything - emails, WhatsApp, contact forms! For super urgent stuff, just call us directly! We don't like keeping people waiting! Time is precious! ⏰💙`
    }
    
  };

  const findBestMatch = (userInput) => {
    const input = userInput.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;

    for (const [key, data] of Object.entries(knowledgeBase)) {
      let score = 0;
      for (const keyword of data.keywords) {
        if (input.includes(keyword)) {
          score += keyword.split(' ').length;
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = data;
      }
    }

    return highestScore > 0 ? bestMatch : null;
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    resetInactivityTimer();

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const match = findBestMatch(input);
      const botResponse = match 
        ? { type: 'bot', text: match.response }
        : { 
            type: 'bot', 
            text: "Hmm, I'm not totally sure what you mean! 🤔 But don't worry! Can you ask me about:\n\n• Our services (we do SO much!)\n• Pricing (let's talk money!)\n• Booking a consultation (it's free!)\n• How we work\n• Industries we help\n• How to contact us\n\nOr just book a free consultation and we'll figure it out together! 🎉" 
          };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "What services do you offer?",
    "How much does it cost?",
    "Book a consultation",
    "Tell me about your company"
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
    resetInactivityTimer();
    setShowQuickQuestions(false);
    setTimeout(() => handleSend(), 100);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
        >
          <MessageCircle size={28} />
        </button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-80">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-2xl flex justify-between items-center shadow-xl cursor-pointer"
             onClick={() => setIsMinimized(false)}>
          <div className="flex items-center gap-3">
            <MessageCircle size={24} />
            <span className="font-semibold">Innosphere Consulting</span>
          </div>
          <X size={20} onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="cursor-pointer hover:bg-white/20 rounded p-1" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <MessageCircle size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Innosphere Consulting</h3>
            <p className="text-xs text-blue-100">Always here to help</p>
          </div>
        </div>
        <div className="flex gap-2">
          <MinusCircle size={20} onClick={() => setIsMinimized(true)} className="cursor-pointer hover:bg-white/20 rounded p-1" />
          <X size={20} onClick={() => setIsOpen(false)} className="cursor-pointer hover:bg-white/20 rounded p-1" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
        {isTyping && messages.length === 0 && (
          <div className="mb-4 flex justify-start">
            <div className="max-w-[80%] p-3 rounded-2xl bg-white text-gray-800 shadow-md rounded-bl-none border border-gray-100">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${
              msg.type === 'user' 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none' 
                : 'bg-white text-gray-800 shadow-md rounded-bl-none border border-gray-100'
            }`}>
              <p className="text-sm whitespace-pre-line">{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && messages.length > 0 && (
          <div className="mb-4 flex justify-start">
            <div className="max-w-[80%] p-3 rounded-2xl bg-white text-gray-800 shadow-md rounded-bl-none border border-gray-100">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {showQuickQuestions && messages.length === 1 && (
        <div className="px-4 pb-3 flex gap-2 flex-wrap">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickQuestion(q)}
              className="text-xs bg-blue-50 text-blue-600 px-3 py-2 rounded-full hover:bg-blue-100 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full p-2 hover:shadow-lg transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeChatbot;