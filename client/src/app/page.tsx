// src/app/page.tsx (Updated with Sonner)
"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Link, Loader2 } from "lucide-react";
// --- V V V V CHANGE V V V V ---
// 1. Import 'toast' directly from sonner. No more hooks!
import { toast } from "sonner";
// --- ^ ^ ^ ^ CHANGE ^ ^ ^ ^ ---

interface ShortURLResponse {
  long_url: string;
  short_code: string;
  clicks: number;
}

export default function HomePage() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<ShortURLResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- V V V V CHANGE V V V V ---
  // 2. We no longer need the useToast hook. You can delete this line:
  // const { toast } = useToast();
  // --- ^ ^ ^ ^ CHANGE ^ ^ ^ ^ ---

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!longUrl) {
      // --- V V V V CHANGE V V V V ---
      // 3. The new toast API is a direct function call.
      toast.error("Please enter a URL to shorten.");
      // --- ^ ^ ^ ^ CHANGE ^ ^ ^ ^ ---
      return;
    }

    setIsLoading(true);
    setShortUrl(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/shorten", {
        long_url: longUrl,
      });
      setShortUrl(response.data);
      // You can even add a success toast!
      toast.success("Link shortened successfully!");
    } catch (error) {
      // --- V V V V CHANGE V V V V ---
      // 4. Using the error variant is just as easy.
      toast.error("Could not shorten the URL. Please try again.");
      // --- ^ ^ ^ ^ CHANGE ^ ^ ^ ^ ---
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      const fullShortUrl = `http://127.0.0.1:8000/${shortUrl.short_code}`;
      navigator.clipboard.writeText(fullShortUrl);
      // --- V V V V CHANGE V V V V ---
      // 5. A simple informational toast.
      toast("Copied to clipboard!");
      // --- ^ ^ ^ ^ CHANGE ^ ^ ^ ^ ---
    }
  };

  // The rest of your JSX remains exactly the same!
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white p-8">
      {/* The <Toaster /> component is now in layout.tsx, so we don't need it here. */}
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            The Ultimate Link Shortener
          </h1>
          <p className="mt-4 text-slate-400">
            Create short, memorable links in seconds.
          </p>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Link className="h-5 w-5" />
              Shorten a long URL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="url"
                placeholder="https://example.com/very/long/url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="bg-slate-900 border-slate-700 text-white"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-violet-600 hover:bg-violet-700"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Shorten"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <AnimatePresence>
          {shortUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Your Short Link is Ready!
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-md border border-slate-700 bg-slate-900 p-3">
                    <span className="font-mono text-violet-400">
                      http://127.0.0.1:8000/{shortUrl.short_code}
                    </span>
                    <Button variant="ghost" size="icon" onClick={handleCopy}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-slate-400">
                    Original URL:{" "}
                    {shortUrl.long_url.length > 40
                      ? `${shortUrl.long_url.slice(0, 40)}...`
                      : shortUrl.long_url}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
