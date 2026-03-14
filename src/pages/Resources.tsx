import { Video, Users, Calendar, FileText, Lightbulb, Heart, BookOpen, Link as LinkIcon, Phone, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PageType } from '../types';

interface ResourcesProps {
  onNavigate: (page: PageType) => void;
}

interface SupportOption {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: string;
  is_active: boolean;
  order: number;
}

interface WellnessTip {
  id: number;
  icon: string;
  title: string;
  description: string;
  is_active: boolean;
  order: number;
}

interface EducationalResource {
  id: number;
  icon: string;
  title: string;
  description: string;
  button_text: string;
  button_action: string;
  color: string;
  is_active: boolean;
  is_coming_soon: boolean;
  order: number;
}

interface EmergencyContact {
  id: number;
  title: string;
  contact: string;
  description: string;
  action: string;
  is_active: boolean;
  order: number;
}

interface SiteSettings {
  contact_phone: string;
}

interface ResourcesData {
  supportOptions: SupportOption[];
  wellnessTips: WellnessTip[];
  educationalResources: EducationalResource[];
  emergencyContacts: EmergencyContact[];
}

export default function Resources({ onNavigate }: ResourcesProps) {
  const [data, setData] = useState<ResourcesData | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchResources(), fetchSettings()])
      .finally(() => setLoading(false));
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/resources/');
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setError('Unable to load resources. Please try again later.');
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
    Video,
    Users,
    Calendar,
    FileText,
    Lightbulb,
    Heart,
    BookOpen,
    Link: LinkIcon,
    Phone,
    AlertCircle,
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string; border: string; hover: string; iconBg: string }> = {
      teal: {
        bg: 'bg-teal-50',
        icon: 'text-teal-600',
        border: 'border-teal-100',
        hover: 'hover:border-teal-300',
        iconBg: 'bg-teal-600',
      },
      blue: {
        bg: 'bg-blue-50',
        icon: 'text-blue-600',
        border: 'border-blue-100',
        hover: 'hover:border-blue-300',
        iconBg: 'bg-blue-600',
      },
      green: {
        bg: 'bg-green-50',
        icon: 'text-green-600',
        border: 'border-green-100',
        hover: 'hover:border-green-300',
        iconBg: 'bg-green-600',
      },
      orange: {
        bg: 'bg-orange-50',
        icon: 'text-orange-600',
        border: 'border-orange-100',
        hover: 'hover:border-orange-300',
        iconBg: 'bg-orange-600',
      },
      red: {
        bg: 'bg-red-50',
        icon: 'text-red-600',
        border: 'border-red-200',
        hover: 'hover:border-red-400',
        iconBg: 'bg-red-600',
      },
    };
    return colors[color] || colors.teal;
  };

  const handleButtonClick = (action: string) => {
    if (action === 'contact') {
      onNavigate('contact');
    } else if (action.startsWith('http')) {
      window.open(action, '_blank');
    } else if (action.startsWith('tel:')) {
      window.location.href = action;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-teal-600">Loading resources...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-amber-600 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Resources</h2>
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

  const activeSupportOptions = data?.supportOptions?.filter(opt => opt.is_active) || [];
  const activeWellnessTips = data?.wellnessTips?.filter(tip => tip.is_active) || [];
  const activeEducationalResources = data?.educationalResources?.filter(res => res.is_active) || [];
  const activeEmergencyContacts = data?.emergencyContacts?.filter(contact => contact.is_active) || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Resources & Support</h1>
          <p className="text-xl lg:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Tools, tips, and support options to help you on your mental health journey
          </p>
        </div>
      </section>

      {/* Support Options Section - Only show if data exists */}
      {activeSupportOptions.length > 0 ? (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Support Options
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the support format that works best for you
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {activeSupportOptions.map((option) => {
                const Icon = iconMap[option.icon] || Heart;
                const colors = getColorClasses(option.color);

                return (
                  <div
                    key={option.id}
                    className={`bg-white border-2 ${colors.border} ${colors.hover} rounded-2xl p-8 transition shadow-sm`}
                  >
                    <div className={`w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center mb-6`}>
                      <Icon className={colors.icon} size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{option.title}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{option.description}</p>
                    {option.features && option.features.length > 0 && (
                      <ul className="space-y-3">
                        {option.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-500">Support options information coming soon.</p>
          </div>
        </section>
      )}

      {/* Wellness Tips Section - Only show if data exists */}
      {activeWellnessTips.length > 0 ? (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Mental Wellness Tips
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Practical strategies you can use every day
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeWellnessTips.map((tip) => {
                const Icon = iconMap[tip.icon] || Heart;
                return (
                  <div
                    key={tip.id}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-teal-200 transition"
                  >
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="text-teal-600" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Educational Resources Section - Only show if data exists */}
      {activeEducationalResources.length > 0 ? (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Educational Resources
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Learn more about mental health and wellbeing
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {activeEducationalResources.map((resource) => {
                const Icon = iconMap[resource.icon] || FileText;
                const colors = getColorClasses(resource.color);

                return (
                  <div
                    key={resource.id}
                    className={`${colors.bg} border-2 ${colors.border} rounded-xl p-8`}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-12 h-12 ${colors.iconBg} rounded-lg flex items-center justify-center`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{resource.title}</h3>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {resource.description}
                    </p>
                    <button
                      onClick={() => handleButtonClick(resource.button_action)}
                      className={`inline-flex items-center space-x-2 ${colors.icon} hover:opacity-80 font-medium`}
                      disabled={resource.is_coming_soon}
                    >
                      <span>{resource.button_text}</span>
                      {!resource.is_coming_soon && <LinkIcon size={16} />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Emergency Support Section - Only show if data exists */}
      {activeEmergencyContacts.length > 0 ? (
        <section className="py-16 bg-red-50 border-t-4 border-red-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Emergency Support
              </h2>
              <p className="text-lg text-gray-700">
                If you're in crisis or need immediate support, please reach out:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {activeEmergencyContacts.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.action}
                  className="bg-white border-2 border-red-200 rounded-xl p-6 hover:shadow-lg hover:border-red-400 transition block"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Phone className="text-red-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{resource.title}</h3>
                      <p className="text-red-600 font-semibold text-lg">{resource.contact}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{resource.description}</p>
                </a>
              ))}
            </div>

            <div className="mt-8 bg-white border border-red-200 rounded-xl p-6 text-center">
              <p className="text-gray-700 font-medium">
                You are not alone. Help is available 24/7. Please reach out if you need support.
              </p>
              {settings?.contact_phone && (
                <p className="text-gray-600 mt-2 text-sm">
                  Or call us directly: <a href={`tel:${settings.contact_phone.replace(/\s/g, '')}`} className="text-red-600 hover:underline font-medium">{settings.contact_phone}</a>
                </p>
              )}
            </div>
          </div>
        </section>
      ) : null}

      {/* If no data at all */}
      {activeSupportOptions.length === 0 && 
       activeWellnessTips.length === 0 && 
       activeEducationalResources.length === 0 && 
       activeEmergencyContacts.length === 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resources Coming Soon</h2>
            <p className="text-gray-600">
              We're currently updating our resources. Please check back later.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}