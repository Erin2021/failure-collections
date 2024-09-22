"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const credentialsAction = (formData: FormData) => {
    signIn("credentials", formData);
  };

  return (
    <div>
      {!session ? (
        <div>
          <form action={credentialsAction}>
            <label htmlFor="credentials-email">
              Email
              <input type="email" id="credentials-email" name="email" />
            </label>
            <label htmlFor="credentials-password">
              Password
              <input
                type="password"
                id="credentials-password"
                name="password"
              />
            </label>
            <input type="submit" value="Sign In" />
          </form>
          <p>You are not signed in</p>
          <button onClick={() => signIn("google")}>Sign in with Google</button>
          <button onClick={() => signIn("kakao")}>Sign in with Kakao</button>
          <button onClick={() => signIn("naver")}>Sign in with Naver</button>
          <button onClick={() => signIn("apple")}>Sign in with Apple</button>
        </div>
      ) : (
        <div>
          <p>Welcome, User ID: {session.user.uid}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </div>
  );
}
