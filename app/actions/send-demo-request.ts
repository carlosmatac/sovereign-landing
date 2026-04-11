"use server"

import { Resend } from "resend"

// ---------------------------------------------------------------------------
// Environment
// ---------------------------------------------------------------------------
// Set RESEND_API_KEY in your Vercel project settings.
// "From" domain: update FROM_ADDRESS below once you verify svgndata.com in
// the Resend dashboard (Domains → Add Domain). Until then, Resend's shared
// onboarding address works for testing but can only deliver to the account
// owner's verified email.
// ---------------------------------------------------------------------------

// Lazy-initialized so the constructor doesn't run at module load time
// (which would throw when RESEND_API_KEY is absent during dev/build).
function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error("RESEND_API_KEY environment variable is not set.")
  return new Resend(key)
}

const TO_ADDRESS   = "team@svgndata.com"
const FROM_ADDRESS = "Sovereign <onboarding@resend.dev>"

export type FormState = {
  status: "idle" | "success" | "error"
  message?: string
}

export async function sendDemoRequest(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const firstName   = (formData.get("firstName")   as string | null)?.trim() ?? ""
  const lastName    = (formData.get("lastName")    as string | null)?.trim() ?? ""
  const email       = (formData.get("email")       as string | null)?.trim() ?? ""
  const dialCode    = (formData.get("dialCode")    as string | null)?.trim() ?? ""
  const dialCountry = (formData.get("dialCountry") as string | null)?.trim() ?? ""
  const phone       = (formData.get("phone")       as string | null)?.trim() ?? ""
  const company     = (formData.get("company")     as string | null)?.trim() ?? ""
  const role        = (formData.get("role")        as string | null)?.trim() ?? ""
  const problem     = (formData.get("problem")     as string | null)?.trim() ?? ""
  const message     = (formData.get("message")     as string | null)?.trim() ?? ""

  // Compose full phone string only when a number was provided
  const fullPhone = phone ? `${dialCode} ${phone}` : ""

  // Basic server-side validation
  if (!firstName || !lastName || !email || !company || !role || !problem) {
    return { status: "error", message: "Please fill in all required fields." }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid work email." }
  }

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
      <h2 style="margin-top: 0;">New Demo Request</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px 0; color: #555; width: 160px;">Name</td>
            <td style="padding: 8px 0;"><strong>${firstName} ${lastName}</strong></td></tr>
        <tr><td style="padding: 8px 0; color: #555;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
        ${fullPhone ? `<tr><td style="padding: 8px 0; color: #555;">Phone</td>
            <td style="padding: 8px 0;">${fullPhone}${dialCountry ? ` <span style="color:#888">(${dialCountry})</span>` : ""}</td></tr>` : ""}
        <tr><td style="padding: 8px 0; color: #555;">Company</td>
            <td style="padding: 8px 0;">${company}</td></tr>
        <tr><td style="padding: 8px 0; color: #555;">Role</td>
            <td style="padding: 8px 0;">${role}</td></tr>
      </table>
      <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
      <p style="color: #555; margin-bottom: 6px;"><strong>What they're looking to solve</strong></p>
      <p style="white-space: pre-wrap; margin: 0;">${problem}</p>
      ${message ? `
      <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
      <p style="color: #555; margin-bottom: 6px;"><strong>Additional message</strong></p>
      <p style="white-space: pre-wrap; margin: 0;">${message}</p>
      ` : ""}
    </div>
  `

  try {
    await getResend().emails.send({
      from:     FROM_ADDRESS,
      to:       TO_ADDRESS,
      replyTo:  email,
      subject:  `Demo request — ${firstName} ${lastName} · ${company}`,
      html,
    })
    return { status: "success" }
  } catch (err) {
    console.error("sendDemoRequest error:", err)
    return {
      status: "error",
      message: "Something went wrong. Please email us directly at team@svgndata.com.",
    }
  }
}
