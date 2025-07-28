"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, LogIn, Loader2, AlertCircle } from "lucide-react";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Starting sign in process...");
      
      const result = await signIn("azure-ad", { 
        callbackUrl: "/",
        redirect: true 
      });
      
      console.log("Sign in result:", result);
    } catch (error) {
      console.error("Sign in error:", error);
      setError("Failed to start sign in process. Check console for details.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary flex items-center justify-center">
            <Lock className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Welcome to Wesley Farm Supply</CardTitle>
          <CardDescription>
            Sign in with your organizational account to access the data platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleSignIn}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Redirecting to Microsoft...
                </>
              ) : (
                <>
                  <svg
                    className="mr-2 h-5 w-5"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h10v10H0z" fill="#f25022" />
                    <path d="M11 0h10v10H11z" fill="#7fba00" />
                    <path d="M0 11h10v10H0z" fill="#00a4ef" />
                    <path d="M11 11h10v10H11z" fill="#ffb900" />
                  </svg>
                  Sign in with Microsoft
                </>
              )}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Secure authentication
                </span>
              </div>
            </div>
            
            <p className="text-center text-sm text-muted-foreground">
              By signing in, you agree to our terms of service and privacy policy.
              This site is for authorized users only.
            </p>

            {/* Debug info */}
            <div className="mt-4 p-3 rounded-lg bg-muted text-xs">
              <p className="font-semibold mb-1">Debug Info:</p>
              <p>NextAuth URL: {process.env.NEXT_PUBLIC_NEXTAUTH_URL || "Not set"}</p>
              <p>Callback URL: /api/auth/callback/azure-ad</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
