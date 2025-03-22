
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import TableTemplate from "./pages/TableTemplate";
import ChartTemplate from "./pages/ChartTemplate";
import CardTemplate from "./pages/CardTemplate";
import StatTemplate from "./pages/StatTemplate";
import MusicGroupManagement from "./pages/MusicGroupManagement";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import MusicManagement from "./pages/MusicManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/profile" replace />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/music-management" 
                element={
                  <ProtectedRoute>
                    <MusicGroupManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/musicians" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <MusicManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/table-template" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <TableTemplate />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/chart-template" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <ChartTemplate />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/card-template" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <CardTemplate />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/stat-template" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <StatTemplate />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
