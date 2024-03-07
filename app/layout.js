//STYLES
import './globals.css'

//COMPONENTS
import Header from './components/Navigation/Header'

//PROVIDERS
import AuthProvider from './context/AuthProvider'

export const metadata = {
  title: 'Blog App',
  description: 'Blog social media app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="overflow-x-hidden">
          <Header/>
          {children}
        </body>
      </AuthProvider>
    </html>
  )
}
