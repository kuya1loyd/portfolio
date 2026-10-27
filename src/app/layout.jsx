import './globals.css'

export const metadata = {
  title: 'John Lloyd Galito | Full-Stack Developer (Front-End & Back-End)',
  description: 'Full-Stack Developer crafting high-performance, responsive web applications engineered with modern Next.js, React 19, and scalable backend database architectures.',
  icons: {
    icon: '/profile.svg',
  },
}

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light overflow-x-hidden">
      <body className="bg-white text-slate-900 font-sans antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-white">
        {children}
      </body>
    </html>
  )
}
