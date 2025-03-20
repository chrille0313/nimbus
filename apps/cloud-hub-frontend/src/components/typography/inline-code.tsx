export type TypographyInlineCodeProps = React.ComponentProps<'code'>;

export function TypographyInlineCode({ children, ...props }: TypographyInlineCodeProps) {
  return (
    <code
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
      {...props}
    >
      {children}
    </code>
  );
}
