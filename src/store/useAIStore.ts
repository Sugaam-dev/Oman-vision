import { create } from 'zustand';
import { AIMessage } from '../types/ai';
import { matchAIResponse } from '../data/aiResponses';
import { storage } from '../utils/storage';

interface AIState {
  messages: AIMessage[];
  isTyping: boolean;

  // Actions
  sendMessage: (text: string) => void;
  clearMessages: () => void;
}

const initialAIMessages: AIMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'assistant',
    timestamp: 'Just now',
    text: "Hello Ahmed! I'm your PMRG Assistant for Oman Vision 2040 smart procurement. I can help you with procurement planning, order tracking, policy guidance and more. How can I assist you today?",
    intent: 'GREETING'
  }
];

export const useAIStore = create<AIState>((set, get) => {
  const savedMessages = storage.get<AIMessage[]>('ai_messages', initialAIMessages);

  return {
    messages: savedMessages,
    isTyping: false,

    sendMessage: (text: string) => {
      if (!text.trim()) return;

      const userMsg: AIMessage = {
        id: 'msg-user-' + Date.now(),
        sender: 'user',
        timestamp: 'Just now',
        text: text.trim()
      };

      const updatedWithUser = [...get().messages, userMsg];
      set({ messages: updatedWithUser, isTyping: true });

      // Simulate instantaneous natural response typing
      setTimeout(() => {
        const assistantResponse = matchAIResponse(text);
        const finalMessages = [...get().messages, assistantResponse];
        storage.set('ai_messages', finalMessages);
        set({ messages: finalMessages, isTyping: false });
      }, 400);
    },

    clearMessages: () => {
      storage.set('ai_messages', initialAIMessages);
      set({ messages: initialAIMessages });
    }
  };
});
