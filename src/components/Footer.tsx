import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, Youtube, Heart, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PageType } from '../types';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

interface SiteSettings {
  site_name: string;
  contact_email: string;
  contact_phone: string;
  whatsapp_number: string;
  address: string;
  working_hours: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  linkedin_url: string;
  youtube_url: string;
  footer_text: string;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    fetchSettings();
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/homepage/');
      const data = await response.json();
      setSettings(data.settings);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { label: string; page: PageType }[] = [
    { label: 'HOME', page: 'home' },
    { label: 'ABOUT', page: 'about' },
    { label: 'SERVICES', page: 'services' },
    { label: 'RESOURCES', page: 'resources' },
    { label: 'CONTACT', page: 'contact' },
  ];

  const phoneNumber = settings?.contact_phone || '0799 240 254';
  const email = settings?.contact_email || 'Suzstarcounselingservices@gmail.com';
  const address = settings?.address || 'Mombasa, Kenya';
  const workingHours = settings?.working_hours || 'Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 8:00 AM - 12:00 PM\nSunday: Closed';

  // Parse working hours if multi-line
  const hoursLines = workingHours.split('\n').filter(line => line.trim());

  const socialLinks = [
    { icon: Facebook, url: settings?.facebook_url, color: 'hover:text-blue-600' },
    { icon: Twitter, url: settings?.twitter_url, color: 'hover:text-sky-400' },
    { icon: Instagram, url: settings?.instagram_url, color: 'hover:text-pink-500' },
    { icon: Linkedin, url: settings?.linkedin_url, color: 'hover:text-blue-700' },
    { icon: Youtube, url: settings?.youtube_url, color: 'hover:text-red-600' },
  ].filter(link => link.url);

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNGI4YTYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQtMi42ODYtNi02LTZzLTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2IDYtMi42ODYgNi02ek0wIDBoNjB2NjBIMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-teal-600 text-white p-3 rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand column with static local logo */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.png" 
                alt={settings?.site_name || 'Suzstar Counseling'} 
                className="h-12 w-auto object-contain"
              />
              <div>
                <h3 className="text-white font-bold text-xl tracking-tight">
                  {settings?.site_name || 'SUZSTAR COUNSELING'}
                </h3>
                <p className="text-xs text-teal-400 tracking-wider">MENTAL HEALTH HUB</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Providing compassionate, accessible, and stigma-free mental health support for individuals and communities. Empowering people to heal, grow, and thrive.
            </p>
            
            {/* Social media links (from backend) */}
            {socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 transition-all duration-300 hover:scale-110 ${link.color}`}
                  >
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4 tracking-wider text-sm">QUICK LINKS</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => onNavigate(item.page)}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-teal-600 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-4 tracking-wider text-sm">CONTACT</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 bg-teal-600/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600/20 transition-colors">
                  <Phone size={16} className="text-teal-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">CALL / WHATSAPP</p>
                  <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="text-sm text-gray-300 hover:text-teal-400 transition">
                    {phoneNumber}
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 bg-teal-600/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600/20 transition-colors">
                  <Mail size={16} className="text-teal-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">EMAIL</p>
                  <a href={`mailto:${email}`} className="text-sm text-gray-300 hover:text-teal-400 transition break-all">
                    {email}
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 bg-teal-600/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600/20 transition-colors">
                  <MapPin size={16} className="text-teal-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">LOCATION</p>
                  <p className="text-sm text-gray-300">{address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Working hours */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-4 tracking-wider text-sm">HOURS</h4>
            <div className="space-y-3">
              {hoursLines.map((line, index) => {
                const [day, hours] = line.split(':').map(s => s.trim());
                return (
                  <div key={index} className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 bg-teal-600/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600/20 transition-colors">
                      <Clock size={16} className="text-teal-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{day}</p>
                      <p className="text-sm text-gray-300">{hours || line}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800/80 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            {settings?.footer_text || `© ${new Date().getFullYear()} Suzstar Counseling. All rights reserved.`}
          </p>
          <p className="text-xs text-gray-600 mt-2 md:mt-0 flex items-center">
            Made with <Heart size={12} className="text-red-500 mx-1" /> for mental wellness
          </p>
        </div>
      </div>
    </footer>
  );
}