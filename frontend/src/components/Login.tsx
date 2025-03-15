"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/context";
import { toast } from "sonner";

export default function LoginDialog() {
  const { IsLoginOpen, SetIsLoginOpen, SetIsSignOpen } = useAppContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSwitchToSignUp = () => {
    SetIsLoginOpen(false);
    SetIsSignOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    console.log(result);

    if (result?.error) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Logged in successfully!");
      SetIsLoginOpen(false);
    }
  };

  return (
    <Dialog open={IsLoginOpen} onOpenChange={SetIsLoginOpen}>
      <DialogContent className="sm:max-w-[425px] w-[90vw] p-6 rounded-lg shadow-lg bg-white flex flex-col gap-[3rem]">
        <DialogHeader>
          <DialogTitle className="text-4xl font-semibold text-center">Login</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[2rem]">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="w-full mt-2">
            Login
          </Button>
        </form>

        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <button
            className="text-blue-900 font-medium hover:underline"
            onClick={handleSwitchToSignUp}
          >
            Sign up
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
