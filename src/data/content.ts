export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 'classic-honey',
    name: 'Classic Honey Biscuit',
    description: 'Our signature golden biscuit made with real honey and a perfectly crispy bite.',
    price: '$4.99',
    image:
      'https://images.pexels.com/photos/574125/pexels-photo-574125.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: 'honey-crunch',
    name: 'Honey Crunch',
    description: 'Extra-crunchy honey biscuits with a satisfying snap and a hint of toasted oats.',
    price: '$5.49',
    image:
      'https://images.pexels.com/photos/17525098/pexels-photo-17525098.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: 'honey-butter',
    name: 'Honey Butter Biscuit',
    description: 'Rich, buttery biscuits glazed with golden honey for a melt-in-your-mouth treat.',
    price: '$5.99',
    image:
      'https://images.pexels.com/photos/32637653/pexels-photo-32637653.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
];

export interface Store {
  id: string;
  name: string;
  city: string;
  address: string;
  image: string;
}

export const stores: Store[] = [
  {
    id: 'mysuru',
    name: 'SweetHoney Store',
    city: 'Mysuru',
    address: '12 Sayyaji Rao Rd, Devaraja Mohalla, Mysuru 570001',
    image:
      'https://images.pexels.com/photos/29380155/pexels-photo-29380155.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: 'bengaluru',
    name: 'SweetHoney Store',
    city: 'Bengaluru',
    address: '45 Brigade Rd, Ashok Nagar, Bengaluru 560001',
    image:
      'https://images.pexels.com/photos/32459865/pexels-photo-32459865.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: 'mangaluru',
    name: 'SweetHoney Store',
    city: 'Mangaluru',
    address: '78 Falnir Rd, Hampankatta, Mangaluru 575001',
    image:
      'https://images.pexels.com/photos/2253636/pexels-photo-2253636.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: 'hyderabad',
    name: 'SweetHoney Store',
    city: 'Hyderabad',
    address: '23 Banjara Hills Rd No. 12, Hyderabad 500034',
    image:
      'https://images.pexels.com/photos/30667454/pexels-photo-30667454.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
];

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  image: string;
}

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Aarav Sharma',
    rating: 5,
    text: 'These biscuits are absolutely addictive! The honey flavor is perfectly balanced and the crunch is just right. My kids ask for them every day.',
    image:
      'https://images.pexels.com/photos/6102841/pexels-photo-6102841.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  },
  {
    id: 'r2',
    name: 'Priya Nair',
    rating: 5,
    text: 'SweetHoney has become our family\'s favorite tea-time treat. You can taste the real honey in every bite. Beautiful packaging too!',
    image:
      'https://images.pexels.com/photos/3936894/pexels-photo-3936894.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  },
  {
    id: 'r3',
    name: 'Rohan Kapoor',
    rating: 5,
    text: 'Premium quality biscuits at a fair price. The Honey Butter variety is incredibly rich and satisfying. Highly recommend trying all three flavors!',
    image:
      'https://images.pexels.com/photos/35681211/pexels-photo-35681211.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  },
];
