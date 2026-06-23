import { Button } from "@/components/ui/button";
import { WalletIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <WalletIcon className="text-sky-700 size-20" />
      <h1 className="text-sky-700 text-4xl font-bold">Welcome to FinFinext</h1>
      <p className="mt-2 text-lg">Your personal finance app with AI</p>
      <Link href="/dashboard">
        <Button className="mt-2" size="lg">
          Get Started
        </Button>
      </Link>
    </main>
  );
}
