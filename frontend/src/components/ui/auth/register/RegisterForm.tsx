"use client"

import * as z from "zod";

import { useTransition, useState } from "react";

import { CardWrapper } from "../CardWrapper";
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

import { RegisterSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { FormError, FormSuccess } from "@/components/ui/form-messages";

import { register } from "@/actions/register";

export const RegisterForm = () => {

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password_1: "",
      password_2: "",
      first_name: "",
      last_name: ""
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError(undefined)
    setSuccess(undefined)

    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error ?? undefined)
          setSuccess(data.success ?? undefined)
        })
    })
    
  }

  return (
    <CardWrapper
      headerLabel="Create an account!"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
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
          <FormField control = {form.control} name="password_1"
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
          <FormField control = {form.control} name="password_2"
            render={({field}) => (
              <FormItem>
              <FormLabel>Confirm password</FormLabel>
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
          <FormField control = {form.control} name="first_name"
            render={({field}) => (
              <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  type="text"
                  disabled={isPending}
                  placeholder="Joe"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            )}
          />
          <FormField control = {form.control} name="last_name"
            render={({field}) => (
              <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  type="text"
                  disabled={isPending}
                  placeholder="Doe"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>Register</Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
