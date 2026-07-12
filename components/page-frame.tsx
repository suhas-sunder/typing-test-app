import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
