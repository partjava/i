export const LOCAL_MONACO_VS_PATH = '/monaco/vs';

let configured = false;

/** Configure @monaco-editor/loader to serve Monaco assets from same-origin /monaco/vs instead of jsDelivr CDN. */
export function configureMonacoLoader(loader: {
  config: (cfg: { paths?: Record<string, string> }) => void;
}) {
  if (configured || typeof window === 'undefined') return;
  configured = true;
  loader.config({
    paths: {
      vs: LOCAL_MONACO_VS_PATH,
    },
  });
}
