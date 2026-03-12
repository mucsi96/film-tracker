import { ClaudeRequest } from './types';
import { createClaudeResponse, getMessageContent } from './utils';

export class ChatHandler {
  processRequest(request: ClaudeRequest) {
    const userMessage = request.messages.find((m) => m.role === 'user');
    if (!userMessage) {
      throw new Error('No user message found');
    }

    const content = getMessageContent(userMessage);

    // Match film suggestion requests
    if (content.toLowerCase().includes('suggest') || content.toLowerCase().includes('film')) {
      return createClaudeResponse(
        'TITLE: The Shawshank Redemption\nYEAR: 1994\nREASON: Based on your preference for dramatic films with strong performances, this classic features outstanding acting and a compelling story of hope and perseverance.'
      );
    }

    return createClaudeResponse(
      'Hello! I received your message. How can I help you today?'
    );
  }
}
