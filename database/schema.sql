-- Hell House Chronicles Database Schema
-- PostgreSQL

-- Extensiones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de suscriptores del newsletter
CREATE TABLE subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    unsubscribe_token VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de correos enviados (historial)
CREATE TABLE sent_emails (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subscriber_id UUID REFERENCES subscribers(id) ON DELETE CASCADE,
    subject VARCHAR(500) NOT NULL,
    template_name VARCHAR(100),
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'sent',
    error_message TEXT
);

-- Tabla de noticias/actualizaciones del juego
CREATE TABLE news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    image_url VARCHAR(500),
    published_at TIMESTAMP,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de visitas/analytics básico
CREATE TABLE page_visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_path VARCHAR(500),
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    ip_address VARCHAR(45)
);

-- Índices para optimización
CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_active ON subscribers(is_active);
CREATE INDEX idx_sent_emails_subscriber ON sent_emails(subscriber_id);
CREATE INDEX idx_news_published ON news(is_published, published_at DESC);
CREATE INDEX idx_page_visits_date ON page_visits(visited_at);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_subscribers_updated_at BEFORE UPDATE ON subscribers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Datos de ejemplo (noticias)
INSERT INTO news (title, content, excerpt, is_published, published_at) VALUES
(
    'El Hotel Abaddon Abre Sus Puertas',
    'Después de 15 años cerrado, el infame Hotel Abaddon está listo para recibir visitantes una vez más. ¿Te atreves a entrar?',
    'El hotel maldito reabre sus puertas...',
    TRUE,
    CURRENT_TIMESTAMP - INTERVAL '2 days'
),
(
    'Desaparecen Más Visitantes',
    'Las autoridades investigan la misteriosa desaparición de tres personas que ingresaron al hotel la semana pasada. Las cámaras de seguridad muestran que entraron... pero nunca salieron.',
    'Tres personas desaparecen sin dejar rastro...',
    TRUE,
    CURRENT_TIMESTAMP - INTERVAL '5 days'
),
(
    'Grabaciones Encontradas',
    'Se han recuperado grabaciones perturbadoras del sótano del hotel. El contenido es demasiado explícito para ser mostrado públicamente.',
    'Nuevas grabaciones revelan horrores ocultos...',
    TRUE,
    CURRENT_TIMESTAMP - INTERVAL '10 days'
);


