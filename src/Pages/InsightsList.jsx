import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle, BookOpen, Clock, Calendar } from 'lucide-react';
import insightsData from '../Components/insightsData';

const InsightsList = () => {
  const heroRef = useRef(null);
  const cardsRef = useRef([]);
  const [showAll, setShowAll] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.style.opacity = '0';
      heroRef.current.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        heroRef.current.style.transition = 'all 0.8s ease-out';
        heroRef.current.style.opacity = '1';
        heroRef.current.style.transform = 'translateY(0)';
      }, 100);
    }

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.15}s`;
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, [showAll]);

  const insights = insightsData.insights;
  const displayedInsights = showAll ? insights : insights.slice(0, 3);

  const handleInsightClick = (slug) => {
    window.location.href = `/Innosphere_Consulting/insights/${slug}`;
  };

  const handleSubscribe = () => {
    if (email) {
      console.log('Newsletter subscription:', email);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0"></div>
        <div ref={heroRef} className="container mx-auto px-6 pt-32 pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80" 
                alt="Insights" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Right - Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-block mb-6">
                <span className="text-sm font-semibold tracking-wider text-[#6b9dc7] uppercase bg-[#6b9dc7]/30 px-4 py-2 rounded-full border border-[#6b9dc7]/50">
                  Knowledge Hub
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
                Insights & <span className="text-[#6b9dc7]">Thought Leadership</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl">
                Expert perspectives on the latest trends, strategies, and innovations shaping the future of business transformation across Nigeria and West Africa.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="container mx-auto px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Latest Insights
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Strategic thinking and actionable insights from our consulting experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedInsights.map((insight, index) => (
              <div
                key={insight.id}
                ref={el => cardsRef.current[index] = el}
                className="  overflow-hidden hover:shadow-xl hover:shadow-[#6b9dc7]/20 transition-all duration-300 cursor-pointer group flex flex-col"
                onClick={() => handleInsightClick(insight.slug)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={insight.image}
                    alt={insight.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                  {insight.featured && (
                    <div className="absolute top-6 left-6">
                      <span className="inline-block bg-yellow-500/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg text-sm font-bold">
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-6 left-6">
                    <span className="inline-block bg-gray-900/90 backdrop-blur-sm text-[#6b9dc7] px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide">
                      {insight.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3  transition-colors line-clamp-2">
                    {insight.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {insight.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-800">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{insight.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{insight.readTime}</span>
                    </div>
                  </div>

                  <button className="inline-flex items-center text-[#6b9dc7] font-semibold hover:text-[#6b9dc7] transition-colors group/btn">
                    <span>Read More</span>
                    <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {insights.length > 3 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center justify-center bg-[#6b9dc7] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6b9dc7] transition-all duration-300 shadow-lg shadow-[#6b9dc7]/30 hover:shadow-[#6b9dc7]/50"
              >
                <span>{showAll ? 'Show Less' : 'Show More Insights'}</span>
                <ArrowRight 
                  size={20} 
                  className={`ml-2 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} 
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Why Read Our Insights Section */}
      <div className="">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Why Read Our Insights?
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Our insights are grounded in real-world consulting experience and deep industry expertise. We share practical knowledge that helps leaders make better decisions.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold mb-1">Practical Expertise</div>
                      <div className="text-gray-400 text-sm">Real-world insights from 100+ consulting projects across Africa</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold mb-1">Industry-Specific Content</div>
                      <div className="text-gray-400 text-sm">Tailored perspectives on financial services, healthcare, energy, and more</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold mb-1">Local & Global Perspectives</div>
                      <div className="text-gray-400 text-sm">Bridging Nigerian market dynamics with international best practices</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold mb-1">Actionable Strategies</div>
                      <div className="text-gray-400 text-sm">Frameworks and approaches you can implement immediately</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#6b9dc7]/20 border border-[#6b9dc7]/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#6b9dc7] mb-2">50+</div>
                  <div className="text-gray-300 text-sm">Published Articles</div>
                </div>
                <div className="bg-[#6b9dc7]/20 border border-[#6b9dc7]/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#6b9dc7] mb-2">10K+</div>
                  <div className="text-gray-300 text-sm">Monthly Readers</div>
                </div>
                <div className="bg-[#6b9dc7]/20 border border-[#6b9dc7]/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#6b9dc7] mb-2">15+</div>
                  <div className="text-gray-300 text-sm">Industry Topics</div>
                </div>
                <div className="bg-[#6b9dc7]/20 border border-[#6b9dc7]/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#6b9dc7] mb-2">3×</div>
                  <div className="text-gray-300 text-sm">Weekly Updates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter CTA Section */}
      <div className="">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#6b9dc7]/20 border border-[#6b9dc7]/30 rounded-2xl mb-6">
              <BookOpen className="text-[#6b9dc7]" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Never Miss an Insight
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Subscribe to our newsletter for the latest insights, industry trends, and strategic perspectives delivered directly to your inbox.
            </p>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                console.log('Newsletter subscription:', email);
                e.target.reset();
              }}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-[#6b9dc7] focus:ring-2 focus:ring-[#6b9dc7]/20 transition-all"
                />
                <button 
                  type="submit"
                  className="inline-flex items-center justify-center bg-[#6b9dc7] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6b9dc7] transition-colors shadow-lg shadow-[#6b9dc7]/30 whitespace-nowrap"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="ml-2" size={20} />
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                Join over 100 professionals staying ahead of the curve
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsList;