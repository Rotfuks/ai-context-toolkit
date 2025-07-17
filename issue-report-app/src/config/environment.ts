import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export interface EnvironmentConfig {
  githubToken: string;
  githubApiBaseUrl: string;
  rateLimitWindow: number;
  rateLimitRequests: number;
}

function validateEnvironment(): EnvironmentConfig {
  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    throw new Error('GITHUB_TOKEN environment variable is required. Please set it in your .env file.');
  }

  const githubApiBaseUrl = process.env.GITHUB_API_BASE_URL || 'https://api.github.com';
  const rateLimitWindow = parseInt(process.env.GITHUB_RATE_LIMIT_WINDOW || '3600', 10);
  const rateLimitRequests = parseInt(process.env.GITHUB_RATE_LIMIT_REQUESTS || '5000', 10);

  return {
    githubToken,
    githubApiBaseUrl,
    rateLimitWindow,
    rateLimitRequests,
  };
}

export const config = validateEnvironment(); 