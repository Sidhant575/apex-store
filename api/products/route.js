import { NextResponse } from 'next/server';

const FALLBACK_PRODUCTS = [
  {
    _id: '1',
    name: 'Acoustic Pro Headphones',
    description: 'Active noise cancellation with high-fidelity studio response.',
    price: 199.99,
    category: 'Audio',
    stock: 12,
    ratings: 4.9,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'],
  },
  {
    _id: '2',
    name: 'Chronograph Minimalist Watch',
    description: 'Sapphire crystal glass casing with premium Italian leather band.',
    price: 149.0,
    category: 'Accessories',
    stock: 7,
    ratings: 4.7,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'],
  },
  {
    _id: '3',
    name: 'Mechanical Tactile Keyboard',
    description: 'Hot-swappable custom lubricated switches with RGB matrix backlighting.',
    price: 129.5,
    category: 'Computing',
    stock: 19,
    ratings: 4.8,
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600'],
  },
  {
    _id: '4',
    name: 'Trail Running Sneakers',
    description: 'Ultra-lightweight weatherproof woven knit with traction grip.',
    price: 159.0,
    category: 'Footwear',
    stock: 5,
    ratings: 4.6,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'],
  },
];

export async function GET(req) {
  try {
    // Attempt dynamic database import so missing files don't cause a 404 at startup
    const dbConnect = (await import('../../../lib/dbConnect')).default;
    const Product = (await import('../../../lib/models/Product')).default;

    await dbConnect();

    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(FALLBACK_PRODUCTS);
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query = {};
    if (category && category !== 'All') query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const items = await Product.find(query).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (err) {
    // If MongoDB or lib files are missing/offline, serve items gracefully
    console.warn('Database offline or unconfigured. Serving fallback items. Reason:', err.message);
    return NextResponse.json(FALLBACK_PRODUCTS);
  }
}