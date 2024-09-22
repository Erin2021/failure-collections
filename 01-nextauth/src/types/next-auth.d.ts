declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: string;
    email: string;
    name: string;
    image?: string; // 프로필 이미지가 있을 경우
  }
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {
    provider: string;
    type: string;
    access_token?: string;
    id_token?: string;
    refresh_token?: string;
    scope?: string;
    token_type?: string;
    expires_at?: number;
  }
  /**
   * Returned by `useSession`, `getSession`, or in the `session` callback, contains information about the active session.
   */
  interface Session {
    user: {
      id: string;
      uid: string | undefined;
      email: string | null | undefined;
      name: string | null | undefined;
      image?: string;
    };
    expires: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
    uid?: string; // Firebase 인증에서 사용할 사용자 ID
    accessToken?: string;
    refreshToken?: string;
  }
}
