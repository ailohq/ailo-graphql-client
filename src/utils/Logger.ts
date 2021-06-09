/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Logger {
  error(...data: any[]): void;
  warn(...data: any[]): void;
  info(...data: any[]): void;
  debug(...data: any[]): void;
}
