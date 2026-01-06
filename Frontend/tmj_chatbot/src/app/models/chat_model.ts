export interface ChatMessage {
    id?: string;
    content: string;
    role: 'user' | 'bot';
}