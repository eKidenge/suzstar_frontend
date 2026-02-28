import { Phone, Mail, MapPin, Clock, MessageSquare, Calendar, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredContact: 'phone',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hello, I would like to book an appointment.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPreferred Contact: ${formData.preferredContact}\n\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/254799240254?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone & WhatsApp',
      value: '0799 240 254',
      description: 'Call or message us anytime',
      action: 'tel:0799240254',
      actionLabel: 'Call Now',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      value: 'Quick Response',
      description: 'Chat with us directly',
      action: 'https://wa.me/254799240254',
      actionLabel: 'Open Chat',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'Suzstarcounselingservices@gmail.com',
      description: 'Send us an email',
      action: 'mailto:Suzstarcounselingservices@gmail.com',
      actionLabel: 'Send Email',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Mombasa',
      description: 'Visit our office',
      action: null,
      actionLabel: null,
    },
  ];

  const workingHours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 5:00 PM', available: true },
    { day: 'Saturday', hours: '8:00 AM - 12:00 PM', available: true },
    { day: 'Sunday', hours: 'Closed / By Appointment', available: false },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-teal-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl lg:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Ready to take the first step? We're here to help you start your healing journey
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Reach out to us through any of the following methods. We're committed to responding
                promptly and respectfully to all inquiries.
              </p>

              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="text-teal-600" size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {method.title}
                          </h3>
                          <p className="text-gray-700 mb-1 break-all">{method.value}</p>
                          <p className="text-sm text-gray-500 mb-3">{method.description}</p>
                          {method.action && method.actionLabel && (
                            <a
                              href={method.action}
                              target={method.action.startsWith('http') ? '_blank' : undefined}
                              rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 font-medium text-sm"
                            >
                              <span>{method.actionLabel}</span>
                              <Send size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 bg-teal-50 border border-teal-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <Clock className="text-teal-600 mt-1" size={20} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Working Hours</h3>
                    <div className="space-y-3">
                      {workingHours.map((schedule, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-700 font-medium">{schedule.day}</span>
                          <span
                            className={`text-sm ${
                              schedule.available ? 'text-teal-600' : 'text-gray-500'
                            }`}
                          >
                            {schedule.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Calendar className="text-teal-600" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Book an Appointment</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                      placeholder="07XX XXX XXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Contact Method
                    </label>
                    <select
                      id="preferredContact"
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                    >
                      <option value="phone">Phone Call</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="email">Email</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-teal-600 text-white py-4 rounded-lg hover:bg-teal-700 transition font-semibold flex items-center justify-center space-x-2"
                  >
                    <MessageSquare size={20} />
                    <span>Send via WhatsApp</span>
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you'll be redirected to WhatsApp to complete your booking
                  </p>
                </form>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Confidentiality Guaranteed</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All communications are treated with the highest level of confidentiality and respect.
                  Your privacy is our priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
