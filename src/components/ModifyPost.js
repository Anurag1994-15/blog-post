import React from "react";

const ModifyPost = (props) => {
  return (
    <div class="container">
      <form>
        <h2>Modify Post</h2>
        <label className="col-sm-12 col-form-label">
          <b>Title</b>
          <input
            className="form-control form-control-sm"
            defaultValue={props.title}
            autoFocus={true}
            onChange={props.savePostTitleToState}
            placeholder="title"
            size="39"
          />
        </label>
        <br />
        <label className="col-sm-12 col-form-label">
          <b>Content</b>
          <textarea
            className="form-control form-control-sm"
            defaultValue={props.content}
            onChange={props.savePostContentToState}
            placeholder="contents"
            rows="7"
            cols="22"
          />
        </label>
        <br />
        <button type="button"  title="update changes"  class="btn btn-outline-success" onClick={props.updatePost}> Update Post</button>
      </form>
    </div>
  );
};
export default ModifyPost;