import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(
  email: string,
  options: { subject: string; html: string },
) {
  return resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [email],
    ...options,
  });
}

export async function sendQuizResultsEmail(email: string, quizId: string) {
  const url = `${process.env.AUTH0_BASE_URL}/quiz/${quizId}/results`;

  return await sendEmail(email, {
    subject: 'Good news — your results are ready 🎉',
    html: `<!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <title>Your Results Are Ready</title>
            </head>
            <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f7f7f7;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f7f7f7; padding:20px 0;">
                <tr>
                  <td align="center">
                    <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
                      <tr>
                        <td style="padding:30px; text-align:center;">
                          <h2 style="margin:0 0 20px; font-size:22px; color:#333333;">Your Results Are Ready 🎉</h2>
                          <p style="margin:0 0 30px; font-size:16px; color:#555555;">
                            We've prepared your results. Click the button below to view them securely.
                          </p>
                          <a href="${url}" 
                            style="background-color:#007BFF; color:#ffffff; text-decoration:none; padding:12px 24px; font-size:16px; border-radius:5px; display:inline-block;">
                            Get Results
                          </a>
                          <p style="margin-top:30px; font-size:12px; color:#888888;">
                            If the button doesn't work, copy and paste this link into your browser:<br />
                            <a href="${url}" style="color:#007BFF; word-break:break-all;">${url}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
      `,
  });
}
