
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import MusicGroupManagement from "./pages/MusicGroupManagement";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import MusicManagement from "./pages/MusicManagement";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, isAdmin } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/login" />} />
        <Route path="/music-management" element={user ? <MusicGroupManagement /> : <Navigate to="/login" />} />
        <Route path="/musicians" element={user && isAdmin ? <MusicManagement /> : <Navigate to={user ? "/music-management" : "/login"} />} />
        <Route path="/admin" element={user && isAdmin ? <AdminDashboard /> : <Navigate to={user ? "/music-management" : "/login"} />} />
        <Route path="/" element={<Navigate to={user ? "/profile" : "/login"} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <AppRoutes />
        </Router>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
