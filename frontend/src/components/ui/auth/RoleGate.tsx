"use client"

interface RoleGateProps {
    children: React.ReactNode
    userRole?: string
}

import { FormError } from "../form-messages"

export const RoleGate = ({ children, userRole }: RoleGateProps) => {

    return userRole == "active" ? <>{children}</> : <FormError message="Accessed denied" />
}