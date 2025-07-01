// app/layout.js
import Header from '../components/Header'
import './globals.css'
import dynamic from 'next/dynamic'

// Dynamically import Header with SSR disabled
// const Header = dynamic(() => import('../components/Header'), { ssr: false })

export const metadata = {
  title: 'MediConnect',
  description: 'Your app description',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header /> {/* ✅ This will appear on every page */}
        {children}
      </body>
    </html>
  )
}
