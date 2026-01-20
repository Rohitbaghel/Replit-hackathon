import type { Express, Request, Response } from "express";
import {
  isGoogleOAuthConfigured,
  getAuthUrl,
  getTokensFromCode,
  createGmailClient,
  getGmailProfile,
} from "../lib/google-oauth";

export function registerAuthRoutes(app: Express): void {
  /**
   * GET /api/auth/google
   * Redirects the user to Google OAuth consent for gmail.readonly.
   * Query: state (optional) — passed through to callback.
   */
  app.get("/api/auth/google", (req: Request, res: Response) => {
    if (!isGoogleOAuthConfigured()) {
      res.status(503).json({
        error: "Google OAuth not configured",
        message:
          "Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in the environment. See docs/GOOGLE_CLOUD_SETUP.md.",
      });
      return;
    }
    const state = (req.query.state as string) || undefined;
    const url = getAuthUrl(state);
    res.redirect(url);
  });

  /**
   * GET /api/auth/google/callback
   * OAuth callback. Exchanges `code` for tokens, creates a Gmail client,
   * and fetches the user's email to verify Gmail API access.
   * Query: code (required), state (optional), error (if user denied).
   */
  app.get("/api/auth/google/callback", async (req: Request, res: Response) => {
    if (!isGoogleOAuthConfigured()) {
      res.status(503).json({
        error: "Google OAuth not configured",
        message:
          "Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET. See docs/GOOGLE_CLOUD_SETUP.md.",
      });
      return;
    }

    const { code, error: oauthError, state } = req.query;

    if (oauthError) {
      res.status(400).json({
        error: "OAuth denied or error",
        message: String(oauthError),
        state: state ? String(state) : undefined,
      });
      return;
    }

    if (!code || typeof code !== "string") {
      res.status(400).json({
        error: "Missing code",
        message: "The authorization code was not returned by Google.",
      });
      return;
    }

    try {
      const tokens = await getTokensFromCode(code);
      const gmail = createGmailClient(tokens);
      const profile = await getGmailProfile(gmail);

      // TODO: Persist tokens (encrypted) and link to user when DB/auth is ready.
      // For now we only prove the flow works.
      res.status(200).json({
        success: true,
        email: profile.emailAddress,
        // Do not expose tokens to the client in production.
        // hasRefreshToken: Boolean(tokens.refresh_token),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      res.status(400).json({
        error: "Token exchange or Gmail API failed",
        message,
      });
    }
  });
}
