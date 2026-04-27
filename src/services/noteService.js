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
      console.log("Error listing notes:(notes) ", error.message);
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

    const response = await databaseService.createDocument(
      dbId, colId, data, ID.unique());
    if(response?.error){
      return {error: response.error};
    }
    return {data: response};
  },
  // Deleting a note
  async deleteNote(id){
    const response = await databaseService.deleteDocument(dbId,colId,id);
    if(response?.error){
      return {error: response.error};
    }
    return {success: true};
  }
};

export default noteService;