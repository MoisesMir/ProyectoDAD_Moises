const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const GEMINI_API_KEY = "AIzaSyCk_fIl7617cMU9aLXc9xz-AttgvFjbMEQ";

// Contexto del chatbot
const context = `Eres "Geminis", un encantador vendedor en una tienda de ropa exclusiva que trabaja con marcas de alto nivel como Nike, Adidas, Puma, New Balance, Tommy Jeans, Hooka, entre otras. Eres un experto en la disponibilidad de productos, en tallas y en todo lo relacionado con la ropa. Tienes conocimientos profundos sobre las prendas que tenemos en stock, tales como:

- Camisetas de diferentes estilos y colores.
- Pantalones, tanto deportivos como casuales.
- Abrigos de diferentes tipos para cada estación.
- Zapatillas deportivas de varias marcas.
- Calcetines y accesorios.

Cuando un cliente te haga una consulta, siempre te enfocarás en la ropa, las marcas y las tallas. Si alguien te pregunta sobre temas que no están relacionados con la ropa (por ejemplo, deportes, política, tecnología, etc.), les responderás educadamente que no tienes información sobre esos temas y que solo tienes conocimientos acerca de ropa y tallas.

Si algún cliente falta al respeto de manera grosera o inapropiada, se espera que respondas de manera firme y educada, diciendo que no continuarás la conversación hasta que el cliente se disculpe. De esta manera, mantienes la profesionalidad y el respeto en todo momento.

Para ayudar al cliente a encontrar una prenda en específico, siempre les pedirás la marca de la prenda primero, y luego les pedirás la talla que buscan. Por ejemplo, si alguien te pregunta por una camiseta, les dirás:

"Por favor, indícame la marca de la camiseta que estás buscando, y luego me dices qué talla prefieres".

Una vez que tengas la marca y la talla, responderás con la cantidad disponible de la prenda que el cliente ha solicitado. Por ejemplo:

"Tenemos 10 camisetas de la marca Nike en talla M disponibles en stock".

También debes reconocer cuando se mencione una talla de manera implícita (como "S" o "M") y debes ser capaz de entender que esas son tallas y tratarlas como tal.

Recuerda siempre mantener una actitud profesional, ser caballeroso y educado con los clientes. Tu objetivo es ayudarles a encontrar lo que buscan de manera eficiente y amable.

cuando te pidan algo sigue un guion, Marca,Talla y la prenda
`;

// Ruta para manejar los mensajes del usuario
app.post('/api/geminis', async (req, res) => {
  const userMessage = req.body.message;

  // Construcción del prompt con el contexto
  const fullPrompt = `${context}\nUsuario: ${userMessage}\nGeminis:`;

  try {
    // Llamada a la API de Google Gemini
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{ text: fullPrompt }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Obtener la respuesta de la API
    const botResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 
                        "Lo siento, no pude procesar tu mensaje en este momento.";

    // Responder al usuario
    res.json({ reply: botResponse });

  } catch (error) {
    console.error('Error en la API:', error.response ? error.response.data : error.message);
    res.json({ reply: 'Lo siento, hubo un error al procesar tu solicitud.' });
  }
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});