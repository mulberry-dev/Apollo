import { getClientKey, processContactSubmission } from "@/lib/contact/processContact"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const noStore = { "Cache-Control": "no-store" }

/**
 * POST /api/contact
 * Accepts contact form payloads and emails the configured recipient via Resend.
 * Secrets (RESEND_API_KEY, CONTACT_RECIPIENT_EMAIL) stay server-side only.
 */
export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400, headers: noStore }
    )
  }

  try {
    const result = await processContactSubmission(body, {
      clientKey: getClientKey(request)
    })

    return NextResponse.json(result.body, {
      status: result.status,
      headers: { ...noStore, ...result.headers }
    })
  } catch (err) {
    console.error("[contact] unexpected error", err)
    return NextResponse.json(
      { ok: false, error: "submit_failed" },
      { status: 500, headers: noStore }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: noStore })
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "method_not_allowed" },
    { status: 405, headers: noStore }
  )
}
