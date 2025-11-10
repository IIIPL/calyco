import React, { useState } from 'react';
import SEO from '../components/SEO';
import { getButtonClasses } from '../data/admin/typography';

const ProductFinder = () => {
  // Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState({
    surface: '',
    concern: '',
    environment: '',
    finish: '',
    applicator: ''
  });

  const totalQuestions = 5;

  // Product Definitions
  const products = {
    latexPaint: {
      name: 'Calyco Latex Paint',
      icon: '🎨',
      tagline: 'Premium Interior Paint for Modern Living Spaces',
      benefits: [
        'One-coat coverage for faster project completion',
        'Stain-blocking technology keeps walls pristine',
        'Scrub-resistant finish withstands daily cleaning',
        'UV-protected formula prevents fading and yellowing',
        'Low-VOC formula for healthier indoor air quality',
        'Subtle sheen finish for elegant, modern aesthetics'
      ],
      specs: {
        coverage: '400-450 sq ft per gallon',
        drying: '1-2 hours touch dry, 4-6 hours recoat',
        finish: 'Subtle Sheen / Low Luster',
        surfaces: 'Drywall, Plaster, Primed Surfaces',
        application: 'Brush, Roller, or Spray',
        warranty: '10 Years'
      },
      idealFor: 'Interior residential walls, living rooms, bedrooms, climate-controlled spaces'
    },
    stainSealer: {
      name: 'Calyco Waterproofing Sealer',
      icon: '🛡️',
      tagline: 'Heavy-Duty Multi-Surface Protection for Demanding Environments',
      benefits: [
        'Multi-surface adhesion: concrete, metal, wood, plaster, asphalt, tile',
        '100% waterproof barrier blocks moisture penetration',
        'UV-resistant formula prevents sun damage and degradation',
        'Breathable barrier allows surface moisture to escape',
        'Anti-corrosive protection extends equipment lifespan',
        '5-10 years outdoor durability in harsh conditions',
        'Flat finish provides professional, uniform appearance'
      ],
      specs: {
        coverage: '300-350 sq ft per gallon',
        drying: '2-4 hours touch dry, 24 hours full cure',
        finish: 'Flat / Matte',
        surfaces: 'Concrete, Metal, Wood, Plaster, Asphalt, Tile',
        application: 'Brush, Roller, or Spray',
        warranty: '10 Years'
      },
      idealFor: 'Exterior walls, decks, machinery, equipment, infrastructure, industrial facilities'
    },
    waterproofSealer: {
      name: 'Calyco Waterproof Sealer',
      icon: '💧',
      tagline: 'Maximum Moisture Protection & Waterproofing Technology',
      benefits: [
        '100% waterproof barrier prevents water infiltration',
        'Blocks moisture penetration in below-grade applications',
        'Breathable formula prevents trapped moisture buildup',
        'Crystal-clear or tinted options preserve natural aesthetics',
        'Flexible membrane accommodates surface movement',
        'Mold and mildew resistant formulation',
        'Long-lasting protection for water-exposed surfaces',
        'Safe for potable water contact areas'
      ],
      specs: {
        coverage: '250-300 sq ft per gallon',
        drying: '4-6 hours touch dry, 48 hours full cure',
        finish: 'Clear / Transparent or Tinted',
        surfaces: 'Concrete, Masonry, Cement, Foundation Walls',
        application: 'Brush, Roller, or Spray',
        warranty: '15 Years'
      },
      idealFor: 'Basements, foundations, bathrooms, pool areas, roofs, below-grade walls, water tanks'
    }
  };

  // Questions
  const questions = [
    {
      id: 'surface',
      number: '01',
      title: 'What surface are you coating?',
      options: [
        { value: 'interior-walls', label: 'Interior walls (residential)' },
        { value: 'exterior-walls', label: 'Exterior walls (residential/commercial)' },
        { value: 'concrete-masonry', label: 'Concrete or masonry' },
        { value: 'metal', label: 'Metal surfaces (machinery, equipment, automotive)' },
        { value: 'wood', label: 'Wood (furniture, decks, structures)' },
        { value: 'mixed', label: 'Mixed surfaces (warehouse, industrial facility)' }
      ]
    },
    {
      id: 'concern',
      number: '02',
      title: "What's your primary concern?",
      options: [
        { value: 'durability', label: 'Durability & longevity' },
        { value: 'eco-friendly', label: 'Eco-friendliness & low VOC' },
        { value: 'weather-resistance', label: 'Weather & moisture resistance' },
        { value: 'easy-application', label: 'Easy application & coverage' },
        { value: 'corrosion-protection', label: 'Corrosion protection' },
        { value: 'waterproofing', label: 'Waterproofing & sealing' }
      ]
    },
    {
      id: 'environment',
      number: '03',
      title: "What's your project environment?",
      options: [
        { value: 'indoor', label: 'Indoor (climate controlled)' },
        { value: 'outdoor', label: 'Outdoor (exposed to elements)' },
        { value: 'commercial', label: 'High-traffic commercial space' },
        { value: 'industrial', label: 'Industrial/warehouse setting' },
        { value: 'coastal', label: 'Coastal or high-moisture area' },
        { value: 'submerged', label: 'Submerged or water-contact areas' }
      ]
    },
    {
      id: 'finish',
      number: '04',
      title: 'What finish do you prefer?',
      options: [
        { value: 'matte', label: 'Matte/Flat (subtle, no-glare)' },
        { value: 'sheen', label: 'Subtle sheen (slight luster)' },
        { value: 'glossy', label: 'Glossy (reflective, easy to clean)' },
        { value: 'clear', label: 'Clear/Transparent (natural surface show-through)' }
      ]
    },
    {
      id: 'applicator',
      number: '05',
      title: 'Who is applying this coating?',
      options: [
        { value: 'professional', label: 'Professional contractor' },
        { value: 'facilities', label: 'In-house facilities team' },
        { value: 'diy', label: 'DIY/Property owner' },
        { value: 'industrial', label: 'Industrial applicator' }
      ]
    }
  ];

  // Product Recommendation Logic
  const getRecommendation = () => {
    let score = {
      latexPaint: 0,
      stainSealer: 0,
      waterproofSealer: 0
    };

    // Surface scoring
    if (answers.surface === 'interior-walls') {
      score.latexPaint += 10;
    } else if (answers.surface === 'exterior-walls' || answers.surface === 'wood' || answers.surface === 'metal') {
      score.stainSealer += 10;
    } else if (answers.surface === 'concrete-masonry') {
      score.waterproofSealer += 7;
      score.stainSealer += 7;
    } else if (answers.surface === 'mixed') {
      score.stainSealer += 10;
    }

    // Concern scoring
    if (answers.concern === 'eco-friendly' || answers.concern === 'easy-application') {
      score.latexPaint += 8;
    } else if (answers.concern === 'weather-resistance' || answers.concern === 'corrosion-protection') {
      score.stainSealer += 10;
    } else if (answers.concern === 'waterproofing') {
      score.waterproofSealer += 10;
    } else if (answers.concern === 'durability') {
      score.stainSealer += 7;
      score.waterproofSealer += 5;
    }

    // Environment scoring
    if (answers.environment === 'indoor') {
      score.latexPaint += 10;
    } else if (answers.environment === 'outdoor' || answers.environment === 'industrial') {
      score.stainSealer += 10;
    } else if (answers.environment === 'coastal' || answers.environment === 'submerged') {
      score.waterproofSealer += 10;
    } else if (answers.environment === 'commercial') {
      score.latexPaint += 5;
      score.stainSealer += 5;
    }

    // Finish scoring
    if (answers.finish === 'sheen') {
      score.latexPaint += 8;
    } else if (answers.finish === 'matte') {
      score.stainSealer += 7;
      score.latexPaint += 3;
    } else if (answers.finish === 'clear') {
      score.waterproofSealer += 10;
    } else if (answers.finish === 'glossy') {
      score.latexPaint += 5;
    }

    // Find highest score
    let recommended = 'stainSealer';
    let maxScore = score.stainSealer;

    if (score.latexPaint > maxScore) {
      recommended = 'latexPaint';
      maxScore = score.latexPaint;
    }
    if (score.waterproofSealer > maxScore) {
      recommended = 'waterproofSealer';
    }

    return recommended;
  };

  // Handlers
  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setShowResults(false);
    setAnswers({
      surface: '',
      concern: '',
      environment: '',
      finish: '',
      applicator: ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQ?.id];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  if (showResults) {
    const recommendedProductKey = getRecommendation();
    const product = products[recommendedProductKey];

    return (
      <div className="min-h-screen bg-white">
        <SEO
          title="Your Perfect Product Match - Calyco Product Finder"
          description="Discover your recommended Calyco paint or coating solution based on your project needs."
          canonical="https://www.calycopaints.com/pages/product-finder"
        />

        <div className="max-w-6xl mx-auto px-6 py-20">
          {/* Results Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-[#2D5F3F] mb-4">
              Your Perfect Match
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Based on your answers, we recommend the following Calyco product for your project
            </p>
          </div>

          {/* Product Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-[#2D5F3F] relative mb-12">
            <div className="absolute top-6 right-6 bg-[#2D5F3F] text-white px-6 py-2 rounded-full text-sm font-bold tracking-wider rotate-3 shadow-lg">
              RECOMMENDED
            </div>

            <div className="flex items-center justify-center w-full max-w-md h-64 mx-auto mb-8 bg-gradient-to-br from-[#F9F9F7] to-[#e8f5e9] rounded-2xl text-8xl">
              {product.icon}
            </div>

            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 text-center">
              {product.name}
            </h3>
            <p className="text-2xl text-[#2D5F3F] font-semibold mb-8 text-center">
              {product.tagline}
            </p>

            {/* Benefits */}
            <div className="mb-8">
              <h4 className="text-2xl font-bold mb-6 text-gray-900">Key Benefits</h4>
              <ul className="space-y-4">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start text-lg">
                    <span className="text-[#2D5F3F] font-black text-2xl mr-3">✓</span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            <div className="bg-[#F9F9F7] rounded-2xl p-6 mb-8">
              <h4 className="text-xl font-bold mb-4 text-gray-900">Technical Specifications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([label, value]) => (
                  <div key={label}>
                    <span className="text-sm text-gray-600 font-semibold block mb-1">
                      {label.charAt(0).toUpperCase() + label.slice(1)}:
                    </span>
                    <span className="text-gray-900 font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-gray-600 mb-8 text-lg">
              <strong>Ideal for:</strong> {product.idealFor}
            </p>

            {/* CTAs */}
            <div className="flex flex-col md:flex-row gap-4">
              <a
                href={`/products/${recommendedProductKey}`}
                className={`${getButtonClasses('accent')} flex-1 text-center`}
              >
                Learn More About This Product
              </a>
              <a
                href="/contact"
                className={`${getButtonClasses('accent')} flex-1 text-center`}
              >
                Contact a Coating Expert
              </a>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white rounded-2xl p-8 shadow-lg mb-12">
            <div className="text-center">
              <div className="text-5xl mb-3">🌱</div>
              <div className="font-bold text-gray-900">Low-VOC Certified</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">🛡️</div>
              <div className="font-bold text-gray-900">10-Year Warranty</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">♻️</div>
              <div className="font-bold text-gray-900">Eco-Friendly Formula</div>
            </div>
          </div>

          {/* Restart Button */}
          <div className="text-center">
            <button
              onClick={restartQuiz}
              className={getButtonClasses('accent')}
            >
              Take Quiz Again
            </button>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-[#F9F9F7] py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-[#2D5F3F]">
                <p className="text-gray-700 italic mb-4">
                  "Calyco's Waterproofing Sealer transformed our outdoor deck. Five years later, it still looks brand new despite harsh weather conditions."
                </p>
                <div className="font-bold text-gray-900">Rajesh Kumar</div>
                <div className="text-sm text-gray-600">Homeowner, Mumbai</div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-[#2D5F3F]">
                <p className="text-gray-700 italic mb-4">
                  "We've used Calyco products across our commercial properties. The durability and eco-friendly formulation make it our go-to choice."
                </p>
                <div className="font-bold text-gray-900">Priya Mehta</div>
                <div className="text-sm text-gray-600">Facilities Manager, Tech Park</div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-[#2D5F3F]">
                <p className="text-gray-700 italic mb-4">
                  "The Waterproof Sealer saved our basement from monsoon flooding. Highly recommend for anyone dealing with moisture issues."
                </p>
                <div className="font-bold text-gray-900">Arjun Patel</div>
                <div className="text-sm text-gray-600">Property Owner, Bangalore</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F9F7] to-white">
      <SEO
        title="Calyco Product Finder: Discover Your Perfect Paint & Coating Solution"
        description="Not sure which Calyco product is right for your project? Answer a few questions about your surface, environment, and finish preferences to find the perfect paint or sealer solution."
        canonical="https://www.calycopaints.com/pages/product-finder"
      />

      {currentQuestion === 0 && (
        <div className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6 leading-tight">
              Find Your Perfect Calyco Solution
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Answer 5 quick questions to discover which premium coating is engineered for your project
            </p>
            <button
              onClick={() => setCurrentQuestion(0)}
              className={getButtonClasses('accent')}
            >
              Start Product Finder
            </button>
            <p className="text-[#2D5F3F] font-semibold mt-8 text-lg">
              Let's paint a cleaner future
            </p>
          </div>
        </div>
      )}

      {currentQuestion > 0 && !showResults && (
        <div className="max-w-4xl mx-auto px-6 py-20">
          {/* Progress */}
          <div className="mb-12">
            <p className="text-center text-gray-600 font-semibold mb-3">
              Question {currentQuestion + 1} of {totalQuestions}
            </p>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#2D5F3F] to-[#4CAF50] transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl p-8 md:p-14 shadow-2xl">
            <div className="text-[#2D5F3F] font-bold text-sm tracking-widest mb-4">
              QUESTION {currentQ.number}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-10 leading-tight">
              {currentQ.title}
            </h2>

            {/* Options */}
            <div className="space-y-4 mb-10">
              {currentQ.options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleAnswer(currentQ.id, option.value)}
                  className={`bg-[#F9F9F7] border-3 rounded-2xl p-6 cursor-pointer transition-all hover:border-[#2D5F3F] hover:bg-white hover:translate-x-1 relative ${
                    currentAnswer === option.value
                      ? 'border-[#2D5F3F] bg-gradient-to-r from-[#2D5F3F]/5 to-white shadow-md'
                      : 'border-transparent'
                  }`}
                >
                  <span className="text-lg font-semibold text-gray-900">
                    {option.label}
                  </span>
                  {currentAnswer === option.value && (
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[#2D5F3F] font-black text-2xl">
                      ✓
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              {currentQuestion > 0 && (
                <button
                  onClick={previousQuestion}
                  className="flex-1 max-w-[200px] bg-[#F9F9F7] text-gray-900 border-2 border-gray-400 py-4 px-8 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all"
                >
                  Back
                </button>
              )}
              <button
                onClick={nextQuestion}
                disabled={!currentAnswer}
                className={`flex-1 max-w-[200px] ml-auto py-4 px-8 rounded-xl font-bold text-lg transition-all ${
                  currentAnswer
                    ? 'bg-[#2D5F3F] text-white hover:bg-[#1e4029] transform hover:-translate-y-1 shadow-lg'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
              >
                {currentQuestion === totalQuestions - 1 ? 'See My Results' : 'Next Question'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFinder;
