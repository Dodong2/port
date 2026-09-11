import type { IconType } from "react-icons";

interface IconCircleProps {
  icon: IconType;
  sizeClass?: string;
  iconSizeClass?: string;
  bgColor?: string;
  iconColor?: string;
  activeBgColor?: string;
  activeIconColor?: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

const IconCircle = ({
  icon: Icon,
  sizeClass = "w-11 h-11",
  iconSizeClass = "text-xl",
  bgColor = "bg-gray-700",
  iconColor = "text-white",
  activeBgColor = "bg-[#1f1f1f] border-2 border-green-500",
  activeIconColor = "text-green-500",
  active = false,
  className = "",
  onClick,
}: IconCircleProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center rounded-full shrink-0 transition-colors duration-500 ease-in-out ${sizeClass} ${
        active ? activeBgColor : bgColor
      } ${onClick ? "cursor-pointer hover:brightness-110" : ""} ${className}`}
    >
      <Icon className={`${iconSizeClass} transition-colors duration-500 ease-in-out ${active ? activeIconColor : iconColor}`} />
    </div>
  );
};

export default IconCircle;