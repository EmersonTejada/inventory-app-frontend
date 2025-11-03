import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import type { UserLogin } from "@/types/user";
import { useAuth } from "@/hooks/useAuth";

interface LoginFormProps {
  handleSubmit: (user: UserLogin) => void;
}

const LoginForm = ({ handleSubmit }: LoginFormProps) => {
  const form = useForm<UserLogin>({});
  const { state } = useAuth();
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Iniciar sesión</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder a tu cuenta
        </CardDescription>
        <CardAction>
          <Button variant="link">Registro</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Nombre de usuario
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Ingresa tu nombre de usuario"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Ingresa tu contraseña"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Cargando..." : "Iniciar sesión"}
              </Button>
            </Field>
          </FieldGroup>
          {state.error && (<p className="mt-4 text-sm text-red-600">{state.error}</p>)}
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
