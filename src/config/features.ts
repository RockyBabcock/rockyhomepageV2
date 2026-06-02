import { env } from 'process';

export const features = {
  aiPlayground: import.meta.env.VITE_ENABLE_AI_PLAYGROUND !== "false",
  web3Vault: import.meta.env.VITE_ENABLE_WEB3_VAULT !== "false",
  telemetry: import.meta.env.VITE_ENABLE_TELEMETRY !== "false",
  githubActivity: import.meta.env.VITE_ENABLE_GITHUB_ACTIVITY !== "false",
};
