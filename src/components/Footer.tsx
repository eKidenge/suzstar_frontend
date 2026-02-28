import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Suzstar Counseling</h3>
            <p className="text-sm mb-4">
              Providing compassionate, accessible, and stigma-free mental health support
              for individuals and communities.
            </p>
            <p className="text-xs text-gray-400">
              Empowering people to heal, grow, and thrive.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <Phone size={18} className="text-teal-400 mt-0.5" />
                <div>
                  <p className="font-medium">Hotline / WhatsApp</p>
                  <a href="tel:0799240254" className="hover:text-teal-400 transition">
                    0799 240 254
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail size={18} className="text-teal-400 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:Suzstarcounselingservices@gmail.com"
                    className="hover:text-teal-400 transition break-all"
                  >
                    Suzstarcounselingservices@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-teal-400 mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p>Mombasa</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Working Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-3">
                <Clock size={18} className="text-teal-400 mt-0.5" />
                <div>
                  <p className="font-medium">Monday - Friday</p>
                  <p>8:00 AM - 5:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock size={18} className="text-teal-400 mt-0.5" />
                <div>
                  <p className="font-medium">Saturday</p>
                  <p>8:00 AM - 12:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock size={18} className="text-teal-400 mt-0.5" />
                <div>
                  <p className="font-medium">Sunday</p>
                  <p>Closed / By Appointment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Suzstar Counseling. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Your mental health matters. Confidential support is always available.
          </p>
        </div>
      </div>
    </footer>
  );
}
