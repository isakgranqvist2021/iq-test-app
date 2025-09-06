import { createQuiz } from 'database/quiz';

export async function POST(req: Request) {
  try {
    const data: { quizId: string } = await req.json();
    const result = await createQuiz({
      email: null,
      quizId: parseInt(data.quizId, 10),
    });
    return Response.json(result.insertedId);
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
