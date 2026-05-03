import { PageFrame } from "@/components/page-frame";
import { LoginForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  return (
    <PageFrame>
      <section className="section-pad">
        <div className="page-shell">
          <LoginForm />
        </div>
      </section>
    </PageFrame>
  );
}
