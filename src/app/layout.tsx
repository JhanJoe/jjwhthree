import React from 'react';
import './globals.css'; // 如果您有全局 CSS

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

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
// import HomePage from './page'; 
// import AccountingPage from './accounting/page'; 

// function App() {
//   return (
//     <Router>  
//       <div className="App">
//         <Routes>  
//           <Route path="/" element={<HomePage />} />
//           <Route path="/accounting" element={<AccountingPage />} /> 
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
