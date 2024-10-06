interface NavBarItemProps {
    label: string;
    icon: JSX.Element;
    activeButton: string | null;
    setActiveButton: (buttonName: string) => void;
}

const NavBarItem = ({ label, icon, activeButton, setActiveButton }: NavBarItemProps) => {
    return (
        <button
            onClick={() => setActiveButton(label)}
            className={`flex flex-col gap-3 items-center text-[#FFFFFF] ${
                activeButton === label
                    ? "w-full bg-gradient-to-t px-4 py-2 from-[#00B2FF] via-[#0AA9FA] to-[#4670DA] backdrop-blur-sm shadow-custom" 
                    : "w-full px-4 py-2 hover:text-blue-500"
            }`}
        >
            <div className="text-2xl">
                {icon}
            </div>
            <span className="text-[12px] tracking-widest">{label}</span>
        </button>
    );
};

export default NavBarItem;
