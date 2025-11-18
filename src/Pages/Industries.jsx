import React, { useEffect, useRef, useState } from 'react';
import { Building2, Heart, Zap, Landmark, ShoppingCart, TrendingUp, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Industries = () => {
  const heroRef = useRef(null);
  const industriesRef = useRef([]);
  const [flippedCard, setFlippedCard] = useState(null);
const [showAll, setShowAll] = useState(false);

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

    industriesRef.current.forEach((card, index) => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.15}s`;
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, []);

  const industries = [
    {
      id: 1,
      name: "Financial Services & Fintech",
      slug: "financial-services",
      icon: TrendingUp,
      tagline: "Enabling Digital Platforms and Data-Driven Operations",
      description: "We partner with banks, insurance companies, and fintech startups across Nigeria and West Africa to accelerate digital transformation and unlock new revenue streams through innovative financial technology solutions.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      capabilities: [
        "Digital banking platform modernization",
        "Payment system integration and optimization",
        "Risk management and compliance automation",
        "Customer data analytics and personalization",
        "Mobile and online banking solutions",
        "Blockchain and cryptocurrency advisory"
      ],
      outcomes: [
        "40% reduction in transaction processing time",
        "60% increase in digital channel adoption",
        "Enhanced regulatory compliance",
        "Improved customer satisfaction scores"
      ]
    },
    {
      id: 2,
      name: "Healthcare & MedTech",
      slug: "healthcare",
      icon: Heart,
      tagline: "Supporting Innovation and Patient Experience Transformation",
      description: "From hospitals to health tech startups, we help healthcare organizations in Lagos, Abuja, and Port Harcourt leverage technology to improve patient outcomes, streamline operations, and deliver exceptional care experiences.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      capabilities: [
        "Electronic Health Records (EHR) implementation",
        "Telemedicine platform development",
        "Patient engagement and portal solutions",
        "Healthcare analytics and reporting",
        "Medical device integration",
        "Regulatory compliance management"
      ],
      outcomes: [
        "50% reduction in administrative workload",
        "30% improvement in patient satisfaction",
        "Enhanced care coordination",
        "Streamlined clinical workflows"
      ]
    },
    {
      id: 3,
      name: "Energy & Infrastructure",
      slug: "energy-infrastructure",
      icon: Zap,
      tagline: "Driving Efficiency Through Automation and Analytics",
      description: "We support energy companies and infrastructure providers across Nigeria in optimizing operations, enhancing safety, and preparing for the future of sustainable energy through digital innovation.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
      capabilities: [
        "Smart grid and energy management systems",
        "Predictive maintenance solutions",
        "Asset performance optimization",
        "Supply chain digitization",
        "Safety and compliance monitoring",
        "Renewable energy integration"
      ],
      outcomes: [
        "25% improvement in operational efficiency",
        "Reduced downtime and maintenance costs",
        "Enhanced safety compliance",
        "Better resource allocation"
      ]
    },
    {
      id: 4,
      name: "Public Sector",
      slug: "public-sector",
      icon: Landmark,
      tagline: "Aligning Digital Strategy with National Innovation Agenda",
      description: "We work with government agencies and public institutions to modernize service delivery, improve citizen engagement, and drive digital transformation aligned with Nigeria's national development goals.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      capabilities: [
        "E-government platform development",
        "Citizen service digitization",
        "Data governance and security",
        "Process automation and optimization",
        "Change management for digital adoption",
        "Performance measurement frameworks"
      ],
      outcomes: [
        "Improved service delivery times",
        "Enhanced citizen satisfaction",
        "Transparent and efficient operations",
        "Data-driven policy making"
      ]
    },
    {
      id: 5,
      name: "Retail & E-commerce",
      slug: "retail-ecommerce",
      icon: ShoppingCart,
      tagline: "Scaling Digital Sales Channels and Customer Engagement",
      description: "From traditional retailers to digital-first brands, we help Nigerian businesses build compelling online experiences, optimize operations, and compete effectively in the digital marketplace.",
      image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80",
      capabilities: [
        "E-commerce platform development",
        "Omnichannel retail strategy",
        "Customer relationship management (CRM)",
        "Inventory and supply chain optimization",
        "Digital marketing and analytics",
        "Payment gateway integration"
      ],
      outcomes: [
        "120% growth in online sales",
        "Enhanced customer lifetime value",
        "Improved inventory turnover",
        "Seamless omnichannel experience"
      ]
    }
  ];
const displayedIndustries = showAll ? industries : industries.slice(0, 3);
  return (
    <div className=" bg-slate-950 pt-4">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div ref={heroRef} className="container mx-auto px-6 pt-32 pb-2 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" 
                alt="Industries" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Right - Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-block mb-6">
                <span className="text-sm font-semibold tracking-wider text-[#6b9dc7] uppercase bg-[#6b9dc7]/30 px-4 py-2 rounded-full border border-[#6b9dc7]/50">
                  Industry Expertise
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Transforming Industries Across <span className="text-[#6b9dc7]">Nigeria & West Africa</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl">
                We serve clients across multiple sectors in Nigeria and the West African region, each with distinct growth and transformation needs. Our deep industry knowledge combined with technical expertise delivers measurable results.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Industries Grid */}
      <div className="container mx-auto px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Industries We Serve
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Tailored solutions designed for the unique challenges and opportunities in each sector
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedIndustries.map((industry, index) => (
              <div
                key={industry.id}
                ref={el => industriesRef.current[index] = el}
                className="relative h-[500px]"
                style={{ perspective: '1000px' }}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 cursor-pointer`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flippedCard === industry.id ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                  onClick={() => setFlippedCard(flippedCard === industry.id ? null : industry.id)}
                >
                  {/* Front of Card */}
                  <div
                    className="absolute w-full h-full  overflow-hidden   transition-colors duration-300"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-68 overflow-hidden rounded-xl">
                      <img
                        src={industry.image}
                        alt={industry.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 "></div>
                      <div className="absolute top-6 left-6">
                        <div className="bg-[#6b9dc7]/80 backdrop-blur-sm w-14 h-14 rounded-xl flex items-center justify-center">
                          <industry.icon className="text-[#6b9dc7]" size={28} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 ">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {industry.name}
                      </h3>
                      <p className="text-[#6b9dc7] text-xs font-semibold mb-4 uppercase tracking-wide">
                        {industry.tagline}
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        {industry.description}
                      </p>

                      <button className="inline-flex items-center text-[#6b9dc7] font-semibold hover:text-[#6b9dc7] transition-colors group">
                        <span>Learn More</span>
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div
                    className="absolute w-full h-full rounded-2xl overflow-hidden "
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="p-6 h-full overflow-y-auto">
                      {/* Back Button */}
                      <button 
                        className="inline-flex items-center text-[#6b9dc7] font-semibold hover:text-[#6b9dc7] transition-colors mb-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlippedCard(null);
                        }}
                      >
                        <ArrowLeft size={18} className="mr-2" />
                        <span>Back</span>
                      </button>

                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <industry.icon className="text-[#6b9dc7]" size={24} />
                        {industry.name}
                      </h3>

                      {/* Capabilities */}
                      <div className="mb-6">
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <Building2 size={18} className="text-[#6b9dc7]" />
                          Our Capabilities
                        </h4>
                        <ul className="space-y-2">
                          {industry.capabilities.map((capability, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                              <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-0.5" size={14} />
                              <span>{capability}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Outcomes */}
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp size={18} className="text-[#6b9dc7]" />
                          Typical Outcomes
                        </h4>
                        <ul className="space-y-2">
                          {industry.outcomes.map((outcome, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                              <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={14} />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
           {/* Show More/Less Button */}
          {industries.length > 3 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center justify-center bg-[#6b9dc7] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6b9dc7] transition-all duration-300 shadow-lg shadow-[#6b9dc7]/30 hover:shadow-[#6b9dc7]/50"
              >
                <span>{showAll ? 'Show Less' : 'Show More Industries'}</span>
                <ArrowRight 
                  size={20} 
                  className={`ml-2 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} 
                />
              </button>
            </div>
          )}
        
    
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="">
        <div className="container mx-auto px-6 py-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Why Partner With Us?
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Our deep industry expertise combined with proven methodologies ensures that your transformation initiatives deliver tangible business value. We understand the unique challenges facing Nigerian businesses and have the track record to prove it.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold mb-1">Local Expertise, Global Standards</div>
                      <div className="text-gray-400 text-sm">Deep understanding of Nigerian market dynamics with international best practices</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold mb-1">Proven Track Record</div>
                      <div className="text-gray-400 text-sm">100+ successful projects across multiple industries in Lagos, Abuja, and Port Harcourt</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold mb-1">End-to-End Partnership</div>
                      <div className="text-gray-400 text-sm">From strategy to implementation and beyond, we're with you every step of the way</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold mb-1">Results-Driven Approach</div>
                      <div className="text-gray-400 text-sm">Focus on measurable outcomes that impact your bottom line</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#6b9dc7]/20 border border-[#6b9dc7]/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#6b9dc7] mb-2">95%</div>
                  <div className="text-gray-300 text-sm">Client Retention Rate</div>
                </div>
                <div className="bg-[#6b9dc7]/20 border border-[#6b9dc7]/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#6b9dc7] mb-2">100+</div>
                  <div className="text-gray-300 text-sm">Projects Delivered</div>
                </div>
                <div className="bg-[#6b9dc7]/20 border border-[#6b9dc7]/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#6b9dc7] mb-2">15+</div>
                  <div className="text-gray-300 text-sm">Years Combined Experience</div>
                </div>
                <div className="bg-[#6b9dc7]/20 border border-[#6b9dc7]/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#6b9dc7] mb-2">50+</div>
                  <div className="text-gray-300 text-sm">Enterprise Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Industry?
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how our industry expertise can help your organization achieve its digital transformation goals. Schedule a consultation with our experts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/consultation" >  <button 
                className="inline-flex items-center justify-center bg-[#6b9dc7] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6b9dc7] transition-colors shadow-lg shadow-[#6b9dc7]/30"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="ml-2" size={20} />
              </button>
              </Link>
              <Link to="/cases">
              <button 
                className="inline-flex items-center justify-center bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors border border-gray-700"
              >
                <span>View Case Studies</span>
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Industries;