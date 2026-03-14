import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon, XMarkIcon, HomeIcon, UsersIcon, AcademicCapIcon,
  BookOpenIcon, CalendarIcon, ChatBubbleLeftRightIcon, HeartIcon,
  ShieldCheckIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon,
  PencilSquareIcon, TrashIcon, PlusCircleIcon, StarIcon,
  ChartBarIcon, QuestionMarkCircleIcon, GlobeAltIcon, MegaphoneIcon,
  LifebuoyIcon, SparklesIcon, PhoneIcon, FlagIcon, EnvelopeIcon,
  Squares2X2Icon, ClockIcon, CheckCircleIcon, BriefcaseIcon,
} from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';

// Base API URL
const API_BASE = 'https://suzstar-backend.onrender.com/api';

// ----------------------------------------------------------------------
// Type definitions for all models
// ----------------------------------------------------------------------

interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  short_description?: string;
  image_url?: string;
  video_url?: string;
  price?: number;
  duration?: string;
  is_featured: boolean;
  order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

interface Value {
  id: number;
  icon: string;
  title?: string;
  description?: string;
  text: string;
  order: number;
  is_active: boolean;
}

interface HeroSlider {
  id: number;
  title: string;
  title_highlight?: string;
  subtitle?: string;
  description: string;
  badge_text?: string;
  primary_button_text: string;
  primary_button_link: string;
  secondary_button_text?: string;
  secondary_button_link?: string;
  background_image_url?: string;
  background_video_url?: string;
  overlay_opacity?: number;
  overlay_color?: string;
  text_color?: string;
  animation_type?: string;
  slide_duration?: number;
  order: number;
  is_active: boolean;
}

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  icon_color: string;
  order: number;
  is_active: boolean;
}

interface Testimonial {
  id: number;
  quote: string;
  author_name: string;
  author_title?: string;
  author_image_url?: string;
  rating: number;
  is_featured: boolean;
  order: number;
  is_active: boolean;
  created_at?: string;
}

interface Stat {
  id: number;
  icon: string;
  title: string;
  value: string;
  suffix?: string;
  prefix?: string;
  description: string;
  animation_duration?: number;
  order: number;
  is_active: boolean;
}

interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  image_url?: string;
  email?: string;
  phone?: string;
  specialties: string[];          // stored as JSON
  education: string[];             // stored as JSON
  languages: string[];             // stored as JSON
  years_experience: number;
  is_featured: boolean;
  order: number;
  is_active: boolean;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
  order: number;
  is_active: boolean;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author: string;
  author_image_url?: string;
  featured_image_url?: string;
  category?: string;
  tags: string[];                  // stored as JSON
  read_time: number;
  is_featured: boolean;
  views_count: number;
  published_date: string;
  updated_date: string;
  is_active: boolean;
}

interface Event {
  id: number;
  title: string;
  description: string;
  event_type: 'workshop' | 'support_group' | 'seminar' | 'webinar';
  start_date: string;
  end_date: string;
  location?: string;
  is_online: boolean;
  meeting_link?: string;
  capacity?: number;
  registered_count: number;
  price?: number;
  is_free: boolean;
  featured_image_url?: string;
  is_featured: boolean;
  is_active: boolean;
}

interface Partner {
  id: number;
  name: string;
  description?: string;
  logo_url?: string;
  website_url?: string;
  order: number;
  is_active: boolean;
}

interface CallToAction {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  primary_button_text: string;
  primary_button_link: string;
  secondary_button_text?: string;
  secondary_button_link?: string;
  background_color?: string;
  text_color?: string;
  background_image_url?: string;
  section_type: 'standard' | 'split' | 'full_width';
  order: number;
  is_active: boolean;
}

interface SupportOption {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];   // stored as JSON array
  color: string;
  order: number;
  is_active: boolean;
}

interface WellnessTip {
  id: number;
  icon: string;
  title: string;
  description: string;
  order: number;
  is_active: boolean;
}

