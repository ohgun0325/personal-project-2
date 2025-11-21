export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface ProposalPayload {
  prompt: string;
  files: File[];
}

