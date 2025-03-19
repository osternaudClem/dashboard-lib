# Dashboard

A simple dashboard module for logging HTTP requests and monitoring your API.

## Installation

```bash
npm install cl3tus-dashboard
```

## Usage

### Basic Usage

```typescript
import { DashboardClient } from "@cl3tus/dashboard";

const dashboard = new DashboardClient({
  apiKey: "your-api-key",
  apiUrl: "http://my-dashboard.com/api",
});
```

### Express.js Middleware Integration

```typescript
import { DashboardClient } from "@cl3tus/dashboard";
import { NextFunction, Request, Response } from "express";

const dashboard = new DashboardClient({
  apiKey: "your-api-key",
  apiUrl: "http://my-dashboard.com/api",
});

export const logHttpRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logData = {
    source: "YOUR_API_NAME",
    method: req.method,
    url: req.originalUrl,
    statusCode: res.statusCode,
    headers: req.headers,
    params: req.params,
    query: req.query,
    body: req.body,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    response: null,
  };

  res.on("finish", async () => {
    logData.statusCode = res.statusCode;
    logData.response = res.locals.response;
    try {
      await dashboard.sendHttpLog(logData);
      console.log("HTTP log sent successfully");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to log request:", error.message);
      } else {
        console.error("Failed to log request:", error);
      }
    }
  });

  next();
};
```

Then use it in your Express.js application:

```typescript
import express from "express";
import { logHttpRequest } from "./middleware";

const app = express();
app.use(logHttpRequest);
```
