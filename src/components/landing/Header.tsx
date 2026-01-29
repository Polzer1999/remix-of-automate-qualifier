import parritLogo from "@/assets/parrit-logo.png";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#333333]/50">
      <div className="max-w-6xl mx-auto flex items-center">
        <a href="/" className="flex items-center gap-2">
          <img src={parritLogo} alt="Parrit.ai" className="h-8 w-auto" />
        </a>
      </div>
    </header>
  );
};
