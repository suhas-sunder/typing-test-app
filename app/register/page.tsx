import { PageFrame } from "@/components/page-frame";
import { RegisterForm } from "@/components/auth/auth-form";

export default function RegisterPage() {
  return (
    <PageFrame>
      <section className="section-pad">
        <div className="page-shell">
          <RegisterForm />
        </div>
      </section>
    </PageFrame>
  );
}
