import '@/styles/globals.css'

import {tv} from 'tailwind-variants'
import {Inter} from 'next/font/google'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ["latin"]})

export const styles = tv({
	slots: {
		font: `${inter.className}`,
		base: 'min-h-screen bg-neutral-100 text-neutral-900 antialiased dark:bg-neutral-900 dark:text-neutral-100'
	}
})

export default function Layout({children}: {children:React.ReactNode}){
	const {font, base} = styles()
  return (
    <html lang='en' className={font()} suppressContentEditableWarning>
      <body className={base()}>
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