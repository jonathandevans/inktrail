import { deleteSiteAction } from "@/app/actions";
import { UploadImage } from "@/components/forms/upload-image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function SiteSettingsRoute({
  params,
}: {
  params: { siteId: string };
}) {
  return (
    <>
      <div className="flex items-center gap-x-3">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ChevronLeft className="size-4" />
          </Link>
        </Button>
        <h3 className="text-xl font-semibold">Go Back</h3>
      </div>

      <UploadImage siteId={params.siteId} />

      <Card className="border-red-500 bg-red-500/5">
        <CardHeader>
          <CardTitle className="text-red-500 text-2xl font-semibold">
            Danger Zone
          </CardTitle>
          <CardDescription>
            This will delete your site and all articles associated with it.
            Click the button below to delete everything.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form action={deleteSiteAction}>
            <input type="hidden" name="siteId" value={params.siteId} />
            <Button variant="destructive">Delete Everything</Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
