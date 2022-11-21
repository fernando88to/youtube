import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import {Button, Divider, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import Box from "@mui/material/Box";
import theme from "../../config/theme";
import {useRouter} from "next/router";
import {styled} from "@mui/system";
import Typography from "@mui/material/Typography";
import {AccountCircle} from "@mui/icons-material";
import Link from "next/link";
import React, {useContext} from "react";
import {SideBarContext} from "../../contexts/SideBarContext";


const ListItemTextCustomizer = styled(ListItemText)({
    fontSize: 24
}) as typeof ListItemText;

const StyledDiv = styled('div')({
    width: 240,
    paddingTop: 62,
    borderRight: 'none'

});

const ListItemCustomizer = styled(ListItem)({
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: theme.spacing(3),
}) as unknown as typeof ListItem;

/*
mobileDrawer{
width:240
}

desktopDrawer {
width: 240,
top:56,
height: 'calc(100%-64px)',
borderRight:'none'
}

avatar {
cursor:'pointer'
width:24,
height:24,
}

listItem{
    paddingTop:6
    paddingBottom:6
    paddingLeft: theme.spacing(3)
}
listItemText {
fontSize:14
}

 */

interface Menu {
    id: number,
    label: string,
    path?: string,
    icon: any
}

const primaryMenu: Menu[] = [
    {id: 1, label: 'Início', path: '/', icon: HomeIcon},
    {id: 2, label: 'Em Alta', path: '/tredding', icon: WhatshotIcon},
    {id: 3, label: 'Inscrições', path: '/subscriptions', icon: SubscriptionsIcon},

];

const secondaryMenu: Menu[] = [
    {id: 1, label: 'Biblioteca', icon: VideoLibraryIcon},
    {id: 2, label: 'Histórico', icon: HistoryIcon},
]


function NavBar() {
    const { sideBarToggle, toggleSideBar } = useContext(SideBarContext);
    const closeSidebar = () => toggleSideBar();
    const router = useRouter();

    const isSelected = (item: Menu) => {
        return router.pathname === item.path;
    }

    const handleClickItem = (path?: string) => {
        if(!path){
            router.push('/');
            return
        }
        router.push(path);
    }


    const content = (
        <Box height="100%" display="flex" flexDirection="column">
            <List style={{paddingTop: 0}}>
                {primaryMenu.map(item => {
                    const Icon = item.icon;
                    return (
                        <ListItemCustomizer
                            key={item.id}
                            button
                            selected={isSelected(item)}
                            onClick={()=> {
                                handleClickItem(item.path);
                            }}>
                            <ListItemIcon>
                                <Icon style={{color: isSelected(item) && '#f44336'}}></Icon>
                            </ListItemIcon>
                            <ListItemTextCustomizer
                                primary={item.label}>
                            </ListItemTextCustomizer>


                        </ListItemCustomizer>

                    )
                })}
            </List>
            <Divider/>
            <List>
                {secondaryMenu.map(item => {
                    const Icon = item.icon;
                    return (
                        <ListItemCustomizer
                            key={item.id}
                            button
                            selected={isSelected(item)}>
                            <ListItemIcon>
                                <Icon style={{color: isSelected(item) && '#f44336'}}></Icon>
                            </ListItemIcon>
                            <ListItemTextCustomizer
                                primary={item.label}>
                            </ListItemTextCustomizer>

                        </ListItemCustomizer>

                    )
                })}
            </List>
            <Divider/>
            <Box mx={4} my={2}>
                <Typography variant="body2">
                    Faça o login para cutir vídeos, comentar e se inscrever.
                </Typography>
                <Box mt={2}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<AccountCircle/>}>
                        Faça Login
                    </Button>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Hidden mdDown>
            <Drawer
                anchor="left"
                open={sideBarToggle}
                onClose={closeSidebar}
                variant="persistent">
                <StyledDiv>
                    {content}
                </StyledDiv>

            </Drawer>
        </Hidden>
    );
}

export default NavBar;