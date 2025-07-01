import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CloudRain } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import HeroImage from "@/public/hero.png";
import { PricingTable } from "@/components/pricing";

const features = [
  {
    name: "Sign up for free",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitcr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.",
    icon: CloudRain,
  },
  {
    name: "Blazing fast",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitcr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.",
    icon: CloudRain,
  },
  {
    name: "Super secure with Kinde",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitcr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.",
    icon: CloudRain,
  },
  {
    name: "Easy to use",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitcr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.",
    icon: CloudRain,
  },
];

export default async function HomeRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-center">
        <div className="flex w-full flex-row items-center justify-between text-sm">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} className="size-10 rounded-lg" alt="Logo" />
            <h3 className="text-3xl font-semibold">
              Ink<span className="text-primary">trail</span>
            </h3>
          </Link>
          <div className="md:hidden">
            <ThemeToggle />
          </div>

          <nav className="hidden md:flex justify-end space-x-4">
            {user ? (
              <>
                <Button asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline">
                  <LoginLink>Login</LoginLink>
                </Button>
                <Button asChild>
                  <RegisterLink>Register</RegisterLink>
                </Button>
              </>
            )}

            <ThemeToggle />
          </nav>
        </div>
      </div>

      <section className="relative flex items-center justify-center">
        <div className="relative items-center w-full pt-12 lg:pt-20">
          <div className="text-center">
            <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full shadow-md shadow-primary/25">
              Ultimate Blogging Saas for Startups
            </span>

            <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-none tracking-tight">
              Setup your Blog{" "}
              <span className="block text-primary">in Minutes!</span>
            </h1>

            <p className="max-w-xl mx-auto mt-4 text-base font-light lg:text-lg text-muted-foreground tracking-tighter">
              Setting up your blog is hard and time consuming. We make it easy
              for you to create a blog in minutes.
            </p>

            <div className="flex items-center gap-x-5 w-full justify-center mt-5">
              {user ? (
                <>
                  <Button asChild>
                    <Link href="/dashboard">Go To Dashboard</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="secondary">
                    <LoginLink>Login</LoginLink>
                  </Button>
                  <Button asChild>
                    <RegisterLink>Try for Free</RegisterLink>
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="relative items-center w-full py-12 mx-auto">
            <Image
              src={HeroImage}
              alt="Hero Image"
              className="relative object-cover w-full border rounded-lg shadow-2xl lg:rounded-2xl shadow-primary/50"
            />
          </div>
        </div>
      </section>

      <div className="py-24 sm:py-32">
        <div className="max-w-2xl mx-auto lg:text-center">
          <p className="font-semibold leading-7 text-primary">Blog Faster</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Get your blog up and running in minutes
          </h1>
          <p className="mt-6 text-base leading-snug text-muted-foreground">
            Right here you can create a blog in minutes. We make it easy for you
            to create a blog in minutes. The blog is very fast and easy to
            create.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-4xl">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <div className="text-base font-semibold leading-7">
                  <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon className="size-6 text-white" />
                  </div>
                  {feature.name}
                </div>
                <p className="mt-2 text-base text-muted-foreground leading-snug">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PricingTable />
    </main>
  );
}
