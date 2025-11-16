"use client";

import { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";



const WhatsNewPage = () => {
  const [changelogList, setChangelogList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch("/api/whats-new");

        if (!res.ok) {
          throw new Error(`Failed to fetch updates: ${res.status}`);
        }

        const data = await res.json();

        // Sort by release date (newest first)
        const sorted = data.sort(
          (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
        );

        setChangelogList(sorted);
      } catch (err) {
        console.error("Error fetching changelog:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChangelog();
  }, []);

  // Format date consistently
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-base-100 to-base-200 flex items-center justify-center">
        <div className="text-center space-y-4">
          <span className="loading loading-dots loading-xl"></span>
          <p className="text-base-content/70 font-medium">Loading updates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-base-100 to-base-200 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error/10 flex items-center justify-center"></div>
          <h2 className="text-xl font-bold mb-2 text-base-content">
            Unable to Load Updates
          </h2>
          <p className="text-base-content/70 mb-6">{error}</p>
          <button
            className="btn btn-primary btn-lg px-8"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-base-100 to-base-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              What's New
            </h1>
          </div>
          <p className="text-base-content/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest features, improvements, and releases
          </p>
        </div>

        {/* Timeline Section */}
        {changelogList.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-base-300 flex items-center justify-center">
              <FaCircleCheck className="text-3xl text-base-content/50" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-base-content">
              No Updates Yet
            </h3>
            <p className="text-base-content/70 max-w-md mx-auto">
              We're working on exciting new features. Check back soon for
              updates!
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary/30 to-secondary/30 md:left-1/2 md:-translate-x-1/2"></div>

            <div className="space-y-8">
              {changelogList.map((item, index) => (
                <div
                  key={item._id || index}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="relative z-10  w-16 h-16 rounded-full bg-base-100 border-4 border-base-300 flex items-center justify-center shadow-lg">
                    <FaCircleCheck
                      className={`text-xl ${
                        index === 0
                          ? "text-primary animate-pulse"
                          : "text-secondary"
                      }`}
                    />
                  </div>

                  {/* Content Card */}
                  <div className="flex-1">
                    <div
                      className={`bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                        index === 0 ? "ring-2 ring-primary/20" : ""
                      }`}
                    >
                      {/* Header badges */}
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        {index === 0 && (
                          <span className="badge badge-primary badge-lg font-semibold px-4 py-2 flex items-center gap-2">
                            <div className="w-2 h-2 bg-current rounded-full animate-ping"></div>
                            Latest Release
                          </span>
                        )}
                        <span className="badge badge-ghost badge-lg font-medium px-3 py-2">
                          {formatDate(item.releaseDate)}
                        </span>
                        {item.version && (
                          <span className="badge badge-outline badge-lg px-3 py-2 font-mono">
                            v{item.version}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-bold text-base-content mb-4 leading-tight">
                        {item.title || "New Update"}
                      </h2>

                      {/* Description */}
                      {item.description && (
                        <p className="text-base-content/80 mb-6 leading-relaxed text-lg">
                          {item.description}
                        </p>
                      )}

                      {/* Features */}
                      {item.features?.length > 0 && (
                        <div className="mb-6">
                          <h3 className="font-bold text-base-content mb-4 text-lg flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            New Features
                          </h3>
                          <ul className="space-y-3">
                            {item.features.map((feature, idx) => (
                              <li
                                key={idx}
                                className="flex gap-4 items-start group"
                              >
                                <div className="w-2 h-2 bg-primary rounded-full mt-3 group-hover:scale-150 transition-transform"></div>
                                <span className="text-base-content/90 text-base leading-relaxed">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Improvements */}
                      {item.improvements?.length > 0 && (
                        <div className="mb-6">
                          <h3 className="font-bold text-base-content mb-4 text-lg flex items-center gap-2">
                            <div className="w-2 h-2 bg-info rounded-full"></div>
                            Improvements
                          </h3>
                          <ul className="space-y-3">
                            {item.improvements.map((improvement, idx) => (
                              <li
                                key={idx}
                                className="flex gap-4 items-start group"
                              >
                                <div className="w-2 h-2 bg-info rounded-full mt-3 group-hover:scale-150 transition-transform"></div>
                                <span className="text-base-content/90 text-base leading-relaxed">
                                  {improvement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Supported Devices */}
                      {item.supportDevice?.length > 0 && (
                        <div>
                          <h3 className="font-bold text-base-content mb-4 text-lg flex items-center gap-2">
                            <div className="w-2 h-2 bg-success rounded-full"></div>
                            Supported Devices
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {item.supportDevice.map((device, idx) => (
                              <span
                                key={idx}
                                className="badge badge-outline badge-lg px-4 py-2 font-medium hover:bg-base-300 hover:text-base-content transition-colors"
                              >
                                {device}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsNewPage;
