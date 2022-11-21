import {VideoType} from "../types/VideoType";
import connectToDatabase from "../utils/mongodb";
import moment from "moment/moment";


export const mongoClientServices = {

    getAllVideos: async (): Promise<VideoType[]> => {
        const {db} = await connectToDatabase();
        const videos = await db.collection<VideoType>('video');
        const videosList = await videos.find({}).toArray();
        return videosList;
    },
    insert: async (documento: any): Promise<VideoType> => {
        //const updateAtDate = moment(updateAt, "DD/MM/YYYY").toDate();
        const {db} = await connectToDatabase();
        const collection = db.collection('video');
        await collection.insertOne(documento);
        return documento
    }

}



