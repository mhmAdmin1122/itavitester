import React, { useEffect, useState } from "react";
import Layout from "./component/Layout";
import Head from "next/head";
import ContactData from "./component/ContactData";
import DownloadPDFButton from "./component/DownloadPDFButton";
import DownloadXLSButton from "./component/DownloadXLSButton";
import axios from "axios";

const ContactPage = () => {
  const [apiData, setApiData] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/contact").then((res: any) => {
      setApiData(res.data);
    });
  }, []);

  return (
    <Layout>
      <Head>
        <title>Contact</title>
      </Head>
      <div className="flex items-center gap-3">
        <DownloadXLSButton data={apiData} />
        {/* <DownloadPDFButton data={apiData} /> */}
      </div>
      <div className="flex flex-col gap-4 items-center justify-center w-full">
        <h2 className="text-3xl font-bold py-2">Contact form Data</h2>
        <div className="h-[65vh] overflow-scroll w-full">
          <ContactData />
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
