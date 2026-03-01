import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token)
    return NextResponse.json({ count: 0, error: "no token" }, { status: 500 });

  const now = new Date();
  const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const query = `{
    user(login: "oguz361") {
      contributionsCollection(from: "${from.toISOString()}", to: "${now.toISOString()}") {
        totalCommitContributions
      }
    }
  }`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  const data = await res.json();
  const count =
    data?.data?.user?.contributionsCollection?.totalCommitContributions ?? 0;
  return NextResponse.json({ count });
}
