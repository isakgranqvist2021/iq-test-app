import { addEmailToQuiz } from 'database/quiz';
import { sendQuizResultsEmail } from 'services/email';
import { PageProps } from 'types/page';

export async function PUT(req: Request, params: PageProps<{ id: string }>) {
  try {
    const data: { email: string } = await req.json();
    const urlParams = await params.params;

    await addEmailToQuiz(urlParams.id, data.email);

    await sendQuizResultsEmail(data.email, urlParams.id);

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
