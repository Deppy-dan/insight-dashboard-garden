
import { Toaster } from "@/components/ui/toaster.js";
import { Toaster as Sonner } from "@/components/ui/sonner.js";
import { TooltipProvider } from "@/components/ui/tooltip.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext.js";
import Login from "./pages/Login.js";
import NotFound from "./pages/NotFound.js";
import MusicGroupManagement from "./pages/MusicGroupManagement.js";
import UserProfile from "./pages/UserProfile.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import MusicManagement from "./pages/MusicManagement.js";
import SongManagement from "./pages/SongManagement.js";
import ScheduleManagement from "./pages/ScheduleManagement.js";
import { Helmet } from "react-helmet";
import ProtectedRoute from "./components/auth/ProtectedRoute.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <>
    <Helmet titleTemplate="%s | Música Igreja" defaultTitle="Sistema de Gestão Musical">
      <meta name="description" content="Sistema de gerenciamento de música para igrejas" />
    </Helmet>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } />
                <Route path="/music-management" element={
                  <ProtectedRoute>
                    <MusicGroupManagement />
                  </ProtectedRoute>
                } />
                <Route path="/musicians" element={
                  <ProtectedRoute>
                    <MusicManagement />
                  </ProtectedRoute>
                } />
                <Route path="/songs" element={
                  <ProtectedRoute>
                    <SongManagement />
                  </ProtectedRoute>
                } />
                <Route path="/schedules" element={
                  <ProtectedRoute>
                    <ScheduleManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </Router>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </>
);

export default App;
