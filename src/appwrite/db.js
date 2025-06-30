import conf from "../conf/conf";
import { Client, Databases, Query } from "appwrite";

export class dbService {
  client = new Client();
  databases;

  constructor() {
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjetId);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, content, slug, fetuerImg, status, userId }) {
    try {
      await this.databases.createDocument(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          fetuerImg,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, fetuerImg, status }) {
    try {
      await this.databases.updateDocument(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          fetuerImg,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }
  async getPosts(slug) {
    try {
      return  await this.databases.getDocument(
            conf.appwriteDbId,
            conf.appwriteCollectionId,
            slug,
        )
    } catch (error) {
        throw error;
        return false
    }
  }
  async getPostList(){
    try {
        return await this.databases.listDocuments(
            conf.appwriteDbId,
            conf.appwriteCollectionId,
            [
                Query.equal('status', 'active')
            ]
        )
    } catch (error) {
        throw error;
        return false;
    }
  }
}

const dbservice = new dbService();

export default dbservice;
