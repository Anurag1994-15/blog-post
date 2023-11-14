import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/fontawesome-free-solid'


const BlogPost = ({ id, title, content, editPost, deletePost}) => {
  const [likeCount, setLikeCount] = useState(Number(window.localStorage.getItem(id+"likeCount")) || 0);
  const [dislikeCount, setDislikeCount] = useState(Number(window.localStorage.getItem(id+"dislikeCount")) || 0);

    const handleLikeClick=(id)=>{
      setLikeCount(prev=>prev+1);
      window.localStorage.setItem(id+"likeCount", likeCount+1);
    };

  const handleDislikeClick=(id)=>{
    setDislikeCount(prev=>prev+1);
    window.localStorage.setItem(id+"dislikeCount", dislikeCount+1);
  }

  return (
    <>
      <div className="card card-width bg-light">
        <section key={id}>
          <h3>{title}</h3>
          <hr className="new1"></hr>
          <p>{content}</p>
          <button type="button" className="btn btn-outline-info" data-testid="modify-btn" onClick={() => editPost(id)}><FontAwesomeIcon icon="fa-solid fa-edit" /></button>&nbsp;&nbsp;
          <button type="button" className="btn btn-outline-danger" id="delete" data-testid="delete-btn" onClick={() => deletePost(id)}><FontAwesomeIcon icon="fa-solid fa-trash" /> </button>
          <button type="button" className="btn btn-outline-primary float-right mr-3"  data-testid="like-btn" onClick={() => handleLikeClick(id)}><FontAwesomeIcon icon="fa fa-thumbs-up" /> {likeCount}</button>
          <button type="button" className="btn btn-outline-dark float-right mr-3"  data-testid="dislike-btn" onClick={() => handleDislikeClick(id)}><FontAwesomeIcon icon="fa fa-thumbs-down" /> {dislikeCount}</button>
        </section>
      </div>
    </>
  );
};

export default BlogPost;