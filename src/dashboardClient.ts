import { HttpLogPayload, LogPayload } from "./types";

export class DashboardClient {
  private apiKey: string;
  private apiUrl: string;

  constructor(config: { apiKey: string; apiUrl?: string }) {
    if (!config.apiKey) {
      throw new Error("apiKey is required");
    }

    this.apiKey = config.apiKey;
    this.apiUrl = config.apiUrl || "http://localhost:3000/api";
  }

  private async request(
    endpoint: string,
    method: string,
    body?: any
  ): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        console.error(
          `Failed request to ${endpoint}: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error(`Error while sending request to ${endpoint}:`, error);
    }
  }

  async sendHttpLog(log: HttpLogPayload): Promise<void> {
    await this.request("/http-logs", "POST", log);
  }

  async addLog(log: LogPayload): Promise<void> {
    await this.request("/logs", "POST", log);
  }
}
