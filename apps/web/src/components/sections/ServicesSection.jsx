import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const ServicesSection = React.forwardRef(({ services }, ref) => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, duration: 0.5 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const iconHover = {
    rotate: [0, -15, 15, -10, 10, 0],
    scale: 1.2,
    transition: { duration: 0.5, type: "spring", stiffness:300 }
  };

  return (
    <motion.section
      ref={ref}
      id="servicios"
      className="py-24 bg-gradient-to-b from-black to-gray-900"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Nuestros Servicios</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ofrecemos asesoramiento integral en todas las áreas del derecho laboral,
            previsional y sindical con la experiencia que nos respalda.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-lg p-8 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gray-700/30"
            >
              <div className="flex items-center mb-6">
                <motion.div 
                  className="p-3 bg-white/10 rounded-lg mr-4 group-hover:bg-white/20 transition-colors"
                  whileHover={iconHover}
                >
                  {React.cloneElement(service.icon, { className: "w-10 h-10 text-gray-300 group-hover:text-white transition-colors"})}
                </motion.div>
                <h3 className="text-2xl font-semibold">{service.title}</h3>
              </div>
              <ul className="space-y-3">
                {service.items.map((item, itemIndex) => (
                  <motion.li 
                    key={itemIndex} 
                    className="flex items-center text-gray-300"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: itemIndex * 0.05 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    <ChevronRight className="w-4 h-4 mr-3 text-gray-500 group-hover:text-gray-300 transition-colors" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
});

export default ServicesSection;