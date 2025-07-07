// app/layout.js
import "./globals.css";
import ClientHeader from "../components/ClientHeader";
import Providers from "../utils/Providers"; 

export const metadata = {
  title: "MediConnect",
  description: "Your app description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientHeader baseUrl="http://localhost:7000/api" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
