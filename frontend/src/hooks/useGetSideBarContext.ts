import {useContext} from "react";
import {SideBarContext} from "../contexts/SideBarContext";

/**
 * esse hook é somente um atalho, assim não vamos precisar importar useCOntext e SideBarContext aonde ela for utilziada
 */
export const useGetSideBarContext = () => useContext(SideBarContext);


