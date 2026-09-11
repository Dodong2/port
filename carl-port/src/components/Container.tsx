import type { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative w-full max-w-[1280px] h-screen px-4 sm:px-6 lg:px-10 mx-auto font-mono border-1 border-red-300 rounded-sm flex flex-col overflow-hidden">
      {children}
    </div>
  );
}
export default Container