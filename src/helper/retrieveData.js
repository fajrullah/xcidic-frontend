import { Request } from "./requestHeader";
/**
 * @author Fajrul
 * @return { obj }
 * Retrieve Data
 * return async
 */

export const deleteBranches = (data) => {
  const result = Request().delete("/branches", {
    data: { ...data } 
  });
  return result;
}

export const getBranches = () => {
  const result = Request().get("/branches");
  return result;
};

export const createBranches = (data) => {
  const result = Request().post("/branches", {
    ...data
  });
  return result;
}

export const updateBranches = (data) => {
  const result = Request().put("/branches", {
    ...data
  });
  return result;
}

export const searchBranches = (data) => {
  const result = Request().get("/branches", {
    params: { ...data } 
  });
  return result;
}

