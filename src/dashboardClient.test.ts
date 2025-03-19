import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { DashboardClient } from "./dashboardClient";
import { HttpLogPayload, LogPayload } from "./types";

describe("DashboardClient", () => {
  let client: DashboardClient;

  beforeEach(() => {
    client = new DashboardClient({ apiKey: "test-key" });
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should require apiKey in constructor", () => {
    expect(() => new DashboardClient({} as any)).toThrow("apiKey is required");
  });

  it("should use default apiUrl if not provided", () => {
    expect(client["apiUrl"]).toBe("http://localhost:3000/api");
  });

  it("should send HTTP log", async () => {
    const mockLog: HttpLogPayload = {
      method: "GET",
      url: "/test",
      status: 0,
      headers: {},
    };
    (global.fetch as any).mockResolvedValueOnce({ ok: true });

    await client.sendHttpLog(mockLog);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/http-logs",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer test-key",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockLog),
      }
    );
  });

  it("should add log", async () => {
    const mockLog: LogPayload = {
      message: "test",
      level: "error",
    };
    (global.fetch as any).mockResolvedValueOnce({ ok: true });

    await client.addLog(mockLog);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/logs",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer test-key",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockLog),
      }
    );
  });

  it("should handle request errors", async () => {
    const consoleSpy = vi.spyOn(console, "error");
    const mockError = new Error("Network error");
    (global.fetch as any).mockRejectedValueOnce(mockError);

    await client.addLog({
      message: "test",
      level: "error",
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error while sending request to /logs:",
      mockError
    );
  });
});
