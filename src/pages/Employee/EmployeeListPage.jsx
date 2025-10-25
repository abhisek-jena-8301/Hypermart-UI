import React, { useEffect, useState } from "react";
import EmployeeDetailCard from "../../components/employee/EmployeeDetailCard.jsx";
import {
  fetchEmployeeList,
  fetchEmployeeListByCondition,
  fetchEmployeeListByName,
} from "../../service/userProfileServiceApi.js";
import { Search } from "lucide-react";
import FilterDialogBox from "../../components/dialog/FilterDialogBox.jsx";
import EmployeeViewDetails from "../../components/employee/EmployeeViewDetails.jsx";
import UpdateConfirmationDialog from "../../components/dialog/UpdateConfirmationDialog.jsx";

function EmployeeListPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [filterDialogbox, setFilterDialogBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeDetail, setEmployeeDetail] = useState(false);
  const [srDialogBox, setSrDialogbox] = useState(false); //Suspend resume dialog box
  const [selectedStatus, setSelectedStatus] = useState(false); //selected user status for Suspension/Resume
  // const [totalCount, setTotalCount] = useState(0);

  /** Pagination logic */
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPage, setTotalPage] = useState(0);
  const PAGE_SIZE = 10;

  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const paginatedUsers = users.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  /** Handle view related functions */
  //TODO: implement all the functionalities
  const handleView = () => {
    console.log("HandleView");
    setEmployeeDetail(true);
  };

  const handleGoBack = () => {
    console.log("here onGoBack");
    setEmployeeDetail(false);
  };

  const handleDelete = () => {
    console.log("HandleDelete");
  };
  const handleEdit = () => {
    console.log("HandleEdit");
  };

  /** Handle suspend and resume related functions  */
  const showSuspendResume = async (userId, status) => {
    console.log("Show SR ", userId, " ", status);
    setSelectedStatus(status);
    setSrDialogbox(true);
  };

  const handleSuspendResume = () => {
    console.log("handleSuspendResume");
    setSrDialogbox(false);
  };

  const handleCancelSR = () => {
    console.log("here handlecancelSR");
    setSrDialogbox(false);
  };

  /** Search button  */
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const updatedList = await fetchEmployeeListByName(query);
    setUsers(updatedList);
  };

  /**  Filter dialog box functions */
  const showFilterDialogBox = () => {
    setFilterDialogBox(true);
  };

  const handleFilterConfirmation = async (filterData) => {
    setFilterDialogBox(false);
    if (!filterData) return;
    let departments = filterData.departments || [];
    const STATUS_MAP = {
      Active: "A",
      Unverified: "U",
      Suspended: "S",
    };

    let statuses = (filterData.statuses || []).map(
      (status) => STATUS_MAP[status]
    );

    console.log("department: ", departments, " statuses : ", statuses);

    if (!(departments.length == 4 && statuses.length == 3)) {
      const response = await fetchEmployeeListByCondition(
        departments,
        statuses
      );
      const list = response.data.users;
      console.log(response.data);
      if (!list || list.length === 0) {
        console.log("Empty list or list not there");
        setUsers([]);
      } else setUsers(list);
    }
  };

  const handleFilterCancellation = () => {
    setFilterDialogBox(false);
  };

  useEffect(() => {
    console.log("Loading employeeList");
    const loadEmployeeList = async () => {
      try {
        setIsLoading(true);
        const employeeList = await fetchEmployeeList();
        setUsers(employeeList.data.list);
        // setTotalCount(employeeList.data.totalCount);
      } catch (error) {
        setIsLoading(false);
        console.error("Error at fetchEmployeeList : ", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadEmployeeList();
  }, [currentPage]);

  return (
    <div className="w-2xl mx-auto mt-6">
      {/* Table Header div Filter and search button */}
      <div className="sticky top-0 z-10 flex items-center justify-between space-x-40 bg-gray-200 p-4 mb-4 rounded-lg shadow-sm border">
        <h2 className="text-xl text-gray-700 font-semibold">Employee list</h2>
        <div className="flex items-center space-x-4">
          {/* Filter Button */}
          <button
            className="px-3 py-1 text-sm rounded text-gray-700 font-semibold transition-all duration-300 cursor-pointer"
            onClick={showFilterDialogBox}
          >
            Filter
          </button>

          {/* Search Icon & Input in a controlled hover zone */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative"
          >
            {!isHovered && (
              <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-700 transition ease-in-out">
                <Search className="w-5 h-5 text-gray-700" />
              </button>
            )}

            {isHovered && (
              <form
                onSubmit={handleSearchSubmit}
                className="transition-all duration-500 ease-in-out w-56"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Employee name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="px-4 py-2 pr-10 rounded-md border border-gray-700 bg-gray-100 text-sm outline-none w-full"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <Search className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* max-h-[600px] overflow-y-auto pr-2  implements the scroll feature
       * isLoading check : show div related to loading animation spin
       * if No users are found acc to paginatedUsers count then No user found is shown
       * Now if everything is there users are shown in the form of EmployeeDetailCard
       * Pagination controls at the end of the screen
       */}

      {/* Scrollable Employee List with Loading screen */}
      <div className="max-h-[600px] overflow-y-auto hide-scrollbar">
        {/* Loading screen */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-blue-600">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4"></div>
            <p className="text-md font-semibold">Loading employees...</p>
          </div>
        ) : paginatedUsers.length === 0 ? (
          <div className="flex items-center justify-center bg-gray-200 p-4 mb-4 rounded-lg shadow-md border">
            <h3 className="text-md text-gray-700 font-semibold">
              No user found
            </h3>
          </div>
        ) : (
          paginatedUsers.map((user) => (
            <EmployeeDetailCard
              key={user.userId}
              userId={user.userId}
              name={user.first_name + " " + user.last_name}
              role={user.role}
              status={user.status}
              onView={handleView}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onToggleStatus={showSuspendResume}
            />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-4">
          <button
            className={`px-4 py-2 rounded bg-gray-300 hover:bg-gray-600 hover:text-white z-10 cursor-pointer ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm text-gray-700 pt-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded bg-gray-300 hover:bg-gray-600 hover:text-white z-10 cursor-pointer ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      {/* Filter Dialog Box */}
      {filterDialogbox && (
        <FilterDialogBox
          onConfirm={handleFilterConfirmation}
          onCancel={handleFilterCancellation}
        />
      )}
      {/* EmployeeDetailView */}
      {employeeDetail && <EmployeeViewDetails onGoBack={handleGoBack} />}

      {/*Suspend/Resume Dialog box */}
      {srDialogBox && (
        <UpdateConfirmationDialog
          message={`Do you want to ${
            selectedStatus === "A" ? "suspend" : "resume"
          } the user?`}
          onConfirm={handleSuspendResume}
          onCancel={handleCancelSR}
        />
      )}
    </div>
  );
}

export default EmployeeListPage;
