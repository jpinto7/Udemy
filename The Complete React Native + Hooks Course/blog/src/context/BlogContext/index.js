import createDataContext from '../createDataContext';
import jsonServer from '../../api/jsonServer';

const initialContext = {
  data: [],
  addBlogPost: () => {},
};

const initialState = [];

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'GET_BLOGPOSTS':
      return payload;
    case 'EDIT_BLOGPOST':
      return state.map((post) => (post.id === payload.id ? payload : post));
    case 'DELETE_BLOGPOST':
      return state.filter((blogPost) => blogPost.id !== payload);
    default:
      return state;
  }
};

const actions = {
  getBlogPosts: (dispatch) => async () => {
    const response = await jsonServer.get('/blogposts');
    dispatch({ type: 'GET_BLOGPOSTS', payload: response.data });
  },
  addBlogPost: (dispatch) => async (title, content, callback) => {
    await jsonServer.post('/blogposts', {
      title,
      content,
    });
    if (callback) {
      callback();
    }
  },
  editBlogPost: (dispatch) => async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, {
      title,
      content,
    });
    dispatch({ type: 'EDIT_BLOGPOST', payload: { id, title, content } });
    if (callback) {
      callback();
    }
  },
  deleteBlogPost: (dispatch) => async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: 'DELETE_BLOGPOST', payload: id });
  },
};

export const { Context, Provider } = createDataContext(
  reducer,
  actions,
  initialState,
  initialContext
);
