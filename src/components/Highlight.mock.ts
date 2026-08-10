export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  isChefRecommendation: boolean;
  category: string;
}

export const mockChefRecommendations: MenuItem[] = [
  {
    id: '1',
    name: 'Pan-Seared Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce, served with seasonal vegetables and roasted potatoes',
    price: 28.99,
    isChefRecommendation: true,
    category: 'Main Course',
  },
  {
    id: '2',
    name: 'Truffle Risotto',
    description: 'Creamy Arborio rice with black truffle, Parmesan cheese, and wild mushrooms',
    price: 24.99,
    isChefRecommendation: true,
    category: 'Main Course',
  },
  {
    id: '3',
    name: 'Beef Tenderloin',
    description: 'Prime cut beef tenderloin with red wine reduction, asparagus, and truffle mashed potatoes',
    price: 34.99,
    isChefRecommendation: true,
    category: 'Main Course',
  },
  {
    id: '4',
    name: 'Lobster Bisque',
    description: 'Silky smooth lobster soup with fresh cream, garnished with lobster meat and croutons',
    price: 16.99,
    isChefRecommendation: true,
    category: 'Appetizer',
  },
  {
    id: '5',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla ice cream and fresh berries',
    price: 12.99,
    isChefRecommendation: true,
    category: 'Dessert',
  },
  {
    id: '6',
    name: 'Herb-Crusted Lamb Chops',
    description: 'Tender lamb chops with rosemary and thyme crust, served with mint jelly and grilled vegetables',
    price: 32.99,
    isChefRecommendation: true,
    category: 'Main Course',
  },
];