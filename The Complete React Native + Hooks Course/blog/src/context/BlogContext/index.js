import createDataContext from '../createDataContext';
import jsonServer from '../../api/jsonServer';

const initialContext = {
  data: [],
  addBlogPost: () => {}
};

const initialState = [];

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_BLOGPOST':
      return [...state, { id: Math.floor(Math.random() * 9999), title: payload.title, content: payload.content }];
    case 'EDIT_BLOGPOST':
      return state.map(post => post.id === payload.id ? payload : post);
    case 'DELETE_BLOGPOST':
      return state.filter(blogPost => blogPost.id !== payload);
    default:
      return state;
  }
};

const actions = {
  getBlogPosts: dispatch => () => {

  },
  addBlogPost: dispatch => (title, content, callback) => {
    dispatch({ type: 'ADD_BLOGPOST', payload: { title, content }});
    if (callback) {
      callback();
    }
  },
  editBlogPost: dispatch => (id, title, content, callback) => {
    dispatch({ type: 'EDIT_BLOGPOST', payload: { id, title, content }});
    if (callback) {
      callback();
    }
  },
  deleteBlogPost: dispatch => id => {
    dispatch({ type: 'DELETE_BLOGPOST', payload: id });
  },
};

export const { Context, Provider } = createDataContext(reducer, actions, initialState, initialContext);
