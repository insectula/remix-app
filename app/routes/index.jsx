import { useNavigate } from "@remix-run/react";
import {  useEffect  } from "react";
export default function () {
    const navigate = useNavigate();
    useEffect(()=> {
        navigate('/Каталог', { replace: true })
    }, [])
    return null;
}