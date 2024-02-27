"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit } = useForm();

  return (
    <div className="w-100 flex justify-center items-center h-full">
      <div className="mb-6 px-6 py-8 rounded-lg border border-slate-200">
        <h2 className="text-2xl font-semibold mb-1">Login</h2>
        <p className="text-gray-500 text-sm">
          Enter your username and password.
        </p>
        <form className="py-6 space-y-4 w-[20rem]">
          <div className="flex flex-col gap-2">
            <Label htmlFor="first-name">Email Address</Label>
            <Input id="first-name" placeholder="Pedro" {...register("email")} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="last-name">Password</Label>
            <Input
              id="last-name"
              type="password"
              placeholder="Duarte"
              {...register("lastName")}
            />
          </div>
          <Button type="submit" form="customer-form">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
