import { apiLibrary } from "./index.service"

export const getBooks = () => {
  return apiLibrary.get('books')
}

export const getBooksBorroweds = () => {
  return apiLibrary.get('books_borrowed')
}

export const deleteBorrowed = (id, id_book) => {
  return apiLibrary.delete(`books_borrowed?id=${id}&id_book=${id_book}`)
}

export const createBook = (newBook) => {
  return apiLibrary.post('books', newBook)
}
