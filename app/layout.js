import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Poppins } from 'next/font/google';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import ToastProvider from '@/providers/ToastProvider';
import { AuthProvider } from '@/contexts/AuthContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <body className="flex min-h-screen flex-col">
        <ReactQueryProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
            <ToastProvider />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
