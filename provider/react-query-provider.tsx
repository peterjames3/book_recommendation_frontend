'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";


export default function ReactQueryProvider({
    children
    ,} : {
    children: React.ReactNode
    
}){
     const [ queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries :{
                staleTime : 1000 * 60 * 5, // 5 minutes default
                gcTime: 1000 * 60 * 60 * 24, //24 hours default;
                retry: 2, // retry failed requests teice
            },

        },

     }))

     return(
        <QueryClientProvider client={ queryClient}>
            { 
                children
            }
        </QueryClientProvider>
     )
}

