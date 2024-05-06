import React from "react";
import generatePDF from "@/utils/generatePDF";
import { saveAs } from "file-saver";
import { FaCloudDownloadAlt } from "react-icons/fa";

const DownloadPDFButton = ({ data }: { data: any[] }) => {
  const handleDownload = async () => {
    const pdf = await generatePDF(data);
    pdf.download("data.pdf");
  };

  return (
    <div
      onClick={handleDownload}
      className="bg-[#ca8a04] w-fit text-[#000] px-6 py-2 text-lg hover:bg-[#000] hover:text-[#ca8a04] flex items-center gap-2"
    >
      <FaCloudDownloadAlt />
      <p className="cursor-pointer">Download PDF</p>
    </div>
  );
};

export default DownloadPDFButton;
