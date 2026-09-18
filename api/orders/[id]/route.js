import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Order from '../../../../lib/models/Order';

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { status } = await req.json();
    const order = await Order.findByIdAndUpdate(params.id, { status }, { new: true });
    return NextResponse.json(order);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}