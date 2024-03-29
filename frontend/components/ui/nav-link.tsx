import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function NavLink({ label, href, icon }: NavLinkProps) {
  const pathname = usePathname();

  return (
      <Link
        href={href}
        className={`flex px-3 py-1 rounded items-center text-sm space-x-2 transition-colors hover:bg-surface hover:shadow-sm ${
          pathname === href && "bg-surface border-base-border shadow-sm"
        }`}
      >
        { icon }
        <span>{label}</span>
      </Link>
  )
}
