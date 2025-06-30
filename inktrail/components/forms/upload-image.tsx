"use client";

import { useActionState, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { updateSiteImageAction } from "@/app/actions";
import { Loader2 } from "lucide-react";

export function UploadImage({ siteId }: { siteId: string }) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [prevResult, updateSiteImage, pending] = useActionState(
    updateSiteImageAction,
    undefined
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Update Image</CardTitle>
        <CardDescription>
          This is the image of your site. You can change it here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={200}
            height={200}
            className="size-[200px] object-cover rounded-lg"
          />
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].ufsUrl);
              toast.success("Image has been uploaded");
            }}
            onUploadError={() => {
              toast.error("Something went wrong...");
            }}
          />
        )}
      </CardContent>
      <CardFooter>
        <form action={updateSiteImage}>
          <input type="hidden" name="siteId" value={siteId} />
          <input type="hidden" name="imageUrl" value={imageUrl} />
          <Button disabled={pending}>
            {pending ? (
              <>
                <Loader2 className="animate-spin size-4" /> Please wait...
              </>
            ) : (
              <>Change Image</>
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