interface EducationalResource {
  id: number;
  icon: string;
  title: string;
  description: string;
  button_text: string;
  button_action: string;
  color: string;
  is_coming_soon: boolean;
  order: number;
  is_active: boolean;
}

interface EmergencyContact {
  id: number;
  title: string;
  contact: string;
  description: string;
  action: string;
  order: number;
  is_active: boolean;
}

interface MissionVision {
  id: number;
  mission_badge?: string;
  mission_title: string;
  mission_description: string;
  vision_badge?: string;
  vision_title: string;
  vision_description: string;
  is_active: boolean;
}

interface WhoWeServe {
  id: number;
  title: string;
  description?: string;
  items: string[];      // stored as JSON array
  is_active: boolean;
}

interface Appointment {
  id: number;
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  preferred_contact_method: 'phone' | 'email' | 'whatsapp';
  service?: number;       // foreign key id
  counselor?: number;     // foreign key id
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'rescheduled';
  is_urgent: boolean;
  created_at: string;
  updated_at: string;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  is_read: boolean;
  is_replied: boolean;
  created_at: string;
}

interface SiteSettings {
  id: number;
  site_name: string;
  site_description?: string;
  contact_email: string;
  contact_phone: string;
  whatsapp_number?: string;
  address?: string;
  google_maps_url?: string;
  facebook_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  youtube_url?: string;
  tiktok_url?: string;
  working_hours: string;
  footer_text?: string;
  logo_url?: string;
  favicon_url?: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  google_analytics_id?: string;
}

interface TherapeuticApproach {
  id: number;
  icon: string;
  title: string;
  description: string;
  long_description?: string;
  image_url?: string;
  is_featured: boolean;
  order: number;
  is_active: boolean;
}

interface NewsletterSubscriber {
  id: number;
  email: string;
  name?: string;
  is_active: boolean;
  subscribed_date: string;
  unsubscribed_date?: string;
}

interface PageSection {
  id: number;
  page: 'home' | 'about' | 'services' | 'resources' | 'contact';
  section_name: string;
  title: string;
  subtitle?: string;
  description?: string;
  content?: any;         // JSON field
  background_type?: 'color' | 'image' | 'video' | 'gradient';
  background_value?: string;
  text_color?: string;
  order: number;
  is_active: boolean;
}

// Union type for all model data
type ModelData =
  | Service
  | Value
  | HeroSlider
  | Feature
  | Testimonial
  | Stat
  | TeamMember
  | FAQ
  | BlogPost
  | Event
  | Partner
  | CallToAction
  | SupportOption
  | WellnessTip
  | EducationalResource
  | EmergencyContact
  | MissionVision
  | WhoWeServe
  | Appointment
  | ContactMessage
  | SiteSettings
  | TherapeuticApproach
  | NewsletterSubscriber
  | PageSection;

// ----------------------------------------------------------------------
// Icon and color options (matching Django choices)
// ----------------------------------------------------------------------
const iconOptions = [
  { value: 'Heart', label: 'Heart' },
  { value: 'Users', label: 'Users' },
  { value: 'BookOpen', label: 'Book Open' },
  { value: 'MessageCircle', label: 'Message Circle' },
  { value: 'Phone', label: 'Phone' },
  { value: 'Shield', label: 'Shield' },
  { value: 'Clock', label: 'Clock' },
  { value: 'CheckCircle', label: 'Check Circle' },
  { value: 'Sparkles', label: 'Sparkles' },
  { value: 'Star', label: 'Star' },
  { value: 'Award', label: 'Award' },
  { value: 'Brain', label: 'Brain' },
  { value: 'Lightbulb', label: 'Lightbulb' },
  { value: 'Target', label: 'Target' },
  { value: 'Video', label: 'Video' },
  { value: 'Calendar', label: 'Calendar' },
  { value: 'FileText', label: 'File Text' },
  { value: 'TrendingUp', label: 'Trending Up' },
];

const colorOptions = [
  { value: 'teal', label: 'Teal' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'orange', label: 'Orange' },
  { value: 'purple', label: 'Purple' },
  { value: 'pink', label: 'Pink' },
  { value: 'red', label: 'Red' },
];

