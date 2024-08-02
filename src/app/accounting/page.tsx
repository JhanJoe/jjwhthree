'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { Transaction } from '../types/index';
import '../styles/accounting_page.css';
import { useRouter } from "next/navigation";
import { auth, onAuthStateChanged, db, collection, addDoc, getDocs, query, where, deleteDoc, doc, User, orderBy } from "../../../firebase-config";

const AccountingPage: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const initialized = useRef(false);

    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

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

    useEffect(() => {
        const fetchTransactions = async () => {
            if (user) {
                const q = query(collection(db, "transactions"), where("uid", "==", user.uid), orderBy("date", "desc"));
                const querySnapshot = await getDocs(q);
                const transactions = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
                } as Transaction));

                setTransactions(transactions);
            }
        };
        fetchTransactions();
    }, [user]);

    const handleAddTransaction = async (newTransaction: Omit<Transaction, 'id' | 'date' | 'uid'>) => {
        if (user) {
            const transactionData = {
                ...newTransaction,
                date: new Date().toISOString().split('T')[0],
                uid: user.uid,
            };
            const docRef = await addDoc(collection(db, "transactions"), transactionData);
            setTransactions(prevTransactions => [...prevTransactions, { id: docRef.id, ...transactionData }]);
        }
    };

    const handleDeleteTransaction = async (id: string) => {
        await deleteDoc(doc(db, "transactions", id));

        setTransactions(prevTransactions => {
            const updatedTransactions = prevTransactions.filter(t => t.id !== id);
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