import { githubOAuthConfig } from "./githubOAuthConfig";

export const loginWithGitHub = () => {
  // Construct the GitHub OAuth URL
  const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${
    githubOAuthConfig.clientId
  }&redirect_uri=${encodeURIComponent(
    githubOAuthConfig.redirectUri
  )}&scope=user`;

  window.location.href = githubOAuthUrl;
};
