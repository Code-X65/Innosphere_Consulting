import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles, ChevronRight } from 'lucide-react';
import solutionsData from '../Solution';
import { trackCTAConversion } from '../utils/analytics';

// Approach Carousel Component with Background Images
const ApproachCarousel = ({ approach }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);

  // Background images for each approach step
  const backgroundImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=600&fit=crop', // Analytics/Discovery
    'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&h=600&fit=crop', // Strategy/Planning
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=600&fit=crop', // Implementation
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=600&fit=crop', // Team collaboration
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=600&fit=crop', // Optimization
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=600&fit=crop', // Support
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isDragging) return;

    const autoScroll = setInterval(() => {
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 0.5;
      }
    }, 30);

    return () => clearInterval(autoScroll);
  }, [isDragging]);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pb-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {approach.map((item, index) => (
          <div
            key={item.id}
            className="relative flex-shrink-0 w-[300px] md:w-[340px] lg:w-[380px] group"
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Card */}
            <div className={`relative h-[420px] md:h-[460px] rounded-2xl overflow-hidden transition-all duration-500 ${
              hoveredCard === index ? 'shadow-2xl shadow-[#6b9dc7]/30 scale-105' : 'shadow-xl'
            }`}>
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{
                  backgroundImage: `url(${backgroundImages[index % backgroundImages.length]})`,
                  transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)'
                }}
              />
              
              {/* Dark Overlay - Lighter on hover to show image more */}
              <div className={`absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95 transition-opacity duration-500 ${
                hoveredCard === index ? 'opacity-70' : 'opacity-95'
              }`} />
              
              {/* Animated Gradient Overlay - Visible on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br from-[#6b9dc7]/20 via-[#6b9dc7]/20 to-purple-600/20 transition-opacity duration-500 ${
                hoveredCard === index ? 'opacity-100' : 'opacity-0'
              }`} />
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
                {/* Step Number Badge */}
                <div>
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#6b9dc7] to-[#6b9dc7] rounded-xl shadow-lg">
                    <span className="text-white font-bold text-2xl">{item.id}</span>
                  </div>
                </div>

                {/* Title - Always visible */}
                <div className={`transition-all duration-500 ${
                  hoveredCard === index ? 'opacity-0 transform -translate-y-4' : 'opacity-100'
                }`}>
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight text-white drop-shadow-lg">
                    {item.title}
                  </h3>
                </div>

                {/* Expanded Content - Visible on hover */}
                <div className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-between transition-all duration-500 ${
                  hoveredCard === index 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}>
                  <div>
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#6b9dc7] to-[#6b9dc7] rounded-xl shadow-lg mb-6">
                      <span className="text-white font-bold text-2xl">{item.id}</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-4 text-white drop-shadow-lg">
                      {item.title}
                    </h3>
                    
                    <p className="text-base md:text-lg text-white leading-relaxed drop-shadow-md">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold drop-shadow-lg">
                    <span className="text-sm">Step {item.id}</span>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Animated Border on Hover */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-cyan-400 transition-opacity duration-500 ${
                hoveredCard === index ? 'opacity-100' : 'opacity-0'
              }`} />
            </div>
          </div>
        ))}
      </div>


      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

const SolutionDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const solution = solutionsData.solutions.find(s => s.slug === slug);

  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const descRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!solution) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Solution Not Found</h2>
          <button
            onClick={() => navigate('/service')}
            className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Solutions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-35 bg-slate-950 text-white">
   {/* Hero Section - Split Layout */}
      <div className="relative  px-6 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Side - Illustration */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="relative">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-[#6b9dc7]/20 rounded-full blur-3xl"></div>
                
                {/* Tech illustration placeholder - you can replace with actual SVG */}
                <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl  border border-slate-700/50">
                <img src="https://media.istockphoto.com/id/2162329881/video/two-businessmen-working-on-a-digital-tablet-and-laptop-computer-in-the-office-a-board-room-or.avif?s=640x640&k=20&c=WE-nvPG5fkbuxEn-t-TZ70_j3kUCeDhfMZB0IhrqQG8=" alt="" />
                </div>
              </div>
            </div>

            {/* Right Side - Title and Description */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold mb-8 leading-tight">
                {solution.title}
              </h1>
              <p className="text-sm md:text-lg text-gray-300 leading-relaxed mb-8">
                {solution.fullDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-4">


        {/* Our Approach Section */}
        <div className={` transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="mb-6 md:mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-[#6b9dc7] to-[#6b9dc7]"></div>
              <span className="text-cyan-400 font-semibold uppercase tracking-wider text-sm">
                Our Methodology
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              OUR <span className="bg-gradient-to-r from-[#6b9dc7] to-[#6b9dc7] bg-clip-text text-transparent">APPROACH</span>
            </h2>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl">
              A systematic methodology designed to deliver exceptional results
            </p>
          </div>

          {/* Scrollable Approach Cards */}
          <ApproachCarousel approach={solution.approach} />
        </div>

        {/* CTA Section */}
        <div className={`mt-4 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="rounded-3xl p-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              What your next big move ?
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              We are a professional, enthusiastic and innovative team, dedicated to providing professional
              Management Consulting Services and evolving people management that help our clients
              become more productive and profitable.
            </p>
           <Link to='/consultation'> 
             <button 
               onClick={() => {
                 trackCTAConversion('Get Started', 'Homepage Hero');
               }} 
               className="bg-gradient-to-r from-[#6b9dc7] to-[#6b9dc7] hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#6b9dc7]/50 flex gap-2 items-center justify-center mx-auto"
             >
              Book A free consultation <ArrowRight />
            </button>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -30px);
          }
        }
      `}</style>
    </div>
  );
};

export default SolutionDetail;