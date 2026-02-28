import { Heart, Eye, Shield, Users, TrendingUp, BookOpen } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Empathy',
      description: 'We approach every interaction with genuine care and understanding',
    },
    {
      icon: Shield,
      title: 'Confidentiality',
      description: 'Your privacy and trust are sacred to us',
    },
    {
      icon: Heart,
      title: 'Respect',
      description: 'We honor your story, choices, and journey',
    },
    {
      icon: Users,
      title: 'Inclusivity',
      description: 'Everyone deserves support, regardless of background',
    },
    {
      icon: BookOpen,
      title: 'Evidence-Based Practice',
      description: 'Our methods are grounded in research and proven effectiveness',
    },
    {
      icon: TrendingUp,
      title: 'Community Empowerment',
      description: 'We believe in building stronger, healthier communities together',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-teal-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Suzstar Counseling</h1>
          <p className="text-xl lg:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Empowering people to heal, grow, and thrive through compassionate mental health support
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Heart size={16} />
                <span>Our Mission</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why We Exist
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                To provide <strong>compassionate</strong>, <strong>accessible</strong>, and{' '}
                <strong>stigma-free</strong> mental health support for individuals and communities —
                empowering people to heal, grow, and thrive.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that mental health is a fundamental human right, not a privilege. Our
                mission is to break down barriers, reduce stigma, and create safe spaces where
                everyone feels heard, valued, and supported.
              </p>
            </div>

            <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Compassionate Care
                  </h3>
                  <p className="text-gray-700">
                    Every person deserves understanding, respect, and professional support on their
                    mental health journey.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Community Impact
                  </h3>
                  <p className="text-gray-700">
                    We're committed to creating healthier communities by promoting mental wellness
                    for all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Eye size={16} />
                <span>Our Vision</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                The Future We're Building
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A world where mental health is <strong>understood</strong>,{' '}
                <strong>supported</strong>, and <strong>prioritized</strong> as an essential part of
                overall wellbeing.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We envision communities where seeking help is celebrated, not stigmatized. Where
                mental wellness is as normalized as physical health. Where everyone has access to
                the support they need, when they need it.
              </p>
            </div>

            <div className="lg:order-1 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield size={24} className="text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Stigma-Free</h3>
                <p className="text-sm text-gray-600">Breaking down barriers to care</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users size={24} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Accessible</h3>
                <p className="text-sm text-gray-600">Support for everyone</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart size={24} className="text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Holistic</h3>
                <p className="text-sm text-gray-600">Mind, body, and spirit</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp size={24} className="text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Growth</h3>
                <p className="text-sm text-gray-600">Continuous improvement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-teal-200 transition"
                >
                  <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-teal-600" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Who We Serve
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            We support individuals and families from diverse backgrounds experiencing a wide range
            of mental health challenges, including:
          </p>

          <div className="grid md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
            {[
              'Anxiety & overthinking',
              'Stress & burnout',
              'Low mood / depression',
              'Relationship challenges',
              'Emotional exhaustion',
              'Self-esteem issues',
              'Grief & loss',
              'Life transitions',
              'Trauma & coping difficulties',
              'Youth/teen support',
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white rounded-lg p-4">
                <div className="w-2 h-2 bg-teal-600 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-gray-600 mt-8 italic">
            No matter what you're facing, you deserve support. We're here for you.
          </p>
        </div>
      </section>
    </div>
  );
}
