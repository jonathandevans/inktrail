import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelledRoute() {
  return (
    <div className="w-full flex justify-center items-center">
      <Card className="w-[350px]">
        <div className="px-8">
          <div className="flex justify-center">
            <XIcon className="size-12 p-2 rounded-full bg-red-500/20 text-red-500" />
          </div>

          <div className="mt-2 text-center w-full">
            <h2 className="text-xl font-semibold">Payment Cancelled</h2>
            <p className="text-sm mt-2 text-muted-foreground">No worries, you won't be charged. Please try again.</p>

            <Button className="w-full mt-5" asChild>
              <Link href="/dashboard">Go back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
