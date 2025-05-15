export interface Product {
    id: number;
    name: string;
    category: 'cows';
    type: string; // e.g., 'cow', 'bull'
    price: number;
    age: number; // in months
    weight: number; // in kg
    description: string;
    imageUrl: string;
    stock: number;
    breed: string;
    healthStatus: string;
    vaccinationStatus: string;
} 