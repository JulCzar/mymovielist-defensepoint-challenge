import { omdb } from '~/business/services';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');
  const page = searchParams.get('page') ?? 1;

  try {
    const { data } = await omdb.get('/', {
      params: {
        s: name,
        page,
      },
    });

    return Response.json(data);
  } catch (err) {
    return Response.json({ status: 'Error' }, { status: 400 });
  }
};
