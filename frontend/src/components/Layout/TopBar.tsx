import Image from "next/image";
import {AppBar, Avatar, Button, Hidden, IconButton, InputBase, Paper, styled, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import theme from "../../config/theme";
import {AccountCircle, Apps, MoreVert, VideoCall} from "@mui/icons-material";
import {signIn, signOut, useSession} from "next-auth/react"
import {useGetSideBarContext} from "../../hooks/useGetSideBarContext";

const AppBarCustomize = styled(AppBar)({
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.default

}) as typeof AppBar;

const ImageCustomize = styled(Image)({
    cursor: "pointer",
    height: 18,
    marginLeft: theme.spacing(3)

}) as typeof Image;


const ToolbarCustomize = styled(Toolbar)({
    minHeight: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
}) as typeof Toolbar;

const PaperCustomize = styled(Paper)({
    padding: '2px 4px',
    display: "flex",
    alignItems: "center",
    height: 35,
    width: 700
}) as typeof Paper;

const IconButtonCustomize = styled(IconButton)({

}) as typeof IconButton;

const InputBaseCustomize = styled(InputBase)({
    flex: 1
}) as typeof InputBase;

function TopBar() {
    const { data: session } = useSession();
    const { toggleSideBar } =  useGetSideBarContext();
    const closeSidebar = () => toggleSideBar();

    return (
        <AppBarCustomize color="default">
            <ToolbarCustomize>
                <Box display="flex" alignItems="center">
                    <MenuIcon onClick={closeSidebar}/>
                    <ImageCustomize src="/new-youtube-logo.svg" alt="logo" width="95" height="18"/>
                </Box>
                {/*vai ficar invisivel quando o dispositivo for menor que md*/}
                <Hidden mdDown>
                    <Box>
                        <PaperCustomize component="form">
                            <InputBaseCustomize
                                placeholder="Pesquisar"
                                inputProps={{"aria-label": "search google maps"}}
                            />
                            <IconButton type="submit"
                                        aria-label="search">
                                <SearchIcon/>
                            </IconButton>
                        </PaperCustomize>
                    </Box>
                </Hidden>

                <Box display="flex">
                    <IconButtonCustomize >
                        <VideoCall/>
                    </IconButtonCustomize>
                    <IconButtonCustomize >
                        <Apps/>
                    </IconButtonCustomize>
                    <IconButtonCustomize >
                        <MoreVert />
                    </IconButtonCustomize>
                    {!session ? (
                        <Button
                            onClick={()=>{signIn('google')}}
                            color="secondary"
                            component="a"
                            variant="outlined"
                            startIcon={<AccountCircle />}>
                            Fazer Login
                        </Button>
                    ): (
                        <Box display="flex">
                            <Avatar

                                onClick={()=>{signOut()}}
                                alt="Usuario"
                                src={session?.user?.image || ""}>
                            </Avatar>
                        </Box>
                    ) }

                </Box>

            </ToolbarCustomize>
        </AppBarCustomize>
    );
}

export default TopBar;