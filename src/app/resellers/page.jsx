"use client";

import { useEffect, useState } from "react";
import { TiLocation } from "react-icons/ti";

const ResellersPage = () => {
  const [resellers, setResellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResellers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/profile/resellers");
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

      const data = await res.json();
      setResellers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load resellers. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResellers();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-base-100 to-base-200">
        <div className="text-center">
          <div className="loading loading-dots loading-lg mb-4 text-primary"></div>
          <p className="text-gray-600">Loading resellers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center flex-col bg-linear-to-br from-base-100 to-base-200">
        <div className="card w-96 bg-base-100 shadow-md border border-error/20">
          <div className="card-body items-center text-center">
            <div className="text-error mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="card-title text-error">Error</h2>
            <p className="mb-4">{error}</p>
            <div className="card-actions">
              <button onClick={fetchResellers} className="btn btn-primary">
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-base-100 to-base-200 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            Authorized Resellers
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-base-content/80">
            Discover our network of trusted partners and authorized resellers
            worldwide
          </p>
        </div>

        {resellers.length === 0 ? (
          <div className="card w-full max-w-md mx-auto bg-base-100 shadow-md border border-base-300">
            <div className="card-body text-center py-12">
              <h2 className="card-title justify-center text-2xl mb-2">
                No Resellers Found
              </h2>
              <p className="mb-6 text-base-content/70">
                We're expanding our network. Check back soon for updates.
              </p>
              <button
                onClick={fetchResellers}
                className="btn btn-primary btn-outline"
              >
                Refresh
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {resellers.map((seller, index) => (
              <div
                key={seller._id}
                className="card bg-base-100 shadow-md border border-base-300 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="card-body p-5">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="card-title text-lg font-bold text-base-content line-clamp-1">
                      {seller.sellersName}
                    </h2>
                    <div
                      className={`badge badge-lg ${
                        seller.status === "active"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {seller.status}
                    </div>
                  </div>

                  {seller.country?.length > 0 && (
                    <div className="flex items-center mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-primary mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm text-base-content">
                        {seller.country.join(", ")}
                      </span>
                    </div>
                  )}

                  {seller.city && (
                    <div className="flex items-center mb-4">
                      <TiLocation className="mr-2 text-primary" />
                      <span className="text-sm text-base-content">
                        City: {seller.city}
                      </span>
                    </div>
                  )}

                  {seller.description && (
                    <div className=" pt-4 border-t border-base-300">
                      <h3 className="text-sm font-semibold text-base-content mb-2">
                        Description
                      </h3>
                      <ul className="text-sm text-base-content/80 list-disc list-inside leading-relaxed">
                        {seller.description.split(",").map((desc, i) => (
                          <li key={i}>{desc.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResellersPage;
