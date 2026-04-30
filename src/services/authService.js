import {account} from "./appwrite";
import {ID} from "appwrite";

const authService = {
  // Sign Up
  async signUp(email, password) {
    try {
      const response = await account.create(ID.unique(), email, password);
      return response;
    }catch (error) {
      console.error("Error signing up: ", error.message);
      return {error: error.message || 'Registeration failed, Please try again.'};
    };
  },
  // Sign in
  async signIn(email, password) {
    try {
      const response = await account.createEmailPasswordSession(email, password);
      return response;
    }catch (error) {
      console.error("Error signing in: ", error.message);
      return {error: error.message || 'Sign in failed, Please check your credentials.'};
    };
  },
  // Get logged in user
  async getUser(){
    try {
      return await account.get();
    } catch (error) {
      return null;
    }
  },

  // Sign out
  async signOut(){
    try{
      await account.deleteSession('current');
      return {success: true};
    }catch(error){
      console.error("Error signing out: ", error.message);
      return {error: error.message || 'Sign out failed, Please try again.'};
    }

  }
};

export default authService;