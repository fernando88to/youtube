import Layout from "../components/Layout";
import * as React from "react";
import {GetServerSideProps} from "next";

export const getServerSideProps: GetServerSideProps = async () => {

    return {
        props: {},
    }
};

export default function Index2Page() {
    return (
    <Layout  title="Segunda Pagina">
        <h1>Segunda Página3</h1>
    </Layout>);
}