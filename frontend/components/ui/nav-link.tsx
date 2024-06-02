import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export function NavLink({ label, href, icon }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`flex px-2 py-2 rounded items-center text-sm font-medium space-x-2 transition-colors hover:bg-surface ${
        pathname === href && "bg-surface border-base-border"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
