import { SiteNav } from "@/components/site-nav";

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main>{children}</main>
    </>
  );
}
