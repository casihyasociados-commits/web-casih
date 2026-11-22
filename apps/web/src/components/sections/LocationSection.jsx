import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Building } from 'lucide-react';

const LocationSection = React.forwardRef(({ address, hours, logoUrl }, ref) => {
  const addressParts = address.split(',');
  const streetAddress = addressParts[0] + ", Piso 1 A"; 
  const cityState = addressParts.slice(1).join(',').trim().replace("Piso 1 A", "").replace(", ,", ",").trim();
  
  const mapLat = -31.424600; 
  const mapLon = -64.180600;
  const mapZoom = 17; 
  
  const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${mapLon - 0.005},${mapLat - 0.0025},${mapLon + 0.005},${mapLat + 0.0025}&layer=mapnik`;
  const mapWithMarkerUrl = `${mapEmbedUrl}&marker=${mapLat},${mapLon}`;


  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const mapItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.2 } }
  };


  return (
    <motion.section
      ref={ref}
      id="ubicacion"
      className="py-24 bg-gradient-to-b from-gray-900 to-black"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Nuestra Ubicación</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Nos encontramos en una ubicación céntrica y accesible en Córdoba.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants} className="space-y-6">
            {[
              { icon: <MapPin className="w-6 h-6 mr-3 text-gray-300" />, title: "Dirección", lines: [streetAddress, cityState] },
              { icon: <Clock className="w-6 h-6 mr-3 text-gray-300" />, title: "Horarios de Atención", lines: [hours, "Sábados y Domingos: Cerrado"] },
              { icon: <Building className="w-6 h-6 mr-3 text-gray-300" />, title: "Información Adicional", lines: ["Estacionamiento cercano", "Acceso para personas con discapacidad", "Fácil acceso en transporte público"] }
            ].map((info, idx) => (
              <motion.div 
                key={info.title}
                className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-lg p-6 shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  {info.icon}
                  <h4 className="text-xl font-semibold">{info.title}</h4>
                </div>
                {info.lines.map((line, lineIdx) => (
                  <p key={lineIdx} className="text-gray-300">{line}</p>
                ))}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={mapItemVariants}
            className="h-96 md:h-[500px] bg-gray-700 rounded-lg overflow-hidden shadow-xl relative group"
          >
            <iframe
              src={mapWithMarkerUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              className="filter grayscale-[80%] group-hover:grayscale-0 transition-all duration-500 ease-in-out"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Casih & Asociados"
            ></iframe>
            <motion.div 
              className="absolute top-3 right-3 bg-black/70 p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale:0.8, opacity:0 }}
              whileInView={{ scale:1, opacity:1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <img src={logoUrl} alt="Marker" className="h-8 w-auto"/>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
});

export default LocationSection;