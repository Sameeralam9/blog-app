import conf from "../conf/conf";
import { Client, Storage, ID } from "appwrite";

export class StorageService {
  Client = new Client();
  Storage;

  constructor() {
    this.Client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjetId);

    this.Storage = new Storage(this.Client);
  }
  async createFile(file) {
    try {
      await this.Storage.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      throw error;
      return false;
    }
  }

  async updateFile(file) {
    try {
      await this.Storage.updateFile(conf.appwriteBucketId, file.id, file);
    } catch (error) {
      throw error;
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.Storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }

  getFilePreview(fileId) {
    this.Storage.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const storageService = new StorageService();

export default storageService;
