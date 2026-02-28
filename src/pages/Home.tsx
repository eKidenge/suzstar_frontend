import { Heart, Users, BookOpen, MessageCircle, Phone, ArrowRight, Shield, Clock, CheckCircle } from 'lucide-react';
import { PageType } from '../types';

interface HomeProps {
  onNavigate: (page: PageType) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const services = [
    {
      icon: MessageCircle,
      title: 'Individual Counseling',
      description: 'Personalized emotional support tailored to your unique needs.',
    },
    {
      icon: Users,
      title: 'Group Therapy',
      description: 'Safe spaces for shared experiences and collective healing.',
    },
    {
      icon: BookOpen,
      title: 'Psychoeducation Workshops',
      description: 'Mental health education on stress management and wellness skills.',
    },
    {
      icon: Heart,
      title: 'Community Outreach',
      description: 'Events that reduce stigma and promote mental wellbeing.',
    },
  ];

  const values = [
    { icon: Shield, text: 'Safe, non-judgmental space' },
    { icon: CheckCircle, text: 'Licensed and trained counselors' },
    { icon: Heart, text: 'Confidential support' },
    { icon: Users, text: 'Inclusive, culturally sensitive care' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNGI4YTYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQtMi42ODYtNi02LTZzLTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2IDYtMi42ODYgNi02ek0wIDBoNjB2NjBIMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Heart size={16} />
                <span>Compassionate Mental Health Support</span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                You Don't Have to Face This{' '}
                <span className="text-teal-600">Alone</span>
              </h1>

              <p className="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed">
                Professional, compassionate mental health support in a safe, stigma-free environment.
                We're here to help you heal, grow, and thrive.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition flex items-center justify-center space-x-2 font-semibold shadow-lg shadow-teal-200"
                >
                  <span>Book an Appointment</span>
                  <ArrowRight size={20} />
                </button>

                <a
                  href="tel:0799240254"
                  className="bg-white text-teal-600 border-2 border-teal-600 px-8 py-4 rounded-lg hover:bg-teal-50 transition flex items-center justify-center space-x-2 font-semibold"
                >
                  <Phone size={20} />
                  <span>Call Now</span>
                </a>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-teal-600" />
                  <span>Available Mon-Sat</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <Shield size={16} className="text-teal-600" />
                  <span>100% Confidential</span>
                </div>
              </div>
            </div>

            <div className="relative lg:block hidden">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="text-teal-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Empathy First</h3>
                      <p className="text-gray-600 text-sm">Every session is rooted in understanding and compassion</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Confidential Care</h3>
                      <p className="text-gray-600 text-sm">Your privacy is our highest priority</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Expert Support</h3>
                      <p className="text-gray-600 text-sm">Licensed professionals dedicated to your wellbeing</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-teal-50 rounded-lg border border-teal-100">
                  <p className="text-sm text-teal-900 font-medium text-center">
                    "Mental health is just as important as physical health"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive mental health support designed to meet you where you are
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-teal-200 transition group"
                >
                  <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-600 transition">
                    <Icon className="text-teal-600 group-hover:text-white transition" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center space-x-2 text-teal-600 font-semibold hover:text-teal-700 transition"
            >
              <span>View All Services</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Suzstar Counseling?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the highest quality of care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition"
                >
                  <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-teal-600" size={32} />
                  </div>
                  <p className="text-gray-900 font-medium">{value.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Take the first step today. We're here to support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-teal-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold inline-flex items-center justify-center space-x-2"
            >
              <span>Schedule Appointment</span>
              <ArrowRight size={20} />
            </button>
            <a
              href="tel:0799240254"
              className="bg-teal-700 text-white px-8 py-4 rounded-lg hover:bg-teal-800 transition font-semibold inline-flex items-center justify-center space-x-2"
            >
              <Phone size={20} />
              <span>0799 240 254</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
