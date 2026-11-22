// Enlaces de WhatsApp con mensaje armado y registro del clic como conversión.

export const DEFAULT_MESSAGE =
  'Hola, quisiera hacer una consulta sobre un caso laboral o previsional.';

export const buildWhatsAppUrl = (phone, text = DEFAULT_MESSAGE) =>
  `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;

// Avisa a Google (Ads / Analytics) y a Meta que hubo un clic a WhatsApp.
// Si todavía no está instalada la etiqueta de Google, no hace nada y no rompe el sitio.
export const trackWhatsAppClick = (origin = 'sitio') => {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'whatsapp_click', { origen: origin });
      // Cuando se cree la conversión en Google Ads, se agrega acá su etiqueta:
      // window.gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXX/YYYYYYYY' });
    }
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Contact', { origen: origin });
    }
  } catch (e) {
    // nunca bloquear el contacto por un error de medición
  }
};

export const openWhatsApp = (phone, text, origin) => {
  trackWhatsAppClick(origin);
  window.open(buildWhatsAppUrl(phone, text), '_blank', 'noopener,noreferrer');
};
