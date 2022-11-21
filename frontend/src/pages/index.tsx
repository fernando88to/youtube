import * as React from 'react';
import Layout from "../components/Layout";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import Box from "@mui/material/Box";
import {VideoCard} from "../components/VideoCard";
import {VideoType} from "../types/VideoType";
import {Grid} from "@mui/material";
import {mongoClientServices} from "../databases/mongoClientServices";
import {getSession} from "next-auth/react";


export const getServerSideProps: GetServerSideProps = async (context:GetServerSidePropsContext) => {


    const session = await getSession({req:context.req});
    console.log(session);

    const data: VideoType[] = await mongoClientServices.getAllVideos();
    return {
        props: {
            data: JSON.parse(JSON.stringify(data))
        },
    }
};

interface PropsHome {
    data: VideoType[]
}

export default function Home(props: PropsHome) {


    return (
        <Layout title="Primeira Pagina">
            <Box p={2}>
                <Grid container spacing={4}>
                    {props.data.map((item) => {
                        return (
                            <Grid key={item.title} item xl={3} lg={3} md={4} sm={6} xs={12}>
                                <VideoCard item={item} />
                            </Grid>

                        );
                    })}

                </Grid>
            </Box>


        </Layout>
    );
}