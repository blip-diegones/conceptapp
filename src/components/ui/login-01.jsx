import * as React from "react";
import { ArrowRight, CircleAlert, Eye, EyeOff, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

const ENTER =
  "animate-in fade-in slide-in-from-bottom-4 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] fill-mode-both motion-reduce:animate-none";
const SWAP =
  "animate-in fade-in slide-in-from-bottom-1 duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] fill-mode-both motion-reduce:animate-none";

const stagger = (index, step = 60) => ({
  animationDelay: `${index * step}ms`,
});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GoogleIcon = (props) => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M21.35 11.1H12v3.2h5.34c-.23 1.4-1.66 4.1-5.34 4.1A6.4 6.4 0 1 1 12 5.6c1.83 0 3.05.78 3.75 1.45l2.55-2.46C16.74 3.05 14.55 2 12 2 6.95 2 2.85 6.1 2.85 11.15S6.95 20.3 12 20.3c6.93 0 9.5-4.86 9.5-7.4 0-.5-.06-.88-.15-1.8Z"
      />
    </svg>
  );
};

const GithubIcon = (props) => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.13-4.55-5.04 0-1.11.39-2.02 1.03-2.74-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.04A9.4 9.4 0 0 1 12 7.04c.85 0 1.7.12 2.5.34 1.9-1.31 2.74-1.04 2.74-1.04.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.74 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.04 10.04 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
};

const BrandMark = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-2 text-black shadow-lg", className)}>
      <span className="text-xs font-black tracking-widest">CT</span>
    </div>
  );
};

// Minimal inline password input (show/hide toggle) built on InputGroup.
const PasswordField = ({
  toggleLabel = { show: "Mostrar senha", hide: "Ocultar senha" },
  className,
  ...props
}) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <InputGroup data-slot="password-input-field" className={className}>
      <InputGroupInput type={visible ? "text" : "password"} {...props} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          size="icon-sm"
          aria-label={visible ? toggleLabel.hide : toggleLabel.show}
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};

import { authenticate } from "@/utils/auth";

