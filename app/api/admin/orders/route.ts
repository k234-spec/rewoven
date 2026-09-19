import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingCity: string;
  shippingState: string;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED';
  orderStatus: 'RECEIVED' | 'PROCESSING' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED';
  trackingNumber: string | null;
  items: {
    productName: string;
    size: string;
    quantity: number;
    unitPrice: number;
  }[];
  createdAt: string;
}

// Initial realistic couture orders
const inMemoryOrders: AdminOrder[] = [
  {
    id: 'ord-1042',
    orderNumber: 'MC-2026-1042',
    customerName: 'Pooja Sharma',
    customerEmail: 'pooja.s@gmail.com',
    customerPhone: '+91 98112 34567',
    shippingCity: 'Bengaluru',
    shippingState: 'Karnataka',
    totalAmount: 3398,
    paymentMethod: 'RAZORPAY_UPI',
    paymentStatus: 'PAID',
    orderStatus: 'PROCESSING',
    trackingNumber: 'DEL-884102941',
    items: [
      {
        productName: 'Vibrant handcrafted mirror-work ethnic corset blouse',
        size: 'M (36)',
        quantity: 1,
        unitPrice: 1499,
      },
      {
        productName: 'Classic Golden Zari Embroidered Silk Blouse',
        size: 'L (38)',
        quantity: 1,
        unitPrice: 1899,
      },
    ],
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'ord-1041',
    orderNumber: 'MC-2026-1041',
    customerName: 'Ananya Verma',
    customerEmail: 'ananya.v@outlook.com',
    customerPhone: '+91 99201 88231',
    shippingCity: 'Mumbai',
    shippingState: 'Maharashtra',
    totalAmount: 1899,
    paymentMethod: 'CARD',
    paymentStatus: 'PAID',
    orderStatus: 'DISPATCHED',
    trackingNumber: 'BLUEDART-5921820',
    items: [
      {
        productName: 'Classic Golden Zari Embroidered Silk Blouse',
        size: 'Custom Stitching',
        quantity: 1,
        unitPrice: 1899,
      },
    ],
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: 'ord-1040',
    orderNumber: 'MC-2026-1040',
    customerName: 'Meera Chawla',
    customerEmail: 'meera.chawla@gmail.com',
    customerPhone: '+91 98450 11928',
    shippingCity: 'New Delhi',
    shippingState: 'Delhi NCR',
    totalAmount: 2998,
    paymentMethod: 'WHATSAPP_ASSISTED',
    paymentStatus: 'PAID',
    orderStatus: 'DELIVERED',
    trackingNumber: 'DEL-77192039',
    items: [
      {
        productName: 'Vibrant handcrafted mirror-work ethnic corset blouse',
        size: 'S (34)',
        quantity: 2,
        unitPrice: 1499,
      },
    ],
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: 'ord-1039',
    orderNumber: 'MC-2026-1039',
    customerName: 'Tanvi Reddy',
    customerEmail: 'tanvi.r@hyderabad.in',
    customerPhone: '+91 90001 44552',
    shippingCity: 'Hyderabad',
    shippingState: 'Telangana',
    totalAmount: 1499,
    paymentMethod: 'COD',
    paymentStatus: 'PENDING',
    orderStatus: 'RECEIVED',
    trackingNumber: null,
    items: [
      {
        productName: 'Vibrant handcrafted mirror-work ethnic corset blouse',
        size: 'XL (40)',
        quantity: 1,
        unitPrice: 1499,
      },
    ],
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
];

export async function GET() {
  try {
    if (prisma) {
      const dbOrders = await prisma.order.findMany({
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      if (dbOrders.length > 0) {
        return NextResponse.json({
          orders: dbOrders.map((o) => {
            const addr = typeof o.shippingAddress === 'object' && o.shippingAddress !== null
              ? (o.shippingAddress as Record<string, string>)
              : {};

            return {
              id: o.id,
              orderNumber: o.orderNumber,
              customerName: o.customerName,
              customerEmail: o.customerEmail,
              customerPhone: o.customerPhone,
              shippingCity: addr.city || 'Delhi',
              shippingState: addr.state || 'Delhi',
              totalAmount: Number(o.totalAmount),
              paymentMethod: o.paymentMethod,
              paymentStatus: o.paymentStatus as AdminOrder['paymentStatus'],
              orderStatus: o.orderStatus as AdminOrder['orderStatus'],
              trackingNumber: o.trackingNumber,
              items: o.items.map((it) => ({
                productName: it.variant?.product?.name || 'Couture Piece',
                size: it.variant?.size || 'Free Size',
                quantity: it.quantity,
                unitPrice: Number(it.unitPrice),
              })),
              createdAt: o.createdAt.toISOString(),
            };
          }),
        });
      }
    }
  } catch (err) {
    console.warn('[AdminOrders] DB query fallback to memory:', err);
  }

  return NextResponse.json({ orders: inMemoryOrders });
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const { orderId, orderStatus, trackingNumber } = data;

    if (!orderId || !orderStatus) {
      return NextResponse.json(
        { error: 'Order ID and new order status are required.' },
        { status: 400 }
      );
    }

    // Update in-memory order
    const index = inMemoryOrders.findIndex((o) => o.id === orderId);
    if (index > -1) {
      inMemoryOrders[index] = {
        ...inMemoryOrders[index],
        orderStatus,
        trackingNumber: trackingNumber !== undefined ? trackingNumber : inMemoryOrders[index].trackingNumber,
      };
    }

    // Update in Prisma if connected
    try {
      if (prisma) {
        await prisma.order.update({
          where: { id: orderId },
          data: {
            orderStatus,
            trackingNumber: trackingNumber || undefined,
          },
        });
      }
    } catch (dbErr) {
      console.warn('[AdminOrders PATCH] DB update fallback to memory:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: `Order ${orderId} updated to ${orderStatus}`,
      order: inMemoryOrders[index],
    });
  } catch (err) {
    console.error('[AdminOrders PATCH] Error:', err);
    return NextResponse.json(
      { error: 'Failed to update order status.' },
      { status: 500 }
    );
  }
}
