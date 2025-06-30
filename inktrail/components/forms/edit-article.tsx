"use client";

import { Atom, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import { TailwindEditor } from "../editor-wrapper";
import Image from "next/image";
import { useActionState, useState } from "react";
import { JSONContent } from "novel";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { toast } from "sonner";
import slugify from "react-slugify";
import { createArticleAction, editArticleAction } from "@/app/actions";
import { articleSchema } from "@/lib/zod-schemas";

interface iProps {
  data: {
    slug: string;
    title: string;
    smallDescription: string;
    articleContent: any;
    id: string;
    image: string;
  };
  siteId: string;
}

export function EditArticle({ data, siteId }: iProps) {
  const [title, setTitle] = useState<string | undefined>(data.title);
  const [slug, setSlug] = useState<string | undefined>(data.slug);
  const [imageUrl, setImageUrl] = useState<string | undefined>(data.image);
  const [content, setContent] = useState<JSONContent | undefined>(
    data.articleContent
  );

  const [lastResult, editArticle, pending] = useActionState(
    editArticleAction,
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
    <Card className="mt-4">
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
          action={editArticle}
        >
          <input type="hidden" name="siteId" defaultValue={siteId} />
          <input type="hidden" name="articleId" defaultValue={data.id} />

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
              defaultValue={data.smallDescription}
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
              <>Update Article</>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
