import React,{ ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {AuthProvider} from './auth-context'

export const AppProviders = ({children}: {children: ReactNode}) => {
    const queryClient = new QueryClient()
    
    return (
        //@ts-ignore
        <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
    )
}