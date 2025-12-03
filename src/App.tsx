import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Devices from "./pages/Devices";
import Commands from "./pages/Commands";
import NotFound from "./pages/NotFound";

// Supabase client
import { supabase } from "./lib/supabase";

const queryClient = new QueryClient();

const App = () => {

  // Run Supabase test only once on app load
  useEffect(() => {
    async function testSupabaseConnection() {
      console.log("Testing Supabase connection...");

      const { data, error } = await supabase
        .from("devices")        // This can be ANY table name
        .select("*")
        .limit(1);

      console.log("SUPABASE RESPONSE:", { data, error });
    }

    testSupabaseConnection();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" theme="dark" />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/commands" element={<Commands />} />
            
            {/* Temporary placeholder routes */}
            <Route path="/telemetry" element={<Index />} />
            <Route path="/rules" element={<Index />} />
            <Route path="/alerts" element={<Index />} />
            <Route path="/team" element={<Index />} />
            <Route path="/settings" element={<Index />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
