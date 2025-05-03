export const productDetailsState = {
  loading: false,
  menu: true,
  singleProductDetail: null,
};

export const productDetailsReducer = (state, action) => {
  switch (action.type) {
    case "menu":
      return {
        ...state,
        menu: action.payload,
      };
    case "loading":
      return {
        ...state,
        loading: action.payload,
      };
    case "cartState":
      return {
        ...state,
        cartState: action.payload,
      };
    case "singleProductDetail":
      return {
        ...state,
        singleProductDetail: action.payload,
      };
    default:
      return state;
  }
};
