import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference text-white">
      <Link href="#" className="text-2xl font-bold font-sans hoverable tracking-tighter">
        AL
      </Link>

      <div className="hidden md:flex gap-12 font-mono text-sm">
        <Link href="#work" className="hoverable hover:text-acid transition-colors">
          Proyectos
        </Link>
        <Link href="#recorrido" className="hoverable hover:text-acid transition-colors">
          Recorrido
        </Link>
        <Link href="#habilidades" className="hoverable hover:text-acid transition-colors">
          Habilidades
        </Link>
        <Link href="#contact" className="hoverable hover:text-acid transition-colors">
          Contacto
        </Link>
      </div>

      <div className="font-mono text-xs flex flex-col items-end">
        <span className="block">SANTANDER, ES</span>
      </div>
    </nav>
  );
}
