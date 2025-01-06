export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const executedAt = new Date().toISOString();
  console.log(`execute cron jpb : ${executedAt}`);
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}
