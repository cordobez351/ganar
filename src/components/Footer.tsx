export function Footer() {
  return (
    <footer className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-gray-500">
          <a href="/ganar.md" className="transition-colors hover:text-primary">
            ganar.md
          </a>
          <a href="/skill.md" className="transition-colors hover:text-primary">
            skill.md
          </a>
          <a href="/spec.md" className="transition-colors hover:text-primary">
            spec.md
          </a>
          <a href="/llms.txt" className="transition-colors hover:text-primary">
            llms.txt
          </a>
          <a href="/humans.txt" className="transition-colors hover:text-primary">
            humans.txt
          </a>
          <a href="/sitemap.xml" className="transition-colors hover:text-primary">
            sitemap
          </a>
        </nav>
      </div>
    </footer>
  )
}