// ----------------------------------------------------------------------
// Model configurations
// ----------------------------------------------------------------------
interface ModelConfig {
  name: string;
  endpoint: string;
  fields: { key: string; label: string; type: string }[];
  formFields: {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    options?: { value: string; label: string }[];
    min?: number;
    max?: number;
    step?: number;
    help?: string;
  }[];
  icon: React.ComponentType<any>;
}

const modelConfigs: Record<string, ModelConfig> = {
  // 1. Services
  services: {
    name: 'Services',
    endpoint: '/services/',
    icon: HeartIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'title', label: 'Title', type: 'string' },
      { key: 'is_featured', label: 'Featured', type: 'boolean' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
      { key: 'order', label: 'Order', type: 'number' },
    ],
    formFields: [
      { name: 'icon', label: 'Icon', type: 'select', required: true, options: iconOptions },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'short_description', label: 'Short Description', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'image_url', label: 'Image URL', type: 'url' },
      { name: 'video_url', label: 'Video URL', type: 'url' },
      { name: 'price', label: 'Price', type: 'number', step: 0.01 },
      { name: 'duration', label: 'Duration', type: 'text' },
      { name: 'is_featured', label: 'Featured', type: 'checkbox' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 2. Values
  values: {
    name: 'Values',
    endpoint: '/values/',
    icon: StarIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'text', label: 'Text', type: 'string' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
      { key: 'order', label: 'Order', type: 'number' },
    ],
    formFields: [
      { name: 'icon', label: 'Icon', type: 'select', options: iconOptions },
      { name: 'text', label: 'Text', type: 'text', required: true },
      { name: 'title', label: 'Title (optional)', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 3. Hero Sliders
  heroSliders: {
    name: 'Hero Sliders',
    endpoint: '/hero-slides/',
    icon: HomeIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'title', label: 'Title', type: 'string' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
      { key: 'order', label: 'Order', type: 'number' },
    ],
    formFields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'title_highlight', label: 'Title Highlight', type: 'text' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'badge_text', label: 'Badge Text', type: 'text' },
      { name: 'primary_button_text', label: 'Primary Button Text', type: 'text', required: true },
      { name: 'primary_button_link', label: 'Primary Button Link', type: 'text', required: true },
      { name: 'secondary_button_text', label: 'Secondary Button Text', type: 'text' },
      { name: 'secondary_button_link', label: 'Secondary Button Link', type: 'text' },
      { name: 'background_image_url', label: 'Background Image URL', type: 'url' },
      { name: 'background_video_url', label: 'Background Video URL', type: 'url' },
      { name: 'overlay_color', label: 'Overlay Color', type: 'text' },
      { name: 'overlay_opacity', label: 'Overlay Opacity', type: 'number', step: 0.1, min: 0, max: 1 },
      { name: 'text_color', label: 'Text Color', type: 'text' },
      {
        name: 'animation_type',
        label: 'Animation Type',
        type: 'select',
        options: [
          { value: 'fade', label: 'Fade' },
          { value: 'slide', label: 'Slide' },
          { value: 'zoom', label: 'Zoom' },
        ],
      },
      { name: 'slide_duration', label: 'Slide Duration (ms)', type: 'number' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 4. Features
  features: {
    name: 'Features',
    endpoint: '/features/',
    icon: StarIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'title', label: 'Title', type: 'string' },
      { key: 'icon_color', label: 'Color', type: 'string' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
    ],
    formFields: [
      { name: 'icon', label: 'Icon', type: 'select', options: iconOptions, required: true },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'text', required: true },
      { name: 'icon_color', label: 'Icon Color', type: 'select', options: colorOptions },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 5. Testimonials
  testimonials: {
    name: 'Testimonials',
    endpoint: '/testimonials/',
    icon: ChatBubbleLeftRightIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'author_name', label: 'Author', type: 'string' },
      { key: 'rating', label: 'Rating', type: 'number' },
      { key: 'is_featured', label: 'Featured', type: 'boolean' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
    ],
    formFields: [
      { name: 'quote', label: 'Quote', type: 'textarea', required: true },
      { name: 'author_name', label: 'Author Name', type: 'text', required: true },
      { name: 'author_title', label: 'Author Title', type: 'text' },
      { name: 'author_image_url', label: 'Author Image URL', type: 'url' },
      { name: 'rating', label: 'Rating (1-5)', type: 'number', min: 1, max: 5 },
      { name: 'is_featured', label: 'Featured', type: 'checkbox' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 6. Stats
  stats: {
    name: 'Statistics',
    endpoint: '/stats/',
    icon: ChartBarIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'title', label: 'Title', type: 'string' },
      { key: 'value', label: 'Value', type: 'string' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
    ],
    formFields: [
      { name: 'icon', label: 'Icon', type: 'select', options: iconOptions },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'value', label: 'Value', type: 'text', required: true },
      { name: 'suffix', label: 'Suffix (e.g., "+", "%")', type: 'text' },
      { name: 'prefix', label: 'Prefix (e.g., "$")', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'animation_duration', label: 'Animation Duration (ms)', type: 'number' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 7. Team Members
  teamMembers: {
    name: 'Team Members',
    endpoint: '/team-members/',
    icon: UsersIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'title', label: 'Title', type: 'string' },
      { key: 'is_featured', label: 'Featured', type: 'boolean' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
    ],
    formFields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'bio', label: 'Bio', type: 'textarea', required: true },
      { name: 'image_url', label: 'Image URL', type: 'url' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phone', label: 'Phone', type: 'text' },
      { name: 'specialties', label: 'Specialties (comma separated)', type: 'text', help: 'Enter as comma-separated values' },
      { name: 'education', label: 'Education (comma separated)', type: 'text' },
      { name: 'languages', label: 'Languages (comma separated)', type: 'text' },
      { name: 'years_experience', label: 'Years Experience', type: 'number' },
      { name: 'is_featured', label: 'Featured', type: 'checkbox' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 8. FAQs
  faqs: {
    name: 'FAQs',
    endpoint: '/faqs/',
    icon: QuestionMarkCircleIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'question', label: 'Question', type: 'string' },
      { key: 'category', label: 'Category', type: 'string' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
    ],
    formFields: [
      { name: 'question', label: 'Question', type: 'text', required: true },
      { name: 'answer', label: 'Answer', type: 'textarea', required: true },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 9. Blog Posts
  blogPosts: {
    name: 'Blog Posts',
    endpoint: '/blog-posts/',
    icon: BookOpenIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'title', label: 'Title', type: 'string' },
      { key: 'author', label: 'Author', type: 'string' },
      { key: 'is_featured', label: 'Featured', type: 'boolean' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
    ],
    formFields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true, help: 'URL-friendly identifier' },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { name: 'content', label: 'Content', type: 'textarea', required: true },
      { name: 'author', label: 'Author', type: 'text', required: true },
      { name: 'author_image_url', label: 'Author Image URL', type: 'url' },
      { name: 'featured_image_url', label: 'Featured Image URL', type: 'url' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'tags', label: 'Tags (comma separated)', type: 'text' },
      { name: 'read_time', label: 'Read Time (minutes)', type: 'number' },
      { name: 'is_featured', label: 'Featured', type: 'checkbox' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 10. Events
  events: {
    name: 'Events',
    endpoint: '/events/',
    icon: CalendarIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'title', label: 'Title', type: 'string' },
      { key: 'event_type', label: 'Type', type: 'string' },
      { key: 'start_date', label: 'Start', type: 'string' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
    ],
    formFields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      {
        name: 'event_type',
        label: 'Event Type',
        type: 'select',
        required: true,
        options: [
          { value: 'workshop', label: 'Workshop' },
          { value: 'support_group', label: 'Support Group' },
          { value: 'seminar', label: 'Seminar' },
          { value: 'webinar', label: 'Webinar' },
        ],
      },
      { name: 'start_date', label: 'Start Date', type: 'datetime-local', required: true },
      { name: 'end_date', label: 'End Date', type: 'datetime-local', required: true },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'is_online', label: 'Online', type: 'checkbox' },
      { name: 'meeting_link', label: 'Meeting Link', type: 'url' },
      { name: 'capacity', label: 'Capacity', type: 'number' },
      { name: 'price', label: 'Price', type: 'number', step: 0.01 },
      { name: 'is_free', label: 'Free', type: 'checkbox' },
      { name: 'featured_image_url', label: 'Image URL', type: 'url' },
      { name: 'is_featured', label: 'Featured', type: 'checkbox' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 11. Partners
  partners: {
    name: 'Partners',
    endpoint: '/partners/',
    icon: GlobeAltIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
    ],
    formFields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'logo_url', label: 'Logo URL', type: 'url' },
      { name: 'website_url', label: 'Website URL', type: 'url' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 12. Call to Actions
  callToActions: {
    name: 'Call to Actions',
    endpoint: '/ctas/',
    icon: MegaphoneIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'title', label: 'Title', type: 'string' },
      { key: 'section_type', label: 'Type', type: 'string' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
    ],
    formFields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'primary_button_text', label: 'Primary Button Text', type: 'text', required: true },
      { name: 'primary_button_link', label: 'Primary Button Link', type: 'text', required: true },
      { name: 'secondary_button_text', label: 'Secondary Button Text', type: 'text' },
      { name: 'secondary_button_link', label: 'Secondary Button Link', type: 'text' },
      { name: 'background_color', label: 'Background Color', type: 'text' },
      { name: 'text_color', label: 'Text Color', type: 'text' },
      { name: 'background_image_url', label: 'Background Image URL', type: 'url' },
      {
        name: 'section_type',
        label: 'Section Type',
        type: 'select',
        options: [
          { value: 'standard', label: 'Standard' },
          { value: 'split', label: 'Split Screen' },
          { value: 'full_width', label: 'Full Width' },
        ],
      },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 13. Support Options
  supportOptions: {
    name: 'Support Options',
    endpoint: '/support-options/',
    icon: LifebuoyIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'title', label: 'Title', type: 'string' },
      { key: 'color', label: 'Color', type: 'string' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
    ],
    formFields: [
      { name: 'icon', label: 'Icon', type: 'select', options: iconOptions },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'features', label: 'Features (JSON array)', type: 'textarea', help: 'Enter as JSON array, e.g. ["feature1","feature2"]' },
      { name: 'color', label: 'Color', type: 'select', options: colorOptions },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 14. Wellness Tips
  wellnessTips: {
    name: 'Wellness Tips',
    endpoint: '/wellness-tips/',
    icon: SparklesIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'title', label: 'Title', type: 'string' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
    ],
    formFields: [
      { name: 'icon', label: 'Icon', type: 'select', options: iconOptions },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 15. Educational Resources
  educationalResources: {
    name: 'Educational Resources',
    endpoint: '/educational-resources/',
    icon: AcademicCapIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'title', label: 'Title', type: 'string' },
      { key: 'is_coming_soon', label: 'Coming Soon', type: 'boolean' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
    ],
    formFields: [
      { name: 'icon', label: 'Icon', type: 'select', options: iconOptions },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'button_text', label: 'Button Text', type: 'text', required: true },
      { name: 'button_action', label: 'Button Action', type: 'text', required: true },
      { name: 'color', label: 'Color', type: 'select', options: colorOptions },
      { name: 'is_coming_soon', label: 'Coming Soon', type: 'checkbox' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 16. Emergency Contacts
  emergencyContacts: {
    name: 'Emergency Contacts',
    endpoint: '/emergency-contacts/',
    icon: PhoneIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'title', label: 'Title', type: 'string' },
      { key: 'contact', label: 'Contact', type: 'string' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
    ],
    formFields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'contact', label: 'Contact', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'action', label: 'Action Link', type: 'text', required: true, help: 'e.g. tel:0799240254' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 17. Mission & Vision
  missionVision: {
    name: 'Mission & Vision',
    endpoint: '/mission-vision/',
    icon: FlagIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'mission_title', label: 'Mission', type: 'string' },
      { key: 'vision_title', label: 'Vision', type: 'string' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
    ],
    formFields: [
      { name: 'mission_badge', label: 'Mission Badge', type: 'text' },
      { name: 'mission_title', label: 'Mission Title', type: 'text', required: true },
      { name: 'mission_description', label: 'Mission Description', type: 'textarea', required: true },
      { name: 'vision_badge', label: 'Vision Badge', type: 'text' },
      { name: 'vision_title', label: 'Vision Title', type: 'text', required: true },
      { name: 'vision_description', label: 'Vision Description', type: 'textarea', required: true },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 18. Who We Serve
  whoWeServe: {
    name: 'Who We Serve',
    endpoint: '/who-we-serve/',
    icon: UsersIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'title', label: 'Title', type: 'string' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
    ],
    formFields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'items', label: 'Items (JSON array)', type: 'textarea', help: 'Enter as JSON array, e.g. ["item1","item2"]' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 19. Appointments (read-only for admin? but we include)
  appointments: {
    name: 'Appointments',
    endpoint: '/appointments/',
    icon: CalendarIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'preferred_date', label: 'Date', type: 'string' },
      { key: 'status', label: 'Status', type: 'string' },
      { key: 'is_urgent', label: 'Urgent', type: 'boolean' },
    ],
    formFields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'text', required: true },
      { name: 'preferred_date', label: 'Preferred Date', type: 'date', required: true },
      { name: 'preferred_time', label: 'Preferred Time', type: 'time', required: true },
      {
        name: 'preferred_contact_method',
        label: 'Contact Method',
        type: 'select',
        options: [
          { value: 'phone', label: 'Phone' },
          { value: 'email', label: 'Email' },
          { value: 'whatsapp', label: 'WhatsApp' },
        ],
      },
      { name: 'service', label: 'Service ID', type: 'number' },
      { name: 'counselor', label: 'Counselor ID', type: 'number' },
      { name: 'message', label: 'Message', type: 'textarea' },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: 'pending', label: 'Pending' },
          { value: 'confirmed', label: 'Confirmed' },
          { value: 'cancelled', label: 'Cancelled' },
          { value: 'completed', label: 'Completed' },
          { value: 'rescheduled', label: 'Rescheduled' },
        ],
      },
      { name: 'is_urgent', label: 'Urgent', type: 'checkbox' },
    ],
  },

  // 20. Contact Messages (read-only)
  contactMessages: {
    name: 'Contact Messages',
    endpoint: '/contact-messages/',
    icon: EnvelopeIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'email', label: 'Email', type: 'string' },
      { key: 'subject', label: 'Subject', type: 'string' },
      { key: 'is_read', label: 'Read', type: 'boolean' },
    ],
    formFields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'text' },
      { name: 'subject', label: 'Subject', type: 'text', required: true },
      { name: 'message', label: 'Message', type: 'textarea', required: true },
      { name: 'is_read', label: 'Read', type: 'checkbox' },
      { name: 'is_replied', label: 'Replied', type: 'checkbox' },
    ],
  },

  // 21. Site Settings (singleton)
  siteSettings: {
    name: 'Site Settings',
    endpoint: '/site-settings/',
    icon: Cog6ToothIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'site_name', label: 'Site Name', type: 'string' },
      { key: 'contact_email', label: 'Email', type: 'string' },
      { key: 'contact_phone', label: 'Phone', type: 'string' },
    ],
    formFields: [
      { name: 'site_name', label: 'Site Name', type: 'text' },
      { name: 'site_description', label: 'Site Description', type: 'textarea' },
      { name: 'contact_email', label: 'Contact Email', type: 'email' },
      { name: 'contact_phone', label: 'Contact Phone', type: 'text' },
      { name: 'whatsapp_number', label: 'WhatsApp Number', type: 'text' },
      { name: 'address', label: 'Address', type: 'textarea' },
      { name: 'google_maps_url', label: 'Google Maps URL', type: 'url' },
      { name: 'facebook_url', label: 'Facebook URL', type: 'url' },
      { name: 'twitter_url', label: 'Twitter URL', type: 'url' },
      { name: 'instagram_url', label: 'Instagram URL', type: 'url' },
      { name: 'linkedin_url', label: 'LinkedIn URL', type: 'url' },
      { name: 'youtube_url', label: 'YouTube URL', type: 'url' },
      { name: 'tiktok_url', label: 'TikTok URL', type: 'url' },
      { name: 'working_hours', label: 'Working Hours', type: 'textarea' },
      { name: 'footer_text', label: 'Footer Text', type: 'textarea' },
      { name: 'logo_url', label: 'Logo URL', type: 'url' },
      { name: 'favicon_url', label: 'Favicon URL', type: 'url' },
      { name: 'primary_color', label: 'Primary Color', type: 'text' },
      { name: 'secondary_color', label: 'Secondary Color', type: 'text' },
      { name: 'accent_color', label: 'Accent Color', type: 'text' },
      { name: 'google_analytics_id', label: 'Google Analytics ID', type: 'text' },
    ],
  },

  // 22. Therapeutic Approaches
  therapeuticApproaches: {
    name: 'Therapeutic Approaches',
    endpoint: '/approaches/',
    icon: ShieldCheckIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'title', label: 'Title', type: 'string' },
      { key: 'is_featured', label: 'Featured', type: 'boolean' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
    ],
    formFields: [
      { name: 'icon', label: 'Icon', type: 'select', options: iconOptions },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'long_description', label: 'Long Description', type: 'textarea' },
      { name: 'image_url', label: 'Image URL', type: 'url' },
      { name: 'is_featured', label: 'Featured', type: 'checkbox' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 23. Newsletter Subscribers
  newsletterSubscribers: {
    name: 'Newsletter Subscribers',
    endpoint: '/newsletter-subscribers/',
    icon: EnvelopeIcon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'email', label: 'Email', type: 'string' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
      { key: 'subscribed_date', label: 'Subscribed', type: 'string' },
    ],
    formFields: [
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },

  // 24. Page Sections
  pageSections: {
    name: 'Page Sections',
    endpoint: '/page-sections/',
    icon: Squares2X2Icon,
    fields: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'page', label: 'Page', type: 'string' },
      { key: 'section_name', label: 'Section', type: 'string' },
      { key: 'is_active', label: 'Active', type: 'boolean' },
    ],
    formFields: [
      {
        name: 'page',
        label: 'Page',
        type: 'select',
        required: true,
        options: [
          { value: 'home', label: 'Home' },
          { value: 'about', label: 'About' },
          { value: 'services', label: 'Services' },
          { value: 'resources', label: 'Resources' },
          { value: 'contact', label: 'Contact' },
        ],
      },
      { name: 'section_name', label: 'Section Name', type: 'text', required: true },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'content', label: 'Content (JSON)', type: 'textarea', help: 'Enter JSON object' },
      {
        name: 'background_type',
        label: 'Background Type',
        type: 'select',
        options: [
          { value: 'color', label: 'Color' },
          { value: 'image', label: 'Image' },
          { value: 'video', label: 'Video' },
          { value: 'gradient', label: 'Gradient' },
        ],
      },
      { name: 'background_value', label: 'Background Value', type: 'text' },
      { name: 'text_color', label: 'Text Color', type: 'text' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },
};

