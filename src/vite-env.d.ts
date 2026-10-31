/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY?: string;
  readonly VITE_GEMINI_MODEL?: string;
  readonly VITE_OPEN_METEO_BASE_URL?: string;
  readonly VITE_OSRM_BASE_URL?: string;
  readonly VITE_BACKEND_URL?: string;
  readonly VITE_MEDIA_BACKEND_URL?: string;
  readonly VITE_LYNOTE_ENDPOINT?: string;
  readonly VITE_AEGIS_ENDPOINT?: string;
  readonly VITE_C2PA_ENDPOINT?: string;
  readonly VITE_FAST_DETECT_GPT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
