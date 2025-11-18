import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Linkedin, Twitter, Facebook } from 'lucide-react';
import insightsData from '../Components/insightsData';

const InsightDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');

  // Find the article based on slug
  const article = insightsData.insights.find(insight => insight.slug === slug);

  // If article not found, redirect to insights list
  useEffect(() => {
    if (!article) {
      navigate('/insights');
    }
  }, [article, navigate]);

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
      threshold: 0.3,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleBack = () => {
    navigate('/insights');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = article.title;
    
    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  // If article is not found, return null (will redirect)
  if (!article) {
    return null;
  }

  return (
    <div className=" bg-slate-950">
      {/* Hero Section */}
      <div className="relative">
        <div 
          ref={heroRef}
          className="container mx-auto px-6 pt-24 "
        >
       

          <div className="max-w-7xl mx-auto pt-10">
            <span className="inline-block text-[#6b9dc7] text-sm font-semibold tracking-wider uppercase mb-4">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="mr-2" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Article Content */}
            <article ref={contentRef} className="lg:col-span-8">
              {/* Hero Image */}
              <div className="relative rounded-xl overflow-hidden mb-12 shadow-2xl">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              </div>

              {/* Introduction */}
              <div data-section id="introduction" className="mb-12">
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {article.content.intro}
                </p>
              </div>

              {/* Main Sections */}
              {article.content.sections.map((section, index) => (
                <div 
                  key={index}
                  data-section 
                  id={`section-${index}`}
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold text-white mb-6">
                    {section.heading}
                  </h2>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {section.body}
                  </p>
                </div>
              ))}

              {/* Author Note as Conclusion */}
              {article.content.authorNote && (
                <div data-section id="conclusion" className="mb-12 bg-blue-900/20 border border-blue-800/50 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Final Thoughts
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed italic">
                    {article.content.authorNote}
                  </p>
                </div>
              )}

              {/* Author Section */}
              <div className="mt-16 pt-12 border-t border-gray-800">
                <h3 className="text-2xl font-bold text-white mb-8">About the Author</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 rounded-full bg-[#6b9dc7] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {article.author.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">
                        {article.author.name}
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        {article.author.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Share Section */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Share2 size={20} className="mr-2" />
                    Share Article
                  </h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin size={20} className="mx-auto" />
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex-1 bg-[#6b9dc7] hover:bg-blue-500 text-white p-3 rounded-lg transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter size={20} className="mx-auto" />
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex-1 bg-blue-800 hover:bg-blue-900 text-white p-3 rounded-lg transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook size={20} className="mx-auto" />
                    </button>
                  </div>
                </div>

                {/* Table of Contents */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Table of Contents
                  </h3>
                  <nav>
                    <ul className="space-y-3">
                      <li>
                        <a
                          href="#introduction"
                          className={`block text-sm hover:text-[#6b9dc7] transition-colors ${
                            activeSection === 'introduction' ? 'text-[#6b9dc7] font-semibold' : 'text-gray-400'
                          }`}
                        >
                          Introduction
                        </a>
                      </li>
                      {article.content.sections.map((section, index) => (
                        <li key={index}>
                          <a
                            href={`#section-${index}`}
                            className={`block text-sm hover:text-[#6b9dc7] transition-colors ${
                              activeSection === `section-${index}` ? 'text-[#6b9dc7] font-semibold' : 'text-gray-400'
                            }`}
                          >
                            {section.heading}
                          </a>
                        </li>
                      ))}
                      {article.content.authorNote && (
                        <li>
                          <a
                            href="#conclusion"
                            className={`block text-sm hover:text-[#6b9dc7] transition-colors ${
                              activeSection === 'conclusion' ? 'text-[#6b9dc7] font-semibold' : 'text-gray-400'
                            }`}
                          >
                            Final Thoughts
                          </a>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>

                {/* Related Articles */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Related Insights
                  </h3>
                  <div className="space-y-4">
                    {insightsData.insights
                      .filter(insight => insight.id !== article.id)
                      .slice(0, 3)
                      .map((relatedArticle, index) => (
                        <a
                          key={index}
                          href={`/Innosphere_Consulting/insights/${relatedArticle.slug}`}
                          className="block group"
                        >
                          <div className="text-sm text-[#6b9dc7] mb-1">
                            {relatedArticle.category}
                          </div>
                          <div className="text-white group-hover:text-[#6b9dc7] transition-colors font-semibold">
                            {relatedArticle.title}
                          </div>
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className=" mt-4">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Want More Insights?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Subscribe to our newsletter for the latest articles and industry trends.
            </p>
            <button 
              onClick={() => navigate('/insights')}
              className="bg-[#6b9dc7] hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-900/30"
            >
              View All Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightDetails;