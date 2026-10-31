/**
 * SENTINEL Service Configuration
 * 
 * Secure API Gateway & Endpoint definitions.
 * API keys and secrets are loaded via environment variables and MUST NEVER
 * be hardcoded or checked into public repositories.
 */

export interface ServiceConfig {
  gemini: {
    isConfigured: boolean;
    model: string;
  };
  openMeteo: {
    baseUrl: string;
    isConfigured: boolean;
  };
  osrm: {
    baseUrl: string;
    isConfigured: boolean;
  };
  backend: {
    baseUrl: string;
    isConfigured: boolean;
  };
  mediaWorkers: {
    isConfigured: boolean;
    baseUrl: string;
    lynoteEndpoint: string;
    aegisEndpoint: string;
    c2paEndpoint: string;
    fastDetectGptEndpoint: string;
  };
}

export const serviceConfig: ServiceConfig = {
  gemini: {
    isConfigured: Boolean(import.meta.env.VITE_GEMINI_API_KEY),
    model: import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-flash',
  },
  openMeteo: {
    baseUrl: import.meta.env.VITE_OPEN_METEO_BASE_URL || 'https://api.open-meteo.com/v1',
    isConfigured: true,
  },
  osrm: {
    baseUrl: import.meta.env.VITE_OSRM_BASE_URL || 'https://router.project-osrm.org',
    isConfigured: true,
  },
  backend: {
    baseUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000',
    isConfigured: true,
  },
  mediaWorkers: {
    isConfigured: true,
    baseUrl: import.meta.env.VITE_MEDIA_BACKEND_URL || 'http://localhost:8000',
    lynoteEndpoint: '/api/media/lynote',
    aegisEndpoint: '/api/media/aegis',
    c2paEndpoint: '/api/media/c2pa',
    fastDetectGptEndpoint: '/api/media/fast-detect-gpt',
  },
};
