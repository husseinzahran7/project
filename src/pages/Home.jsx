import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import backgroundImage from '../assets/images/homepage_backgroundimg.jpg';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => 
        (prev + 1) % (testimonials.length || 1)
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  async function fetchData() {
    const [servicesData, projectsData, testimonialsData] = await Promise.all([
      supabase.from('services').select('*').limit(3),
      supabase.from('projects').select('*').limit(3),
      supabase.from('testimonials').select('*')
    ]);

    if (servicesData.data) setServices(servicesData.data);
    if (projectsData.data) setProjects(projectsData.data);
    if (testimonialsData.data) setTestimonials(testimonialsData.data);
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <motion.div 
          className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Mohammad Zahran Est.
          </motion.h1>
          <motion.p 
            className="mt-6 max-w-2xl mx-auto text-xl text-primary-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Building excellence with expertise and dedication
          </motion.p>
          <motion.div 
            className="mt-10 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link
              to="/request-quote"
              className="transform hover:scale-105 transition-transform px-8 py-3 rounded-lg bg-white text-primary-700 font-semibold shadow-lg hover:bg-gray-50"
            >
              Request a Quote
            </Link>
            <Link
              to="/projects"
              className="transform hover:scale-105 transition-transform px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10"
            >
              View Our Work
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Services Overview */}
      <div className="py-24 bg-gradient-to-b from-white to-primary-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-xl text-gray-600">
              Comprehensive construction solutions for all your needs
            </p>
          </motion.div>
          <motion.div 
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-white p-8 rounded-xl shadow-lg border border-primary-100 hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-2xl font-bold text-primary-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <svg className="h-5 w-5 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="py-24 bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900">Featured Projects</h2>
            <p className="mt-4 text-xl text-gray-600">
              Take a look at some of our recent work
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 bg-primary-200 relative overflow-hidden">
                  {project.image_url && (
                    <img 
                      src={project.image_url} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <span className="px-3 py-1 text-sm text-primary-600 bg-primary-50 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Slider */}
      <div className="py-24 bg-gradient-to-r from-primary-900 to-primary-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold">What Our Clients Say</h2>
            <p className="mt-4 text-xl text-primary-100">
              Testimonials from satisfied customers
            </p>
          </motion.div>
          <div className="relative h-64">
            <AnimatePresence mode="wait">
              {testimonials[currentTestimonial] && (
                <motion.div
                  key={currentTestimonial}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="max-w-2xl text-center">
                    <p className="text-xl italic text-primary-100">
                      "{testimonials[currentTestimonial].content}"
                    </p>
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold">
                        {testimonials[currentTestimonial].name}
                      </h3>
                      <p className="text-primary-200">
                        {testimonials[currentTestimonial].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {/* <div className="bg-gradient-to-r from-secondary-700 to-secondary-800">
        <motion.div 
          className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Ready to start your project?
            </h2>
            <p className="mt-4 text-xl text-secondary-100">
              Get in touch with us for a free consultation
            </p>
            <motion.div 
              className="mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/contact" 
                className="inline-block bg-white text-secondary-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us Today
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div> */}
    </div>
  );
}