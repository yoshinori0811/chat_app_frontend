import { useState, FormEvent } from "react"
import { CheckBadgeIcon, ArrowPathIcon } from "@heroicons/react/24/solid"
import { useMutateAuth } from "../hooks/useMutateAuth"

export const Auth = () => {
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const {loginMutation, registerMutation} = useMutateAuth()

    const submitAuthHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isLogin) {
            loginMutation.mutate({
                userName: userName,
                email: email,
                password: password,
            })
        } else {
            await registerMutation.mutateAsync({
                userName: userName,
                email: email,
                password: password,
            })
            .then(() => loginMutation.mutate({
                userName: userName,
                email: email,
                password: password,
            }))
        }
    }

    return (
        <div className="flex fustify-center items-center flex-col min-h-screen text-gray-600  font-mono">
            <div className="flex items-center">
                <CheckBadgeIcon />
                <span className="text-center text-3xl font-extrabold">
                    Chat app by React/Go
                </span>
            </div>
            <h2 className="my-6">{isLogin ? 'Login' : 'Create anew account'}</h2>
            <form onSubmit={submitAuthHandler}>
                <div>
                    <input
                        name="email"
                        type="email"
                        autoFocus
                        placeholder="Email address"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        />
                </div>
                <div>
                    <input
                        name="userName"
                        type="text"
                        placeholder="user name"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        />
                </div>
                <div>
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        />
                </div>
                <button
                    className=""
                    disabled={!userName || !email || !password}
                    type="submit"
                >
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <ArrowPathIcon
                onClick={() => setIsLogin(!isLogin)}
                className="h-6 my-2 text-blue-500 cursor-pointer"
            />
        </div>
    )
}
