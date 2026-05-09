import Link from "next/link"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

const linkClass =
  "text-sky-400/90 underline decoration-sky-400/40 underline-offset-2 transition-colors hover:text-sky-300"

const legalMarkdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mb-10 font-serif text-3xl font-normal tracking-[-0.024em] text-white/92 md:text-[2.15rem]">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-4 mt-14 font-sans text-xl font-semibold tracking-[-0.015em] text-white/88 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 font-sans text-lg font-medium tracking-[-0.01em] text-white/85">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-[15px] leading-[1.65] tracking-[-0.011em] text-white/72">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 ml-1 list-disc space-y-2 pl-5 text-[15px] leading-[1.6] text-white/72 marker:text-white/35">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 ml-1 list-decimal space-y-2 pl-5 text-[15px] leading-[1.6] text-white/72 marker:text-white/40">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-white/88">{children}</strong>,
  em: ({ children }) => <em className="italic text-white/78">{children}</em>,
  hr: () => <hr className="my-12 border-0 border-t border-white/[0.09]" />,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-white/15 pl-4 italic text-white/65">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-lg border border-white/[0.08] bg-white/[0.02]">
      <table className="w-full min-w-[32rem] border-collapse text-left text-[13px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-white/[0.08] bg-white/[0.04]">{children}</thead>
  ),
  tbody: ({ children }) => <tbody className="text-white/75">{children}</tbody>,
  tr: ({ children }) => <tr className="border-b border-white/[0.06] last:border-0">{children}</tr>,
  th: ({ children }) => <th className="px-4 py-3 font-semibold text-white/80">{children}</th>,
  td: ({ children }) => <td className="px-4 py-3 align-top">{children}</td>,
  a: ({ href, children }) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={linkClass}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} className={linkClass} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  },
  code: ({ children }) => (
    <code className="rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-[13px] text-sky-200/90">
      {children}
    </code>
  ),
}

export function LegalMarkdownBody({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={legalMarkdownComponents}>
      {markdown}
    </ReactMarkdown>
  )
}
