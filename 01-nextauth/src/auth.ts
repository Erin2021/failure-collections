import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import Naver from "next-auth/providers/naver";
import kakao from "next-auth/providers/kakao";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/email";
import { firebaseAdmin } from "./firebase-admin";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to salt and hash password
        const pwHash = credentials.password;

        // logic to verify if the user exists
        user = getUserByEmail(credentials.email);

        if (user) {
          const isMatch = user.password === pwHash;
          if (isMatch) {
            // return user object with their profile data
            return user;
          } else {
            throw new Error("Email or Password is not correct");
          }
        } else {
          throw new Error("User not found");
        }
      },
    }),
    Google,
    Apple,
    Naver,
    kakao,
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Credentials provider JWT 처리
      if (user) {
        token.uid = user.id; // Credentials 로그인 시 JWT에 uid 추가
        token.email = user.email;
        token.name = user.name;
      }
      // Google, Apple 인증은 Firebase를 통해 토큰 검증
      if (account?.provider === "google" || account?.provider === "apple") {
        const firebaseToken = await firebaseAdmin
          .auth()
          .verifyIdToken(account.id_token!);
        token.uid = firebaseToken.uid;
      }
      // Kakao 인증 처리
      if (account?.provider === "kakao") {
        const kakaoResponse = await axios.get(
          "https://kapi.kakao.com/v2/user/me",
          {
            headers: { Authorization: `Bearer ${account.access_token}` },
          }
        );
        const kakaoUid = kakaoResponse.data.id;
        // Firebase Custom Token 생성
        token.uid = kakaoUid;
      }
      // Naver 인증 처리
      if (account?.provider === "naver") {
        const naverResponse = await axios.get(
          "https://openapi.naver.com/v1/nid/me",
          {
            headers: { Authorization: `Bearer ${account.access_token}` },
          }
        );
        const naverUid = naverResponse.data.response.id;
        // Firebase Custom Token 생성
        token.uid = naverUid;
      }
      return token;
    },
    session({ session, token }) {
      session.user.uid = token.uid;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
});
