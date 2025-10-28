export const runtime = "nodejs";

// app/api/webhooks/clerk/route.js
import { Webhook } from "svix";
import prisma from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: false, // disable default body parsing
  },
};

export async function POST(req) {
  try {
    // 1. Get raw body as text
    const payload = await req.text();

    // 2. Extract headers sent by Clerk
    const svix_id = req.headers.get("svix-id");
    const svix_timestamp = req.headers.get("svix-timestamp");
    const svix_signature = req.headers.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Missing Svix headers", { status: 400 });
    }

    // 3. Verify signature using your Clerk webhook secret
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    console.log("✅ Webhook verified:", evt.type);

    // 4. Handle events
    if (evt.type === "user.created") {
      const { id, email_addresses, first_name, last_name } = evt.data;
      await prisma.user.upsert({
        where: { clerkId: id },
        update: {},
        create: {
          clerkId: id,
          email: email_addresses?.[0]?.email_address || "",
          name: `${first_name || ""} ${last_name || ""}`.trim(),
        },
      });
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
