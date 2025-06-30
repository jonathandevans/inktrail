"use client";

import { Check, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { createSubscriptionAction } from "@/app/actions";

interface Props {
  id: number;
  cardTitle: string;
  cardDescription: string;
  benefits: string[];
  priceTitle: string;
}

const PricingPlans: Props[] = [
  {
    id: 0,
    cardTitle: "Freelancer",
    cardDescription: "The best pricing plan for people starting out",
    benefits: [
      "1 Site",
      "Up to 1000 Visitors",
      "Up to 1000 Visitors",
      "Up to 1000 Visitors",
    ],
    priceTitle: "Free",
  },
  {
    id: 1,
    cardTitle: "Startup",
    cardDescription: "The best pricing plan for professionals",
    benefits: [
      "Unlimited Sites",
      "Unlimited Visitors",
      "Unlimited Visitors",
      "Unlimited Visitors",
    ],
    priceTitle: "£29",
  },
];

export function PricingTable() {
  const { pending } = useFormStatus();

  return (
    <>
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-semibold text-primary">Pricing</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
          Pricing Plans for everyone and every budget!
        </h1>
      </div>

      <p className="mx-auto mt-6 max-w-xl text-center leading-tight text-muted-foreground">
        Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi
        iusto modi velit ut non voluptas in. Explicabo id ut laborum.
      </p>

      <div className="grid grid-cols-1 gap-8 mt-10 lg:grid-cols-2">
        {PricingPlans.map((item) => (
          <Card key={item.id} className={item.id === 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                {item.id === 1 ? (
                  <div className="flex items-center justify-between">
                    <h3 className="text-primary">Startup</h3>
                    <p className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold leading-5 text-primary">
                      Most popular
                    </p>
                  </div>
                ) : (
                  <>{item.cardTitle}</>
                )}
              </CardTitle>
              <CardDescription>{item.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold tracking-tight">
                {item.priceTitle}
              </p>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground">
                {item.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-x-3 items-center">
                    <Check className="text-primary size-5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {item.id === 1 ? (
                <form className="w-full" action={createSubscriptionAction}>
                  <Button className="w-full" disabled={pending}>
                    {pending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Please wait...
                      </>
                    ) : (
                      <>Buy Plan</>
                    )}
                  </Button>
                </form>
              ) : (
                <Button className="w-full" variant="outline" disabled={pending}>
                  <Link href="/dashboard">
                    {pending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Please wait...
                      </>
                    ) : (
                      <>Try for Free</>
                    )}
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
