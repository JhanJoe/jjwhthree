export interface Transaction {
    id: string;
    type: 'income' | 'expense';
    amount: number;
    description: string;
    date: string;
    uid: string;
  }