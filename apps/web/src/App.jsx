import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Shield,
  Briefcase,
  Instagram,
  Phone,
  Mail,
  MapPin as MapPinIcon,
  Clock as ClockIcon,
  Award,
  Heart,
  Info,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import LocationSection from '@/components/sections/LocationSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

const App = () => {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [currentSectionKey, setCurrentSectionKey] = useState(Date.now());

  const newLogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/b5d9b937-d284-43eb-87b1-d7bd54efe66c/b66090730f0d964d2d7274668c4b122d.png";
  const aboutBackgroundImageUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/b5d9b937-d284-43eb-87b1-d7bd54efe66c/a1c19c2a8bd4116dcc0f9bb55aa125bd.png";
  const newAboutContentImageUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/b5d9b937-d284-43eb-87b1-d7bd54efe66c/d1f69623d944857963cf43048f200cb9.jpg";

  const contactInfo = {
    phone: "+5493516327201",
    email: "casihyasociados@gmail.com",
    address: "Arturo M. Bas 389, Piso 1 A (esq. Duarte Quirós), X5000 Córdoba, Argentina",
    instagram: "https://www.instagram.com/casihyasociados?igsh=MTY0dDNvbm80d2M4aw%3D%3D&utm_source=qr",
    hours: "Lunes a Viernes: 9:00 - 16:00"
  };

  const sectionRefs = {
    inicio: useRef(null),
    servicios: useRef(null),
    nosotros: useRef(null),
    testimonios: useRef(null),
    ubicacion: useRef(null),
    contacto: useRef(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let current = 'inicio';
      for (const sectionId in sectionRefs) {
        const ref = sectionRefs[sectionId].current;
        if (ref && ref.offsetTop <= scrollPosition && ref.offsetTop + ref.offsetHeight > scrollPosition) {
          current = sectionId;
          break;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = sectionRefs[sectionId].current;
    if (element) {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 96; 
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setCurrentSectionKey(Date.now()); 
    }
    setIsMenuOpen(false);
  };

  const services = [
    {
      title: "Derecho Laboral",
      icon: <Briefcase className="w-10 h-10 text-gray-300 group-hover:text-white transition-colors" />,
      items: [
        "Despidos",
        "Trabajo en negro",
        "Diferencia de haberes",
        "ART",
        "Enfermedades profesionales",
        "Accidentes de trabajo"
      ]
    },
    {
      title: "Derecho Previsional",
      icon: <Shield className="w-10 h-10 text-gray-300 group-hover:text-white transition-colors" />,
      items: [
        "Jubilaciones",
        "Retiro por invalidez",
        "Reajuste"
      ]
    },
    {
      title: "Derecho Sindical",
      icon: <Users className="w-10 h-10 text-gray-300 group-hover:text-white transition-colors" />,
      items: [
        "Asesoramiento",
        "Elecciones de autoridades y delegados",
        "Encuadramiento"
      ]
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sindicato Obrero de la Industria del Cartón y Papel",
      company: "(S.O.I.PyC)",
      rating: 5,
    },
    {
      id: 2,
      name: "Unión Obrera de la Construcción de la República Argentina",
      company: "(U.O.C.R.A.)",
      rating: 5,
    },
    {
      id: 3,
      name: "Obra Social del Personal de la Construcción",
      company: "(O.S.P.E.CON.)",
      rating: 5,
    },
    {
      id: 4,
      name: "Unión Trabajadores de la Industria del Calzado de la República Argentina",
      company: "(UTICRA)",
      rating: 5,
    },
    {
      id: 5,
      name: "Obra Social del Personal de la Industria del Calzado",
      company: "(OSPICAL)",
      rating: 5,
    }
  ];
  
  const aboutStats = [
    { icon: <ClockIcon className="w-8 h-8 text-gray-300" />, value: 25, suffix: "+", label: "Años de experiencia" },
    { icon: <UserCheck className="w-8 h-8 text-gray-300" />, value: 1000, suffix: "+", label: "Casos exitosos" }
  ];

  const aboutValues = [
    { icon: <Heart className="w-6 h-6 mr-3 text-gray-300" />, title: "Nuestros Valores", items: ["Compromiso con la justicia", "Transparencia en cada proceso", "Atención personalizada", "Excelencia profesional"] },
    { icon: <Award className="w-6 h-6 mr-3 text-gray-300" />, title: "Nuestra Trayectoria", text: "Reconocidos por nuestra dedicación y resultados, hemos construido una sólida reputación basada en la confianza de nuestros clientes y el respeto de nuestros colegas." },
    { icon: <Info className="w-6 h-6 mr-3 text-gray-300" />, title: "Información Adicional", text: "Las consultas se realizan con cita previa para brindarte la mejor atención." }
  ];

  const aboutMeTitle = "Dr. Pablo Antonio Casih";
  const aboutMeDescription = "Abogado independiente con matrícula profesional 1-31142 y más de 25 años de experiencia en el ejercicio del Derecho. A lo largo de mi carrera me he especializado en Derecho Laboral, trabajando tanto en reclamos individuales como colectivos, y brindando asesoramiento en cuestiones de Derecho Sindical. También me desempeño en el área de Derecho Previsional, acompañando a mis clientes en trámites de jubilación, retiro por invalidez y reajustes. Además, cuento con una sólida trayectoria en procuración judicial y gestión de cobranzas, ofreciendo un servicio profesional, cercano y comprometido con cada caso.";


  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
        activeSection={activeSection}
        logoUrl={newLogoUrl}
      />
      <AnimatePresence mode="wait">
        <motion.div key={currentSectionKey}>
          <Hero ref={sectionRefs.inicio} scrollToSection={scrollToSection} phoneNumber={contactInfo.phone} />
          <ServicesSection ref={sectionRefs.servicios} services={services} />
          <AboutSection 
            ref={sectionRefs.nosotros} 
            stats={aboutStats} 
            values={aboutValues} 
            backgroundImageUrl={aboutBackgroundImageUrl}
            contentImageUrl={newAboutContentImageUrl}
            title={aboutMeTitle}
            description={aboutMeDescription}
          />
          <TestimonialsSection ref={sectionRefs.testimonios} testimonials={testimonials} />
          <LocationSection ref={sectionRefs.ubicacion} address={contactInfo.address} hours={contactInfo.hours} logoUrl={newLogoUrl} />
          <ContactSection ref={sectionRefs.contacto} contactInfo={contactInfo} />
        </motion.div>
      </AnimatePresence>
      <Footer logoUrl={newLogoUrl} contactInfo={contactInfo} />
      <WhatsAppButton phoneNumber={contactInfo.phone} />
      <Toaster />
    </div>
  );
};

export default App;