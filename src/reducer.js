export const login = user => {
  console.log("producing login");
  return {
    type: "LOGIN",
    user
  };
};

export const logout = user => {
  console.log("producing logout");
  return {
    type: "LOGOUT"
  };
};

const initialState = {
  token: localStorage.getItem("token") || undefined,
  currentUser: localStorage.getItem("user") || undefined
};

export const reducer = (state = initialState, action) => {
  var newState;
  switch (action.type) {
    case "LOGIN":
      const token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDYzMDUzMjMsImlhdCI6MTUwMzcxMzMyMywicHJvamVjdElkIjoiY2o2c2w5d21tMTBpaDAxMzloZDFudjI0MCIsInVzZXJJZCI6ImNqNnNscWd2bDNhNHQwMTA5cmMyY3FnbXoiLCJtb2RlbE5hbWUiOiJVc2VyIn0.fuvPFvnlPZrMegNvGjCgkYAemYlOVqEucmzQ_EY0NGg";
      localStorage.setItem("token", token);
      localStorage.setItem("user", action.user);
      newState = { ...state, token, currentUser: action.user };
      break;
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      newState = { ...state, token: undefined, currentUser: undefined };
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};
