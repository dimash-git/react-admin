import axios from "axios";
import "server-only";
import { BACKEND_URL } from "./constants/variables";

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
      console.log("getVerkey: ", res.data);
      const { content } = res.data;
      return content.verification_key;
    }
  }
  return null;
};

export { getVerificationKey };
