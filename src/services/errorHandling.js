import toast from "react-hot-toast"

function errorFunction(error,navigate){
    if(error?.response?.status==403){
        navigate('/accessDenied')
    }else if(error?.response?.status==404){
        navigate('/notFound')
    }else if(error?.response?.status==500){
        navigate('/serverError')
    }else if(error?.response?.data?.errMsg){
        toast.error(error?.response?.data?.errMsg)
    }
}

export default errorFunction