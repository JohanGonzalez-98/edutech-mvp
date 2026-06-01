import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';

import StudentDashboard from './pages/student/Dashboard';
import SubjectTasks from './pages/student/SubjectTasks';
import TaskDetail from './pages/student/TaskDetail';
import SubmitTask from './pages/student/SubmitTask';
import MisNotas from './pages/student/MisNotas';
import Calendario from './pages/student/Calendario';

import TeacherDashboard from './pages/teacher/Dashboard';
import SubjectActivities from './pages/teacher/SubjectActivities';
import PublishActivity from './pages/teacher/PublishActivity';
import StudentList from './pages/teacher/StudentList';
import GradeActivity from './pages/teacher/GradeActivity';

import AdminDashboard from './pages/admin/Dashboard';
import Usuarios from './pages/admin/Usuarios';
import Espacios from './pages/admin/Espacios';

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Raíz: redirige al panel del rol o al login */}
      <Route path="/" element={<Navigate to={user ? `/${user.role}` : '/login'} replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cambiar-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />

      {/* ===== Estudiante ===== */}
      <Route path="/estudiante" element={<ProtectedRoute role="estudiante"><Layout /></ProtectedRoute>}>
        <Route index element={<StudentDashboard />} />
        <Route path="notas" element={<MisNotas />} />
        <Route path="calendario" element={<Calendario />} />
        <Route path="materia/:id" element={<SubjectTasks />} />
        <Route path="tarea/:id" element={<TaskDetail />} />
        <Route path="tarea/:id/subir" element={<SubmitTask />} />
      </Route>

      {/* ===== Docente ===== */}
      <Route path="/docente" element={<ProtectedRoute role="docente"><Layout /></ProtectedRoute>}>
        <Route index element={<TeacherDashboard />} />
        <Route path="grupos" element={<TeacherDashboard />} />
        <Route path="materia/:id" element={<SubjectActivities />} />
        <Route path="materia/:id/publicar" element={<PublishActivity />} />
        <Route path="materia/:id/estudiantes" element={<StudentList />} />
        <Route path="tarea/:id/calificar" element={<GradeActivity />} />
      </Route>

      {/* ===== Administrador ===== */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><Layout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="espacios" element={<Espacios />} />
      </Route>

      {/* Cualquier otra ruta */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
