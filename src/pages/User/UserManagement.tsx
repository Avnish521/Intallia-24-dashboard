import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/layout/MainLayout";
import { UserTable } from "@/components/users/UserTable";
import { UserTableActions } from "@/components/users/UserTableActions";
import Pagination from "@/components/common/Pagination";
import { exportToExcel, exportToPDF } from "@/utils";
import { useUser } from "@/queries/userQueries";
import { User } from "@/types";

const USERS_PER_PAGE = 8;
const EXPORT_COLUMNS = ["UserId", "Name", "Email", "Phone", "Address"] as const;

const UserManagement = () => {
  const navigate = useNavigate();
  const { data: usersResponse } = useUser();

  const lookupData = usersResponse?.LookupData ?? [];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const totalPages = Math.ceil(lookupData.length / USERS_PER_PAGE);

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = Math.min(startIndex + USERS_PER_PAGE, lookupData.length);

  const exportBody = lookupData.map((user: User) => ({
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
              handleDownload={() => exportToPDF(EXPORT_COLUMNS, exportBody, "UserList")}
              exportInExcel={() => exportToExcel(EXPORT_COLUMNS, exportBody, "UserList")}
              buttonLink={() => navigate("/user/add-new-user")}
              buttonLabel="Add New User"
            />

            <div className="bg-white p-6 rounded-lg">
              <UserTable
                startIndex={startIndex}
                endIndex={endIndex}
                searchQuery={searchQuery}
                users={lookupData}
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
