"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { siteSchema } from "@/lib/zod-schemas";
import { db } from "@/lib/db";

export async function createSiteAction(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/api/auth/login");

  const submission = parseWithZod(formData, {
    schema: siteSchema,
  });

  if (submission.status !== "success") return submission.reply();

  const response = await db.site.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      subdirectory: submission.value.subdirectory,
      userId: user.id,
    },
  });

  return redirect("/dashboard/sites");
}
