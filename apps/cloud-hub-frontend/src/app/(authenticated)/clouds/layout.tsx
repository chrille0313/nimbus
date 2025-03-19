export type CloudsLayoutProps = Readonly<{
  modal?: React.ReactNode;
  children?: React.ReactNode;
}>;

export default function CloudsLayout({ modal, children }: CloudsLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
