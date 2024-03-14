export const baseApiUrl: string = process.env.API || "http://localhost:4003";
export const apiRoot: string = `${baseApiUrl}/api`;
export const healthCheckUrl: string = `${baseApiUrl}/health`;