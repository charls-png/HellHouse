import newsModel from '../models/newsModel.js';

export const newsController = {
  // Obtener todas las noticias publicadas
  getAllNews: async (req, res) => {
    try {
      const news = await newsModel.findAllPublished();
      
      res.status(200).json({ 
        success: true, 
        data: news 
      });

    } catch (error) {
      console.error('Error en getAllNews:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error del servidor' 
      });
    }
  },

  // Obtener últimas noticias (limitado)
  getLatestNews: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 5;
      const news = await newsModel.findLatest(limit);
      
      res.status(200).json({ 
        success: true, 
        data: news 
      });

    } catch (error) {
      console.error('Error en getLatestNews:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error del servidor' 
      });
    }
  },

  // Obtener noticia por ID
  getNewsById: async (req, res) => {
    try {
      const { id } = req.params;
      const news = await newsModel.findById(id);

      if (!news) {
        return res.status(404).json({ 
          success: false, 
          message: 'Noticia no encontrada' 
        });
      }

      res.status(200).json({ 
        success: true, 
        data: news 
      });

    } catch (error) {
      console.error('Error en getNewsById:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error del servidor' 
      });
    }
  }
};

export default newsController;


