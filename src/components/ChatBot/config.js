import { createChatBotMessage } from 'react-chatbot-kit';
import ActionProvider from './ActionProvider';  
import MessageParser from './MessageParser';    

const config = {
    botName: "Gemini",
    initialMessages: [createChatBotMessage('Hola! ¿En qué puedo ayudarte hoy? Soy tu asistente virtual de la tienda de ropa. Puedo ayudarte con información sobre tallas y distintos tipos de ropa.')],
    customStyles: {
      botMessageBox: {
        backgroundColor: "#376B7E",
      },
      chatButton: {
        backgroundColor: "#5ccc9d",
      },
    },
    actionProvider: ActionProvider,
    messageParser: MessageParser,
  };
export default config;