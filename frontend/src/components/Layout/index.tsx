import Head from "next/head";
import styled from "@emotion/styled";
import theme from "../../config/theme";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import {SideBarProvider} from "../../contexts/SideBarContext";
import {useSession} from "next-auth/react";


const Root = styled('div')(({theme: Theme}) => ({
    // color: theme.palette.primary.contrastText,
    // backgroundColor: theme.palette.primary.main,
    // padding: theme.spacing(1),
    // borderRadius: theme.shape.borderRadius,

    //backgroundColor: theme.palette.background.
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100vw'
}));

const Wrapper = styled('div')(({theme: Theme}) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
        paddingLeft: 256,
    }
}));

const ContentContainer = styled('div')(({theme: Theme}) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
}));

const Content = styled('div')(({theme: Theme}) => ({
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
}));

interface propLayout {
    children: React.ReactNode
    title: string

}

function Layout(props: propLayout) {
    //const {data:session} = useSession();


    return (
        <>
            <Head>
                <title>{props.title}</title>
            </Head>
            <Root>
                <SideBarProvider>
                    <TopBar></TopBar>
                    <NavBar></NavBar>
                    <Wrapper>
                        <ContentContainer>
                            <Content>
                                {props.children}
                            </Content>
                        </ContentContainer>
                    </Wrapper>
                </SideBarProvider>


            </Root>
        </>
    );
}

export default Layout;