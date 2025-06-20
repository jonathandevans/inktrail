import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function HomeRoute() {
  return (
    <div>
      <h1>hello world</h1>

      <Button asChild>
        <LoginLink>Login</LoginLink>
      </Button>
      <Button asChild variant="ghost">
        <RegisterLink>Register</RegisterLink>
      </Button>
    </div>
  );
}
