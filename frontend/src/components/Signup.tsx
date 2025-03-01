"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/context";

export default function SignUpDialog() {
  const { IsSignOpen, SetIsSignOpen, SetIsLoginOpen } = useAppContext();

  const handleSwitchToLogin = () => {
    SetIsSignOpen(false);
    SetIsLoginOpen(true);
  };

  return (
    <Dialog open={IsSignOpen} onOpenChange={SetIsSignOpen}>
      <DialogContent className="sm:max-w-[425px] w-[90vw] p-6 rounded-lg shadow-lg bg-white flex flex-col gap-[3rem]">
        <DialogHeader>
          <DialogTitle className="text-4xl font-semibold text-center">Sign Up</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-[2rem]">
          <Input type="text" placeholder="Full Name" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" className="w-full mt-2">
            Sign Up
          </Button>
        </form>

        {/* Switch to Login */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <button
            className="text-blue-900 font-medium hover:underline"
            onClick={handleSwitchToLogin}
          >
            Log in
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
