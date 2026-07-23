interface ChatHeaderProps {
    loading: boolean;
}

export default function ChatHeader({ loading }: ChatHeaderProps) {
    return (
        <>
            {/* Title bar */}
            <div className="relative z-[3] flex items-center justify-between border-b-4 border-white px-3 py-2 bg-[#1a1a2e]">
                <span className="text-[#4ecdc4] text-[20px] leading-none">
                    CARL'S ASSISTANT
                </span>
                <div className="bg-[#e9ff6b] text-[#1a1a2e] text-[7px] px-1.5 py-0.5 font-['Press_Start_2P']">
                    {loading ? "THINKING..." : "ONLINE"}
                </div>
            </div>

            {/* Status bar */}
            {/* <div className="relative z-[3] flex justify-between items-center bg-black/40 border-b border-white/20 px-3 py-1 font-['Press_Start_2P']">
                <span className="text-[#92f29c] text-[5px]">SYS:OK &nbsp; v1.0</span>
                <span className="text-white/40 text-[5px]">{clock}</span>
            </div> */}
        </>
    );
}