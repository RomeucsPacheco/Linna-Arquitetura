export default function Footer() {
  return (
    <footer className="bg-black-arch py-8 border-t border-cinza-claro text-center px-4">
      <p className="text-off-white/60 text-sm">
        &copy; {new Date().getFullYear()} Linna Arquitetura. Todos os direitos reservados.
      </p>
    </footer>
  );
}