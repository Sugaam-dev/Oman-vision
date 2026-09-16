export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  intent?: string;
  actions?: {
    label: string;
    route?: string;
    actionType?: 'navigate' | 'filter' | 'order_status' | 'view_product';
    payload?: any;
    isPrimary?: boolean;
  }[];
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
  };
  productCards?: {
    id: string;
    name: string;
    price: number;
    sku: string;
    image: string;
    category: string;
    availability: string;
  }[];
}

export interface AIIntent {
  intent: string;
  keywords: string[];
  patterns: RegExp[];
  generateResponse: (query: string, context?: any) => AIMessage;
}
