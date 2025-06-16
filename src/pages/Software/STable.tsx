import { Badge } from "@/components/ui/badge";
import { Software } from "@/types/index";
import ThreeDotMenu from "@/components/common/ActonModal";
import { DataTable, Column } from "@/components/common/DataTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCompany } from "@/http/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDeleteSoftware } from "@/queries/simulationQueries";

const tableColumns: Column<Software>[] = [
  {
    key: "software-id",
    header: "Software ID",
    render: (software) => software.SoftwareId,
  },
  {
    key: "name",
    header: "Software Name",
    render: (software) => software.Name,
  },
  {
    key: "description",
    header: "Description",
    render: (software) => software.Description,
  },
  {
    key: "table-name",
    header: "Table Name",
    render: (software) => software.CreateBy,
  },
  // {
  //   key: "create-date",
  //   header: "CreateDate",
  //   render: (software) => software.CreateDate,
  // }
];

interface STableProps {
  searchQuery: string;
  softwares: Software[];
}

export const STable = ({ searchQuery, softwares }: STableProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleEdit = (companyId: string | number) => {
    if (!companyId) {
      toast.error("SoftwareId is undefined");
      return;
    }
    navigate(`/software/${companyId}`);
  };

  const deleteSoftwareMutation = useDeleteSoftware();

  const getRowActions = (software: Software) => {
    if (!software || !software.SoftwareId) return null;
    return (
      <ThreeDotMenu
        actions={[
          {
            label: "Edit",
            onClick: () => handleEdit(software.SoftwareId),
          },
          {
            label: "Delete",
            onClick: () => deleteSoftwareMutation.mutate(software.SoftwareId),
            className: "text-red-600 hover:bg-red-50",
          },
        ]}
      />
    );
  };

  return (
    <DataTable
      data={softwares}
      columns={tableColumns}
      rowKey={(software) => software.SoftwareId}
      selectable
      actions={getRowActions}
    />
  );
};
