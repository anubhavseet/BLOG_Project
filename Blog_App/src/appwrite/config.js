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
            return await this.databases.createDocument(
                conf.BATABASE_ID,
                conf.COLLECTION_ID,
                slug,
                {
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
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
                
                )
            
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.BATABASE_ID,
                conf.COLLECTION_ID,
                slug
               
            )
            return true
        } catch (error) {

            throw error

           
            
        }
    }

    async getPost(slug){
        try {
            return await this.getDocument(
                conf.BATABASE_ID,
                conf.COLLECTION_ID,
                slug
                )
        } catch (error) {
            throw error
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try {

            return await this.databases.listDocuments(
                conf.BATABASE_ID,
                conf.COLLECTION_ID,
                queries,
                

            )
            
        } catch (error) {
            throw error
        }
    }


    //File Upload Service

    async uploadFile(file){
        try {
          return await  this.bucket.createFile(
            conf.BUCKET_ID,
            ID.unique(),
            file
            
          )
        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                conf.BUCKET_ID,
                fileID
            )
        } catch (error) {
            throw error
        }
    }

    getFilePreview(fileID){

        return this.bucket.getFilePreview(
            conf.BUCKET_ID,
            fileID
        )

    }

}

const service = new Service()

export default service