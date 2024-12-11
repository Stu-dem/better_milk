interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="text-center w-full">
      <h1 className="w-full flex flex-col gap-y-4 items-center justify-center">
        🔐Auth
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
