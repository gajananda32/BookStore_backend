import Books from '../models/book.model';

//get all notes
export const getAllBooks = async () => {
  const data = await Books.find();
  return data;
};

//get a book by id
export const getBook = async (_id) => {
    const data = await Books.findById(_id);
    return data;
  };