import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';

const generateEmails = async (req: NextApiRequest, res: NextApiResponse) => {
  const { dateSelected } = req.body; // Date selected by the user

  // Fetch vendor and order data from Prisma
  const vendors = await db.vendor.findMany();
  const orders = await db.order.findMany({
    where: {
      deliveryDate: new Date(dateSelected), // Filter by selected date
    },
  });

  // Process the orders and generate email drafts
  const emails = orders.map((order) => {
    const vendor = vendors.find((v) => v.id === order.vendorId);
    if (!vendor) return null;

    // Construct email body here
    const body = `Order for ${order.recipient} at ${order.location}: ${order.count} ${order.unit} of ${order.product}`;

    return {
      subject: `Purchase Order for ${vendor.name}`,
      body,
      to: vendor.email1 || vendor.email2 || "", // Sending to first available email
    };
  }).filter(Boolean); // Remove null entries

  // Send emails or create drafts (this could be done using a service like SendGrid, etc.)
  // Here we're just returning the email data for now
  res.status(200).json(emails);
};

export default generateEmails;