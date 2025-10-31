import subscriberModel from '../models/subscriberModel.js';
import { sendEmail, emailTemplates } from '../config/email.js';

export const subscriberController = {
  // Suscribirse al newsletter
  subscribe: async (req, res) => {
    try {
      const { email, name } = req.body;

      // Validación básica
      if (!email || !email.includes('@')) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email inválido' 
        });
      }

      // Verificar si ya existe
      const existingSubscriber = await subscriberModel.findByEmail(email);
      
      if (existingSubscriber) {
        if (existingSubscriber.is_active) {
          return res.status(400).json({ 
            success: false, 
            message: 'Este email ya está suscrito' 
          });
        } else {
          // Reactivar suscripción
          const query = `
            UPDATE subscribers 
            SET is_active = true, updated_at = CURRENT_TIMESTAMP 
            WHERE email = $1 
            RETURNING *
          `;
          const pool = (await import('../config/database.js')).default;
          await pool.query(query, [email]);
          
          return res.status(200).json({ 
            success: true, 
            message: 'Suscripción reactivada exitosamente' 
          });
        }
      }

      // Crear nuevo suscriptor
      const result = await subscriberModel.create(email, name);

      if (!result.success) {
        return res.status(400).json({ 
          success: false, 
          message: result.error 
        });
      }

      // Enviar email de bienvenida
      const welcomeEmail = emailTemplates.welcome(name || 'visitante');
      const emailResult = await sendEmail(email, welcomeEmail);

      // Registrar email enviado
      if (emailResult.success) {
        await subscriberModel.logEmail(
          result.data.id, 
          welcomeEmail.subject, 
          'welcome', 
          'sent'
        );
      } else {
        await subscriberModel.logEmail(
          result.data.id, 
          welcomeEmail.subject, 
          'welcome', 
          'failed', 
          emailResult.error
        );
      }

      res.status(201).json({ 
        success: true, 
        message: 'Suscripción exitosa. Revisa tu email.',
        emailSent: emailResult.success
      });

    } catch (error) {
      console.error('Error en subscribe:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error del servidor' 
      });
    }
  },

  // Desuscribirse
  unsubscribe: async (req, res) => {
    try {
      const { token } = req.params;

      if (!token) {
        return res.status(400).json({ 
          success: false, 
          message: 'Token inválido' 
        });
      }

      const subscriber = await subscriberModel.unsubscribeByToken(token);

      if (!subscriber) {
        return res.status(404).json({ 
          success: false, 
          message: 'Suscripción no encontrada' 
        });
      }

      res.status(200).json({ 
        success: true, 
        message: 'Te has desuscrito exitosamente' 
      });

    } catch (error) {
      console.error('Error en unsubscribe:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error del servidor' 
      });
    }
  },

  // Obtener estadísticas (para admin)
  getStats: async (req, res) => {
    try {
      const count = await subscriberModel.countActive();
      
      res.status(200).json({ 
        success: true, 
        data: { activeSubscribers: count }
      });

    } catch (error) {
      console.error('Error en getStats:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error del servidor' 
      });
    }
  }
};

export default subscriberController;


