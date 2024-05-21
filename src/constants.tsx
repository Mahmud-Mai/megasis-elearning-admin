export const baseApiUrl: string =
  process.env.SERVER_URL || "https://api.learningplatform.megasisnetwork.com";
export const apiRoot: string = `${baseApiUrl}/api`;
export const healthCheckUrl: string = `${baseApiUrl}/health`;
