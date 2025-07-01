import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AppwriteAuth {
  Client = new Client();
  account;
  constructor() {
    this.Client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjetId);
    this.account = new Account(this.Client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async getCurrentAccount() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AppwriteAuth();

export default authService;