// ----------------------------------------------------------------------
// Authentication helpers
// ----------------------------------------------------------------------
const getAuthToken = () => localStorage.getItem('token');
const setAuthToken = (token: string) => localStorage.setItem('token', token);
const removeAuthToken = () => localStorage.removeItem('token');

axios.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// ----------------------------------------------------------------------
// Login Component
// ----------------------------------------------------------------------
const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/auth/login/`, { username, password });
      setAuthToken(response.data.token);
      onLogin();
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

// ----------------------------------------------------------------------
// Sidebar Component
// ----------------------------------------------------------------------
const SidebarContent = ({ currentModel, setCurrentModel }: { currentModel: string; setCurrentModel: (key: string) => void }) => {
  const navigation = Object.entries(modelConfigs).map(([key, config]) => ({
    name: config.name,
    key,
    icon: config.icon,
  }));

  return (
    <div className="flex flex-col flex-1 h-0 bg-teal-700">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img className="h-8 w-auto" src="/logo.png" alt="Suzstar" />
          <span className="text-white font-bold ml-2">Admin</span>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.key}
              onClick={() => setCurrentModel(item.key)}
              className={`group w-full flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                currentModel === item.key
                  ? 'bg-teal-800 text-white'
                  : 'text-teal-100 hover:bg-teal-600'
              }`}
            >
              <item.icon className="mr-3 h-6 w-6" aria-hidden="true" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Form Component
// ----------------------------------------------------------------------
interface FormProps {
  config: ModelConfig;
  initialData: any | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const Form = ({ config, initialData, onSubmit, onCancel }: FormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
        {config.formFields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                {...register(field.name, { required: field.required })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            ) : field.type === 'select' ? (
              <select
                {...register(field.name, { required: field.required })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select...</option>
                {field.options?.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <input
                type="checkbox"
                {...register(field.name)}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
            ) : (
              <input
                type={field.type}
                {...register(field.name, { 
                  required: field.required,
                  valueAsNumber: field.type === 'number',
                  min: field.min,
                  max: field.max,
                })}
                step={field.step}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            )}
            {errors[field.name] && <p className="text-red-500 text-xs mt-1">This field is required</p>}
            {field.help && <p className="text-gray-500 text-xs mt-1">{field.help}</p>}
          </div>
        ))}
      </div>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:text-sm"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="mt-3 sm:mt-0 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

// ----------------------------------------------------------------------
// Main Admin Dashboard Component
// ----------------------------------------------------------------------
export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAuthToken());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentModel, setCurrentModel] = useState<string>('services');
  const [data, setData] = useState<ModelData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ModelData | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const navigate = useNavigate();

  const config = modelConfigs[currentModel];

  const fetchData = async () => {
    if (!config) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}${config.endpoint}`);
      setData(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && config) {
      fetchData();
    }
  }, [isAuthenticated, currentModel]);

  const handleSave = async (formData: any) => {
    // For JSON fields, you may want to parse them; here we assume they are sent as strings
    try {
      if (editingItem) {
        await axios.put(`${API_BASE}${config.endpoint}${editingItem.id}/`, formData);
      } else {
        await axios.post(`${API_BASE}${config.endpoint}`, formData);
      }
      fetchData();
      setModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      alert('Error saving item');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}${config.endpoint}${id}/`);
      fetchData();
      setDeleteConfirm(null);
    } catch (err) {
      alert('Error deleting item');
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
                <SidebarContent currentModel={currentModel} setCurrentModel={setCurrentModel} />
              </Dialog.Panel>
            </Transition.Child>
            <div className="flex-shrink-0 w-14"></div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarContent currentModel={currentModel} setCurrentModel={setCurrentModel} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button
              type="button"
              className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">{config?.name} Management</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setEditingItem(null);
                  setModalOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Add New
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {config?.fields.map((field) => (
                      <th key={field.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {field.label}
                      </th>
                    ))}
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item: any) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      {config?.fields.map((field) => (
                        <td key={field.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {field.type === 'boolean' ? (item[field.key] ? 'Yes' : 'No') : item[field.key]}
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setModalOpen(true);
                          }}
                          className="text-teal-600 hover:text-teal-900 mr-4"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Transition.Root show={modalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">
                    {editingItem ? 'Edit' : 'Add'} {config?.name.slice(0, -1)}
                  </Dialog.Title>
                  <Form
                    config={config!}
                    initialData={editingItem}
                    onSubmit={handleSave}
                    onCancel={() => setModalOpen(false)}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Delete Confirmation */}
      <Transition.Root show={deleteConfirm !== null} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setDeleteConfirm(null)}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Confirm Delete
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Are you sure you want to delete this item? This action cannot be undone.</p>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 sm:mt-0 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                    onClick={() => setDeleteConfirm(null)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}