import SigninForm from 'components/SignInForm';
import SignInPage from 'pages/SignInPage';
import SignOutPage from 'pages/SignOutPage';
import Test from 'pages/Test';
import User from 'pages/User';
import AuthProvider from 'context/AuthProvider';
import useAuth from 'hooks/useAuth';
import AuthRequired from 'layout/AuthRequired';
import Layout from 'layout/Layout';
import { Route, Routes } from 'react-router-dom';

const Home = () => {
  const { state } = useAuth()

  return (
    <>
      Home page:<br />
      {!state.accessToken && <SigninForm />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes here */}
          <Route index element={<Home />} />
          <Route path="test" element={<Test />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signout" element={<SignOutPage />} />
          {/* User routes here */}
          <Route element={<AuthRequired />}>
            <Route path="user" element={<User />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
