import { useState } from "react";
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
const EXPORT_COLUMNS = [
  "UserId",
  "Name",
  "Email",
  "ContactNumber",
  "Address",
] as const;

const UserManagement = () => {
  const navigate = useNavigate();
  const { data: usersResponse } = useUser();

  const lookupData = usersResponse?.LookupData ?? [];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter users by search query
  const filteredUsers: User[] = lookupData.filter((user: User) => {
    const searchStr = searchQuery.toLowerCase();
    return (
      user.FirstName?.toLowerCase().includes(searchStr) ||
      user.LastName?.toLowerCase().includes(searchStr) ||
      user.Email?.toLowerCase().includes(searchStr) ||
      user.ContactNumber?.toLowerCase().includes(searchStr) ||
      user.Address?.toLowerCase().includes(searchStr) ||
      user.UserId?.toLowerCase().includes(searchStr)
    );
  });

  // Get paginated data
  const { displayedItems: displayedUsers, startIndex, endIndex, totalPages } = getPaginatedData(
    filteredUsers,
    currentPage,
    USERS_PER_PAGE
  );

  const exportBody = filteredUsers.map((user: User) => ({
    UserId: user.UserId ?? "",
    Name: `${user.FirstName ?? ""} ${user.LastName ?? ""}`.trim(),
    Email: user.Email ?? "",
    Phone: user.ContactNumber ?? "",
    Address: user.Address ?? "",
  }));

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
              handleDownload={() =>
                exportToPDF(EXPORT_COLUMNS, exportBody, "UserList")
              }
              exportInExcel={() =>
                exportToExcel(EXPORT_COLUMNS, exportBody, "UserList")
              }
              buttonLink={() => navigate("/user/add-new-user")}
              buttonLabel="Add New User"
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
