import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET method - Retrieve all vendors
export async function GET() {
  try {
    const vendors = await db.vendor.findMany(
        {
            orderBy: {
              name: 'asc',
            },
          }
    );
    return NextResponse.json(vendors, { status: 200 });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json({ message: 'Error fetching vendors' }, { status: 500 });
  }
}

// POST method - Create or update a vendor
export async function POST(req: Request) {
  try {
    const { name, category, contactName, phone, email1, email2, email3, email4, accountNumberAveI, accountNumberConey, isPaidByCC } = await req.json();

    if (!name || !email1) {
      return NextResponse.json({ message: 'Name and email are required' }, { status: 400 });
    }

    const existingVendor = await db.vendor.findFirst({ where: { name } });

    if (existingVendor) {
      const updatedVendor = await db.vendor.update({
        where: { id: existingVendor.id },
        data: {
          category,
          contactName,
          phone,
          email1,
          email2,
          email3,
          email4,
          isPaidByCC,
        },
      });

      return NextResponse.json(updatedVendor, { status: 200 });
    } else {
      const newVendor = await db.vendor.create({
        data: {
          name,
          category,
          contactName,
          phone,
          email1,
          email2,
          email3,
          email4,
          isPaidByCC
        },
      });

      return NextResponse.json(newVendor, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating vendor:', error);
    return NextResponse.json({ message: 'Error creating vendor' }, { status: 500 });
  }
}