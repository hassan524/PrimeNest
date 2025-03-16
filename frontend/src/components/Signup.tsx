"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/context";
import axios from "axios";
import { toast } from "sonner";
import { signUpSchema } from "../../utils/Schema";
import { useState } from "react";
import { apiRoute } from "../../utils/apiRoutes";

export default function SignUpDialog() {
  const { IsSignOpen, SetIsSignOpen, SetIsLoginOpen } = useAppContext();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSwitchToLogin = () => {
    SetIsSignOpen(false);
    SetIsLoginOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = signUpSchema.safeParse(formData);
    if (!result.success) {
      const firstError = result.error.issues[0]?.message;
      toast.error(firstError);
      return;
    }

    try {
      const response = await axios.post(apiRoute.sign, formData);
      console.log(response)
      toast.success("Account created successfully!");
      SetIsSignOpen(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message || "Something went wrong!");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <Dialog open={IsSignOpen} onOpenChange={SetIsSignOpen}>
      <DialogContent className="sm:max-w-[425px] w-[90vw] p-6 rounded-lg shadow-lg bg-white flex flex-col gap-[3rem]">
        <DialogHeader>
          <DialogTitle className="text-4xl font-semibold text-center">Sign Up</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[2rem]">
          <Input type="text" name="username" placeholder="Full Name" value={formData.username} onChange={handleChange} />
          <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <Button type="submit" className="w-full mt-2">
            Sign Up
          </Button>
        </form>

        {/* Switch to Login */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <button className="text-blue-900 font-medium hover:underline" onClick={handleSwitchToLogin}>
            Log in
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
