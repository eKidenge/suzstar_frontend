import { MessageCircle, Users, BookOpen, Heart, Brain, Lightbulb, Target, Sparkles, ArrowRight } from 'lucide-react';
import { PageType } from '../types';

interface ServicesProps {
  onNavigate: (page: PageType) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const mainServices = [
    {
      icon: MessageCircle,
      title: 'Individual Counseling',
      description: 'Personalized emotional support tailored to your unique needs.',
      details: [
        'One-on-one sessions with licensed counselors',
        'Confidential and safe environment',
        'Customized treatment plans',
        'Focus on your specific challenges and goals',
      ],
      color: 'teal',
    },
    {
      icon: Users,
      title: 'Group Therapy & Support Circles',
      description: 'Safe spaces for shared experiences, emotional connection, and collective healing.',
      details: [
        'Small, supportive group settings',
        'Facilitated by experienced professionals',
        'Shared experiences and mutual support',
        'Build community and reduce isolation',
      ],
      color: 'blue',
    },
    {
      icon: BookOpen,
      title: 'Psychoeducation Workshops',
      description: 'Mental health education on topics like stress management, emotional regulation, wellness skills, etc.',
      details: [
        'Evidence-based educational content',
        'Practical tools and strategies',
        'Interactive learning experiences',
        'Ongoing skill development',
      ],
      color: 'green',
    },
    {
      icon: Heart,
      title: 'Community Outreach & Awareness',
      description: 'Events and campaigns that reduce stigma, increase awareness, and promote mental wellbeing.',
      details: [
        'Community mental health events',
        'Awareness campaigns',
        'Public education programs',
        'Partnership with local organizations',
      ],
      color: 'orange',
    },
  ];

  const approaches = [
    {
      icon: Brain,
      title: 'Cognitive-Behavioral Therapy (CBT)',
      description: 'Evidence-based approach to changing thought patterns and behaviors',
    },
    {
      icon: Sparkles,
      title: 'Mindfulness & Relaxation Practices',
      description: 'Techniques to reduce stress and increase present-moment awareness',
    },
    {
      icon: Target,
      title: 'Strength-Based Counseling',
      description: 'Focus on your inherent strengths and resilience',
    },
    {
      icon: Lightbulb,
      title: 'Solution-Focused Strategies',
      description: 'Goal-oriented approach to finding practical solutions',
    },
    {
      icon: BookOpen,
      title: 'Narrative Therapy',
      description: 'Explore and reshape your personal story',
    },
    {
      icon: Heart,
      title: 'Emotional Regulation Coaching',
      description: 'Learn to manage and express emotions in healthy ways',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string; hover: string; border: string }> = {
      teal: {
        bg: 'bg-teal-50',
        icon: 'text-teal-600',
        hover: 'hover:border-teal-300',
        border: 'border-teal-100',
      },
      blue: {
        bg: 'bg-blue-50',
        icon: 'text-blue-600',
        hover: 'hover:border-blue-300',
        border: 'border-blue-100',
      },
      green: {
        bg: 'bg-green-50',
        icon: 'text-green-600',
        hover: 'hover:border-green-300',
        border: 'border-green-100',
      },
      orange: {
        bg: 'bg-orange-50',
        icon: 'text-orange-600',
        hover: 'hover:border-orange-300',
        border: 'border-orange-100',
      },
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-teal-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl lg:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Comprehensive mental health support designed to meet you where you are
          </p>
        </div>
      </section>

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
            {mainServices.map((service, index) => {
              const Icon = service.icon;
              const colors = getColorClasses(service.color);
              return (
                <div
                  key={index}
                  className={`bg-white border-2 ${colors.border} rounded-2xl p-8 ${colors.hover} transition shadow-sm`}
                >
                  <div className={`w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className={colors.icon} size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3">
                    {service.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-3">
                        <div className={`w-1.5 h-1.5 ${colors.bg} rounded-full mt-2 flex-shrink-0`}></div>
                        <span className="text-gray-600">{detail}</span>
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
              Our Therapeutic Approaches
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We use clinically supported, respectful, and client-centered methods
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approaches.map((approach, index) => {
              const Icon = approach.icon;
              return (
                <div
                  key={index}
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
          </div>
        </div>
      </section>
    </div>
  );
}
