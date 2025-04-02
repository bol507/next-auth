import { ReactNode } from "react"

interface AuthLayoutProps {
    children: ReactNode
}

const AuthLayout = ({children}: AuthLayoutProps ) => {
    return (
        <div className="h-full flex items-center justify-center  bg-gradient-to-b from-sky-400 to-blue-800">{children}</div>
    )
}

export default AuthLayout