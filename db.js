
const books = [
  {
    code: 'B001',
    name: 'Introduction to JavaScript',
    category: 'Programming',
    price: 120,
    isBorrowed: false,
    questions: [
      { date: '2025-10-27', clientCode: 'C001' },
      { date: '2025-10-20', clientCode: 'C002' }
    ]
  },
  {
    code: 'B002',
    name: 'Learning Node.js',
    category: 'Programming',
    price: 150,
    isBorrowed: true,
    questions: [
      { date: '2025-10-26', clientCode: 'C003' }
    ]
  },
  {
    code: 'B003',
    name: 'History of Israel',
    category: 'History',
    price: 80,
    isBorrowed: false,
    questions: [
      { date: '2025-10-25', clientCode: 'C001' },
      { date: '2025-10-22', clientCode: 'C004' },
      { date: '2025-10-21', clientCode: 'C002' }
    ]
  }
];

export default books;
