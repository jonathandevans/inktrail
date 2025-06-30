"use client";

import { createArticleAction } from "@/app/actions";
import { TailwindEditor } from "@/components/editor-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import { articleSchema } from "@/lib/zod-schemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ArrowLeft, Atom, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { JSONContent } from "novel";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import slugify from "react-slugify";

export default function NewArticleRoute() {
  const { siteId } = useParams<{ siteId: string }>();

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [slug, setSlug] = useState<string | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<JSONContent | undefined>(undefined);

  const [lastResult, createArticle, pending] = useActionState(
    createArticleAction,
    undefined
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: articleSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  function generateSlug() {
    const titleInput = title;

    if (titleInput?.length === 0 || titleInput === undefined) {
      return toast.error("Please create a title first");
    }

    setSlug(slugify(titleInput));

    return toast.success("Slug has been created");
  }

  return (
    <>
      <div className="flex items-center">
        <Button asChild size="icon" variant="outline" className="mr-3">
          <Link href={`/dashboard/sites/${siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Create Article</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Article Details</CardTitle>
          <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-6"
            id={form.id}
            onSubmit={form.onSubmit}
            action={createArticle}
          >
            <input type="hidden" name="siteId" defaultValue={siteId} />

            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                placeholder="NextJS blogging application"
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={fields.title.initialValue}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              {fields.title.errors?.map((item, index) => (
                <p key={index} className="text-red-500 text-xs">
                  {item}
                </p>
              ))}
            </div>

            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input
                placeholder="Article Slug"
                key={fields.slug.key}
                name={fields.slug.name}
                defaultValue={fields.slug.initialValue}
                onChange={(e) => setSlug(e.target.value)}
                value={slug}
              />
              <Button
                className="w-fit"
                variant="secondary"
                type="button"
                onClick={generateSlug}
              >
                <Atom className="size-4" />
                Generate Slug
              </Button>
              {fields.slug.errors?.map((item, index) => (
                <p key={index} className="text-red-500 text-xs">
                  {item}
                </p>
              ))}
            </div>

            <div className="grid gap-2">
              <Label>Small Description</Label>
              <Textarea
                placeholder="Small description for your blog article..."
                className="h-32"
                key={fields.smallDescription.key}
                name={fields.smallDescription.name}
                defaultValue={fields.smallDescription.initialValue}
              />
              {fields.smallDescription.errors?.map((item, index) => (
                <p key={index} className="text-red-500 text-xs">
                  {item}
                </p>
              ))}
            </div>

            <div className="grid gap-2">
              <Label>Cover Image</Label>
              <input
                type="hidden"
                key={fields.coverImage.key}
                name={fields.coverImage.name}
                defaultValue={fields.coverImage.initialValue}
                value={imageUrl}
              />
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Uploaded image"
                  width={200}
                  height={200}
                  className="object-cover w-[200px] h-[200px] rounded-lg"
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
              {fields.coverImage.errors?.map((item, index) => (
                <p key={index} className="text-red-500 text-xs">
                  {item}
                </p>
              ))}
            </div>

            <div className="grid gap-2">
              <Label>Article Content</Label>
              <input
                type="hidden"
                key={fields.articleContent.key}
                name={fields.articleContent.name}
                defaultValue={fields.articleContent.initialValue}
                value={JSON.stringify(content)}
              />
              <TailwindEditor initialValue={content} onChange={setContent} />
              {fields.articleContent.errors?.map((item, index) => (
                <p key={index} className="text-red-500 text-xs">
                  {item}
                </p>
              ))}
            </div>

            <Button disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="animate-spin size-4" /> Please wait
                </>
              ) : (
                <>Create Article</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
