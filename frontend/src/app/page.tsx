import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/auth/LoginButton";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200 to-blue-500">
        <div className="space-y-6">
          <h1 className="text-6xl font-semibold text-white drop-shadow-md">🔐Auth</h1>
          <p className="text-white text-lg">A simple authentication service</p>
          <LoginButton>
            <Button variant="secondary" size="lg">Sign in</Button>
          </LoginButton>
          
        </div>

    </main>
  );
}
 