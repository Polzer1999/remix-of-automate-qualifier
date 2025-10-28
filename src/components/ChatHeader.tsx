import { ParritAvatar } from "./ParritAvatar";

export const ChatHeader = () => {
  return (
    <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm">
      <ParritAvatar size="sm" />
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold text-foreground">Parrit.ai</h2>
        <p className="text-xs text-muted-foreground">L'Évasion de l'Administration</p>
      </div>
    </div>
  );
};
