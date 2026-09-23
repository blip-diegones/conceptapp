import React from 'react';
import Login01 from '@/components/ui/login-01';

export default function LoginView({ onLoginSuccess, students = [] }) {
  return (
    <Login01 onLoginSuccess={onLoginSuccess} students={students} />
  );
}
