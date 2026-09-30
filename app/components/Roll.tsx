// Label that rolls to a copy of itself on hover (styled by .roll in globals.css).
export default function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span data-text={children}>{children}</span>
    </span>
  )
}
