import React from "react";
import generateXLS from "@/utils/generateXLS";
import { saveAs } from "file-saver";
import { FaCloudDownloadAlt } from "react-icons/fa";

const DownloadXLSButton = ({ data }: { data: any[] }) => {
  const handleDownload = async () => {
    const xls = await generateXLS(data);
    const d = new Date();
    let time = d.getTime();
    saveAs(
      new Blob([xls], { type: "application/vnd.ms-excel" }),
      `${time}.xls`
    );
  };

  return (
    <div
      onClick={handleDownload}
      className="bg-[#ca8a04] w-fit text-[#000] px-6 py-2 text-lg hover:bg-[#000] hover:text-[#ca8a04] flex items-center gap-2"
    >
      <FaCloudDownloadAlt />
      <p className="cursor-pointer">Download XLS</p>
    </div>
  );
};

export default DownloadXLSButton;
