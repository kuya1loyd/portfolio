import './globals.css'

export const metadata = {
  title: 'John Lloyd Galito | Full-Stack Developer (Front-End & Back-End)',
  description: 'Full-Stack Developer crafting high-performance, responsive web applications engineered with modern Next.js, React 19, and scalable backend database architectures.',
  icons: {
    icon: '/profile.svg',
  },
}

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="bg-black text-white font-sans antialiased overflow-x-hidden selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  )
}
