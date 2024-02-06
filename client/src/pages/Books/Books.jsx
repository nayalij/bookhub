import React, { useEffect, useState } from "react";
import { Button, Flex, message, Table } from "antd";
import "remixicon/fonts/remixicon.css";
import "./Books.css";
import { BookForm } from "./BookForm";
import { GetAllBooks } from "../../apicalls/books";
import { DeleteBook } from "../../apicalls/books";

export const Books = () => {
  const [openBookForm, setOpenBookForm] = React.useState(false);
  const [books, setBooks] = React.useState([]);
  const [formType, setFormType] = useState("add");
  const [selectedBook, setSelectedBook] = useState(null);
  
 // Function to fetch books from the server
  const getBooks = async () => {
    try {
      const response = await GetAllBooks();
      if (response.success) {
        setBooks(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);
 // Function to delete a book
  const deleteBook = async (id) => {
    try {
      const response = await DeleteBook(id);
      if (response.success) {
        message.success(response.message);
        getBooks();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
   // Table columns configuration
  const columns = [
    {
      title: "Book",
      dataIndex: "image",
      render: (image) => {
        console.log("Image URL:", image);
        return <img src={image} alt="book" width="60" height="80" />;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
    },
    {
      title: "Published Year",
      dataIndex: "publishedYear",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <i
            className="ri-edit-fill"
            onClick={() => {
              setFormType("edit");
              setSelectedBook(record);
              setOpenBookForm(true);
            }}
          ></i>
          <i
            className="ri-delete-bin-5-line"
            onClick={() => deleteBook(record._id)}
          ></i>
        </div>
      ),
    },
  ];
// Component rendering
  return (
    <div>
       {/* Add Book button */}
      <div className="add-newBook">
      <div className="add-btn-container">
          <Button
            className="add-btn"
            type="primary"
            onClick={() => setOpenBookForm(true)}
          >
            Add Book
          </Button>
          </div>
        <Table columns={columns} dataSource={books} />
      </div>
 {/* BookForm component for adding/editing books */}
      {openBookForm && (
        <BookForm
          open={openBookForm}
          setOpen={setOpenBookForm}
          reloadData={getBooks}
          formType={formType}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      )}
    </div>
  );
};
