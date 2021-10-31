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

/**
 * Timeslots
 * @param {*} data 
 */
export const deleteTimeslots = (data) => {
  const result = Request().delete("/timeslots", {
    data: { ...data } 
  });
  return result;
}

export const getTimeslots = () => {
  const result = Request().get("/timeslots");
  return result;
};

export const createTimeslots = (data) => {
  const result = Request().post("/timeslots", {
    ...data
  });
  return result;
}

export const updateTimeslots = (data) => {
  const result = Request().put("/timeslots", {
    ...data
  });
  return result;
}

export const searchTimeslots = (data) => {
  const result = Request().get("/timeslots", {
    params: { ...data } 
  });
  return result;
}

/**
 * Demands
 */

export const deleteDemads = (data) => {
  const result = Request().delete("/demands", {
    data: { ...data } 
  });
  return result;
}

export const createDemands = (data) => {
  const result = Request().post("/demands", {
    ...data
  });
  return result;
}

/**
 * Reservations
 */

export const createReservations = (data) => {
  const result = Request().post("/reservations", {
    ...data
  });
  return result;
}

/**
 * Search
 */

export const searchDetails = (data = {}) => {
  const result = Request().get("/timeslots/search", {
    params: { ...data } 
  });
  return result;
}