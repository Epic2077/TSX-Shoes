import { Flip, toast } from "react-toastify";

export const notifyA = () => {
  toast.success("Product Added to Cart Successfully", {
    position: "bottom-center",
    autoClose: 3000,
    containerId: "A",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Flip,
  });
};

export const notifyB = () => {
  toast.warn("Please Select Size and Color !", {
    position: "bottom-center",
    autoClose: 3000,
    containerId: "B",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Flip,
  });
};

export const notifyC = () => {
  toast.error("Please login to add items to the cart!", {
    position: "bottom-center",
    autoClose: 3000,
    containerId: "C",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Flip,
  });
};
