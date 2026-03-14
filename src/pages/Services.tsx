import { MessageCircle, Users, BookOpen, Heart, Brain, Lightbulb, Target, Sparkles, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PageType } from '../types';

interface ServicesProps {
  onNavigate: (page: PageType) => void;
}

interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  is_active: boolean;
}

interface Approach {
  id: number;
  icon: string;
  title: string;
  description: string;
  is_active: boolean;
}

interface SiteSettings {
  site_name: string;
  contact_phone: string;
}

export default function Services({ onNavigate }: ServicesProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [approaches, setApproaches] = useState<Approach[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchServices(), fetchApproaches(), fetchSettings()])
      .finally(() => setLoading(false));
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('https://suzstar-backend.onrender.com/api/services/');
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError('Unable to load services. Please try again later.');
    }
  };

  const fetchApproaches = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/approaches/');
      if (!response.ok) {
        throw new Error('Failed to fetch approaches');
      }
      const data = await response.json();
      setApproaches(data);
    } catch (error) {
      console.error('Error fetching approaches:', error);
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
    MessageCircle,
    Users,
    BookOpen,
    Heart,
    Brain,
    Lightbulb,
    Target,
    Sparkles,
  };

  const getColorClasses = (index: number) => {
    const colors = [
      { bg: 'bg-teal-50', icon: 'text-teal-600', border: 'border-teal-100', hover: 'hover:border-teal-300' },
      { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100', hover: 'hover:border-blue-300' },
      { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100', hover: 'hover:border-green-300' },
      { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-100', hover: 'hover:border-orange-300' }
    ];
    return colors[index % colors.length];
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
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Services</h2>
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

  const activeServices = services.filter(s => s.is_active);
  const activeApproaches = approaches.filter(a => a.is_active);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl lg:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Comprehensive mental health support designed to meet you where you are
          </p>
        </div>
      </section>

      {/* Services Section - Only show if services exist */}
      {activeServices.length > 0 ? (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                What We Offer
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professional mental health services tailored to your unique needs
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {activeServices.map((service, index) => {
                const Icon = iconMap[service.icon] || Heart;
                const colors = getColorClasses(index);
                
                return (
                  <div
                    key={service.id}
                    className={`bg-white border-2 ${colors.border} rounded-2xl p-8 ${colors.hover} transition shadow-sm`}
                  >
                    <div className={`w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center mb-6`}>
                      <Icon className={colors.icon} size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
                    
                    <div className="mt-6">
                      <button
                        onClick={() => onNavigate('contact')}
                        className={`inline-flex items-center space-x-2 ${colors.icon} hover:opacity-80 transition font-medium`}
                      >
                        <span>Book this service</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-500">Services information coming soon.</p>
          </div>
        </section>
      )}

      {/* Therapeutic Approaches Section - Only show if approaches exist */}
      {activeApproaches.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Our Therapeutic Approaches
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We use clinically supported, respectful, and client-centered methods
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeApproaches.map((approach) => {
                const Icon = iconMap[approach.icon] || Brain;
                return (
                  <div
                    key={approach.id}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-teal-200 transition"
                  >
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="text-teal-600" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{approach.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{approach.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 bg-teal-50 border border-teal-200 rounded-xl p-6 max-w-3xl mx-auto">
              <p className="text-gray-700 text-center leading-relaxed">
                <strong>Note:</strong> Specific approaches vary based on client needs. Our counselors
                will work with you to determine the best therapeutic approach for your situation.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-teal-600 to-blue-700 rounded-2xl p-10 lg:p-16 text-white text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Taking the first step is often the hardest. We're here to make it easier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-white text-teal-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold inline-flex items-center justify-center space-x-2"
              >
                <span>Book an Appointment</span>
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => onNavigate('resources')}
                className="bg-teal-700 text-white px-8 py-4 rounded-lg hover:bg-teal-800 transition font-semibold"
              >
                View Resources
              </button>
            </div>
            {settings?.contact_phone && (
              <p className="text-teal-100 mt-6 text-sm">
                Or call us directly: <a href={`tel:${settings.contact_phone.replace(/\s/g, '')}`} className="underline hover:text-white">{settings.contact_phone}</a>
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}