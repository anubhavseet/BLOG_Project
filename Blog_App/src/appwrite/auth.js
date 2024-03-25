import conf from "../Conf/conf";
import {Client, Account, ID} from "appwrite";

class Authservice{

    client = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.PROJECT_ID);
         this.account=  new Account(this.client) 
    }

    async createAccount({email,password,name}) {
        try {
         const userAccount =  await this.account.create(ID.unique(),email,password,name)
         if (userAccount) {
            
            return this.login({email,password})
            
         } else {
            return userAccount;
         }
        } catch (error) {
            throw error
        }
    }


    async login({email,password}){
        try {
           return  await this.account.createEmailPasswordSession(email,password)
            
        } catch (error) {
            throw error
        }
    }

    
    async getCurrentUser(){
        try {
            await this.account.get();
        } catch (error) {
            throw error
        }

        return null;

    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }
} 


const authservice = new Authservice()


export default authservice