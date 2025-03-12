export interface HttpLogPayload {
  method: string;
  url: string;
  status: number;
  headers: Record<string, string>;
  params?: Record<string, any>;
  query?: Record<string, any>;
  body?: any;
  response?: any;
  responseTime?: number;
}

export interface LogPayload {
  level: "info" | "warn" | "error" | "debug";
  message: string;
  metadata?: Record<string, any>;
}
