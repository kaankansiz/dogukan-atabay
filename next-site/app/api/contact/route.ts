import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { contactApiLocale, contactApiMessages } from "@/lib/contact-api-messages";

export async function POST(request: Request) {
  let localeForErrors = contactApiLocale(undefined);
  try {
    const raw = (await request.json()) as Record<string, unknown>;
    const locale = contactApiLocale(raw.locale);
    localeForErrors = locale;
    const m = contactApiMessages(locale);

    const bodySchema = z.object({
      name: z.string().min(1, m.nameRequired),
      phone: z.string().min(1, m.phoneRequired),
      email: z.union([z.literal(""), z.string().email({ message: m.emailInvalid })]),
      message: z.string().optional(),
    });

    const parsed = bodySchema.safeParse({
      name: raw.name,
      phone: raw.phone,
      email: raw.email || "",
      message: raw.message,
    });
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? m.invalid },
        { status: 400 },
      );
    }
    const { name, phone, email, message } = parsed.data;
    await prisma.contactSubmission.create({
      data: {
        name,
        phone,
        email: email || undefined,
        message: message || undefined,
      },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { message: contactApiMessages(localeForErrors).serverError },
      { status: 500 },
    );
  }
}
