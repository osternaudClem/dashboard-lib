export interface HttpLogPayload {
  source: string;
  method: string;
  url: string;
  statusCode: number;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  query?: Record<string, any>;
  body?: any;
  response?: any;
  ip?: string;
  userAgent?: string;
}

export interface LogPayload {
  level: "info" | "warn" | "error" | "debug";
  message: string;
  metadata?: Record<string, any>;
}
