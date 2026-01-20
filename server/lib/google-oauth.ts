import { google, type gmail_v1 } from "googleapis";

/** Gmail read-only scope. Required for OAuth verification. */
export const GMAIL_READONLY_SCOPE =
  "https://www.googleapis.com/auth/gmail.readonly";

function getBaseUrl(): string {
  if (process.env.BASE_URL) return process.env.BASE_URL.replace(/\/$/, "");
  if (process.env.REPLIT_DEV_DOMAIN)
    return `https://${process.env.REPLIT_DEV_DOMAIN}`;
  return `http://localhost:${process.env.PORT || 5000}`;
}

/** Redirect URI for OAuth callback. Must match the value configured in Google Cloud Console. */
export function getRedirectUri(): string {
  return `${getBaseUrl()}/api/auth/google/callback`;
}

function getClientId(): string | undefined {
  return process.env.GOOGLE_CLIENT_ID;
}

function getClientSecret(): string | undefined {
  return process.env.GOOGLE_CLIENT_SECRET;
}

/** Whether Google OAuth is configured. */
export function isGoogleOAuthConfigured(): boolean {
  return Boolean(getClientId() && getClientSecret());
}

/** Create OAuth2 client. Call only when isGoogleOAuthConfigured() is true. */
function createOAuth2Client() {
  const client = new google.auth.OAuth2(
    getClientId(),
    getClientSecret(),
    getRedirectUri()
  );
  return client;
}

/**
 * Generate the Google OAuth URL to redirect the user to.
 * @param state - Optional state for CSRF; can be passed through to callback.
 */
export function getAuthUrl(state?: string): string {
  const client = createOAuth2Client();
  return client.generateAuthUrl({
    scope: [GMAIL_READONLY_SCOPE],
    access_type: "offline",
    prompt: "consent", // force consent to receive refresh_token
    state: state ?? undefined,
  });
}

export interface TokenPayload {
  access_token: string;
  refresh_token?: string;
  scope?: string;
  expiry_date?: number;
}

/**
 * Exchange the authorization code for tokens.
 */
export async function getTokensFromCode(code: string): Promise<TokenPayload> {
  const client = createOAuth2Client();
  const { tokens } = await client.getToken(code);
  return {
    access_token: tokens.access_token!,
    refresh_token: tokens.refresh_token ?? undefined,
    scope: tokens.scope ?? undefined,
    expiry_date: tokens.expiry_date ?? undefined,
  };
}

/**
 * Create a Gmail API client using the given tokens.
 */
export function createGmailClient(credentials: TokenPayload): gmail_v1.Gmail {
  const client = createOAuth2Client();
  client.setCredentials(credentials);
  return google.gmail({ version: "v1", auth: client });
}

/**
 * Fetch the authenticated user's Gmail profile (email).
 */
export async function getGmailProfile(
  gmail: gmail_v1.Gmail
): Promise<{ emailAddress: string }> {
  const { data } = await gmail.users.getProfile({ userId: "me" });
  return { emailAddress: data.emailAddress! };
}
