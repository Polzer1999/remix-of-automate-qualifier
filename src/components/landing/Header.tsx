import { ParritGlyph } from "@/components/ParritGlyph";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#333333]/50">
      <div className="max-w-6xl mx-auto flex items-center">
        <a href="/" className="flex items-center">
          <ParritGlyph />
        </a>
      </div>
    </header>
  );
};
