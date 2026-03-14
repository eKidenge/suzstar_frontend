import { Heart, Eye, Shield, Users, TrendingUp, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PageType } from '../types';

interface AboutProps {
  onNavigate: (page: PageType) => void;
}

interface Value {
  id: number;
  icon: string;
  title: string;
  description: string;
  is_active: boolean;
  order: number;
}

interface MissionVision {
  id: number;
  mission_title: string;
  mission_description: string;
  mission_badge: string;
  vision_title: string;
  vision_description: string;
  vision_badge: string;
  is_active: boolean;
}

interface WhoWeServe {
  id: number;
  title: string;
  description: string;
  items: string[];
  is_active: boolean;
}

interface Stat {
  id: number;
  icon: string;
  title: string;
  value: string;
  description: string;
  is_active: boolean;
  order: number;
}

interface AboutData {
  mission_vision: MissionVision | null;
  values: Value[];
  who_we_serve: WhoWeServe | null;
  stats: Stat[];
}

interface SiteSettings {
  contact_phone: string;
  contact_email: string;
}

export default function About({ onNavigate }: AboutProps) {
  const [data, setData] = useState<AboutData | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchAboutData(), fetchSettings()])
      .finally(() => setLoading(false));
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/about/');
      if (!response.ok) {
        throw new Error('Failed to fetch about data');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching about data:', error);
      setError('Unable to load about page. Please try again later.');
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/homepage/');
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }
      const data = await response.json();
      setSettings(data.settings);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const iconMap: { [key: string]: any } = {
    Heart,
    Eye,
    Shield,
    Users,
    TrendingUp,
    BookOpen,
  };

  const getIconColorClass = (index: number) => {
    const colors = ['bg-teal-100', 'bg-blue-100', 'bg-green-100', 'bg-orange-100', 'bg-purple-100', 'bg-pink-100'];
    const textColors = ['text-teal-600', 'text-blue-600', 'text-green-600', 'text-orange-600', 'text-purple-600', 'text-pink-600'];
    return {
      bg: colors[index % colors.length],
      text: textColors[index % textColors.length]
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-teal-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-amber-600 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Page</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const missionVision = data?.mission_vision;
  const activeValues = data?.values?.filter(v => v.is_active) || [];
  const whoWeServe = data?.who_we_serve;
  const activeStats = data?.stats?.filter(s => s.is_active) || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Suzstar Counseling</h1>
          <p className="text-xl lg:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Empowering people to heal, grow, and thrive through compassionate mental health support
          </p>
        </div>
      </section>

      {/* Mission Section - Only show if data exists */}
      {missionVision && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Heart size={16} />
                  <span>{missionVision.mission_badge || 'Our Mission'}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  {missionVision.mission_title || 'Why We Exist'}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {missionVision.mission_description}
                </p>
              </div>

              <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100">
                {activeStats.slice(0, 2).map((stat, index) => {
                  const Icon = iconMap[stat.icon] || Heart;
                  const colors = ['bg-teal-600', 'bg-blue-600'];
                  return (
                    <div key={stat.id} className={`flex items-start space-x-4 ${index === 0 ? 'mb-6' : ''}`}>
                      <div className={`w-14 h-14 ${colors[index]} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <Icon className="text-white" size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{stat.title}</h3>
                        <p className="text-gray-700">{stat.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Vision Section - Only show if data exists */}
      {missionVision && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2">
                <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Eye size={16} />
                  <span>{missionVision.vision_badge || 'Our Vision'}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  {missionVision.vision_title || 'The Future We\'re Building'}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {missionVision.vision_description}
                </p>
              </div>

              <div className="lg:order-1 grid grid-cols-2 gap-4">
                {activeStats.slice(2, 6).map((stat, index) => {
                  const Icon = iconMap[stat.icon] || Shield;
                  const colors = [
                    { bg: 'bg-teal-100', text: 'text-teal-600' },
                    { bg: 'bg-blue-100', text: 'text-blue-600' },
                    { bg: 'bg-green-100', text: 'text-green-600' },
                    { bg: 'bg-orange-100', text: 'text-orange-600' }
                  ];
                  return (
                    <div key={stat.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className={`w-12 h-12 ${colors[index].bg} rounded-lg flex items-center justify-center mb-4`}>
                        <Icon size={24} className={colors[index].text} />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{stat.title}</h3>
                      <p className="text-sm text-gray-600">{stat.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Values Section - Only show if data exists */}
      {activeValues.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeValues.map((value, index) => {
                const Icon = iconMap[value.icon] || Heart;
                const colors = getIconColorClass(index);
                return (
                  <div
                    key={value.id}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-teal-200 transition"
                  >
                    <div className={`w-14 h-14 ${colors.bg} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={colors.text} size={28} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Who We Serve Section - Only show if data exists */}
      {whoWeServe && whoWeServe.items && whoWeServe.items.length > 0 && (
        <section className="py-16 bg-teal-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {whoWeServe.title || 'Who We Serve'}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {whoWeServe.description || 'We support individuals and families from diverse backgrounds experiencing a wide range of mental health challenges, including:'}
            </p>

            <div className="grid md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
              {whoWeServe.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white rounded-lg p-4">
                  <div className="w-2 h-2 bg-teal-600 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-600 mt-8 italic">
              No matter what you're facing, you deserve support. We're here for you.
            </p>
            
            {settings?.contact_phone && (
              <div className="mt-6">
                <a
                  href={`tel:${settings.contact_phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition font-medium"
                >
                  <span>Call Us: {settings.contact_phone}</span>
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* If no data at all */}
      {!missionVision && activeValues.length === 0 && !whoWeServe && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Us Coming Soon</h2>
            <p className="text-gray-600">
              We're currently updating our information. Please check back later.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition font-medium"
            >
              Contact Us
            </button>
          </div>
        </section>
      )}
    </div>
  );
}