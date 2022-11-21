// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import connectToDatabase from '../../utils/mongodb';
import moment from 'moment';
import {VideoType} from "../../types/VideoType";
import {mongoClientServices} from "../../databases/mongoClientServices";

/*
type Data = {
    name: string
}
*/

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {

    //const {query: {id, name}, method,} = req;
    const {method} = req;

    const {thumb, title, authorAvatar, updateAt, views, authorName} = req.body;
    const {db} = await connectToDatabase();
    switch (method) {
        case 'GET':
            const videosList = await mongoClientServices.getAllVideos()
            res.status(200).json(videosList);
            break
        case 'PUT':
            try {
                const updateAtDate = moment(updateAt, "DD/MM/YYYY").toDate();
                let documento:any = {
                    authorName,
                    thumb,
                    title,
                    authorAvatar,
                    updateAt: updateAtDate,
                    views
                }
                await mongoClientServices.insert(documento);
                res.status(200).json(documento);
                break
            } catch (e) {
                console.log(e);
                res.status(500).json({erro: 'Erro ao salvar'});
                break
            }


        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }


}
