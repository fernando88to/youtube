import {createContext, ReactNode, useState} from "react";

type SideBarContextType = {
    sideBarToggle: any;
    toggleSideBar: () => void;
    closeSideBar: () => void;
}

export const SideBarContext = createContext<SideBarContextType>(
    {} as SideBarContextType
);

type Props = {
    children: ReactNode;
}


export function SideBarProvider({children}: Props) {
    const [sideBarToggle, setSideBarToggle] = useState(true);
    const toggleSideBar = () => {
        setSideBarToggle(!sideBarToggle);
    }

    const closeSideBar = () => {
        setSideBarToggle(false);
    };

    return (
        <SideBarContext.Provider value={{sideBarToggle, toggleSideBar, closeSideBar}}>
            {children}
        </SideBarContext.Provider>
    );

}

