import emailjs from 'emailjs-com';

// Configuration EmailJS (vous devrez créer un compte gratuit)
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_p18u62q', // À remplacer
  TEMPLATE_ID: 'template_ao9zghb', // À remplacer
  USER_ID: '3FKYFPw8vnVitwyyP', // À remplacer
};

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Alexandre',
      reply_to: formData.email,
    };

    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.USER_ID
    );

    if (result.status === 200) {
      return {
        success: true,
        message: 'Message envoyé avec succès ! Je vous répondrai rapidement.'
      };
    } else {
      throw new Error('Erreur lors de l\'envoi du message');
    }
  } catch (error) {
    console.error('Erreur EmailJS:', error);
    return {
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.'
    };
  }
};

// Version de secours si EmailJS n'est pas configuré
export const sendEmailFallback = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  // Simule l'envoi d'email (pour le développement)
  console.log('Email simulé:', formData);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Message envoyé avec succès ! (Mode simulation)'
      });
    }, 1000);
  });
};