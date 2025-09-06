import { completeQuiz } from 'database/quiz';
import { PageProps } from 'types/page';

export async function PUT(req: Request, params: PageProps<{ id: string }>) {
  try {
    const urlParams = await params.params;

    await completeQuiz(urlParams.id);

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
