import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-primary-800">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Quality Construction Services
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
              Building dreams into reality with expertise and dedication
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <Link to="/request-quote" className="btn-primary">
                Request a Quote
              </Link>
              <Link to="/projects" className="text-white border-2 border-white px-6 py-2 rounded-lg hover:bg-white hover:text-primary-800 transition-colors">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600">
              Comprehensive construction solutions for all your needs
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Service cards would go here */}
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
            <p className="mt-4 text-lg text-gray-600">
              Take a look at some of our recent work
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Project cards would go here */}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Ready to start your project?
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Get in touch with us for a free consultation
            </p>
            <div className="mt-8">
              <Link to="/contact" className="btn-primary bg-white text-primary-700 hover:bg-gray-100">
                Contact Us Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}