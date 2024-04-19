import React from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  Select,
  message,
} from "antd";
import moment from "moment";
import { AddBook } from "../../apicalls/books";
import { UpdateBook } from "../../apicalls/books";

function toArr(str) {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup = ({ prefix, children }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(
    () => [...prefixPath, ...toArr(prefix)],
    [prefixPath, prefix]
  );
  return (
    <MyFormItemContext.Provider value={concatPath}>
      {children}
    </MyFormItemContext.Provider>
  );
};

const { Option } = Select;
const MyFormItemContext = React.createContext([]);
const MyFormItem = ({ name, ...props }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName =
    name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
  return <Form.Item name={concatName} {...props} />;
};

// Functional component for BookForm
export const BookForm = ({
  open,
  setOpen,
  reloadData,

  formType,
  selectedBook,
 
}) => {
  // Handler for closing the modal
  const handleCancel = () => {
    setOpen(false);
  };

  // Handler for form submission
  const onFinish = async (values) => {
    try {
      console.log("Form Values:", values);

      let response = null;
      if (formType === "add") {
        response = await AddBook(values);
      } else {
        values._id = selectedBook._id;
        response = await UpdateBook(values);
      }

      if (response.success) {
        message.success(response.message);
        reloadData();
        setOpen(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  console.log("Selected Book:", selectedBook);

  return (
    <Modal
      title={formType === "add" ? "Add Book" : "Update Book"}
      visible={open}
      onCancel={handleCancel}
      centered
      width={800}
      footer={null}
    >
      <Form
        name="form_item_path"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          title: selectedBook?.title || "",
          description: selectedBook?.description || "",
          image: selectedBook?.image || "",
          author: selectedBook?.author || "",
          category: selectedBook?.category || "",
          publisher: selectedBook?.publisher || "",
          publishedYear: selectedBook?.publishedYear
            ? moment(selectedBook.publishedYear)
            : null,
        }}
      >
        <MyFormItem
          name="title"
          label="Book Title"
          rules={[{ required: true, message: "Please input book title" }]}
        >
          <Input />
        </MyFormItem>
        <MyFormItem
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input book description" }]}
        >
          <Input.TextArea type="text" />
        </MyFormItem>

        <MyFormItem
          name="image"
          label="Image URL"
          rules={[{ required: true, message: "Please input image url" }]}
        >
          <Input />
        </MyFormItem>

        <Row gutter={16}>
          <Col span={12}>
            <MyFormItem
              name="author"
              label="Author"
              rules={[{ required: true, message: "Please input author name" }]}
            >
              <Input />
            </MyFormItem>
          </Col>
          <Col span={12}>
            <MyFormItem
              name="category"
              label="Book Category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select placeholder="Select category">
                <Option value="fiction">Fiction</Option>
                <Option value="non-fiction">Non-fiction</Option>
                <Option value="fantasy">Fantasy</Option>
                <Option value="novel">Novel</Option>
                <Option value="children’s Books">Children’s Books</Option>
                <Option value="biography">Biography</Option>
                <Option value="poetry books">Poetry Books</Option>
              </Select>
            </MyFormItem>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <MyFormItem
              name="publisher"
              label="Publisher"
              rules={[{ required: true, message: "Please input publisher" }]}
            >
              <Input />
            </MyFormItem>
          </Col>
          <Col span={12}>
            <MyFormItem
              name="publishedYear"
              label="Published Year"
              rules={[
                { required: true, message: "Please input published year" },
              ]}
            >
              <DatePicker
                picker="year"
                format="YYYY"
                style={{ width: "100%" }}
                valueRender={(current) => {
                  return current ? current.format("YYYY") : "";
                }}
              />
            </MyFormItem>
          </Col>
        </Row>

        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button style={{ marginLeft: "8px" }} onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
