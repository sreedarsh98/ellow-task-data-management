import { DataRecord } from '../types/data';

const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
  'Food & Beverage',
  'Health & Beauty',
];

const statuses = ['Active', 'Inactive', 'Pending', 'Archived'];

const names = [
  'Premium Wireless Headphones',
  'Cotton T-Shirt',
  'The Great Novel',
  'Garden Tools Set',
  'Basketball',
  'Building Blocks',
  'Organic Coffee Beans',
  'Face Moisturizer',
  'Laptop Stand',
  'Running Shoes',
  'Mystery Thriller Book',
  'Plant Pot',
  'Yoga Mat',
  'Puzzle Game',
  'Green Tea',
  'Hair Shampoo',
  'USB Cable',
  'Winter Jacket',
  'Science Fiction Novel',
  'Kitchen Utensils',
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomDate(): string {
  const start = new Date(2022, 0, 1);
  const end = new Date();
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split('T')[0];
}

function generateId(index: number): string {
  return `REC-${String(index).padStart(5, '0')}`;
}

export function generateMockData(count: number = 500): DataRecord[] {
  const data: DataRecord[] = [];

  for (let i = 1; i <= count; i++) {
    data.push({
      id: generateId(i),
      name: `${getRandomElement(names)} ${i}`,
      category: getRandomElement(categories),
      status: getRandomElement(statuses),
      createdAt: generateRandomDate(),
    });
  }

  return data;
}

export const mockData = generateMockData(500);
