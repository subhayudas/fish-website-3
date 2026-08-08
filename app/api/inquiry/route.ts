const attempts = new Map<string, { count: number; resetAt: number }>();

function validEmail(value: unknown) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const rate = attempts.get(ip);
  if (rate && rate.resetAt > now && rate.count >= 4) return Response.json({ message: "Too many requests. Please call the market." }, { status: 429 });
  attempts.set(ip, rate && rate.resetAt > now ? { ...rate, count: rate.count + 1 } : { count: 1, resetAt: now + 60_000 });

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return Response.json({ message: "Invalid request." }, { status: 400 }); }
  if (body.website) return Response.json({ message: "Request received." });
  if (typeof body.name !== "string" || body.name.trim().length < 2 || !validEmail(body.email) || typeof body.message !== "string" || body.message.trim().length < 5 || body.consent !== "on") return Response.json({ message: "Please complete all required fields." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  if (!apiKey || !to) return Response.json({ message: "Online sending is not configured. Please call or email the market." }, { status: 503 });

  const subject = body.type === "catering" ? "New catering inquiry" : "New website inquiry";
  const details = Object.entries(body).filter(([key]) => !["website", "consent"].includes(key)).map(([key, value]) => `${key}: ${String(value)}`).join("\n");
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: "Poissonnerie Sherbrooke Website <onboarding@resend.dev>", to: [to], reply_to: body.email, subject, text: details }) });
  if (!response.ok) return Response.json({ message: "We could not send your request. Please call or email the market." }, { status: 502 });
  return Response.json({ message: "Request sent." });
}
