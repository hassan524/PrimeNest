"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/context";

export default function LoginDialog() {
  const { IsLoginOpen, SetIsLoginOpen, SetIsSignOpen } = useAppContext();

  const handleSwitchToSignUp = () => {
    SetIsLoginOpen(false); 
    SetIsSignOpen(true); 
  };

  return (
    <Dialog open={IsLoginOpen} onOpenChange={SetIsLoginOpen}>
      <DialogContent className="sm:max-w-[425px] w-[90vw] p-6 rounded-lg shadow-lg bg-white flex flex-col gap-[3rem]">
        <DialogHeader>
          <DialogTitle className="text-4xl font-semibold text-center">Login</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-[2rem]">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" className="w-full mt-2">
            Login
          </Button>
        </form>

        <p className="text-center text-sm">
          Don't have an account?{" "}
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
