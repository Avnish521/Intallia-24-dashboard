import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/layout/MainLayout";
import { UserTable } from "@/components/users/UserTable";
import { UserTableActions } from "@/components/users/UserTableActions";
import Pagination from "@/components/common/Pagination";
import { exportToExcel, exportToPDF, getPaginatedData } from "@/utils";
import { useUser } from "@/queries/userQueries";
import { User } from "@/types";
import { BASE_TEXT, PATH } from "@/constants";

const USERS_PER_PAGE = 8;
const EXPORT_COLUMNS = ["UserId", "Name", "Email", "Phone", "Address"] as const;

const UserManagement = () => {
  const navigate = useNavigate();
  const { data: usersResponse } = useUser();
  const lookupData = usersResponse?.LookupData ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users by search query
  const filteredUsers = useMemo(() => {
    const searchStr = searchQuery.toLowerCase();
    return lookupData.filter((user: User) =>
      [
        user.FirstName,
        user.LastName,
        user.Email,
        user.ContactNumber,
        user.Address,
        user.UserId,
      ]
        .map((field) => field?.toLowerCase() ?? "")
        .some((field) => field.includes(searchStr)),
    );
  }, [lookupData, searchQuery]);

  // Get paginated data
  const {
    displayedItems: displayedUsers,
    startIndex,
    endIndex,
    totalPages,
  } = useMemo(
    () => getPaginatedData(filteredUsers, currentPage, USERS_PER_PAGE) as {
      displayedItems: User[];
      startIndex: number;
      endIndex: number;
      totalPages: number;
    },
    [filteredUsers, currentPage],
  );

  const exportBody = useMemo(
    () =>
      filteredUsers.map((user: User) => ({
        UserId: user.UserId ?? "",
        Name: `${user.FirstName ?? ""} ${user.LastName ?? ""}`.trim(),
        Email: user.Email ?? "",
        Phone: user.ContactNumber ?? "",
        Address: user.Address ?? "",
      })),
    [filteredUsers],
  );

  const handleExportPDF = () =>
    exportToPDF(EXPORT_COLUMNS, exportBody, "UserList");
  const handleExportExcel = () =>
    exportToExcel(EXPORT_COLUMNS, exportBody, "UserList");
  const handleAddUser = () => navigate(PATH.USER_ADD);

  return (
    <MainLayout>
      <div className="flex min-h-screen bg-background">
        <main className="flex-1 p-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="page-heading">User Management (Users)</h1>
            </div>

            <UserTableActions
              onSearch={setSearchQuery}
              handleDownload={handleExportPDF}
              exportInExcel={handleExportExcel}
              buttonLink={handleAddUser}
              buttonLabel={BASE_TEXT.ADD_NEW_USER}
            />

            <div className="bg-white p-6 rounded-lg">
              <UserTable
                startIndex={startIndex}
                endIndex={endIndex}
                searchQuery={searchQuery}
                users={displayedUsers}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};

export default UserManagement;
