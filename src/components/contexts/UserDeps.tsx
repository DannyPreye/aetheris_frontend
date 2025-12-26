"use client"
import { User, UserDependencies, UserDependenciesOrganization, UsersService } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { LoadingScreen } from "../ui/LoadingScreen";
import { useSession } from "next-auth/react";

interface UserDepsContextType {
    deps: UserDependencies;
    isLoading: boolean;
    error: any;
    refetch: () => void;
}

export const UserDepsContext = createContext<UserDepsContextType | null>(null);

export const UserDepsProvider = ({
    children
}: {

    children: React.ReactNode;
    }) =>
{

    const [ deps, setDeps ] = useState<UserDependencies>();

    const { data: session } = useSession();


    console.log("This is the session",session);



    // Fetch user Deps
    const { data, isLoading, error , refetch } = useQuery({
        queryKey: ["user-deps", session?.user.id],
        queryFn: () => UsersService.getApiV1UsersDependencies(session?.user.id as string),
    })



    useEffect(() => {
        if (data) {
            setDeps(data.data as UserDependencies);
        }
    }, [data,]);


    return (
        <UserDepsContext.Provider value={{ deps: deps as UserDependencies, isLoading, error, refetch }}>
            {isLoading ? <LoadingScreen /> : children}
        </UserDepsContext.Provider>
    );
};
