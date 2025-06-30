"use client";

import { createSiteAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { siteSchema } from "@/lib/zod-schemas";

export default function NewSiteRoute() {
  const [lastResult, createSite] = useActionState(createSiteAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: siteSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={createSite}
        className="w-full"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create Site</CardTitle>
            <CardDescription>
              Create your Site here. Click the button below once you're done...
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-y-6">
              <div className="grid gap-2">
                <Label>Site Name</Label>
                <Input
                  placeholder="Site Name"
                  name={fields.name.name}
                  key={fields.name.key}
                  defaultValue={fields.name.initialValue}
                />
                {fields.name.errors?.map((item, index) => (
                  <p key={index} className="text-red-500 text-xs">
                    {item}
                  </p>
                ))}
              </div>

              <div className="grid gap-2">
                <Label>Subdirectory</Label>
                <Input
                  placeholder="Subdirectory"
                  name={fields.subdirectory.name}
                  key={fields.subdirectory.key}
                  defaultValue={fields.subdirectory.initialValue}
                />
                {fields.subdirectory.errors?.map((item, index) => (
                  <p key={index} className="text-red-500 text-xs">
                    {item}
                  </p>
                ))}
              </div>

              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Small description for your site..."
                  name={fields.description.name}
                  key={fields.description.key}
                  defaultValue={fields.description.initialValue}
                />
                {fields.description.errors?.map((item, index) => (
                  <p key={index} className="text-red-500 text-xs">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
