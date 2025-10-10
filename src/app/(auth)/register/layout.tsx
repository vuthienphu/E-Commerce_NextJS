export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="register-body">
        {children}
      </body>
    </html>
  );
}
