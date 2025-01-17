"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./styles/page.css";
import "./styles/accounting_page.css";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User, signOut } from "../../firebase-config";
import { useRouter } from "next/navigation";

const HomePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      alert("註冊成功");
      setSignUpEmail("");
      setSignUpPassword("");
    } catch (error: any) {
      console.error("Error signing up:", error);
      alert(error.message);
    }
  };

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
      alert("登入成功");
      setSignInEmail("");
      setSignInPassword("");
    } catch (error: any) {
      console.error("Error signing in:", error);
      alert(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("登出成功");
    } catch (error: any) {
      console.error("Error signing out:", error);
      alert(error.message);
    }
  };

  return (
    <div className="home-page">
      <h1>歡迎使用記帳工具</h1>

      {user ? (
        <>
          <span>Welcome, {(user.email)}</span>
          <Link href="/accounting">
            <button>立刻開始</button>
          </Link>
          <button onClick={handleSignOut}>登出</button>
        </>
      ) : (
        <>
          <div className="auth-container">
            <span>註冊</span>
            <form onSubmit={handleSignUp}>
              <input
                type="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
              />
              <button onClick={handleSignUp}>註冊</button>
            </form>
          </div>
          
          <br />

          <div className="auth-container">
            <span>登入</span>
            <form onSubmit={handleSignIn}>
              <input
                type="email"
                placeholder="Email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
              />
              <button onClick={handleSignIn}>登入</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
