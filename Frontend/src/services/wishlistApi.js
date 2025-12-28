import axiosClient from "./axiosClient";
export async function getWishlist(){
    try{
    const data = await axiosClient.get("wishlist/me");
    return data;
    }catch(error){
        console.error('getWishlist error', error);
        throw error;
    }
}
export async function addToWishlist(productId){
    try {
        // Remove the `:` — that's only used in route definitions on the server
        const data = await axiosClient.post(`wishlist/${productId}`);
        return data;
    } catch (error) {
        alert('You add this item before');
        console.error('addToWishlist error', error);
        throw error;
    }
}

export async function removeFromWishlist(productId){
    try {
        // Use DELETE for RESTful removal
        const data = await axiosClient.delete(`wishlist/delete/${productId}`);
        return data;
    } catch (error) {
        console.error('removeFromWishlist error', error);
        throw error;
    }
}
