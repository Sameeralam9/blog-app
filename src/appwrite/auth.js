import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AppwriteAuth {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
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
      console.log("Authentication error :: createaccount", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Authentication error :: login ::", error);
      throw error;
    }
  }
  async getCurrentAccount() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Authentication error :: getcurrentaccount", error);
      throw error;
    }
  }
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Authentication error :: logout", error);
      throw error;
    }
  }
}

const authService = new AppwriteAuth();

export default authService;
