import React, { useState, useRef } from "react";
import CreateNewPost from "./CreateNewPost";
import ModifyPost from "./ModifyPost";
import BlogPost from "./Blog";
import "../style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DisplayAllPosts = () => {
  // managing states below
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allPosts, setAllPosts] = useState(JSON.parse(window.localStorage.getItem("allPosts")) || [
    {
      id: 1,
      title: "React",
      content:
        "React is a JavaScript library created for building fast and interactive user interfaces for web and mobile applications. It is an open-source, component-based, front-end library responsible only for the application’s view layer. In Model View Controller (MVC) architecture, the view layer is responsible for how the app looks and feels. React was created by Jordan Walke, a software engineer at Facebook. "
    },
    {
      id: 2,
      title: "Django",
      content:
        "Django is a free and open source, full-stack web application framework, written in Python. Django Python is a framework for perfectionists with deadlines. With it, you can build better Web apps in much less time, and in less code."
    }
  ]);
  // const [allPosts, setAllPosts] = useState([]) // can also be used
  const [isCreateNewPost, setIsCreateNewPost] = useState(false);
  const [isModifyPost, setIsModifyPost] = useState(false);
  const [editPostId, setEditPostId] = useState("");
  const [isDeletePost,setIsDeletePost] = useState(false);

  // Initialize useRef (to empty title and content once saved)
  const getTitle = useRef();
  const getContent = useRef();

  // function 1 (accepting title in state by user input)
  const savePostTitleToState = (event) => {
    setTitle(event.target.value);
  };

  // function 2 (accepting content/description in state by user input)
  const savePostContentToState = (event) => {
    setContent(event.target.value);
  };

  // function 3 (to save title and content in allPosts state)
  const savePost = (event) => {
    event.preventDefault();
    const id = Date.now();
    setAllPosts([...allPosts, { title, content, id }]);
    const updatedAllPosts=[...allPosts, { title, content, id }];
    getTitle.current.value = "";
    getContent.current.value = "";
    toggleCreateNewPost();
    window.localStorage.setItem("allPosts", JSON.stringify(updatedAllPosts))
  };

  // function 4 (toggle create new post visibility)
  const toggleCreateNewPost = () => {
    setIsCreateNewPost(!isCreateNewPost);
  };

  // function 5 (toggle post editing)
  const toggleModifyPostComponent = () => {
    setIsModifyPost(!isModifyPost);
  };

  // function 6 (to edit posts)
  const editPost = (id) => {
    setEditPostId(id);
    toggleModifyPostComponent();
  };

  // function 7 (to update the posts)
  const updatePost = (event) => {
    event.preventDefault();
    const updatedPost = allPosts.map((eachPost) => {
      if (eachPost.id === editPostId) {
        return {
          ...eachPost,
          title: title || eachPost.title,
          content: content || eachPost.content
        };
      }

      return eachPost;
    });
    setAllPosts(updatedPost);
    window.localStorage.setItem("allPosts", JSON.stringify(updatedPost))
    toggleModifyPostComponent();
  };

  // function 8 (to delete posts)
  const deletePost = (id) => {
    setIsDeletePost(true);
    const modifiedPost = allPosts.filter((eachPost) => {
      return eachPost.id !== id;
    });
    setAllPosts(modifiedPost);
    window.localStorage.setItem("allPosts", JSON.stringify(modifiedPost))

  };
  const onDeleteReset=(value)=>{
    setIsDeletePost(value);
  }

  if (isCreateNewPost) {
    return (
      <div className="container">
        <CreateNewPost
          savePostTitleToState={savePostTitleToState}
          savePostContentToState={savePostContentToState}
          getTitle={getTitle}
          getContent={getContent}
          savePost={savePost}
        />
        {/* Cancel Button */}
       
        <button  className="btn btn-outline-danger mt-5 ml-3"  onClick={toggleCreateNewPost}><FontAwesomeIcon icon="fas fa-cut" /></button>
        
      </div>
    );
  } else if (isModifyPost) {
    const post = allPosts.find((post) => {
      return post.id === editPostId;
    });

    return (
      <div className="container">
       
        <ModifyPost
          title={post.title}
          content={post.content}
          updatePost={updatePost}
          savePostTitleToState={savePostTitleToState}
          savePostContentToState={savePostContentToState}
          toggleCreateNewPost={toggleCreateNewPost}
        />
        <button  className="btn btn-outline-danger mt-5 ml-3" onClick={toggleModifyPostComponent}><FontAwesomeIcon icon="fas fa-cut" /></button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>All Posts</h2>
      {!allPosts.length ? (
        <div>
          <li>There are no posts yet.</li>
        </div>
      ) : (
        allPosts.map((eachPost) => (
          <BlogPost
            id={eachPost.id}
            key={eachPost.id}
            title={eachPost.title}
            content={eachPost.content}
            editPost={editPost}
            deletePost={deletePost}
            isDeletePost= {isDeletePost}
            onDeleteReset={onDeleteReset}
          />
        ))
      )}
               { isDeletePost && <div className="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Hi !</strong> Post is deleted... 
  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>onDeleteReset(false)} ></button>
</div>}
      <button
        className="btn btn-outline-info button-edits create-post"
        onClick={toggleCreateNewPost}
      >
       <FontAwesomeIcon icon="fa fa-plus" />
      </button>
    </div>
  );
};
export default DisplayAllPosts;