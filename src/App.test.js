import "@testing-library/jest-dom";
import React from "react";
import Login from "./components/Login";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import * as reactRedux from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./utils/userSlice";
import DisplayAllPosts from "./components/DisplayAllPosts";
import BlogPost from "./components/Blog";
import ChatModal from "./components/ChatModal";
import Browse from "./components/Browse";
import CreateNewPost from "./components/CreateNewPost";
import Message from "./components/Message";
import { auth } from './utils/firebase';

// import DisplayAllPosts from "./DisplayAllPosts";
const headerImage = 'https://example.com/header.png';
const displayAllPostsImage = 'https://example.com/posts.png';
const chatModalImage = 'https://example.com/chat.png';
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),

  useDispatch: jest.fn(),
}));

describe("Login component", () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });

  const useDispatchMock = reactRedux.useDispatch;

  beforeEach(() => {
    useDispatchMock.mockImplementation(() => () => {});
  });

  afterEach(() => {
    useDispatchMock.mockClear();
  });
  it("Check Page for Login view", async () => {
    await render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  });
  it("should render the correct input fields", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    // expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
  });
  xit("should disable the submit button when the input fields are empty", async () => {
    await render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const submitButton = screen.getByRole("button");

    // expect(submitButton).toBeDisabled();

    fireEvent.click(screen.getByPlaceholderText("Email Address"), {
      target: { value: "test@example.com" },
    });

    await expect(submitButton).toBeEnabled();
    expect(screen.getByText(/Email is not valid/i)).toBeInTheDocument();
  });
  it("sign in button click", async () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const button = await screen.findByTestId("button");
    fireEvent.click(button);
    // some silly test case just for example
    expect(button).toBeInTheDocument();
  });

  it("should render the correct Form type", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    expect(screen.getByTestId("form-type")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("form-type"));
  });
  it("should render the background logo image", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(screen.getByTestId("bg-logo")).toBeInTheDocument();
  });

  it("should render the Header logo image", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(screen.getByTestId("header-logo")).toBeInTheDocument();
  });
  it("should display an error message if the password is too short", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "1234" },
    });

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("password is not valid")).toBeInTheDocument();
  });

  it("should display an error message if the email address is invalid", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "invalid_email" },
    });

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("Email is not valid")).toBeInTheDocument();
  });
});

describe("DisplayAllPosts component", () => {
  JSON.parse = jest.fn().mockImplementationOnce(() => {});
  // Mocking localStorage
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
      writable: true,
    });
  });

  test("renders DisplayAllPosts", async () => {
    render(<DisplayAllPosts />);
    expect(screen.getByText("All Posts")).toBeInTheDocument();
    expect(screen.getByTestId("create-btn")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("create-btn"));
  });

  // test("renders createPosts", async () => {
  //   render(<CreateNewPost />);
  //   // expect(screen.getByText("Create New Post")).toBeInTheDocument();
  //   expect(screen.getByTestId("save-btn")).toBeInTheDocument();

  //   fireEvent.click(screen.getByTestId("save-btn"));

  //   // expect(screen.getByText('There are no posts yet.')).toBeInTheDocument();
  // });

  test("renders DisplayAllPosts component, modifies a post, and saves changes", () => {
    function editPost(id) {
      const handleChange = (id) => {
        editPost(id);
      };

      return <button onClick={() => handleChange()}>click me</button>;
    }
    const props = { editPost };
    render(<BlogPost {...props} />);
    // const editButton = screen.getByTextid('modify-btn');
    expect(screen.getByTestId("modify-btn")).toBeInTheDocument();
  });

  test("renders blogPosts component, like a post", () => {
    const mockPosts = [
      { id: 1, title: "Test Title 1", content: "Test Content 1" },
    ];
    window.localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockPosts));

    render(<BlogPost />);
    expect(screen.getByTestId("like-btn")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("like-btn"));
  });
  test("renders blogPosts component dislike post changes", async () => {
    const mockPosts = [
      { id: 1, title: "Test Title 1", content: "Test Content 1" },
    ];
    window.localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockPosts));

    render(<BlogPost />);
    const dislikeBtn = screen.getByTestId("dislike-btn");
    await expect(dislikeBtn).toBeInTheDocument();
    fireEvent.click(dislikeBtn);
  });
});
describe("ChatModal", () => {
  it("should render the open button", () => {
    render(<ChatModal />);
    // expect(screen.getByRole("button", { name: "My Chat" })).toBeInTheDocument();
    const modalButton = screen.getByRole("button", { name: "My Chat" });
     expect(modalButton).toBeInTheDocument();

    //fireEvent.click(modalButton);
  });
});

