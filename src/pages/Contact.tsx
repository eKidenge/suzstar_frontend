import { Phone, Mail, MapPin, Clock, MessageSquare, Calendar, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PageType } from '../types';

interface ContactProps {
  onNavigate: (page: PageType) => void;
}

interface SiteSettings {
  site_name: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  linkedin_url: string;
  working_hours: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  service: number | null;
  message: string;
}

interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export default function Contact({ onNavigate }: ContactProps) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [formType, setFormType] = useState<'contact' | 'appointment'>('appointment');
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const [contactFormData, setContactFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [appointmentFormData, setAppointmentFormData] = useState<AppointmentFormData>({
    name: '',
    email: '',
    phone: '',
    preferred_date: '',
    preferred_time: '',
    service: null,
    message: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/homepage/');
      const data = await response.json();
      setSettings(data.settings);
      setServices(data.services || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContactFormData({
      ...contactFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAppointmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAppointmentFormData({
      ...appointmentFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/api/contact-messages/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactFormData),
      });

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'Thank you for your message! We\'ll get back to you soon.',
        });
        setContactFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or contact us directly.',
      });
    }
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/api/appointments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentFormData),
      });

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'Appointment request sent successfully! We\'ll confirm your appointment shortly.',
        });
        setAppointmentFormData({
          name: '',
          email: '',
          phone: '',
          preferred_date: '',
          preferred_time: '',
          service: null,
          message: '',
        });
      } else {
        throw new Error('Failed to book appointment');
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or contact us directly.',
      });
    }
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hello, I would like to book an appointment.\n\nName: ${appointmentFormData.name}\nEmail: ${appointmentFormData.email}\nPhone: ${appointmentFormData.phone}\n\nMessage: ${appointmentFormData.message}`;
    const whatsappUrl = `https://wa.me/${settings?.contact_phone?.replace(/\s/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone & WhatsApp',
      value: settings?.contact_phone || '0799 240 254',
      description: 'Call or message us anytime',
      action: `tel:${settings?.contact_phone?.replace(/\s/g, '') || '0799240254'}`,
      actionLabel: 'Call Now',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      value: 'Quick Response',
      description: 'Chat with us directly',
      action: `https://wa.me/${settings?.contact_phone?.replace(/\s/g, '') || '254799240254'}`,
      actionLabel: 'Open Chat',
    },
    {
      icon: Mail,
      title: 'Email',
      value: settings?.contact_email || 'Suzstarcounselingservices@gmail.com',
      description: 'Send us an email',
      action: `mailto:${settings?.contact_email || 'Suzstarcounselingservices@gmail.com'}`,
      actionLabel: 'Send Email',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: settings?.address || 'Mombasa',
      description: 'Visit our office',
      action: null,
      actionLabel: null,
    },
  ];

  const workingHours = settings?.working_hours ? 
    [{ day: 'Working Hours', hours: settings.working_hours, available: true }] :
    [
      { day: 'Monday - Friday', hours: '8:00 AM - 5:00 PM', available: true },
      { day: 'Saturday', hours: '8:00 AM - 12:00 PM', available: true },
      { day: 'Sunday', hours: 'Closed / By Appointment', available: false },
    ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-teal-600">Loading...</div>
      </div>
    );
  }

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
          {formStatus.type && (
            <div className={`mb-8 p-4 rounded-lg ${
              formStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 
              'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {formStatus.message}
            </div>
          )}

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
              {/* Form Type Toggle */}
              <div className="flex space-x-2 mb-6 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setFormType('appointment')}
                  className={`flex-1 py-3 px-4 rounded-md font-medium transition ${
                    formType === 'appointment'
                      ? 'bg-white text-teal-600 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => setFormType('contact')}
                  className={`flex-1 py-3 px-4 rounded-md font-medium transition ${
                    formType === 'contact'
                      ? 'bg-white text-teal-600 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Send Message
                </button>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    {formType === 'appointment' ? (
                      <Calendar className="text-teal-600" size={24} />
                    ) : (
                      <MessageSquare className="text-teal-600" size={24} />
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {formType === 'appointment' ? 'Book an Appointment' : 'Send a Message'}
                  </h2>
                </div>

                {formType === 'appointment' ? (
                  <form onSubmit={handleAppointmentSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={appointmentFormData.name}
                        onChange={handleAppointmentChange}
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
                        value={appointmentFormData.email}
                        onChange={handleAppointmentChange}
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
                        value={appointmentFormData.phone}
                        onChange={handleAppointmentChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                        placeholder="07XX XXX XXX"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          id="preferred_date"
                          name="preferred_date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={appointmentFormData.preferred_date}
                          onChange={handleAppointmentChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                        />
                      </div>

                      <div>
                        <label htmlFor="preferred_time" className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Time *
                        </label>
                        <input
                          type="time"
                          id="preferred_time"
                          name="preferred_time"
                          required
                          value={appointmentFormData.preferred_time}
                          onChange={handleAppointmentChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    {services.length > 0 && (
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                          Service Interested In
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={appointmentFormData.service || ''}
                          onChange={handleAppointmentChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                        >
                          <option value="">Select a service</option>
                          {services.map(service => (
                            <option key={service.id} value={service.id}>
                              {service.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Information
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={appointmentFormData.message}
                        onChange={handleAppointmentChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none"
                        placeholder="Any specific concerns or information you'd like to share..."
                      ></textarea>
                    </div>

                    <div className="space-y-3">
                      <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-4 rounded-lg hover:bg-teal-700 transition font-semibold"
                      >
                        Request Appointment
                      </button>
                      
                      <button
                        type="button"
                        onClick={handleWhatsAppSubmit}
                        className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center space-x-2"
                      >
                        <MessageSquare size={20} />
                        <span>Or Book via WhatsApp</span>
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 text-center">
                      We'll confirm your appointment via your preferred contact method within 24 hours
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={contactFormData.name}
                        onChange={handleContactChange}
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
                        value={contactFormData.email}
                        onChange={handleContactChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={contactFormData.phone}
                        onChange={handleContactChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                        placeholder="07XX XXX XXX"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={contactFormData.subject}
                        onChange={handleContactChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={contactFormData.message}
                        onChange={handleContactChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-teal-600 text-white py-4 rounded-lg hover:bg-teal-700 transition font-semibold"
                    >
                      Send Message
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      We typically respond within 24-48 hours
                    </p>
                  </form>
                )}
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