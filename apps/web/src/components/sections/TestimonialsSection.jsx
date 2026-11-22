import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TestimonialsSection = React.forwardRef(({ testimonials }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef(null);

  const slideTestimonial = (newDirection) => {
    setDirection(newDirection);
    if (newDirection > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    }
  };

  const handleNext = () => slideTestimonial(1);
  const handlePrev = () => slideTestimonial(-1);

  useEffect(() => {
    intervalRef.current = setInterval(handleNext, 7000);
    return () => clearInterval(intervalRef.current);
  }, [testimonials.length]);

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(handleNext, 7000);
  };

  const onPrevClick = () => {
    handlePrev();
    resetInterval();
  };

  const onNextClick = () => {
    handleNext();
    resetInterval();
  };
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    })
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <motion.section
      ref={ref}
      id="testimonios"
      className="py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Confían en nuestro asesoramiento sindical</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            La satisfacción de nuestros clientes es nuestro mayor logro.
            Conoce las organizaciones que han confiado en nosotros.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto h-60 md:h-48">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full h-full bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-lg p-8 md:p-12 shadow-xl text-center flex flex-col justify-center items-center"
            >
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute top-6 left-6"
              >
                <Quote className="w-10 h-10 md:w-12 md:h-12 text-gray-600 transform scale-x-[-1]" />
              </motion.div>
              
              <div className="flex flex-col items-center justify-center space-y-2 mb-4">
                <Building2 className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
                <div>
                  <h3 className="font-semibold text-lg md:text-xl text-white">{currentTestimonial.name}</h3>
                  {currentTestimonial.company && <p className="text-gray-400 text-md">{currentTestimonial.company}</p>}
                </div>
              </div>
              
              <div className="flex justify-center mb-3">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute bottom-6 right-6"
              >
                <Quote className="w-10 h-10 md:w-12 md:h-12 text-gray-600" />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevClick}
            className="absolute top-1/2 left-0 sm:-left-10 md:-left-16 transform -translate-y-1/2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full p-2"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="w-7 h-7 md:w-8 md:h-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNextClick}
            className="absolute top-1/2 right-0 sm:-right-10 md:-right-16 transform -translate-y-1/2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full p-2"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-7 h-7 md:w-8 md:h-8" />
          </Button>
        </div>
        
        <div className="flex justify-center mt-12 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => { 
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index); 
                  resetInterval(); 
                }}
                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ease-in-out ${
                  currentIndex === index ? 'bg-white scale-125' : 'bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>

      </div>
    </motion.section>
  );
});

export default TestimonialsSection;