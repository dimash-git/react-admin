import axios, { AxiosError } from "axios";
import "server-only";
import { BACKEND_URL } from "./server-constants";

const axiosBack = axios.create({
  baseURL: BACKEND_URL,
});
interface CredsForStepTwo {
  login: string;
  type: "google" | "phone";
  code: string;
}

const getVerificationKey = async ({
  login,
  type,
  code,
}: {
  login: string;
  type: "google" | "phone";
  code: string;
}): Promise<string | null> => {
  console.log({ login, type, code });

  try {
    const res = await axiosBack.post(
      "/main/auth/get_verification_key_step_two",
      {
        login,
        type,
        code,
      }
    );

    const { status, content } = res.data;

    if (status != 200) {
      throw new Error("Error Getting Verification Key");
    }

    const { verification_key } = content;

    return verification_key;
  } catch (error) {
    const err = error as AxiosError;
    console.error(err?.response?.status, err?.response?.statusText);
  }

  return null;
};

const retrieveApiKey = (tokens: BackendTokens) => {
  if (!tokens) return null;
  // console.log("retrieveApiKey: ", tokens);

  const base64ApiKey = btoa(tokens?.access_token + ":" + tokens?.refresh_token);
  return base64ApiKey;
};

export { getVerificationKey, axiosBack, retrieveApiKey };
