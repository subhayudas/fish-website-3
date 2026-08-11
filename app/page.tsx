import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const requestHeaders = await headers();
  const preferredLanguages = requestHeaders.get("accept-language")?.toLowerCase() ?? "";
  redirect(preferredLanguages.startsWith("fr") ? "/fr" : "/en");
}
