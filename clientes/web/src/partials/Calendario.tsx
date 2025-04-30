interface props {
  theme: string;
}

export default function Calendario({ theme }: props) {
  return (
    <h1
      className={
        theme === "light"
          ? "text-4xl font-bold title-light"
          : "text-4xl font-bold title-dark"
      }
    >
      Calendario
    </h1>
  );
}
