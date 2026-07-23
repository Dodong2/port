export default function TypingDots() {
  return (
    <div className="flex gap-1.5 items-center py-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block w-1.5 h-1.5 bg-[#4ecdc4]"
          style={{ animation: `pixelBlink 1.2s ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  );
}