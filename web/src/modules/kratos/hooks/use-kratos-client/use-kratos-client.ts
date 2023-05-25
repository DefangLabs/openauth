import { useContext } from "react";
import { useKratosContext } from "../use-kratos-context/use-kratos-context";

export function useKratosClient(){
    const kratosContext = useKratosContext();
    return kratosContext.kratosClient;
}