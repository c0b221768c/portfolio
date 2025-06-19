import '@/styles/globals.css'

import {Inter} from 'next/font/google'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ["latin"]})

export const metadata = {
  title: "MY PORTFOLIO",
  description: "Portfolio Site"
}

export default function Layout({children}: {children:React.ReactNode}){
  return (
    <html lang='en' className={`${inter.className}`} suppressContentEditableWarning>
      <body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
						{children}
				</ThemeProvider>

			</body>
    </html>
  )
}