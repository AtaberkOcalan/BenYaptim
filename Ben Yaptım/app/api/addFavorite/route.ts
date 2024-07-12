import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function handler(request: Request, { params }: { params: { id: string } }) {

  const body = await request.json();
  const { userId, productId } = body;

  try {
    const newFavorite = await prisma.favorite.create({
      data: {
        userId,
        productId,
      },
    });

    return new Response(JSON.stringify(newFavorite), { status: 200 });
  } catch (error) {
    console.error('Favori eklenirken hata oluştu:', error);
    return new Response(JSON.stringify({ error: 'Favori eklenirken bir hata oluştu.' }), { status: 500 });
  }
}
