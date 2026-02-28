import { Video, Users, Calendar, FileText, Lightbulb, Heart, BookOpen, Link as LinkIcon, Phone } from 'lucide-react';
import { PageType } from '../types';

interface ResourcesProps {
  onNavigate: (page: PageType) => void;
}

export default function Resources({ onNavigate }: ResourcesProps) {
  const supportOptions = [
    {
      icon: Video,
      title: 'Online Counseling',
      description: 'Video or voice sessions for convenience and privacy',
      features: [
        'Secure video conferencing',
        'Flexible scheduling',
        'Access from anywhere',
        'Same quality of care as in-person',
      ],
      color: 'teal',
    },
    {
      icon: Users,
      title: 'In-Person Sessions',
      description: 'Face-to-face counseling at our Mombasa location',
      features: [
        'Private, comfortable setting',
        'Traditional therapy experience',
        'Build stronger connection',
        'Safe and welcoming environment',
      ],
      color: 'blue',
    },
    {
      icon: Calendar,
      title: 'Walk-in Support / Group Events',
      description: 'Check our events calendar for upcoming circles and workshops',
      features: [
        'Support groups',
        'Wellness workshops',
        'Community events',
        'Peer connections',
      ],
      color: 'green',
    },
  ];

  const mentalWellnessTips = [
    {
      icon: Heart,
      title: 'Practice Self-Compassion',
      description: 'Be kind to yourself, especially during difficult times',
    },
    {
      icon: Users,
      title: 'Stay Connected',
      description: 'Maintain relationships with supportive friends and family',
    },
    {
      icon: Lightbulb,
      title: 'Establish Routines',
      description: 'Create daily structures that promote stability and wellbeing',
    },
    {
      icon: Heart,
      title: 'Mindful Breathing',
      description: 'Take moments throughout the day for deep, intentional breaths',
    },
    {
      icon: BookOpen,
      title: 'Continuous Learning',
      description: 'Educate yourself about mental health and wellness',
    },
    {
      icon: Phone,
      title: 'Seek Help Early',
      description: "Don't wait until crisis - reach out when you first notice struggles",
    },
  ];

  const emergencyResources = [
    {
      title: 'Suzstar Counseling Hotline',
      contact: '0799 240 254',
      description: 'Our professional support line',
      action: 'tel:0799240254',
    },
    {
      title: 'Kenya Red Cross',
      contact: '1199',
      description: 'National emergency mental health support',
      action: 'tel:1199',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-teal-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Resources & Support</h1>
          <p className="text-xl lg:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Tools, tips, and support options to help you on your mental health journey
          </p>
        </div>
      </section>

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
            {supportOptions.map((option, index) => {
              const Icon = option.icon;
              const bgColors: Record<string, string> = {
                teal: 'bg-teal-50',
                blue: 'bg-blue-50',
                green: 'bg-green-50',
              };
              const iconColors: Record<string, string> = {
                teal: 'text-teal-600',
                blue: 'text-blue-600',
                green: 'text-green-600',
              };
              const borderColors: Record<string, string> = {
                teal: 'border-teal-100 hover:border-teal-300',
                blue: 'border-blue-100 hover:border-blue-300',
                green: 'border-green-100 hover:border-green-300',
              };

              return (
                <div
                  key={index}
                  className={`bg-white border-2 ${borderColors[option.color]} rounded-2xl p-8 transition shadow-sm`}
                >
                  <div className={`w-16 h-16 ${bgColors[option.color]} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className={iconColors[option.color]} size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{option.title}</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">{option.description}</p>
                  <ul className="space-y-3">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
            {mentalWellnessTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div
                  key={index}
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
            <div className="bg-teal-50 border-2 border-teal-100 rounded-xl p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                  <FileText className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Articles & Blogs</h3>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Evidence-based articles on mental health topics, coping strategies, and wellness practices
              </p>
              <button className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 font-medium">
                <span>Coming Soon</span>
                <LinkIcon size={16} />
              </button>
            </div>

            <div className="bg-blue-50 border-2 border-blue-100 rounded-xl p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Support Guides</h3>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Step-by-step guides for managing stress, anxiety, and other mental health challenges
              </p>
              <button className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                <span>Coming Soon</span>
                <LinkIcon size={16} />
              </button>
            </div>

            <div className="bg-green-50 border-2 border-green-100 rounded-xl p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <Calendar className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Community Events</h3>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Workshops, support groups, and awareness events happening in our community
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
              >
                <span>Contact Us for Details</span>
                <LinkIcon size={16} />
              </button>
            </div>

            <div className="bg-orange-50 border-2 border-orange-100 rounded-xl p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Lightbulb className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Wellness Activities</h3>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Group activities and peer support opportunities for mental wellbeing
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium"
              >
                <span>Get Involved</span>
                <LinkIcon size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

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
            {emergencyResources.map((resource, index) => (
              <a
                key={index}
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
          </div>
        </div>
      </section>
    </div>
  );
}
