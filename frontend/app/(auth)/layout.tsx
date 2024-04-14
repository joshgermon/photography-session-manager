export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background text-base">
      {/* Main content */}
        <div className="px-8 py-6 max-w-screen-xl flex items-center justify-center mx-auto">{children}</div>
    </div>
  );
}
