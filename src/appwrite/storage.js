import conf from "../conf/conf";
import { Client, Storage, ID, Permission, Role } from "appwrite";

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
        file,
        [Permission.read(Role.any())]
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
      return await this.storage.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Error :: deletefile", error);
      throw error;
    }
  }

  getFileView(fileId) {
    return this.storage.getFileView(conf.appwriteBucketId, fileId);
  }
}

const storageService = new StorageService();

export default storageService;
