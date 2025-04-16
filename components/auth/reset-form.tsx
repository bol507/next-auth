"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { ResetSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState } from "react";

export const ResetForm = () => {
  

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<ResetSchema>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ResetSchema) => {
    setSuccess("");
    setError("");

    console.log(values);
  };
  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Send reset email
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
