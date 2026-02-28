import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';
import { PageType } from '../types';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: PageType }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Resources', page: 'resources' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavigate = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center space-x-3 group"
          >
            <img 
              src="/logo.png" 
              alt="Suzstar Counseling Logo" 
              className="h-12 w-auto object-contain"
            />
            <div className="text-left">
              <h1 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition">
                Suzstar Counseling
              </h1>
              <p className="text-xs text-gray-600">Mental Health Hub</p>
            </div>
          </button>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`text-sm font-medium transition ${
                  currentPage === item.page
                    ? 'text-teal-600 border-b-2 border-teal-600'
                    : 'text-gray-700 hover:text-teal-600'
                } pb-1`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <a
            href="tel:0799240254"
            className="hidden md:flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            <Phone size={18} />
            <span className="text-sm font-medium">0799 240 254</span>
          </a>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavigate(item.page)}
                  className={`text-left px-4 py-2 rounded-lg transition ${
                    currentPage === item.page
                      ? 'bg-teal-50 text-teal-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="tel:0799240254"
                className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
              >
                <Phone size={18} />
                <span>0799 240 254</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}