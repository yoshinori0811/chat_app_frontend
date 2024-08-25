import { useNavigate } from "react-router-dom";
import { CsrfToken } from "../types";

export const useError = () => {
    const navigate = useNavigate()

    const switchErrorHandling = (msg: string) => {
        switch (msg) {
            // ユーザー名が重複した時
            case 'duplicated key not allowed':
                alert(`user name already exist, please use another one`)
                break
            // メールアドレスが重複した時
            case 'duplicated key not allowed':
                alert(`email already exist, please use another one`)
                break
            case 'crypto/bcrypt: hashedPassword is not the hash of the given password':
                alert(`password is not correct`)
                break
            case 'record not found':
                alert(`email is not correct`)
                break
            default:
                alert(msg)
        }
    }
    return { switchErrorHandling }
}