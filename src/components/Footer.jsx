import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-card text-text-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16"
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 text-primary-500">
              Mohammad Zahran Est.
            </h3>
            <p className="text-text-muted">
              Professional contracting services with years of experience in delivering quality projects.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-primary-500">Quick Links</h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link to="/services" className="text-text-muted hover:text-primary-500 transition-colors">Services</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link to="/projects" className="text-text-muted hover:text-primary-500 transition-colors">Projects</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link to="/request-quote" className="text-text-muted hover:text-primary-500 transition-colors">Request Quote</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link to="/contact" className="text-text-muted hover:text-primary-500 transition-colors">Contact Us</Link>
              </motion.li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-primary-500">Contact Info</h3>
            <ul className="space-y-2 text-text-muted">
              <motion.li whileHover={{ x: 5 }} className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                123 Construction Ave
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (555) 123-4567
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@mzest.com
              </motion.li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-primary-500">Business Hours</h3>
            <ul className="space-y-2 text-text-muted">
              <li>Monday - Friday: 8am - 6pm</li>
              <li>Saturday: 9am - 4pm</li>
              <li>Sunday: Closed</li>
            </ul>
          </motion.div>
        </motion.div>
        <motion.div 
          className="py-6 text-center border-t border-primary-500/20"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-text-muted">
            &copy; {new Date().getFullYear()} Mohammad Zahran Est. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}