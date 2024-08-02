import React, { useState } from 'react';
import { Transaction } from '../types/index';

interface Props {
    onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'| 'uid'>) => void;
}

const TransactionForm: React.FC<Props> = ({ onAddTransaction }) => {
    const [type, setType] = useState<'income' | 'expense'>('income');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTransaction({
        type,
        amount: parseFloat(amount),
        description
        // 'id', 'uid', 'date' 會在父組件中添加，因此不需要在這裡提供
        });
        setAmount('');
        setDescription('');
    };

    return (
        <form className="transaction-form" onSubmit={handleSubmit}>
        <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')}>
            <option value="income">收入</option>
            <option value="expense">支出</option>
        </select>
        <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="金額"
            required
        />
        <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="說明"
            required
        />
        <button type="submit">新增</button>
        </form>
    );
};

export default TransactionForm;