import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CreateNewPost = (props) => {
  return (
    <div className="container" >
      <form onSubmit={props.savePost}>
        <h2 data-testid="new-post">Create New Post</h2>
        <label className="col-sm-12 col-form-label">
          <b>Title</b>
          <input
            className="form-control form-control-sm"
            autoFocus={true}
            type="text"
            placeholder="post title"
            onChange={props.savePostTitleToState}
            required
            ref={props.getTitle}
          />
        </label>
        <br />
        <label className="col-sm-12 col-form-label">
          <b>Content</b>
          <textarea
            className="form-control form-control-sm"
            placeholder="description"
            onChange={props.savePostContentToState}
            rows="7"
            cols="22"
            required
            ref={props.getContent}
          />
        </label>
        <br />
        <button data-testid="save-btn"  title="save post" className="btn btn-outline-success"><FontAwesomeIcon icon="fas fa-save" /></button>
      </form>
    </div>
    
  );
};

export default CreateNewPost;