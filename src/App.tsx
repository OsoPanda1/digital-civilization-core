import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
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
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Protected App Routes */}
            <Route path="/app" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
            <Route path="/app/feed" element={<ProtectedRoute><AppLayout><Feed /></AppLayout></ProtectedRoute>} />
            <Route path="/app/streams" element={<ProtectedRoute><AppLayout><Streams /></AppLayout></ProtectedRoute>} />
            <Route path="/app/concerts" element={<ProtectedRoute><AppLayout><Concerts /></AppLayout></ProtectedRoute>} />
            <Route path="/app/university" element={<ProtectedRoute><AppLayout><University /></AppLayout></ProtectedRoute>} />
            <Route path="/app/lottery" element={<ProtectedRoute><AppLayout><Lottery /></AppLayout></ProtectedRoute>} />
            <Route path="/app/marketplace" element={<ProtectedRoute><AppLayout><Marketplace /></AppLayout></ProtectedRoute>} />
            <Route path="/app/gallery" element={<ProtectedRoute><AppLayout><Gallery /></AppLayout></ProtectedRoute>} />
            <Route path="/app/channels" element={<ProtectedRoute><AppLayout><Channels /></AppLayout></ProtectedRoute>} />
            <Route path="/app/devhub" element={<ProtectedRoute><AppLayout><DevHub /></AppLayout></ProtectedRoute>} />
            <Route path="/app/profile" element={<ProtectedRoute><AppLayout><Profile /></AppLayout></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
