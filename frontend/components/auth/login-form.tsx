"use client";

import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

type LoginFormInput = {
  username: string;
  password: string;
}

export function LoginForm() {
  const router = useRouter();
  const { handleSubmit, register } =
    useForm<LoginFormInput>();

  const submitLogin = async (userCredentials: LoginFormInput) => {
    const createResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/auth/login`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(userCredentials),
      },
    );
    if (!createResponse.ok) {
      throw Error("Failed");
    }

    router.push('/');
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitLogin)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="me@example.com"
              {...register("username")}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required {...register("password")} />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" isDisabled className="w-full">
            Login with Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

