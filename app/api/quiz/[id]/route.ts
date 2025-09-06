import { QuizResultItem, updateQuizResult } from 'database/quiz';
import { PageProps } from 'types/page';

export async function PUT(req: Request, params: PageProps<{ id: string }>) {
  try {
    const data: QuizResultItem = await req.json();
    const urlParams = await params.params;

    await updateQuizResult(urlParams.id, data);

    return Response.json({});
  } catch (err) {
    console.error('Error during checkout:', err);

    return new Response(
      JSON.stringify({
        statusCode: 500,
        message: err instanceof Error ? err.message : 'Internal server error',
      }),
      { status: 500 },
    );
  }
}
