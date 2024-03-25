import conf from "../Conf/conf";
import { Client,Account,ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client()
    databases;
    bucket;
    constructor()
    {
        this.client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.PROJECT_ID);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);

    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.createDocument(conf.BATABASE_ID,conf.COLLECTION_ID,slug,{
                title,
                content,
                featuredImage,
                status,
                userId,

            })
            
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {

            await this.databases.updateDocument(
                conf.BATABASE_ID,
                conf.COLLECTION_ID,
                slug,
                
                )
            
        } catch (error) {
            throw error
        }
    }
}

const service = new Service()

export default service