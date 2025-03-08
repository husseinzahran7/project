import React from 'react';
import { Link } from 'react-router-dom';

export default function Services() {
  const services = [
    {
      title: 'Residential Construction',
      description: 'Custom homes, renovations, and additions tailored to your lifestyle.',
      features: ['Custom Home Building', 'Home Renovations', 'Room Additions', 'Kitchen & Bath Remodeling']
    },
    {
      title: 'Commercial Construction',
      description: 'Professional construction services for businesses of all sizes.',
      features: ['Office Buildings', 'Retail Spaces', 'Restaurants', 'Warehouses']
    },
    {
      title: 'Renovation & Remodeling',
      description: 'Transform your existing space into something extraordinary.',
      features: ['Interior Renovations', 'Exterior Remodeling', 'Space Planning', 'Structural Modifications']
    },
    {
      title: 'Project Management',
      description: 'Comprehensive project management from start to finish.',
      features: ['Timeline Planning', 'Budget Management', 'Quality Control', 'Subcontractor Coordination']
    },
    {
      title: 'Design Services',
      description: 'Professional design services to bring your vision to life.',
      features: ['Architectural Design', '3D Rendering', 'Space Planning', 'Material Selection']
    },
    {
      title: 'Specialty Projects',
      description: 'Unique construction projects requiring specialized expertise.',
      features: ['Historic Renovations', 'Green Building', 'ADA Compliance', 'Seismic Retrofitting']
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Our Services</h1>
          <p className="mt-4 text-xl text-center text-primary-100">
            Comprehensive construction solutions for every need
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Start Your Project?</h2>
          <p className="mt-4 text-xl text-primary-100">
            Contact us today for a free consultation and quote
          </p>
          <div className="mt-8">
            <Link
              to="/request-quote"
              className="inline-block bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}