import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = ({
  title,
  content,
  keyword,
  setKeyword,
  notes,
  handleTitleChange,
  handleContentChange,
  searchResults,
  handleAddNote,
  handleUpdateNote,
  handleEditNote,
  handleDeleteNote,
  handleSearch,
  handleCancelEdit,
  handleLogout,
  editMode,
}) => (
  <div className="container mt-4">
    <h2 className="mb-4">Notes<span> <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button></span></h2>
    <div className="card mb-4">
      <div className="card-body">
        <label>Title: </label>
        <input type="text" className="form-control mb-2" value={title} onChange={handleTitleChange} />

        <label>Content: </label>
        <textarea className="form-control mb-2" value={content} onChange={handleContentChange} />

        <div>
          {editMode ? (
            <>
              <button className="btn btn-primary mr-2" onClick={handleUpdateNote}>
                Update Note
              </button>
              <button className="btn btn-secondary" onClick={handleCancelEdit}>
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-success" onClick={handleAddNote}>
              Add Note
            </button>
          )}
        </div>
      </div>
    </div>

    <div className="card mb-4">
      <div className="card-body">
        <label>Search: </label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search All Notes Here...'
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="card">
      <ul className="list-group list-group-flush">
        {/* Display either searchResults or all notes based on search state */}
        {(searchResults.length > 0 ? searchResults : notes).map((note) => (
          <li key={note._id} className="list-group-item">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.content}</p>
                <button className="btn btn-warning mr-2" onClick={() => handleEditNote(note._id)}>
                  Edit
                </button>{" "}
                <button className="btn btn-danger" onClick={() => handleDeleteNote(note._id)}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Dashboard;
