import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Galeria from "./pages/Galeria.tsx";
import Marcacoes from "./pages/Marcacoes.tsx";
import Footcamp from "./pages/Footcamp.tsx";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade.tsx";
import TermosCondicoes from "./pages/TermosCondicoes.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/marcacoes" element={<Marcacoes />} />
          <Route path="/footcamp" element={<Footcamp />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/termos-condicoes" element={<TermosCondicoes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
