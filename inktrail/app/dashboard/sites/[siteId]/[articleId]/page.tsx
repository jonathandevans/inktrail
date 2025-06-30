import { EditArticle } from "@/components/forms/edit-article";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(articleId: string) {
  const data = await db.article.findUnique({
    where: {
      id: articleId,
    },
    select: {
      image: true,
      title: true,
      smallDescription: true,
      slug: true,
      articleContent: true,
      id: true,
    },
  });

  if (!data) return notFound();

  return data;
}

export default async function EditArticleRoute({
  params,
}: {
  params: { siteId: string; articleId: string };
}) {
  const data = await getData(params.articleId);

  return (
    <div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Edit Article</h1>
      </div>

      <EditArticle data={data} siteId={params.siteId} />
    </div>
  );
}
