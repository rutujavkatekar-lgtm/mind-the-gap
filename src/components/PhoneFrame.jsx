export function PhoneFrame({ children }) {
  return (
    <div className="min-h-dvh w-full bg-night flex items-center justify-center sm:py-6">
      <div
        className="relative w-full sm:max-w-[402px] sm:h-[860px] h-dvh sm:rounded-[2.5rem] overflow-hidden bg-paper sm:shadow-2xl sm:ring-8 sm:ring-black/80 flex flex-col"
      >
        {children}
      </div>
    </div>
  );
}
