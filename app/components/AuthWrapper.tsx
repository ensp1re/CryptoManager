'use client';

import { useRouter } from "next/navigation";
import React, { FC, ReactElement, ReactNode, useEffect, useState } from "react";

interface IAuthWrapperProps {
    children: ReactNode;
}

const AuthWrapper: FC<IAuthWrapperProps> = ({ children }): ReactElement => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    if (!isAuthenticated) {
        router.push("/login");
    }

    return <>{children}</>;
};

export default AuthWrapper;
