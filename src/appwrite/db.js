import conf from "../conf/conf";
import { Client, Databases, Query } from "appwrite";

export class dbService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, content, slug, fetuerImg, status, userId }) {
    try {
      return await this.databases.createDocument(
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
      console.log("Error :: createpost", error);
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
      console.log("Error :: updatepost", error);
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
      console.log("Error :: deletepost", error);
      throw error;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Error :: getposts", error);
      throw error;
    }
  }
  async getPostList() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        [Query.equal("status", "active")]
      );
    } catch (error) {
      console.log("Error :: getpostlist", error);
      throw error;
    }
  }
}

const dbservice = new dbService();

export default dbservice;
