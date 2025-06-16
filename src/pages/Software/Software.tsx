import { ActionButton } from "@/components/common/ActionButton";
import Pagination from "@/components/common/Pagination";
import { MainLayout } from "@/layout/MainLayout";
import { STable } from "@/pages/Software/STable";
import { UserTableActions } from "@/components/users/UserTableActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Software as SoftwareType } from "@/types";
import { useSoftware } from "@/queries/simulationQueries";
import { exportToExcel, exportToPDF } from "@/utils";

const Software = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch softwares
  const {
    data: softwares,
    isLoading,
    isError,
  } = useSoftware();

  // Filter softwares by search query
  const filteredCompanies = softwares?.LookupData?.filter((software: SoftwareType) => {
    const searchStr = searchQuery.toLowerCase();
    return (
      software.SoftwareId?.toLowerCase().includes(searchStr) ||
      software.Name?.toLowerCase().includes(searchStr) ||
      software.Description?.toLowerCase().includes(searchStr) ||
      software.TableName?.toLowerCase().includes(searchStr) ||
      software.CreateBy?.toLowerCase().includes(searchStr)
    );
  }) || [];

  const rowPerPage = 8;
  const totalPages = Math.ceil(filteredCompanies.length / rowPerPage);
  const startIndex = (currentPage - 1) * rowPerPage;
  const endIndex = startIndex + rowPerPage;

  const displayedCompanies: SoftwareType[] = filteredCompanies.slice(startIndex, endIndex);

  const headers = [
    "SoftwareId",
    "Name",
    "Description",
    "TableName",
    "CreateBy",
    "CreateDate",
  ]

  const body = filteredCompanies.map((software: SoftwareType) => ({
    SoftwareId: software.SoftwareId ?? "",
    Name: software.Name ?? "",
    Description: software.Description ?? "",
    TableName: software.TableName ?? "",
    CreateBy: software.CreateBy ?? "",
    CreateDate: software.CreateDate ?? "",
  }));

  return (
    <MainLayout>
      <div className="flex p-8 min-h-screen bg-background">
        <main className="flex-1">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="page-heading">Software</h1>
            </div>
            <UserTableActions
              onSearch={setSearchQuery}
              exportInExcel={() => exportToExcel(headers, body, "SoftwareList")}
              handleDownload={() => exportToPDF(headers, body, "SoftwareList")}
              buttonLabel="Add New Software"
              buttonLink={() => navigate("/software/add-new-software")}
            />
            <div className="bg-white p-6 rounded-lg">
              {isLoading && <div>Loading...</div>}
              {isError && <div>Error loading softwares.</div>}
              {!isLoading && !isError && (
                <>
                  <STable
                    searchQuery={searchQuery}
                    softwares={displayedCompanies}
                  />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};

export default Software;
