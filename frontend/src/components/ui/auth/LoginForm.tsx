"use client"

import * as z from "zod";

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
import { Button } from "../button";
import { FormError } from "../form/FormError";
import { FormSuccess } from "../form/FormSuccess";

export const LoginForm = () => {

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log(values)
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
                  placeholder=""
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            )}
          />
          <FormError message={"Invalid credentials"} />
          <FormSuccess message={"Success"} />
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
