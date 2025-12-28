import { useNavigate, useRouteError } from "react-router-dom";

/**
 * ErrorMessage component
 * - Uses useRouteError() to display error message from react-router.
 * - Provides "Go back" and "Retry" actions.
 * - Clean, modern style using Tailwind classes (works with dark mode).
 */
function ErrorMessage() {
  const navigate = useNavigate();
  const error = useRouteError();

  // Friendly, safe message fallback
  const userMessage =
    (error &&
      (error.data || error.message || (typeof error === "string" && error))) ||
    "حدث خطأ غير متوقع. حاول مرة أخرى.";

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="max-w-3xl mx-auto my-6 p-4 sm:p-6 rounded-2xl border shadow-lg
                 bg-gradient-to-br from-red-50 to-white dark:from-red-900 dark:to-red-800
                 border-red-200 dark:border-red-700 text-red-800 dark:text-red-100"
      style={{ transition: "transform 160ms ease, box-shadow 160ms ease" }}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                     bg-red-100/80 dark:bg-red-700/30 ring-1 ring-red-200 dark:ring-red-700"
          aria-hidden="true"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-red-600 dark:text-red-200"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M12 7v6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="12" cy="17.2" r="0.9" fill="currentColor" />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg sm:text-xl font-semibold leading-snug">
              An error occurred.
            </h3>

            {/* Small hint: error code if present */}
            {error && error.status && (
              <span
                className="text-sm font-medium px-2 py-1 rounded-full bg-red-100 dark:bg-red-700/30
                           text-red-700 dark:text-red-100"
                title="Error status"
              >
                {error.status}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm sm:text-base text-red-700/90 dark:text-red-100/90 leading-relaxed break-words">
            {userMessage}
          </p>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border
                         border-transparent bg-white hover:bg-red-50 text-red-700 shadow-sm
                         dark:bg-red-700/10 dark:hover:bg-red-700/20 dark:text-red-100 transition"
            >
              {/* back icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </button>

            <button
              type="button"
              onClick={() => {
                // retry: reload current route
                // If you prefer a full refresh: window.location.reload()
                navigate(0);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200
                         bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-700/20 dark:border-red-600
                         dark:text-red-100 transition"
            >
              {/* retry icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M21 12a9 9 0 10-3.95 7.16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 3v6h-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              try again
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600
                         text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300
                         dark:focus:ring-red-800 transition"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
