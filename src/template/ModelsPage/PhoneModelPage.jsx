"use client";

import ModelCard from "@/components/supportModel/ModelCard";
import { useEffect, useState, useMemo, useCallback } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const PhoneModelPage = () => {
  const [modelsList, setModelsList] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const modelsPerPage = 12;

  const fetchHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/profile/support-models");

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }

      const data = await res.json();
      setModelsList(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
      setError("Failed to load models. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const searchedPhones = useMemo(() => {
    if (!search.trim()) return modelsList;
    const searchTerm = search.toLowerCase();
    return modelsList.filter(
      (item) =>
        item.modelType?.toLowerCase().includes(searchTerm) ||
        item.modelName?.toLowerCase().includes(searchTerm)
    );
  }, [modelsList, search]);

  const indexOfLastModel = currentPage * modelsPerPage;
  const indexOfFirstModel = indexOfLastModel - modelsPerPage;
  const currentModels = searchedPhones.slice(
    indexOfFirstModel,
    indexOfLastModel
  );
  const totalPages = Math.ceil(searchedPhones.length / modelsPerPage);

  // تابع برای تولید صفحات قابل نمایش
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (currentPage <= 4) {
      // صفحات ابتدایی
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      if (showEllipsis) {
        pages.push('...');
        pages.push(totalPages);
      }
    } else if (currentPage >= totalPages - 3) {
      // صفحات انتهایی
      if (showEllipsis) {
        pages.push(1);
        pages.push('...');
      }
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // صفحات میانی
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }
    
    return pages;
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-error text-lg mb-4">{error}</p>
          <button onClick={fetchHandler} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Supported Phone Models</h1>
          <p>Find your device from our supported models list</p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoSearchOutline className="h-5 w-5" />
            </div>
            <input
              type="text"
              className="input input-bordered w-full pl-10"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search Model Name or Model Type..."
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-dots loading-xl"></span>
          </div>
        ) : (
          <>
            {currentModels.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-lg font-medium mb-2">No models found</h3>
                <p>
                  {search
                    ? "Try adjusting your search terms"
                    : "No models available at the moment"}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentModels.map((item) => (
                    <ModelCard
                      key={item._id}
                      item={item}
                      className="transform hover:scale-105 transition-transform duration-200"
                    />
                  ))}
                </div>

                {/* Pagination - Responsive */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-8 gap-2 sm:gap-3">
                    {/* دکمه قبلی */}
                    <button
                      className="btn btn-sm sm:btn-md btn-neutral"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      <MdNavigateBefore className="text-sm sm:text-base" />
                      <span className="hidden xs:inline">Previous</span>
                    </button>

                    {/* نمایش صفحات در دسکتاپ */}
                    <div className="hidden sm:flex gap-1">
                      {getVisiblePages().map((page, index) => (
                        <button
                          key={index}
                          className={`btn btn-sm sm:btn-md btn-neutral ${
                            currentPage === page
                              ? "bg-primary border-primary text-white"
                              : ""
                          } ${page === '...' ? 'cursor-default hover:bg-neutral' : ''}`}
                          onClick={() => 
                            page !== '...' && typeof page === 'number' 
                              ? setCurrentPage(page) 
                              : null
                          }
                          disabled={page === '...'}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    {/* نمایش صفحه فعلی در موبایل */}
                    <div className="sm:hidden flex items-center gap-2">
                      <span className="sm:hidden flex items-center gap-2 px-3 py-2 bg-base-200 rounded-lg">
                        Page <span className="text-primary">{currentPage}</span> of <span className="text-primary">{totalPages}</span>
                      </span>
                    </div>

                    {/* دکمه بعدی */}
                    <button
                      className="btn btn-sm sm:btn-md btn-neutral"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      <span className="hidden xs:inline">Next</span>
                      <MdNavigateNext className="text-sm sm:text-base" />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PhoneModelPage;