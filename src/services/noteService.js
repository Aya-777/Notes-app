import databaseService from "./databaseService";
import { ID } from "appwrite";

// Appwrite database and collection IDs from config
const dbId = "notes-app-db";
const colId = "notes";

const noteService = {
  // Get all notes
  async getNotes() {
    const response = await databaseService.listDocuments(dbId, colId);
    if (response.error) {
      return {error: response.error};
    }
    return response;
  },
  // Add New Note
  async addNote(title, content) {
    if(!title.trim()){
      return {error: "Title cannot be empty"};
    }

    const data = {
      title: title,
      content: content,
      $createdAt: new Date().toISOString()
    };

    const response = await databaseService.createDocument(dbId, colId, data, ID.unique());
    if(response.error){
      return {error: response.error};
    }
    return {data: response};
  }
};

export default noteService;