"use client";
import { IoSearchOutline } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import ModelCard from "@/components/supportModel/ModelCard";
import { FaRegFaceSmile } from "react-icons/fa6";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const PhoneModels = ({ phoneModels }) => {
  const router = useRouter();
  const { phoneModels: phoneParam } = useParams();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const modelsPerPage = 12;

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const { filteredPhone, searchedPhones } = useMemo(() => {
    const brandFiltered = phoneModels.filter(
      (item) => item.brandName?.toLowerCase() === phoneParam?.toLowerCase()
    );

    const searchFiltered = brandFiltered.filter(
      (item) =>
        item.modelName?.toLowerCase().includes(search.toLowerCase()) ||
        item.modelType?.toLowerCase().includes(search.toLowerCase())
    );

    return { filteredPhone: brandFiltered, searchedPhones: searchFiltered };
  }, [phoneModels, phoneParam, search]);

  // Pagination calculations
  const indexOfLastModel = currentPage * modelsPerPage;
  const indexOfFirstModel = indexOfLastModel - modelsPerPage;
  const currentModels = searchedPhones.slice(indexOfFirstModel, indexOfLastModel);
  const totalPages = Math.ceil(searchedPhones.length / modelsPerPage);

  // تابع برای تولید صفحات قابل نمایش به صورت رسپانسیو
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (currentPage <= 3) {
      // صفحات ابتدایی
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      if (showEllipsis) {
        pages.push('...');
      }
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      // صفحات انتهایی
      pages.push(1);
      if (showEllipsis) {
        pages.push('...');
      }
      for (let i = totalPages - 3; i <= totalPages; i++) {
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

  const handleBackToHome = () => {
    setIsLoading(true);
    router.push("/");
  };

  if (!phoneParam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-error text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold mb-2">Invalid Brand</h3>
          <p className="mb-4">Brand parameter is missing</p>
          <button onClick={handleBackToHome} className="btn btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">
            Supported <span className="text-primary">{phoneParam.toUpperCase()}</span> Models
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Explore all supported {phoneParam} models with complete specifications and features
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoSearchOutline className="h-5 w-5 text-gray-400" />
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

        {/* Results Info */}
        {search && (
          <div className="text-center mb-6">
            <p>
              Found <span className="font-semibold text-info">{searchedPhones.length}</span> models matching "{search}"
            </p>
          </div>
        )}

        {/* Models Grid */}
        {filteredPhone.length > 0 ? (
          <>
            {currentModels.length === 0 ? (
              <div className="text-center py-12 rounded-2xl border border-base-300">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2">No Models Found</h3>
                <p className="mb-6">No models found for "{search}". Try different search terms.</p>
                <button onClick={() => setSearch("")} className="btn btn-outline">
                  Clear Search
                </button>
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

                {/* Responsive Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-8 gap-1 sm:gap-2">
                    {/* دکمه قبلی */}
                    <button
                      className="btn btn-sm sm:btn-md btn-neutral flex items-center gap-1"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <MdNavigateBefore className="text-base" />
                      <span className="hidden xs:inline">Previous</span>
                    </button>

                    {/* نمایش صفحات در دسکتاپ */}
                    <div className="hidden sm:flex items-center gap-1">
                      {getVisiblePages().map((page, index) => (
                        <button
                          key={index}
                          className={`btn btn-sm sm:btn-md ${
                            currentPage === page
                              ? "btn-primary text-white"
                              : "btn-neutral"
                          } ${page === '...' ? 'cursor-default hover:bg-neutral pointer-events-none' : ''}`}
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
                    <div className="sm:hidden flex items-center gap-2 px-3 py-2 bg-base-200 rounded-lg">
                      <span className="text-sm font-medium">
                        Page <span className="text-primary">{currentPage}</span> of <span className="text-primary">{totalPages}</span>
                      </span>
                    </div>

                    {/* دکمه بعدی */}
                    <button
                      className="btn btn-sm sm:btn-md btn-neutral flex items-center gap-1"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <span className="hidden xs:inline">Next</span>
                      <MdNavigateNext className="text-base" />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          /* Empty state for brand */
          <div className="text-center py-16 max-w-2xl mx-auto">
            <div className="mx-auto mb-6 rounded-full flex items-center justify-center">
              <FaRegFaceSmile className="text-8xl" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No Models Available</h3>
            <p className="text-lg mb-8 max-w-md mx-auto">
              Currently, there are no supported models registered for the{" "}
              <span className="font-semibold">{phoneParam}</span> brand in our system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBackToHome}
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Back to Home"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneModels;