import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + projects.length) % projects.length);
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-5xl font-bold text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Our Projects
          </motion.h1>
          <motion.p 
            className="mt-6 text-xl text-center text-primary-100 max-w-2xl mx-auto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Showcasing our finest work and achievements
          </motion.p>
        </div>
      </motion.div>

      {/* Projects Slider */}
      <div className="py-24 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-96 bg-gray-200 rounded-xl"></div>
            </div>
          ) : (
            <>
              <div className="relative h-[600px] overflow-hidden rounded-xl">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);

                      if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                      } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                      }
                    }}
                    className="absolute w-full h-full"
                  >
                    {projects[currentSlide] && (
                      <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-xl shadow-lg">
                        <div className="relative h-full">
                          <img
                            src={projects[currentSlide].image_url || 'https://via.placeholder.com/600x400'}
                            alt={projects[currentSlide].title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-primary-600 font-medium mb-2">
                            {projects[currentSlide].category}
                          </span>
                          <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            {projects[currentSlide].title}
                          </h2>
                          <p className="text-gray-600 mb-6">
                            {projects[currentSlide].description}
                          </p>
                          <ul className="space-y-3">
                            {projects[currentSlide].details.map((detail, index) => (
                              <li key={index} className="flex items-center text-gray-700">
                                <svg className="h-5 w-5 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center items-center mt-8 space-x-4">
                <button
                  onClick={() => paginate(-1)}
                  className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <div className="flex space-x-2">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentSlide ? 1 : -1);
                        setCurrentSlide(index);
                      }}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => paginate(1)}
                  className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}