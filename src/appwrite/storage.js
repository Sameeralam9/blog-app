import conf from "../conf/conf";
import { Client, Storage, ID } from "appwrite";

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.storage = new Storage(this.client);
  }
  async createFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Error :: createfile", error);
      throw error;
    }
  }

  async updateFile(file) {
    try {
      return await this.storage.updateFile(
        conf.appwriteBucketId,
        file.id,
        file
      );
    } catch (error) {
      console.log("Error :: updatefile", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Error :: deletefile", error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const storageService = new StorageService();

export default storageService;
