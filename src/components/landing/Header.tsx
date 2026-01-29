export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#333333]/50">
      <div className="max-w-6xl mx-auto flex items-center">
        <a href="/" className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
          Parrit<span className="text-[#9ACD32]">.ai</span>
        </a>
      </div>
    </header>
  );
};
