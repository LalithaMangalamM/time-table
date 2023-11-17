import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const warn = (text) =>{
        toast.warn(text, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
}

export default warn;