const Login01 = ({ onLoginSuccess, students = [] }) => {
  const [email, setEmail] = React.useState("rafael@conceptct.com.br");
  const [password, setPassword] = React.useState("••••••••••••");
  const [remember, setRemember] = React.useState(true);
  const [errors, setErrors] = React.useState({});
  const [attempt, setAttempt] = React.useState(0);
  const [pending, setPending] = React.useState(false);

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = "Informe seu e-mail ou matrícula cadastrada.";
    else if (!EMAIL_PATTERN.test(email))
      next.email = "Formato de e-mail inválido.";
    if (!password) next.password = "Informe sua senha (ex: 5 primeiros dígitos do CPF).";
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setPending(true);
    await new Promise((r) => setTimeout(r, 500));
    
    const result = authenticate(email, password, students);
    setPending(false);

    if (result.success) {
      if (onLoginSuccess) {
        onLoginSuccess(result.user);
      }
    } else {
      setErrors({ form: result.error || "E-mail ou senha incorretos." });
      setAttempt((count) => count + 1);
    }
  };

  const handleQuickFill = (role) => {
    if (role === "admin") {
      setEmail("rafael@conceptct.com.br");
      setPassword("concept@2026");
    } else if (role === "coach") {
      setEmail("thiago@conceptct.com.br");
      setPassword("coach@2026");
    } else {
      setEmail("lucas.almeida@gmail.com");
      setPassword("aluno@2026");
    }
  };

  return (
    <section
      data-slot="login"
      className="relative isolate flex min-h-screen items-center justify-center bg-[#07080a] py-12 px-4"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(212, 175, 55, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(212, 175, 55, 0.15) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="mx-auto w-full max-w-md">
        <div
          data-slot="login-card"
          className={cn(
            ENTER,
            "rounded-2xl border border-[rgba(212,175,55,0.3)] bg-[#0f141c] shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md overflow-hidden"
          )}
        >
          {/* Header do Login */}
          <div
            data-slot="login-header"
            className="flex flex-col items-center gap-3 border-b border-[var(--border-subtle)] px-8 pb-6 pt-8"
          >
            <BrandMark className={cn(ENTER, "size-10 text-foreground")} />
            <div className="flex flex-col items-center gap-1 text-center">
              <h1
                style={stagger(1)}
                className={cn(
                  ENTER,
                  "text-2xl font-black tracking-tight text-white uppercase"
                )}
              >
                Bem-vindo ao Time CONCEPT
              </h1>
              <p
                style={stagger(2)}
                className={cn(ENTER, "text-xs font-semibold uppercase tracking-wider text-[var(--gold-light)]")}
              >
                Centro de Treinamento • São Lourenço - MG
              </p>
            </div>

            {/* Seletor rápido de perfil (ótimo para demos) */}
            <div className="flex items-center justify-center flex-wrap gap-1.5 mt-2">
              <span className="text-[11px] text-[var(--text-faint)]">Acesso rápido:</span>
              <button
                type="button"
                onClick={() => handleQuickFill("admin")}
                className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-[rgba(212,175,55,0.15)] text-[var(--gold-light)] border border-[rgba(212,175,55,0.3)] hover:bg-[rgba(212,175,55,0.25)] transition-colors"
              >
                Gestor (Rafael)
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("coach")}
                className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-[#1a212e] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-white transition-colors"
              >
                Prof. Thiago
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("student")}
                className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-[#1a212e] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-white transition-colors"
              >
                Aluno (Lucas)
              </button>
            </div>
          </div>

          <form
            data-slot="login-form"
            noValidate
            style={stagger(3)}
            className={cn(ENTER, "p-8")}
            onSubmit={onSubmit}
          >
            <FieldGroup className="gap-5">
              {errors.form && (
                <div
                  key={attempt}
                  role="alert"
                  data-slot="login-error"
                  className={cn(
                    SWAP,
                    "flex items-center gap-2 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-400",
                  )}
                >
                  <CircleAlert aria-hidden className="size-4 shrink-0" />
                  {errors.form}
                </div>
              )}

              <Field
                className="gap-1.5"
                data-invalid={Boolean(errors.email) || undefined}
              >
                <FieldLabel
                  htmlFor="login01-email"
                  className="text-xs uppercase text-zinc-400 font-bold"
                >
                  E-mail ou Matrícula
                </FieldLabel>
                <Input
                  id="login01-email"
                  type="email"
                  placeholder="coach@conceptct.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="bg-[#080b0f] border-[#222c3c] text-white focus-visible:ring-[#d4af37]"
                  aria-invalid={Boolean(errors.email) || undefined}
                  aria-describedby={
                    errors.email ? "login01-email-error" : undefined
                  }
                />
                <FieldError id="login01-email-error" className="text-xs text-rose-400">
                  {errors.email}
                </FieldError>
              </Field>

              <Field
                className="gap-1.5"
                data-invalid={Boolean(errors.password) || undefined}
              >
                <div className="flex items-center justify-between">
                  <FieldLabel
                    htmlFor="login01-password"
                    className="text-xs uppercase text-zinc-400 font-bold"
                  >
                    Senha
                  </FieldLabel>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-xs uppercase text-[var(--gold-light)] hover:underline"
                  >
                    Esqueceu?
                  </a>
                </div>
                <PasswordField
                  id="login01-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="bg-[#080b0f] border-[#222c3c] text-white focus-within:border-[#d4af37]"
                  aria-invalid={Boolean(errors.password) || undefined}
                  aria-describedby={
                    errors.password ? "login01-password-error" : undefined
                  }
                />
                <FieldError id="login01-password-error" className="text-xs text-rose-400">
                  {errors.password}
                </FieldError>
              </Field>

              <Field orientation="horizontal" className="gap-2 items-center">
                <Checkbox
                  id="login01-remember"
                  checked={remember}
                  onCheckedChange={(v) => setRemember(v === true)}
                  className="border-[var(--gold-primary)] data-[state=checked]:bg-[var(--gold-primary)] data-[state=checked]:text-black"
                />
                <FieldLabel
                  htmlFor="login01-remember"
                  className="cursor-pointer text-xs font-medium text-zinc-400"
                >
                  Manter conectado neste dispositivo
                </FieldLabel>
              </Field>

              <button
                type="submit"
                disabled={pending}
                className="btn btn-primary w-full py-3 text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl transition-all"
                id="btn-submit-concept-login"
              >
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Autenticando…</span>
                  </>
                ) : (
                  <>
                    <span>Entrar no Sistema</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>

              <FieldSeparator className="[&_[data-slot=field-separator-content]]:bg-[#0f141c] text-zinc-500">
                ou continue com
              </FieldSeparator>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onLoginSuccess && onLoginSuccess()}
                  className="btn btn-secondary text-xs font-bold py-2.5 flex items-center justify-center gap-2 rounded-xl"
                >
                  <GoogleIcon className="size-4" />
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => onLoginSuccess && onLoginSuccess()}
                  className="btn btn-secondary text-xs font-bold py-2.5 flex items-center justify-center gap-2 rounded-xl"
                >
                  <GithubIcon className="size-4" />
                  Apple ID
                </button>
              </div>
            </FieldGroup>
          </form>

          <div
            data-slot="login-footer"
            className="border-t border-[var(--border-subtle)] px-8 py-4 text-center bg-[#0a0d13]"
          >
            <p className="text-xs text-zinc-400">
              Ainda não é aluno da CONCEPT?{" "}
              <a
                href="https://instagram.com/concept_ct_"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[var(--gold-light)] hover:underline"
              >
                Conheça nossos planos
              </a>
            </p>
          </div>
        </div>

        <p
          style={stagger(5)}
          className={cn(
            ENTER,
            "mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs uppercase text-zinc-500",
          )}
        >
          <span>CONCEPT CT Gestão v2.4</span>
          <span aria-hidden className="text-zinc-700">
            •
          </span>
          <span>Ambiente Seguro SSL</span>
        </p>
      </div>
    </section>
  );
};

export default Login01;
