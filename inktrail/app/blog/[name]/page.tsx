import { db } from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import Logo from "@/public/logo.png";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DefaultImage from "@/public/placeholder.jpg";

async function getData(subdirectory: string) {
  const data = await db.site.findUnique({
    where: {
      subdirectory,
    },
    select: {
      name: true,
      articles: {
        select: {
          smallDescription: true,
          title: true,
          createdAt: true,
          id: true,
          image: true,
          slug: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!data) return notFound();

  return data;
}

export default async function BlogRoute({
  params,
}: {
  params: { name: string };
}) {
  const data = await getData(params.name);

  return (
    <>
      <nav className="grid grid-cols-3 my-10">
        <div className="col-span-1" />

        <div className="flex items-center gap-x-4 justify-center">
          <Image
            src={Logo}
            alt="Logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <h1 className="text-3xl font-semibold tracking-tight">{data.name}</h1>
        </div>

        <div className="col-span-1 flex w-full justify-end">
          <ThemeToggle />
        </div>
      </nav>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {data.articles.map((item) => (
          <Card key={item.id} className="pt-0">
            <Image
              src={item.image ?? DefaultImage}
              alt={item.title}
              className="rounded-t-lg object-cover w-full h-[220px]"
              width={400}
              height={200}
            />
            <CardHeader>
              <CardTitle className="truncate">{item.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {item.smallDescription}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/blog/${params.name}/${item.slug}`}>
                  View Article
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
