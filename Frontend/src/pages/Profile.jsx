import { Link, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { getMe } from "../services/userApi";

function Profile() {
    const data = useLoaderData();
    
  // 🔹 نمنع الاسكرول أثناء عرض صفحة البروفايل
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // لما يخرج من الصفحة يرجع طبيعي
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f9fafb] overflow-hidden px-4">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="rounded-full w-fit bg-gray-100 p-3 mx-auto">
            <img
              src={data.photo}
              alt="profile"
              className="w-40 h-40  mx-auto rounded-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            {data.firstName + " " + data.lastName}
          </h2>
          <p className="text-gray-500">{data.role}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-[#18324E] font-medium text-sm sm:text-base absolute -top-6 left-1">
              First Name
            </label>
            <input
              type="text"
              disabled
              value={data.firstName}
              className="text-gray-600 w-full rounded-xl p-3 bg-gray-50 border border-gray-200 focus:outline-none text-sm sm:text-base"
            />
          </div>

          <div className="relative">
            <label className="block text-[#18324E] font-medium text-sm sm:text-base absolute -top-6 left-1">
              Last Name
            </label>
            <input
              type="text"
              disabled
              value={data.lastName}
              className="text-gray-600 w-full rounded-xl p-3 bg-gray-50 border border-gray-200 focus:outline-none text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="mt-10 relative">
          <label className="block text-[#18324E] font-medium text-sm sm:text-base absolute -top-6 left-1">
            Email
          </label>
          <input
            type="text"
            disabled
            value={data.email}
            className="text-gray-600 w-full rounded-xl p-3 bg-gray-50 border border-gray-200 focus:outline-none text-sm sm:text-base"
          />
        </div>

        <div className="mt-10 relative">
          <label className="block text-[#18324E] font-medium text-sm sm:text-base absolute -top-6 left-1">
            Phone
          </label>
          <input
            type="text"
            disabled
            value={data.phone}
            className="text-gray-600 w-full rounded-xl p-3 bg-gray-50 border border-gray-200 focus:outline-none text-sm sm:text-base"
          />
        </div>

        <div className="mt-10 relative">
          <label className="block text-[#18324E] font-medium text-sm sm:text-base absolute -top-6 left-1">
            Address
          </label>
          <input
            type="text"
            disabled
            value={data.address || "Cairo, Egypt"}
            className="text-gray-600 w-full rounded-xl p-3 bg-gray-50 border border-gray-200 focus:outline-none text-sm sm:text-base"
          />
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-[#0D1B2A] text-white hover:bg-[#142a42] transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function loader(){
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
    const data = await getMe();
    return data;
}
export default Profile;
