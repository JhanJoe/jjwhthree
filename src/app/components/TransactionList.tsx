import React from 'react';
import { Transaction } from '../types/index';

interface Props {
    transactions: Transaction[];
    onDeleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<Props> = ({ transactions, onDeleteTransaction }) => {
    return (
        <div className="transaction-list">
        <h2>交易記錄</h2>
        <ul>
        
            {transactions.map((transaction) => (
            <li key={transaction.id}>
                <span className="date">{transaction.date}</span>
                <span className="amount" style={{ color: transaction.type === 'income' ? '#46eb34' : 'red' }}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                </span>
                <span className="description">{transaction.description}</span>
                <button onClick={() => onDeleteTransaction(transaction.id)}>刪除</button>
            </li>
            ))} 
        </ul>
        </div>
    );
};

export default TransactionList;