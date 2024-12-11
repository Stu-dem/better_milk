"use client"

import * as z from "zod";

import { useTransition, useState } from "react";

import { CardWrapper } from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {Input} from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  FormField
} from "@/components/ui/form";

import { LoginSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form/FormError";
import { FormSuccess } from "@/components/ui/form/FormSuccess";

import { login } from "@/actions/login";

export const LoginForm = () => {

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError(undefined)
    setSuccess(undefined)

    startTransition(() => {
      login(values)
        .then((data) => {
          setError(data.error ?? undefined)
          setSuccess(data.success ?? undefined)
        })
    })
    
  }

  return (
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control = {form.control} name="email"
            render={({field}) => (
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
          <FormField control = {form.control} name="password"
            render={({field}) => (
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
          <Button type="submit" className="w-full" disabled={isPending}>Login</Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
