"use client";

import { date, z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"), // Ensure name is a non-empty string
  transactionTypeId: z.string().uuid("Invalid transactionTypeId format"), // Ensure it's a valid UUID
  amount: z.number().positive("Amount must be a positive number"), // Ensure amount is a positive number
  fromBankAccountId: z.string().uuid("Invalid fromBankAccountId format"), // Ensure it's a valid UUID
  toBankAccountId: z.string().uuid("Invalid toBankAccountId format").optional(), // Ensure it's a valid UUID if provided
  notes: z.string().optional(), // Notes are optional, but if provided, must be a string
});

export default function CreateTransaction() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // This will be type-safe and validated.
    console.log(values);
  }

  const [name, setName] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const router = useRouter();

  async function create(formData: FormData) {
    console.log("clicked Create Transaction");
    // try {
    //   await fetch("http://localhost:3000/api/transactions/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       name,
    //       transactionType,
    //       amount,
    //       date,
    //     }),
    //   });
    // } catch (error) {
    //   console.error(error);
    //   throw error;
    // }
    console.log("clicked Create Transaction");
  }

  return (
    <>
      <form>
        <h3>Create new Transaction</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          name="Transaction Type"
          id="type"
          form="typeform"
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value={transactionType}>Income</option>
          <option value={transactionType}>Expense</option>
        </select>
        <input
          type="number"
          placeholder="0,00€"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="button">create Transaction</button>
      </form>
      <Form {...form}>
        <form
          action={create}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          Create new Transaction
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="neue Blumentöpfe let's go" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={"expense"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the Type of the Transaction" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="rebasement">Rebasement</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0,00€" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
