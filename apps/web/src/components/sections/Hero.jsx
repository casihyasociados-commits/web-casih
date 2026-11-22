import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { openWhatsApp } from '@/lib/whatsapp';

const Hero = React.forwardRef(({ scrollToSection, phoneNumber }, ref) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const buttonHover = {
    scale: 1.05,
    boxShadow: "0px 0px 8px rgba(255,255,255,0.3)",
    transition: { duration: 0.2 }
  };
  
  const outlineButtonHover = {
    scale: 1.05,
    boxShadow: "0px 0px 8px rgba(150,150,150,0.3)",
    transition: { duration: 0.2 }
  };


  return (
    <motion.section
      ref={ref}
      id="inicio"
      className="pt-24 min-h-screen flex items-center justify-center relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-90"></div>
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1505664194779-8be224042048?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=60')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-shadow-lg"
        >
          Más de <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">25 años</span>
          <br />
          defendiendo los
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">derechos laborales</span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto"
        >
          Abogados en derecho laboral, previsional y sindical.
          Contanos tu caso por WhatsApp y te explicamos tus opciones.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => openWhatsApp(phoneNumber, undefined, 'hero')}
            className="bg-green-600 text-white hover:bg-green-700 text-lg px-8 py-3 h-auto shadow-lg hover:shadow-green-500/40 transition-all duration-300"
            whileHover={buttonHover}
            whileTap={{ scale: 0.95 }}
          >
            Consultá por WhatsApp
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => scrollToSection('servicios')}
            className="border-gray-400 text-gray-200 hover:bg-gray-700/50 hover:text-white text-lg px-8 py-3 h-auto shadow-md hover:shadow-gray-400/30 transition-all duration-300"
            whileHover={outlineButtonHover}
            whileTap={{ scale: 0.95 }}
          >
            Nuestros Servicios
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
});

export default Hero;