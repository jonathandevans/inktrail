import { PricingTable } from "@/components/pricing";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function getData(userId: string) {
  const data = await db.subscription.findUnique({
    where: {
      userId,
    },
    select: {
      status: true,
      User: {
        select: {
          customerId: true,
        },
      },
    },
  });

  return data;
}

export default async function PricingRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) redirect("/api/auth/login");

  async function createCustomerPortal() {
    "use server";

    const session = await stripe.billingPortal.sessions.create({
      customer: data?.User?.customerId as string,
      return_url: `${process.env.KINDE_SITE_URL}/dashboard/pricing`,
    });

    return redirect(session.url);
  }

  const data = await getData(user.id);
  if (data?.status === "active") {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Subscription</CardTitle>
          <CardDescription>
            Click on the button below, this will give you the opportunity to
            change your payment details and view your invoices at the same time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createCustomerPortal}>
            <Button>View Subscription Details</Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <PricingTable />
    </div>
  );
}
