"use client"
import { User, UserDependencies, UserDependenciesOrganization, UsersService } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { LoadingScreen } from "../ui/LoadingScreen";
import { OnboardingWizard } from "../onboarding/OnboardingWizard";

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


    const hasOrgs = deps?.organizations && deps.organizations.length > 0;
    const firstOrg = hasOrgs ? deps.organizations[0].organization : null;
    const isUnconfigured = firstOrg?.whatsappConnectionStatus !== "connected"


    return (
        <UserDepsContext.Provider value={{ deps: deps as UserDependencies, isLoading, error, refetch }}>
            {isLoading ? (
                <LoadingScreen />
            ) : (!hasOrgs || isUnconfigured) ? (
                <OnboardingWizard
                    initialStep={!hasOrgs ? 'ORG_CREATION' : 'WHATSAPP_CONNECT'}
                    organization={firstOrg || undefined}
                />
            ) : (
                children
            )}
        </UserDepsContext.Provider>
    );
};


export const useUserDeps = () => {
    const context = useContext(UserDepsContext);
    if (!context) {
        throw new Error('useUserDeps must be used within a UserDepsProvider');
    }
    return context;
};

