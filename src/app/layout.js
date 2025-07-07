// app/layout.js
import "./globals.css";
import Providers from "../utils/Providers";
import ClientLayout from "../components/ClientLayout"; // ✅ Import the new wrapper

export const metadata = {
  title: "MediConnect",
  description: "Your app description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
