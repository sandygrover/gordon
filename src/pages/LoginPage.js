// import React from 'react';
// import { useSelector } from 'react-redux';
import AuthLayout from '../components/common/AuthLayout/AuthLayout';
import LoginForm from '../components/forms/Auth/LoginForm';

const HomePage = () => {
  // const user = useSelector((state) => state.user);
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default HomePage;
