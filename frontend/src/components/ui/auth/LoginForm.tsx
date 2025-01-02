"use client";

import * as z from "zod";

import { useTransition, useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  FormField,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import { CardWrapper } from "@/components/ui/auth";
import { LoginSchema } from "@/schemas";
import { FormError, FormSuccess } from "@/components/ui/form-messages";

import { POST } from "@/actions/login";
import useUser from "@/queries/getUser";
import {toast} from "sonner";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<object | undefined>(undefined);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      POST(new Request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })).then((loginResponse) => {
        setError(loginResponse?.error ?? undefined);
        setSuccess(loginResponse?.success ?? undefined);

        if (loginResponse?.success) {
          setIsLoggedIn(true);
          setUser(loginResponse.user);
        }
      });
    });
  };

  useEffect(() => {
    if (success) {
      refetch();
      toast.success(success);
      const timer = setTimeout(() => {
        router.push("/settings");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [success, user]);


  const { data, refetch } = useUser(false);

  return (
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    disabled={isPending}
                    placeholder="john.doe@clover.co.za"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    disabled={isPending}
                    placeholder=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Login
            </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
