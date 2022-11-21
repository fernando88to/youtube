import {ObjectId} from  'mongodb'

export interface VideoType {
    authorName: string
    authorAvatar: string
    title: string
    thumb: string
    views: number
    updateAt: Date
    _id: ObjectId;


}