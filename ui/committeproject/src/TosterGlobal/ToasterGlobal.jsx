import { toast } from 'react-toastify';

export default function ToasterGlobal(message, id,type) {
  toast[type](message, {
    position: "top-center",
    toastId: id,
    autoClose: 4000,
  });
}
