import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';

const AnimatedStat = ({ icon, value, suffix, label, delay }) => {
  const [isInView, setIsInView] = React.useState(false);
  const ref = useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center flex flex-col items-center"
    >
      <div className="flex items-center justify-center w-20 h-20 bg-white/10 rounded-lg mb-4">
        {icon}
      </div>
      <h4 className="text-4xl font-bold mb-2">
        {isInView && <CountUp end={value} duration={2.5} />}
        {suffix}
      </h4>
      <p className="text-gray-400 text-lg">{label}</p>
    </motion.div>
  );
};

const AboutSection = React.forwardRef(({ stats, values, backgroundImageUrl, contentImageUrl, title, description }, ref) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const [hoveredImage, setHoveredImage] = React.useState(false);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };
  
  const cardItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.section
      ref={ref}
      id="nosotros"
      className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${backgroundImageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12, 
          y: parallaxY,
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center mb-16">
           <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre Nosotros</h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-1 flex flex-col items-center"
          >
            <div 
              className="relative rounded-lg overflow-hidden shadow-xl cursor-pointer group w-full max-w-md mx-auto mb-8" 
              onMouseEnter={() => setHoveredImage(true)}
              onMouseLeave={() => setHoveredImage(false)}
            >
              <img  
                src={contentImageUrl} 
                alt="Pablo Casih - Abogado" 
                className={`w-full h-auto object-cover aspect-[3/4] transition-all duration-500 ease-in-out ${hoveredImage ? 'grayscale-0 scale-105' : 'grayscale'}`}
              />
              <AnimatePresence>
              {hoveredImage && (
                <motion.div 
                  className="absolute inset-0 bg-black/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div className="space-y-6 lg:col-span-1" variants={itemVariants}>
            {values.map((valueItem, index) => (
              <motion.div
                key={valueItem.title}
                variants={cardItemVariants}
                className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {valueItem.icon}
                  <h4 className="text-xl font-semibold">{valueItem.title}</h4>
                </div>
                {valueItem.items ? (
                  <ul className="space-y-2 text-gray-300">
                    {valueItem.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-gray-400 mr-2 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-300">{valueItem.text}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          variants={itemVariants} 
          className="w-full mx-auto mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">{title}</h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
            {description}
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="max-w-4xl mx-auto py-16 px-4 border-t border-b border-gray-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
            {stats.map((stat, index) => (
              <AnimatedStat key={index} {...stat} delay={index * 0.2 + 0.4} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
});

export default AboutSection;