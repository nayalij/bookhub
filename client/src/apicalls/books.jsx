import axios from "axios";

//add book
export const AddBook = async (payload) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/books/addBook",
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
//retrieve all books
export const GetAllBooks = async (payload) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/books/getAllBooks",
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
//retrieve a book
export const GetBook = async (bookId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/books/getBookById/${bookId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
//update book
export const UpdateBook = async (payload) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/books//updateBook/${payload._id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
//delete a book
export const DeleteBook = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/books//deleteBook/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
