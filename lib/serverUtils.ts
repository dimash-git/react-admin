import axios from "axios";
import "server-only";
import { BACKEND_URL } from "./serverConstants";
import fetch from "node-fetch";

interface LoginCreds {
  login: string;
  type: "google" | "phone";
  code: string;
}

const getVerificationKey = async (
  loginCreds: LoginCreds
): Promise<string | null> => {
  const { login, type, code } = loginCreds;
  if (type == "google") {
    const res = await axios.post(
      BACKEND_URL + "/main/auth/get_verification_key_step_two",
      {
        login,
        type,
        code,
      }
    );

    if (res.status == 200) {
      const { content } = res.data;
      return content.verification_key;
    }
  }
  return null;
};

const axiosBack = axios.create({
  baseURL: BACKEND_URL,
});

const retrieveApiKey = (tokens: BackendTokens) => {
  if (!tokens) return null;
  // console.log("retrieveApiKey: ", tokens);

  const base64ApiKey = btoa(tokens?.access_token + ":" + tokens?.refresh_token);
  return base64ApiKey;
};

export { getVerificationKey, axiosBack, retrieveApiKey };
