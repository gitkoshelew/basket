import constants from "../constants";
const { LOADER_MAIN_CHANGE, LOADER_MAIN_INIT } = constants;

export const loaderMainChange = (payload) => {
  return {
    type: LOADER_MAIN_CHANGE,
    payload,
  };
};

export const loaderMainInit = () => {
  return {
    type: LOADER_MAIN_INIT,
  };
};
