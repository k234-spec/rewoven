import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ALL_PRODUCTS, EnrichedProduct } from '@/lib/products-data';

export const dynamic = 'force-dynamic';

// In-memory catalog copy for seamless local development when database is offline
const inMemoryProducts: EnrichedProduct[] = [...ALL_PRODUCTS];

export async function GET() {
  try {
    if (prisma) {
      const dbProducts = await prisma.product.findMany({
        include: {
          variants: true,
          images: {
            orderBy: { sortOrder: 'asc' },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      if (dbProducts.length > 0) {
        return NextResponse.json({
          products: dbProducts.map((p) => ({
            id: p.id,
            sku: p.sku,
            name: p.name,
            slug: p.slug,
            category: p.category,
            description: p.description,
            fabricDetails: p.fabricDetails || '',
            careGuide: p.careGuide || '',
            price: Number(p.price),
            originalPrice: p.originalPrice ? Number(p.originalPrice) : null,
            isSale: p.isSale,
            isBestseller: p.isBestseller,
            isFeatured: p.isFeatured,
            occasion: p.occasion || 'Festive',
            fabric: p.fabric || 'Silk',
            color: p.color || 'Gold',
            sizes: p.variants.map((v) => v.size),
            variants: p.variants.map((v) => ({
              id: v.id,
              size: v.size,
              color: v.color,
              stockQty: v.stockQty,
            })),
            images: p.images.map((img) => ({
              url: img.url,
              altText: img.altText,
              sortOrder: img.sortOrder,
            })),
          })),
        });
      }
    }
  } catch (err) {
    console.warn('[AdminProducts] DB query fallback to memory:', err);
  }

  return NextResponse.json({ products: inMemoryProducts });
}

export async function POST(request: Request) {
  const role = request.headers.get('x-admin-role');

  if (role !== 'admin') {
    return NextResponse.json(
      {
        error:
          'Forbidden: Only users with the "admin" role have permission to create products. Store associates have fulfillment permissions only.',
      },
      { status: 403 }
    );
  }

  try {
    const data = await request.json();

    if (!data.name || !data.category || !data.price) {
      return NextResponse.json(
        { error: 'Name, category, and price are required fields.' },
        { status: 400 }
      );
    }

    const newId = `p${Date.now()}`;
    const slug =
      data.slug ||
      data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + `-${newId}`;

    const newProduct: EnrichedProduct = {
      id: newId,
      sku: data.sku || `MC-${newId.toUpperCase()}`,
      name: data.name,
      slug,
      category: data.category,
      description: data.description || 'Handcrafted luxury couture piece.',
      fabricDetails:
        data.fabricDetails ||
        'Structured cotton-silk lining with 2-inch inner margin.',
      careGuide: data.careGuide || 'Dry clean only.',
      price: Number(data.price),
      originalPrice: data.originalPrice ? Number(data.originalPrice) : null,
      isSale: Boolean(data.isSale),
      isBestseller: Boolean(data.isBestseller),
      isFeatured: Boolean(data.isFeatured),
      occasion: data.occasion || 'Festive & Wedding',
      fabric: data.fabric || 'Raw Silk',
      color: data.color || 'Gold',
      images: data.images && data.images.length > 0
        ? data.images
        : [
            {
              url:
                data.imageUrl ||
                'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
              altText: data.name,
              sortOrder: 0,
            },
          ],
      sizes: data.sizes || [
        'XS (32)',
        'S (34)',
        'M (36)',
        'L (38)',
        'XL (40)',
        'XXL (42)',
        'Custom Stitching',
      ],
      variants: data.variants || [
        { size: 'XS (32)', stockQty: 8 },
        { size: 'S (34)', stockQty: 10 },
        { size: 'M (36)', stockQty: 12 },
        { size: 'L (38)', stockQty: 10 },
        { size: 'XL (40)', stockQty: 6 },
        { size: 'XXL (42)', stockQty: 4 },
        { size: 'Custom Stitching', stockQty: 999 },
      ],
    };

    // Attempt DB insertion
    try {
      if (prisma) {
        await prisma.product.create({
          data: {
            id: newProduct.id,
            sku: newProduct.sku,
            name: newProduct.name,
            slug: newProduct.slug,
            category: newProduct.category,
            description: newProduct.description,
            fabricDetails: newProduct.fabricDetails,
            careGuide: newProduct.careGuide,
            price: newProduct.price,
            originalPrice: newProduct.originalPrice,
            isSale: newProduct.isSale,
            isBestseller: newProduct.isBestseller,
            isFeatured: newProduct.isFeatured,
            occasion: newProduct.occasion,
            fabric: newProduct.fabric,
            color: newProduct.color,
            variants: {
              create: newProduct.variants?.map((v) => ({
                size: v.size,
                stockQty: v.stockQty,
                color: newProduct.color,
              })),
            },
            images: {
              create: newProduct.images.map((img, idx) => ({
                url: img.url,
                altText: img.altText || newProduct.name,
                sortOrder: idx,
              })),
            },
          },
        });
      }
    } catch (dbErr) {
      console.warn('[AdminProducts] DB create fallback to memory:', dbErr);
    }

    inMemoryProducts.unshift(newProduct);
    return NextResponse.json({ success: true, product: newProduct });
  } catch (err) {
    console.error('[AdminProducts POST] Error:', err);
    return NextResponse.json(
      { error: 'Failed to create product.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const role = request.headers.get('x-admin-role');

  if (role !== 'admin') {
    return NextResponse.json(
      {
        error:
          'Forbidden: Only users with the "admin" role have permission to update products.',
      },
      { status: 403 }
    );
  }

  try {
    const data = await request.json();
    const { id, ...updates } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required for updating.' },
        { status: 400 }
      );
    }

    // Update in-memory copy
    const index = inMemoryProducts.findIndex((p) => p.id === id);
    if (index > -1) {
      inMemoryProducts[index] = {
        ...inMemoryProducts[index],
        ...updates,
      };
    }

    // Update in Prisma if connected
    try {
      if (prisma) {
        await prisma.product.update({
          where: { id },
          data: {
            name: updates.name,
            price: updates.price ? Number(updates.price) : undefined,
            originalPrice: updates.originalPrice ? Number(updates.originalPrice) : undefined,
            category: updates.category,
            description: updates.description,
            fabricDetails: updates.fabricDetails,
            isSale: updates.isSale,
            isBestseller: updates.isBestseller,
            isFeatured: updates.isFeatured,
            fabric: updates.fabric,
            color: updates.color,
            occasion: updates.occasion,
          },
        });
      }
    } catch (dbErr) {
      console.warn('[AdminProducts PUT] DB update fallback to memory:', dbErr);
    }

    return NextResponse.json({
      success: true,
      product: inMemoryProducts[index] || updates,
    });
  } catch (err) {
    console.error('[AdminProducts PUT] Error:', err);
    return NextResponse.json(
      { error: 'Failed to update product.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const role = request.headers.get('x-admin-role');

  if (role !== 'admin') {
    return NextResponse.json(
      {
        error:
          'Forbidden: Only users with the "admin" role have permission to delete products.',
      },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID parameter is required.' },
        { status: 400 }
      );
    }

    // Remove from in-memory
    const memIdx = inMemoryProducts.findIndex((p) => p.id === id);
    if (memIdx > -1) {
      inMemoryProducts.splice(memIdx, 1);
    }

    // Remove from Prisma if connected
    try {
      if (prisma) {
        await prisma.product.delete({
          where: { id },
        });
      }
    } catch (dbErr) {
      console.warn('[AdminProducts DELETE] DB delete fallback to memory:', dbErr);
    }

    return NextResponse.json({ success: true, message: `Product ${id} deleted.` });
  } catch (err) {
    console.error('[AdminProducts DELETE] Error:', err);
    return NextResponse.json(
      { error: 'Failed to delete product.' },
      { status: 500 }
    );
  }
}
