import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    const data = await sql`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
    `;

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: 'Database error' },
      { status: 500 }
    );
  }
}


