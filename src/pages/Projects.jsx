import React from 'react';

export default function Projects() {
  const projects = [
    {
      title: 'Modern Office Complex',
      category: 'Commercial',
      description: 'A state-of-the-art office complex featuring sustainable design elements and modern amenities.',
      details: ['50,000 sq ft', 'LEED Certified', 'Completed in 2024']
    },
    {
      title: 'Luxury Home Development',
      category: 'Residential',
      description: 'Custom-built luxury homes with high-end finishes and smart home technology.',
      details: ['12 Units', 'Smart Home Integration', 'Completed in 2023']
    },
    {
      title: 'Restaurant Renovation',
      category: 'Commercial',
      description: 'Complete renovation of a historic building into a modern restaurant space.',
      details: ['Historic Preservation', 'Modern Updates', 'Completed in 2023']
    },
    {
      title: 'Medical Center',
      category: 'Healthcare',
      description: 'New construction of a medical center with specialized facilities and equipment.',
      details: ['30,000 sq ft', 'State-of-the-art Facilities', 'Completed in 2024']
    },
    {
      title: 'Retail Complex',
      category: 'Commercial',
      description: 'Mixed-use retail complex with underground parking and modern amenities.',
      details: ['25 Retail Units', 'Underground Parking', 'Completed in 2023']
    },
    {
      title: 'Residential Community',
      category: 'Residential',
      description: 'Development of a planned residential community with shared amenities.',
      details: ['40 Homes', 'Community Center', 'Completed in 2024']
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Our Projects</h1>
          <p className="mt-4 text-xl text-center text-primary-100">
            Showcasing our finest work and achievements
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <span className="px-3 py-1 text-sm text-primary-600 bg-primary-50 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="border-t pt-4">
                    <ul className="space-y-2">
                      {project.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="text-sm text-gray-600 flex items-center">
                          <svg className="h-4 w-4 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}