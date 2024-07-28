import React from 'react';
import Link from 'next/link';
import './styles/page.css';
import './styles/accounting_page.css';


const HomePage: React.FC = () => { 
  return (
    <div className="home-page">
      <h1>歡迎使用記帳工具</h1> 
      <Link href="/accounting"> 
        <button>立刻開始</button>
      </Link>
    </div>
  ); 
};

export default HomePage;