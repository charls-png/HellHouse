import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export const emailTemplates = {
  welcome: (name) => ({
    subject: '⚠️ REGISTRO CONFIRMADO - La Mansión Abaddon te está observando',
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');
    body { 
      margin: 0; 
      padding: 0; 
      background-color: #000000; 
      font-family: 'Courier New', monospace; 
      background-image: 
        repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.05) 2px, rgba(139, 0, 0, 0.05) 4px),
        radial-gradient(ellipse at center, transparent 0%, rgba(139, 0, 0, 0.2) 100%);
      background-attachment: fixed;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background-color: #0a0a0a; 
      border: 3px solid #8b0000; 
      box-shadow: 
        0 0 30px rgba(139, 0, 0, 0.6),
        inset 0 0 50px rgba(139, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }
    .container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 1px,
        rgba(139, 0, 0, 0.03) 1px,
        rgba(139, 0, 0, 0.03) 2px
      );
      pointer-events: none;
      z-index: 1;
      animation: scanline 8s linear infinite;
    }
    @keyframes scanline {
      0% { transform: translateY(0); }
      100% { transform: translateY(100%); }
    }
    .header { 
      background-color: #1a0000; 
      padding: 30px 20px; 
      text-align: center; 
      border-bottom: 4px solid #8b0000; 
      position: relative;
      z-index: 2;
      box-shadow: 0 4px 20px rgba(139, 0, 0, 0.5);
    }
    .header h1 { 
      color: #ff0000; 
      margin: 0; 
      font-size: 36px; 
      text-shadow: 
        0 0 10px #8b0000,
        0 0 20px #8b0000,
        2px 2px 0px #000000,
        -2px -2px 0px #000000;
      letter-spacing: 4px; 
      font-weight: bold;
      animation: glitch 3s infinite;
      font-family: 'Courier New', monospace;
      text-transform: uppercase;
    }
    @keyframes glitch {
      0%, 100% { transform: translate(0); }
      20% { transform: translate(-2px, 2px); }
      40% { transform: translate(-2px, -2px); }
      60% { transform: translate(2px, 2px); }
      80% { transform: translate(2px, -2px); }
    }
    .content { 
      padding: 40px 30px; 
      color: #cccccc; 
      line-height: 2; 
      position: relative;
      z-index: 2;
    }
    .content p { 
      margin: 25px 0; 
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    }
    .greeting {
      color: #ff6b6b;
      font-weight: bold;
      font-size: 18px;
    }
    .warning-box { 
      background-color: #2a0000; 
      border: 3px solid #ff0000;
      border-left: 8px solid #ff0000;
      padding: 20px; 
      margin: 30px 0; 
      color: #ffcccc;
      box-shadow: 
        0 0 20px rgba(255, 0, 0, 0.4),
        inset 0 0 30px rgba(139, 0, 0, 0.3);
      text-align: center;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 14px;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { border-color: #ff0000; box-shadow: 0 0 20px rgba(255, 0, 0, 0.4), inset 0 0 30px rgba(139, 0, 0, 0.3); }
      50% { border-color: #8b0000; box-shadow: 0 0 30px rgba(255, 0, 0, 0.6), inset 0 0 40px rgba(139, 0, 0, 0.5); }
    }
    .warning-box::before {
      content: '⚠️ ⚠️ ⚠️';
      display: block;
      font-size: 20px;
      margin-bottom: 10px;
      color: #ff0000;
    }
    .disturbing-text {
      background-color: rgba(139, 0, 0, 0.1);
      padding: 15px;
      border-left: 4px solid #8b0000;
      margin: 20px 0;
      color: #ffaaaa;
      font-style: italic;
    }
    .quote {
      margin-top: 40px; 
      color: #ff0000; 
      font-style: italic;
      text-align: center;
      font-size: 18px;
      text-shadow: 
        0 0 5px rgba(255, 0, 0, 0.5),
        2px 2px 0px #000000;
      padding: 20px;
      border-top: 2px solid #8b0000;
      border-bottom: 2px solid #8b0000;
    }
    .footer { 
      background-color: #000000; 
      padding: 20px; 
      text-align: center; 
      font-size: 11px; 
      color: #666666; 
      border-top: 2px solid #333333;
      position: relative;
      z-index: 2;
    }
    .unsubscribe { 
      color: #8b0000; 
      text-decoration: none;
      font-weight: bold;
    }
    .unsubscribe:hover {
      color: #ff0000;
      text-decoration: underline;
    }
    .glitch-word {
      color: #ff0000;
      text-shadow: 
        2px 0 #000000,
        -2px 0 #8b0000;
      animation: glitch-word 2s infinite;
      display: inline-block;
    }
    @keyframes glitch-word {
      0%, 100% { transform: translate(0); }
      25% { transform: translate(-1px, 1px); }
      50% { transform: translate(1px, -1px); }
      75% { transform: translate(-1px, -1px); }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>HELL HOUSE</h1>
    </div>
    <div class="content">
      <p class="greeting">Estimado/a ${name || 'visitante'},</p>
      
      <p>Has sido <span class="glitch-word">REGISTRADO</span> en nuestra lista de visitantes.</p>
      
      <p>Tu nombre ha sido añadido al archivo. Tu dirección de correo ha sido marcada. <strong>Estás en la lista ahora.</strong></p>
      
      <div class="warning-box">
        ADVERTENCIA CRÍTICA<br><br>
        El contenido de futuros correos puede contener material EXTREMADAMENTE perturbador.<br>
        Imágenes inquietantes. Sonidos que no deberías escuchar. Información que no deberías conocer.<br><br>
        Si tienes un corazón débil o eres propenso al miedo... considera cancelar tu suscripción AHORA.
      </div>
      
      <p>A partir de ahora, recibirás <strong>actualizaciones directas</strong> sobre los eventos que ocurren en <span class="glitch-word">la Mansión Abaddon</span>.</p>
      
      <div class="disturbing-text">
        <strong>LA MANSIÓN HA ESTADO CERRADA DURANTE 15 AÑOS.</strong><br><br>
        Las razones <span class="glitch-word">nunca</span> fueron completamente reveladas al público.<br>
        Los informes oficiales fueron censurados. Los testigos desaparecieron.<br>
        Las grabaciones fueron confiscadas.<br><br>
        Pero ahora... las puertas se están abriendo nuevamente.
      </div>
      
      <p>Lo que sucedió aquella <span class="glitch-word">noche de Halloween de 2009</span> no puede ser olvidado.</p>
      
      <p>Las voces en los pasillos. Las sombras que se mueven. Los sonidos que provienen de habitaciones que no deberían existir.</p>
      
      <p>Y pronto... <strong>tú también lo descubrirás.</strong></p>
      
      <p style="margin-top: 30px; color: #8b0000; text-align: center; font-size: 14px;">
        Nos vemos pronto en la mansión...<br>
        <span style="color: #ff0000;">Esperamos que sobrevivas.</span>
      </p>
      
      <p class="quote">"Algunos lugares no deben ser perturbados...<br>Pero tú ya lo hiciste."</p>
    </div>
    <div class="footer">
      <p style="color: #8b0000; font-weight: bold;">Hell House © 2025</p>
      <p style="margin-top: 15px;">Este correo fue enviado porque te registraste en nuestra lista de visitantes.</p>
      <p>Si deseas <strong>sobrevivir</strong> y dejar de recibir estos correos, <a href="{{unsubscribe_url}}" class="unsubscribe">cancela tu suscripción aquí</a></p>
      <p style="margin-top: 10px; font-size: 10px; color: #444444;">Es demasiado tarde para huir...</p>
    </div>
  </div>
</body>
</html>`
  }),

  newsletter: (title, content) => ({
    subject: title,
    html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'Courier New', monospace; color: #cccccc; }
    .container { max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border: 2px solid #3a0000; }
    .header { background-color: #2a0000; padding: 30px; text-align: center; border-bottom: 3px solid #8b0000; }
    .header h1 { color: #8b0000; margin: 0; font-size: 24px; }
    .content { padding: 40px 30px; color: #cccccc; line-height: 1.8; }
    .footer { background-color: #0a0a0a; padding: 20px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #333333; }
    .unsubscribe { color: #8b0000; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>${title}</h1></div>
    <div class="content">${content}</div>
    <div class="footer">
      <p>Hell House 2025</p>
      <p><a href="{{unsubscribe_url}}" class="unsubscribe">Cancelar suscripción</a></p>
    </div>
  </div>
</body>
</html>`
  })
};

export const sendEmail = async (to, template) => {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.log('Email simulado - Gmail no configurado');
      console.log('Para:', to);
      console.log('Asunto:', template.subject);
      return { success: true, data: { id: 'simulated' }, simulated: true };
    }

    const mailOptions = {
      from: `"Hell House" <${process.env.GMAIL_USER}>`,
      to: to,
      subject: template.subject,
      html: template.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado correctamente:', info.messageId);
    return { success: true, data: { id: info.messageId } };
  } catch (error) {
    console.error('Error al enviar email:', error);
    return { success: false, error: error.message };
  }
};

export default transporter;
