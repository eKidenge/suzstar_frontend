import { useEffect, useState, useRef } from 'react';
import { 
  Heart, Users, BookOpen, MessageCircle, Phone, ArrowRight, 
  Shield, Clock, CheckCircle, Sparkles, ChevronRight, 
  Star, Award, TrendingUp, Globe, Zap, Sun, Moon,
  Play, Pause, Quote, MapPin, Mail, Calendar,
  Camera, Video, Coffee, Compass, Feather, Wind,
  Droplets, Leaf, Sun as SunIcon, Moon as MoonIcon
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { PageType } from '../types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

interface HomeProps {
  onNavigate: (page: PageType) => void;
}

interface HeroSlider {
  id: number;
  title: string;
  title_highlight: string;
  subtitle: string;
  description: string;
  badge_text: string;
  primary_button_text: string;
  primary_button_link: string;
  secondary_button_text: string;
  secondary_button_link: string;
  background_image_url: string;
  background_video_url: string;
  overlay_opacity: number;
  overlay_color: string;
  text_color: string;
  animation_type: string;
}

interface Service {
  id: number;
  icon: string;
  title: string;
  short_description: string;
  description: string;
  image_url: string;
  video_url: string;
  price: number;
  duration: string;
  is_featured: boolean;
}

interface Value {
  id: number;
  icon: string;
  title: string;
  description: string;
  text: string;
}

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  icon_color: string;
}

interface Testimonial {
  id: number;
  quote: string;
  author_name: string;
  author_title: string;
  author_image_url: string;
  rating: number;
  is_featured: boolean;
}

interface Stat {
  id: number;
  icon: string;
  title: string;
  value: string;
  suffix: string;
  prefix: string;
  description: string;
  animation_duration: number;
}

interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  image_url: string;
  specialties: string[];
  years_experience: number;
  is_featured: boolean;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface Partner {
  id: number;
  name: string;
  logo_url: string;
  website_url: string;
}

interface SiteSettings {
  site_name: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  working_hours: string;
  logo_url: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
}

interface HomepageData {
  hero_slides: HeroSlider[];
  services: Service[];
  featured_services: Service[];
  values: Value[];
  features: Feature[];
  testimonials: Testimonial[];
  featured_testimonials: Testimonial[];
  stats: Stat[];
  team_members: TeamMember[];
  faqs: FAQ[];
  partners: Partner[];
  settings: SiteSettings | null;
}

