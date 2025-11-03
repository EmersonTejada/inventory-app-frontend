import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if(!ctx) throw new Error("useAuth debe estar dentro del AuthProvider")
    return ctx
}