import fileModel from "../models/fileModel.js";

class fileClassDao {
    async createFile(file) {
        return await fileModel.create(file);
    }

    async getFile(id){
        return await fileModel.findOne({_id:id})
    }
}

export const fileDao = new fileClassDao();