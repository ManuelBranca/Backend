
class fileRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createFile = (file) => {
        return this.dao.createFile(file);
    }

    getFile = (id) => {
        return this.dao.getFile(id);
    }
}

export default fileRepository;