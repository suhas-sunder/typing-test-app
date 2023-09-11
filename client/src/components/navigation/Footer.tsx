import NavLinks from "./NavLinks";

function Footer() {
  return (
    <footer className="flex w-full justify-evenly p-5 bg-slate-700 text-white">
      <NavLinks addClass={"footer-links"} />
    </footer>
  );
}

export default Footer;