export default function Home({ onNavigate }: HomeProps) {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [autoplayProgress, setAutoplayProgress] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    fetchHomepageData();
  }, []);

  const fetchHomepageData = async () => {
    try {
      const response = await fetch('https://suzstar-backend.onrender.com/api/homepage/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Unable to load content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const iconMap: { [key: string]: any } = {
    Heart, Users, BookOpen, MessageCircle, Phone, Shield, Clock, CheckCircle,
    Sparkles, Star, Award, TrendingUp, Globe, Zap, Sun, Moon, Camera, Video,
    Coffee, Compass, Feather, Wind, Droplets, Leaf, SunIcon, MoonIcon
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-teal-200 border-t-teal-600 rounded-full mx-auto mb-6"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="text-teal-600 text-lg font-medium"
          >
            Loading healing space...
          </motion.p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="text-amber-500 text-6xl mb-4">🌿</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Taking a Moment to Reset</h2>
          <p className="text-gray-600 mb-6">{error || 'Our site is taking a deep breath. Please try again in a moment.'}</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchHomepageData}
            className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition font-medium shadow-lg shadow-teal-200"
          >
            Refresh
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const { hero_slides, services, featured_services, values, features, 
          testimonials, stats, team_members, faqs, partners, settings } = data;

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero Slider Section */}
      {hero_slides && hero_slides.length > 0 && (
        <section className="relative h-screen">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            effect="fade"
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation
            loop={true}
            className="h-full"
            onAutoplayTimeLeft={(_, time, progress) => setAutoplayProgress(progress)}
          >
            {hero_slides.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <div className="relative h-full flex items-center justify-center overflow-hidden">
                  {/* Background with Parallax */}
                  <motion.div 
                    className="absolute inset-0"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 8 }}
                  >
                    {slide.background_video_url ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src={slide.background_video_url} type="video/mp4" />
                      </video>
                    ) : (
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.background_image_url})` }}
                      />
                    )}
                    <div 
                      className="absolute inset-0"
                      style={{ 
                        backgroundColor: slide.overlay_color,
                        opacity: slide.overlay_opacity 
                      }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {slide.badge_text && (
                        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium mb-6 border border-white/20">
                          {slide.badge_text}
                        </span>
                      )}
                      
                      <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        {slide.title}{' '}
                        {slide.title_highlight && (
                          <span className="text-teal-400">{slide.title_highlight}</span>
                        )}
                      </h1>
                      
                      {slide.subtitle && (
                        <p className="text-xl md:text-2xl text-gray-200 mb-4">{slide.subtitle}</p>
                      )}
                      
                      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        {slide.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onNavigate(slide.primary_button_link as PageType)}
                          className="bg-teal-600 text-white px-8 py-4 rounded-full hover:bg-teal-700 transition flex items-center justify-center space-x-2 font-semibold shadow-lg shadow-teal-500/30"
                        >
                          <span>{slide.primary_button_text}</span>
                          <ArrowRight size={20} />
                        </motion.button>

                        {slide.secondary_button_text && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={slide.secondary_button_link}
                            className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-8 py-4 rounded-full hover:bg-white/20 transition flex items-center justify-center space-x-2 font-semibold"
                          >
                            <span>{slide.secondary_button_text}</span>
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Progress Indicator */}
                  {index === 0 && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-teal-400"
                        animate={{ width: `${autoplayProgress * 100}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      {/* Stats Section */}
      {stats && stats.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-teal-600 via-teal-500 to-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTZjMC0zLjMxNC0yLjY4Ni02LTYtNnMtNiAyLjY4Ni02IDYgMi42ODYgNiA2IDYgNi0yLjY4NiA2LTZ6TTAgMGg2MHY2MEgweiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat) => {
                const Icon = iconMap[stat.icon] || Heart;
                return (
                  <motion.div 
                    key={stat.id}
                    variants={fadeInUp}
                    className="text-center"
                  >
                    <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-2xl mb-4">
                      <Icon size={32} />
                    </div>
                    <motion.div 
                      className="text-4xl md:text-5xl font-bold mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {stat.prefix}{stat.value}{stat.suffix}
                    </motion.div>
                    <div className="text-lg opacity-90">{stat.title}</div>
                    <div className="text-sm opacity-75 mt-1">{stat.description}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* Featured Services Section */}
      {featured_services && featured_services.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
                Our Core Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive mental health support designed to meet you where you are
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {featured_services.map((service, index) => {
                const Icon = iconMap[service.icon] || Heart;
                return (
                  <motion.div
                    key={service.id}
                    variants={fadeInUp}
                    whileHover={{ y: -10 }}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    {service.image_url && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={service.image_url} 
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-8">
                      <div className="w-16 h-16 bg-teal-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors duration-300">
                        <Icon className="text-teal-600 group-hover:text-white transition-colors duration-300" size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.short_description || service.description}</p>
                      {service.duration && (
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Clock size={16} className="mr-2" />
                          {service.duration}
                        </div>
                      )}
                      {service.price && (
                        <div className="text-lg font-semibold text-teal-600 mb-4">
                          KES {service.price}
                        </div>
                      )}
                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={() => onNavigate('services')}
                        className="inline-flex items-center text-teal-600 font-medium group-hover:text-teal-700"
                      >
                        Learn More <ChevronRight size={16} className="ml-1" />
                      </motion.button>
                    </div>
                    
                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-10 -translate-y-10 rotate-45" />
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('services')}
                className="inline-flex items-center space-x-2 text-teal-600 font-semibold hover:text-teal-700 border-2 border-teal-600 px-8 py-3 rounded-full hover:bg-teal-50 transition"
              >
                <span>View All Services</span>
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Features/Values Section with Parallax */}
      {features && features.length > 0 && (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-100/30 via-transparent to-blue-100/30" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
                  Compassionate Care,{' '}
                  <span className="text-teal-600">Professional Support</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  We believe in providing a safe, nurturing environment where healing can begin.
                  Our approach combines professional expertise with genuine human connection.
                </p>

                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {features.map((feature, index) => {
                    const Icon = iconMap[feature.icon] || Heart;
                    return (
                      <motion.div
                        key={feature.id}
                        variants={fadeInUp}
                        className="flex items-start space-x-4"
                      >
                        <div className={`w-12 h-12 bg-${feature.icon_color || 'teal'}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`text-${feature.icon_color || 'teal'}-600`} size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Counseling session"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent" />
                  
                  {/* Floating testimonial */}
                  {testimonials && testimonials.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-xl"
                    >
                      <Quote className="text-teal-600 mb-2" size={20} />
                      <p className="text-gray-800 text-sm mb-2">"{testimonials[0].quote}"</p>
                      <p className="text-gray-600 text-xs font-semibold">— {testimonials[0].author_name}</p>
                    </motion.div>
                  )}
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-200 rounded-full opacity-20 animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000" />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Values Grid */}
      {values && values.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value) => {
                const Icon = iconMap[value.icon] || Shield;
                return (
                  <motion.div
                    key={value.id}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className="group perspective"
                  >
                    <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-teal-200 transform-gpu preserve-3d">
                      <div className="relative mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                          <Icon className="text-teal-600" size={36} />
                        </div>
                        <div className="absolute inset-0 bg-teal-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title || value.text}</h3>
                      {value.description && (
                        <p className="text-gray-600 text-sm">{value.description}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {team_members && team_members.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Our Team</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
                Meet Our Counselors
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Licensed professionals dedicated to your wellbeing
              </p>
            </motion.div>

            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              className="pb-12"
            >
              {team_members.map((member) => (
                <SwiperSlide key={member.id}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={member.image_url || 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                        alt={member.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-sm opacity-90">{member.title}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties?.slice(0, 3).map((specialty, idx) => (
                          <span key={idx} className="px-3 py-1 bg-teal-50 text-teal-700 text-xs rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* Testimonials Slider */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-teal-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-teal-200 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                Stories of Healing
              </h2>
              <p className="text-xl text-teal-100 max-w-3xl mx-auto">
                Real experiences from real people on their journey to wellness
              </p>
            </motion.div>

            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              autoplay={{ delay: 4000 }}
              pagination={{ clickable: true }}
              className="pb-12"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-8 h-full border border-white/20"
                  >
                    <div className="flex items-center mb-6">
                      {testimonial.author_image_url ? (
                        <img 
                          src={testimonial.author_image_url} 
                          alt={testimonial.author_name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
                          <Users size={24} />
                        </div>
                      )}
                      <div className="ml-4">
                        <h4 className="font-bold text-lg">{testimonial.author_name}</h4>
                        {testimonial.author_title && (
                          <p className="text-sm text-teal-200">{testimonial.author_title}</p>
                        )}
                      </div>
                    </div>
                    <Quote className="text-teal-300 mb-4" size={24} />
                    <p className="text-gray-100 leading-relaxed mb-4">"{testimonial.quote}"</p>
                    <div className="flex">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* FAQ Accordion */}
      {faqs && faqs.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">FAQ</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
                Common Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find answers to frequently asked questions about our services
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                    className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition flex justify-between items-center"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: activeFaq === faq.id ? 180 : 0 }}
                      className="text-teal-600"
                    >
                      <ChevronRight size={20} />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {activeFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-4 text-gray-600"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partners Section */}
      {partners && partners.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Our Partners</h3>
              <p className="text-gray-600">Trusted organizations we work with</p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center"
            >
              {partners.map((partner) => (
                <motion.a
                  key={partner.id}
                  variants={fadeInUp}
                  href={partner.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img 
                    src={partner.logo_url} 
                    alt={partner.name}
                    className="max-h-12 w-auto mx-auto"
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-teal-600 to-blue-700 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to Start Your{' '}
              <span className="text-teal-200">Healing Journey?</span>
            </h2>
            <p className="text-xl md:text-2xl text-teal-100 mb-12 max-w-3xl mx-auto">
              Take the first step today. We're here to support you every step of the way.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 30px -10px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('contact')}
                className="bg-white text-teal-600 px-10 py-5 rounded-full hover:bg-gray-100 transition font-semibold text-lg shadow-2xl flex items-center justify-center space-x-3 group"
              >
                <span>Schedule Appointment</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              {settings?.contact_phone && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`tel:${settings.contact_phone.replace(/\s/g, '')}`}
                  className="bg-teal-700 text-white px-10 py-5 rounded-full hover:bg-teal-800 transition font-semibold text-lg shadow-2xl flex items-center justify-center space-x-3 group border-2 border-teal-400"
                >
                  <Phone size={20} className="group-hover:rotate-12 transition-transform" />
                  <span>{settings.contact_phone}</span>
                </motion.a>
              )}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 flex items-center justify-center space-x-6 text-teal-200"
            >
              <div className="flex items-center space-x-2">
                <Shield size={16} />
                <span className="text-sm">100% Confidential</span>
              </div>
              <div className="w-px h-4 bg-teal-400/30" />
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span className="text-sm">{settings?.working_hours || 'Available Mon-Sat'}</span>
              </div>
              <div className="w-px h-4 bg-teal-400/30" />
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span className="text-sm">{settings?.address || 'Mombasa, Kenya'}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}