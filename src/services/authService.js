import {account} from "./appwrite";
import {ID} from "appwrite";

const authService = {
  // Sign Up
  async signUp(email, password) {
    try {
      const response = await account.create(ID.unique(), email, password);
      return response;
    }catch (err) {
      console.error("Error signing up: ", err.message);
      return {error: err.message || 'Registeration failed, Please try again.'};
    };
  },
  // Sign in
  async signIn(email, password) {
    try {
      const response = await account.createEmailPasswordSession(email, password);
      return response;
    }catch (err) {
      console.error("Error signing in: ", err.message);
      return {error: err.message};
    };
  },
  // Get logged in user
  async getUser(){
    try {
      return await account.get();
    } catch (err) {
      return null;
    }
  },

  // Sign out
  async signOut(){
    try{
      await account.deleteSession('current');
      return {success: true};
    }catch(err){
      // console.error("Error signing out: ", err.message);
      return {error: err.message};
    }

  }
};

export default authService;