import instance from "./instance";

interface ISignIn {
  email: string;
  password: string;
}

interface ISignup {
  email: string;
  password: string;
  fullName: string;
}

const signin = async (payload: ISignIn) => {
  try {
    const response = await instance.post("/signin", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

const signup = async (payload: ISignup) => {
  try {
    const response = await instance.post("/signup", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export { signin, signup };
