import React from 'react';
import { Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = ({ logoUrl, contactInfo }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.footer 
      className="bg-black border-t border-gray-800 py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-2 mb-4">
              <img src={logoUrl} alt="Casih & Asociados Logo" className="h-20 mr-3" />
            </div>
            <p className="text-gray-400">
              Más de 25 años defendiendo los derechos laborales con
              profesionalismo y compromiso.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4 text-white">Servicios</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Derecho Laboral</li>
              <li>Derecho Previsional</li>
              <li>Derecho Sindical</li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4 text-white">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>{contactInfo.phone}</li>
              <li>{contactInfo.email}</li>
              <li>{contactInfo.address.split(', Piso 1 A')[0]}, Piso 1 A</li>
            </ul>
             {contactInfo.instagram && (
              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Casih & Asociados"
                className="inline-flex items-center mt-4 text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5 mr-2" />
                Síguenos en Instagram
              </a>
            )}
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} Casih & Asociados. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;