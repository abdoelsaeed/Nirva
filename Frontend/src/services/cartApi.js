import axiosClient from './axiosClient'

export async function addToCart(color,size,productId) {
    try{
    const data = await axiosClient.post(`cart/add-to-cart/${productId}`, { color, size });
    return data;
    }
    catch(error){
        console.error('addToCart error', error);
        throw error;
    }
}
export async function getMyCart(){
    try{
    const data = await axiosClient.get("cart/me");
    return data;
    }
    catch(error){
        console.error('getMyCart error', error);
        throw error;
    }
}

export async function removeFromCart(itemId) {
    try {
        console.log(itemId);
        const data = await axiosClient.delete(`cart/remove-item/${itemId}`);
        return data;
    }
    catch(error){
        console.error('removeFromCart error', error);
        throw error;
    }
}

export async function clearCart() {
    try {
        const data = await axiosClient.delete("cart/clear");
        return data;
    }
    catch(error){
        console.error('clearCart error', error);
        throw error;
    }
}