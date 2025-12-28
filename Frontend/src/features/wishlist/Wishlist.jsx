import { useLoaderData } from "react-router-dom";
import { getWishlist } from "../../../services/wishlistApi";

import Card from "../Card";
function Wishlist() {
  const { data } = useLoaderData();
  const items = data.wishList;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
      {items.map((item, index) => (
        <Card key={index} product={item.product_id} noLove="true" />
      ))}
    </div>
  );
}

export default Wishlist;
export async function loader() {
  // Check authentication before calling API
  const jwt = (() => {
    try {
      return localStorage.getItem("jwt");
    } catch (e) {
      return null;
    }
  })();
  if (!jwt) {
    // Not authenticated, redirect to login
    throw new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  }
  // Authenticated, proceed to get wishlist
  const data = await getWishlist();
  return data;
}
