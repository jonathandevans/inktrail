import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessRoute() {
  return (
    <div className="w-full flex justify-center items-center">
      <Card className="w-[350px]">
        <div className="px-8">
          <div className="flex justify-center">
            <Check className="size-12 p-2 rounded-full bg-green-500/20 text-green-500" />
          </div>

          <div className="mt-2 text-center w-full">
            <h2 className="text-xl font-semibold">Payment Successful</h2>
            <p className="text-sm mt-2 text-muted-foreground">
              You now have access to all the features of the Startup plan.
            </p>

            <Button className="w-full mt-5" asChild>
              <Link href="/dashboard">Go back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
