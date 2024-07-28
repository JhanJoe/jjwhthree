import React from 'react';
import './globals.css'; 

export const metadata = {
  title: '記帳應用',
  description: '一個簡單的記帳工具',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>
        <div className="App">
          {children}
        </div>
      </body>
    </html>
  );
}
