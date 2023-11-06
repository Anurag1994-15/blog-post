import React from "react";

const BlogPost = ({ id, title, content, editPost, deletePost }) => {
  return (
    <>
      <div className="card card-width bg-light">
        <section key={id}>
          <h3>{title}</h3>
          <hr className="new1"></hr>
          <p>{content}</p>
          <button type="button" class="btn btn-outline-info"  onClick={() => editPost(id)}>Edit</button>&nbsp;&nbsp;
          <button type="button" class="btn btn-outline-danger" onClick={() => deletePost(id)}>Delete</button>
        </section>
      </div>
    </>
  );
};

export default BlogPost;