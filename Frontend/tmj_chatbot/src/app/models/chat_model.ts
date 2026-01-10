import type { paths, components } from '../api/schema';

export type ChatPost =
  paths["/chat"]["post"];

export type ChatRequest =
  ChatPost["requestBody"]["content"]["application/json"];

export type ChatResponse =
  ChatPost["responses"][200]["content"]["application/json"];

export type ChatMessage = 
  components["schemas"]["ChatMessage"];

export type UiChatMessage =
  ChatMessage & { id?: string };