import Link from "next/link"
import { tv } from "tailwind-variants"

const styles = tv({
  slots: {
    base: 'min-h-screen flex flex-col items-center justify-center gap-10',
    title: 'text-2xl font-bold',
    link: 'hover:text-blue-400'
  }
})

export default function Home() {
  const {base, title, link} = styles()
  return (
    <main className={base()}>
      <h1 className={title()}>C0B221768c's PORTFOLIO page</h1>
      <Link href='/ToDay' className={link()}>Go to ToDay app</Link>
    </main>
  )
}