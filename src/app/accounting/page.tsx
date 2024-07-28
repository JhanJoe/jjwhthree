'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { Transaction } from '../types/index';
import '../styles/accounting_page.css';

const AccountingPage: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            const savedTransactions = localStorage.getItem('transactions');
            if (savedTransactions) {
                setTransactions(JSON.parse(savedTransactions));
        }
            initialized.current = true;
    }
    }, []);

    useEffect(() => {
        if (initialized.current) {
            localStorage.setItem('transactions', JSON.stringify(transactions));
        }
    }, [transactions]);

    const handleAddTransaction = (newTransaction: Omit<Transaction, 'id' | 'date'>) => {
        const transaction: Transaction = {
            ...newTransaction,
            id: Date.now(),
            date: new Date().toISOString().split('T')[0]
        };
        setTransactions(prevTransactions => {
            const updatedTransactions = [...prevTransactions, transaction];
            localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
            return updatedTransactions;
        });
    };

    const handleDeleteTransaction = (id: number) => {
        setTransactions(prevTransactions => {
            const updatedTransactions = prevTransactions.filter(t => t.id !== id);
            localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
            return updatedTransactions;
        });
    };

    const total = transactions.reduce((sum, transaction) => 
        transaction.type === 'income' ? sum + transaction.amount : sum - transaction.amount, 0
    );

    return (
        <div className="accounting-page">
        <h1>記帳頁面</h1>
        <TransactionForm onAddTransaction={handleAddTransaction} />
        <TransactionList 
            transactions={transactions} 
            onDeleteTransaction={handleDeleteTransaction} 
        />
        <div className="accounting-page-total">
            <h3>總計: ${total.toFixed(2)}</h3>
        </div>
        <Link href="/" className="return-home">
            <button>返回首頁</button>
        </Link>
        </div>
    );
};

export default AccountingPage;