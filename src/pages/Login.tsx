import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import type { UserLogin } from "@/types/user";
import { useNavigate } from "react-router";

export const LoginPage = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (user: UserLogin) => {
    try {
      await loginUser(user);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default LoginPage;
