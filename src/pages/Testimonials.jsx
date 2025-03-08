import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'John Anderson',
      role: 'Homeowner',
      content: 'The team was professional, punctual, and delivered exceptional quality. Our home renovation exceeded our expectations.',
      project: 'Home Renovation'
    },
    {
      name: 'Sarah Martinez',
      role: 'Business Owner',
      content: 'Outstanding service from start to finish. They completed our office renovation on time and within budget.',
      project: 'Commercial Renovation'
    },
    {
      name: 'Michael Chen',
      role: 'Property Developer',
      content: 'Their attention to detail and project management skills are impressive. Will definitely work with them again.',
      project: 'Mixed-use Development'
    },
    {
      name: 'Emily Thompson',
      role: 'Restaurant Owner',
      content: 'They transformed our space into exactly what we envisioned. The quality of work is outstanding.',
      project: 'Restaurant Build-out'
    },
    {
      name: 'David Wilson',
      role: 'Homeowner',
      content: 'Professional team that truly cares about their clients. They made our custom home building process smooth and enjoyable.',
      project: 'Custom Home'
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Office Manager',
      content: 'Excellent communication throughout the project. They handled our office expansion professionally and efficiently.',
      project: 'Office Expansion'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Client Testimonials</h1>
          <p className="mt-4 text-xl text-center text-primary-100">
            What our clients say about working with us
          </p>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600 text-xl font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div className="text-sm text-primary-600 font-medium">
                  Project: {testimonial.project}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">100+</div>
              <div className="mt-2 text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">95%</div>
              <div className="mt-2 text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">20+</div>
              <div className="mt-2 text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">50+</div>
              <div className="mt-2 text-gray-600">Team Members</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}