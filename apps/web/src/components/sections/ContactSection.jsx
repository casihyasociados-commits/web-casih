import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin as MapPinIcon, ChevronRight, Instagram } from 'lucide-react';
import { openWhatsApp } from '@/lib/whatsapp';

const ContactSection = React.forwardRef(({ contactInfo }, ref) => {

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const contactDetails = [
    { icon: <Phone className="w-7 h-7 text-gray-300" />, title: "Teléfono / WhatsApp", value: "351 632-7201", href: `tel:${contactInfo.phone}` },
    { icon: <Mail className="w-7 h-7 text-gray-300" />, title: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: <MapPinIcon className="w-7 h-7 text-gray-300" />, title: "Dirección", value: contactInfo.address },
  ];

  return (
    <motion.section
      ref={ref}
      id="contacto"
      className="py-24 bg-gradient-to-b from-black to-gray-900"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Contacto</h2>
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {contactDetails.map((info, index) => (
            <motion.div 
              key={info.title}
              className="flex flex-col items-center text-center p-6 bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05, y:-5, boxShadow: "0px 8px 20px rgba(120,120,120,0.15)" }}
              transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
            >
              <div className="p-4 bg-white/10 rounded-full mb-4">{info.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
              {info.href ? (
                 <a href={info.href} className="text-gray-300 hover:text-white transition-colors">{info.value}</a>
              ) : (
                <p className="text-gray-300">{info.value}</p>
              )}
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8 border-t border-gray-800"
        >
          <Button
            onClick={() => openWhatsApp(contactInfo.phone, undefined, 'contacto')}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white text-xl px-10 py-4 h-auto shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-3"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.401 3.465 2.233 2.225 3.465 5.223 3.466 8.401.003 6.556-5.338 11.891-11.893 11.891-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52s-.669-1.611-.916-2.206c-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413z"/></svg>
            Contactar por WhatsApp
          </Button>
          {contactInfo.instagram && (
            <Button
              variant="outline"
              onClick={() => window.open(contactInfo.instagram, '_blank')}
              className="w-full sm:w-auto border-gray-500 text-gray-200 hover:bg-gray-700 hover:text-white text-xl px-10 py-4 h-auto flex items-center justify-center shadow-md hover:shadow-gray-400/30 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3, borderColor: '#A0A0A0' }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="mr-3 w-6 h-6" />
              Síguenos en Instagram
            </Button>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
});

export default ContactSection;