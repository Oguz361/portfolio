import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { hint: "Wrong method. Try speaking my language." },
    { status: 405 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.role === "admin") {
      return NextResponse.json({ flag: "FLAG{4p1_expl0r3r}" });
    }

    if (body.role) {
      return NextResponse.json(
        { hint: "Right key, wrong value. Think about who has the highest privileges." },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { hint: "Good, you're sending JSON. Now I need to know your role." },
      { status: 403 }
    );
  } catch {
    // Empty body or invalid JSON
    return NextResponse.json(
      { hint: "You're speaking my language now. But I need valid JSON with your credentials." },
      { status: 403 }
    );
  }
}

// Handle all other methods
export async function PUT() {
  return NextResponse.json(
    { hint: "Getting warmer, but that's not quite right either." },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { hint: "Destructive... but not the right approach." },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { hint: "Close, but no cigar. Think simpler." },
    { status: 405 }
  );
}