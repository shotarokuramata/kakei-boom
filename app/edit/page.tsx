"use client";

import Form from '../../components/Form';
import React, { useEffect, useState } from 'react';

type Expense = {
    id: number;
    name: string;
    type: string;
    createdAt: Date;
};

export default function EditPage() {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/form');
                const data = await response.json();
                setExpenses(data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchData();
    }, [expenses]);

    return (
        <>
            <Form></Form>
            <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
                <h2 className="text-xl font-bold mb-4">Expenses</h2>
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense.id} className="mb-2">
                            <div className="font-medium">{expense.name}</div>
                            <div className="text-sm text-gray-500">{expense.type}</div>
                            <div className="text-sm text-gray-500">{new Date(expense.createdAt).toLocaleString()}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
