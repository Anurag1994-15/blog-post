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
// import DisplayAllPosts from "./DisplayAllPosts";

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
  JSON.parse = jest.fn().mockImplementationOnce(() => {
    // return your what your code is returning.
  });
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

  test("renders DisplayAllPosts", () => {
    const toggleCreateNewPost = jest.fn();
    render(<DisplayAllPosts />);
    expect(screen.getByText("All Posts")).toBeInTheDocument();
    expect(screen.getByTestId("create-btn")).toBeInTheDocument();
    setTimeout(() => {
      fireEvent.click(screen.getByTestId("create-btn"));
      expect(toggleCreateNewPost).toBeCalled();

      const titleInput = screen.getByPlaceholderText("Enter title");
      const contentInput = screen.getByPlaceholderText("Enter content");
      const saveButton = screen.getByText("Save");

      fireEvent.change(titleInput, { target: { value: "New Test Title" } });
      fireEvent.change(contentInput, { target: { value: "New Test Content" } });
      fireEvent.click(saveButton);

      expect(screen.getByText("All Posts")).toBeInTheDocument();
      expect(screen.getByText("New Test Title")).toBeInTheDocument();
    });
    // expect(screen.getByText('There are no posts yet.')).toBeInTheDocument();
  });
  // test('renders DisplayAllPosts component with posts', () => {
  //   const mockPosts = [
  //     { id: 1, title: 'Test Title 1', content: 'Test Content 1' },
  //     { id: 2, title: 'Test Title 2', content: 'Test Content 2' },
  //   ];
  //   window.localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockPosts));

  //   render(<DisplayAllPosts />);
  //   expect(screen.getByText('All Posts')).toBeInTheDocument();
  //   expect(screen.getByText('Test Title 1')).toBeInTheDocument();
  //   expect(screen.getByText('Test Title 2')).toBeInTheDocument();
  // });

  // test('renders DisplayAllPosts component and adds a new post', () => {
  //   render(<DisplayAllPosts />);
  //   const createPostButton = screen.getByTestId('');
  // fireEvent.click(createPostButton);

  // });

  test("renders DisplayAllPosts component, modifies a post, and saves changes", () => {

    function editPost(id) {

      const handleChange = (id) => {
        editPost(id);
      }
     
  
      return(
          <button onClick={() => handleChange()}>click me</button>
      )
  }
    const props = {editPost}
    render(<BlogPost{...props} />);
    // const editButton = screen.getByTextid('modify-btn');
    expect(screen.getByTestId("modify-btn")).toBeInTheDocument();
   
      //fireEvent.click(screen.getByTestId("modify-btn"));
     

      // const titleInput = screen.getByPlaceholderText("Enter title");
      // const contentInput = screen.getByPlaceholderText("Enter content");
      // const saveButton = screen.getByText("Save Changes");

      // fireEvent.change(titleInput, { target: { value: "Modified Title" } });
      // fireEvent.change(contentInput, { target: { value: "Modified Content" } });
      // fireEvent.click(saveButton);

      // expect(screen.getByText("All Posts")).toBeInTheDocument();
      // expect(screen.getByText("Modified Title")).toBeInTheDocument();
   
  });
  // test("renders DisplayAllPosts component, deletes a post, and confirms deletion", async () => {
  //   const mockPosts = [
  //     { id: 1, title: "Test Title 1", content: "Test Content 1" },
  //   ];
  //   window.localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockPosts));

  //   render(<DisplayAllPosts />);
  //   await expect(screen.getByTestId("delete-btn")).toBeInTheDocument();
    
  //   fireEvent.click(screen.getByTestId("delete-btn"));
     
  // });

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
    const dislikeBtn=screen.getByTestId("dislike-btn");
    await expect(dislikeBtn).toBeInTheDocument();
    fireEvent.click(dislikeBtn);

  });
});
describe('ChatModal', () => {
  it('should render the open button', () => {
    render(<ChatModal />);
    expect(screen.getByRole('button', { name: 'My Chat' })).toBeInTheDocument();
  });

});
