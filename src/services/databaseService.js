import { database } from "./appwrite";
import { ID } from "appwrite";

const databaseService = {
  // List documents
  async listDocuments(dbId, colId) {
    try {
      const response = await database.listDocuments(dbId, colId);
      return response.documents || [];
    } catch (error) {
      console.error("Error listing documents:(db) ", error.message);
      return {error: error.message};
    }
  },
  // Create documnets
  async createDocument(dbId, colId, data, id = null){
    try {
      return await database.createDocument(
        dbId,
        colId,
        id || ID.unique(), 
        data);
    } catch (error) {
      console.error('Error creating document', error.message);
      return {error: error.message};
    }
  }
};

export default databaseService;