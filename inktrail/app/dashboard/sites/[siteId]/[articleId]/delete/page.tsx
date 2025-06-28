import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DeleteArticleRoute({
  params,
}: {
  params: { siteId: string; articleId: string };
}) {
  return (
    <div className="flex items-center justify-center">
      <Card className="max-w-xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will delete remove all data on
            the article from our server.
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href={`/dashboard/sites/${params.siteId}`}>Cancel</Link>
          </Button>
          <form>
            <input type="hidden" name="siteId" value={params.siteId} />
            <input type="hidden" name="articleId" value={params.articleId} />
            <Button variant="destructive">Delete Article</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
