import Link from "next/link"
import { tv } from "tailwind-variants"

const styles = tv({
  slots: {
    base: 'min-h-screen flex flex-col items-center justify-center gap-10',
    title: 'text-2xl font-bold',
  }
})

export default function Home() {
  const {base, title} = styles()
  return (
    <main className={base()}>
      <h1 className={title()}>ToDay app</h1>
    </main>
  )
}