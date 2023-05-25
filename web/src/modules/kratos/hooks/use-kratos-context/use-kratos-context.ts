import { useContext } from "react";
import { KratosContext } from "../../contexts/kratos-context/kratos-context";

export function useKratosContext(){
    return useContext(KratosContext)
}