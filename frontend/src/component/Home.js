import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContent, deleteContent } from '../features/homeSlice';
import { Link } from 'react-router-dom';

function HomeComponent() {
  const contentList = useSelector(state => state.home.contentList);
  const status = useSelector(state => state.home.status);
  const error = useSelector(state => state.home.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContent());
    }
  }, [status, dispatch]);

  const handleDeleteContent = (id) => {
    dispatch(deleteContent(id));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ul>
        {contentList.map(content => (
          <li key={content.id} data={content.id}>
            {content.pageTitle}
            <Link to={`/post/edit/${content.id}`}>Edit</Link>
            <button onClick={() => handleDeleteContent(content.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/post/add">Add Content</Link>
    </div>
  );
}

export default HomeComponent;
