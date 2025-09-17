// api/search.js
export default function handler(req, res) {
  const q = (req.query.q || '').toLowerCase();

  const sample = [{
    id: '1',
    name: 'SanDisk 1TB Extreme Portable SSD',
    image: '/placeholder.png',
    short: 'Portable SSD 1050MB/s, IP55 water/dust resistance',
    lowestPrice: 10799,
    dealScore: 84,
    stores: [
      { store: 'Amazon', price: 10799 },
      { store: 'Flipkart', price: 8254 },
      { store: 'Croma', price: 10499 }
    ],
  }, {
    id: '2',
    name: 'WD 1TB My Passport SSD',
    image: '/placeholder.png',
    short: 'Portable NVMe SSD, compact',
    lowestPrice: 9499,
    dealScore: 78,
    stores: [
      { store: 'Amazon', price: 9499 },
      { store: 'TataCliQ', price: 9999 }
    ],
  }];

  const filtered = q ? sample.filter(p => p.name.toLowerCase().includes(q)) : sample;
  res.status(200).json({ products: filtered });
}
