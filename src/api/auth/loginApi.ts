import { LoginAdminRequest } from "@/features/login/validations/loginSchema";
import axios from "axios";

export async function loginApi({email, password}: LoginAdminRequest) {
  return await axios.post(
    'https://api.backendless.com/80900C75-16BB-41B9-A507-BFBEB18800DB/DFDA6C49-11F9-4C6A-80AC-502464A70582/users/login',
    { login: email, password },
  );
}
