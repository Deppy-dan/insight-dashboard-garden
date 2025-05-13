
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MusicGroupManagement from './MusicGroupManagement';
import MusicManagement from './MusicManagement';
import MusiciansListView from './MusiciansListView';
import RehearsalSchedule from './RehearsalSchedule';
import SongManagement from './SongManagement';
import ScheduleManagement from './ScheduleManagement';
import AdminDashboard from './AdminDashboard';
import UserProfile from './UserProfile';
import NotFound from './NotFound';
import Login from './Login';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const AppRoutes = () => (
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
        <MusiciansListView />
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
    <Route path="/rehearsals" element={
      <ProtectedRoute>
        <RehearsalSchedule />
      </ProtectedRoute>
    } />
    <Route path="/admin" element={
      <ProtectedRoute requireAdmin={true}>
        <AdminDashboard />
      </ProtectedRoute>
    } />
    <Route path="/" element={<Login />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
