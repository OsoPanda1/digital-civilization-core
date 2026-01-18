import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/app/Dashboard";
import Feed from "./pages/app/Feed";
import Streams from "./pages/app/Streams";
import Concerts from "./pages/app/Concerts";
import University from "./pages/app/University";
import Lottery from "./pages/app/Lottery";
import Marketplace from "./pages/app/Marketplace";
import Gallery from "./pages/app/Gallery";
import Channels from "./pages/app/Channels";
import DevHub from "./pages/app/DevHub";
import Profile from "./pages/app/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* App Routes */}
            <Route path="/app" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/app/feed" element={<AppLayout><Feed /></AppLayout>} />
            <Route path="/app/streams" element={<AppLayout><Streams /></AppLayout>} />
            <Route path="/app/concerts" element={<AppLayout><Concerts /></AppLayout>} />
            <Route path="/app/university" element={<AppLayout><University /></AppLayout>} />
            <Route path="/app/lottery" element={<AppLayout><Lottery /></AppLayout>} />
            <Route path="/app/marketplace" element={<AppLayout><Marketplace /></AppLayout>} />
            <Route path="/app/gallery" element={<AppLayout><Gallery /></AppLayout>} />
            <Route path="/app/channels" element={<AppLayout><Channels /></AppLayout>} />
            <Route path="/app/devhub" element={<AppLayout><DevHub /></AppLayout>} />
            <Route path="/app/profile" element={<AppLayout><Profile /></AppLayout>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