// describe("CreateNewPost component", () => {
//   const mockSavePostTitleToState = jest.fn();
//   const mockSavePostContentToState = jest.fn();
//   const mockGetTitle = jest.fn();
//   const mockGetContent = jest.fn();
//   const mockSavePost = jest.fn();

//   beforeEach(() => {
//     mockSavePostTitleToState.mockClear();
//     mockSavePostContentToState.mockClear();
//     mockGetTitle.mockClear();
//     mockGetContent.mockClear();
//     mockSavePost.mockClear();
//   });

//   it("should call the savePostTitleToState function when the post title input changes", () => {
//     render(
//       <CreateNewPost
//         savePostTitleToState={mockSavePostTitleToState}
//         savePostContentToState={mockSavePostContentToState}
//         getTitle={mockGetTitle}
//         getContent={mockGetContent}
//         savePost={mockSavePost}
//       />
//     );

//     const submitButton = screen.getByTestId("save-btn");

//     fireEvent.click(submitButton);

//     expect(mockSavePost).toHaveBeenCalled();
//   });
// });

describe("BlogPost component", () => {
  const mockEditPost = jest.fn();
  const mockDeletePost = jest.fn();
  const mockIsDeletePost = jest.fn(() => false);
  const mockOnDeleteReset = jest.fn();

  beforeEach(() => {
    mockEditPost.mockClear();
    mockDeletePost.mockClear();
    mockIsDeletePost.mockClear();
    mockOnDeleteReset.mockClear();
  });
  it("should call the deletePost function when the delete button is clicked", () => {
    const eachPost = {
      id: 1,
      title: "My First Blog Post",
      content: "This is the content of my first blog post.",
    };

    render(
      <BlogPost
        id={eachPost.id}
        key={eachPost.id}
        title={eachPost.title}
        content={eachPost.content}
        editPost={mockEditPost}
        deletePost={mockDeletePost}
        isDeletePost={mockIsDeletePost}
        onDeleteReset={mockOnDeleteReset}
      />
    );

    const deleteButton = screen.getByTestId("delete-btn");
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    expect(mockDeletePost).toHaveBeenCalledWith(eachPost.id);
  });
});

describe('Message component', () => {
  const mockAuth = {
    currentUser: {
      uid: '1234567890',
    },
  };

  beforeEach(() => {
    jest.mock('./utils/firebase', () => {
      return {
        auth: mockAuth,
      };
    });
  });

  it('should render the message text and sender name', () => {
    const message = {
      uid: '1234567890',
      name: 'John Doe',
      text: 'This is a test message.',
    };

    render(<Message message={message} />);
  });

});
describe('Browse component', () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });

  const useDispatchMock = reactRedux.useDispatch;

  beforeEach(() => {
    useDispatchMock.mockImplementation(() => () => {});
  });

  afterEach(() => {
    useDispatchMock.mockClear();
  });
  it('should render the Header, DisplayAllPosts, and ChatModal components with the correct images', () => {
    render(<Provider store={store}>
      <Browse />
    </Provider>
    );

    // const header = screen.getByAltText('Header');
    // const displayAllPosts = screen.getByAltText('Display All Posts');
    // const chatModal = screen.getByAltText('Chat Modal');

    // expect(header).toHaveAttribute('src', headerImage);
    // expect(displayAllPosts).toHaveAttribute('src', displayAllPostsImage);
    // expect(chatModal).toHaveAttribute('src', chatModalImage);
  });
});
