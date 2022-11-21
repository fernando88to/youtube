import {GetServerSideProps} from "next";
import Layout from "../../components/Layout";
import * as React from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
    await new Promise(resolve => setTimeout(resolve, 4000));
    const { id } = context.query;
    console.log(`id = ${id}`);
    return {
        props: {},
    }
};

export default function Page() {
    return (
        <Layout  title="Segunda Pagina">
            <h1>Pagina de video</h1>
        </Layout>);
}