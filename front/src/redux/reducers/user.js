const initialState = {
  user: {},
  error: null,
  loading: false,
  isAuth: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGNUP_USER':
      return {
        ...state,
        loading: true,
      };

    case 'SIGNUP_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false,
        isAuth: true,
      };

    case 'SIGNUP_USER_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
        isAuth: false,
      };

    case 'ME_FROM_TOKEN':
      return {
        ...state,
        loading: true,
      };
    case 'ME_FROM_TOKEN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false,
        isAuth: true,
      };
    case 'ME_FROM_TOKEN_FAILURE':
      return {
        ...state,
        user: {},
        error: action.payload,
        loading: false,
        isAuth: false,
      };

    case 'LOGIN_USER':
      return {
        ...state,
        loading: true,
      };

    case 'LOGIN_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false,
        isAuth: true,
      };

    case 'LOGIN_USER_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
        isAuth: false,
      };

    case 'EDIT_USER':
      return {
        ...state,
        loading: true,
      };

    case 'EDIT_USER_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload.username,
          last_name: action.payload.last_name,
          email: action.payload.email,
        },
        error: null,
        loading: false,
      };

    case 'EDIT_USER_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case 'CHANGE_PASS':
      return {
        ...state,
        loading: true,
      };

    case 'CHANGE_PASS_SUCCESS':
      return {
        ...state,
        // user: {
        //   ...state.user,
        //   // username: action.payload.username,
        // },
        error: null,
        loading: false,
      };

    case 'CHANGE_PASS_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case 'LOGOUT_USER':
      return {
        ...state,
        user: {},
        isAuth: false,
      };

    default:
      return state;
  }
}
