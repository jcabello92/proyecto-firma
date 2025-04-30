interface props {
  theme: string;
}

export default function Contactos({ theme }: props) {
  return (
    <h1
      className={
        theme === "light"
          ? "text-4xl font-bold title-light"
          : "text-4xl font-bold title-dark"
      }
    >
      Contactos
    </h1>
  );
}
