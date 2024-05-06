import React, { useEffect, useState } from "react";
import Layout from "./component/Layout";
import Head from "next/head";
import NewsletterData from "./component/NewsletterData";
import DownloadXLSButton from "./component/DownloadXLSButton";
import DownloadPDFButton from "./component/DownloadPDFButton";
import axios from "axios";

const NewsletterPage = () => {
  const [apiData, setApiData] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/newsletter").then((res: any) => {
      setApiData(res.data);
    });
  }, []);
  return (
    <Layout>
      <Head>
        <title>Newsletter</title>
      </Head>
      <div className="flex items-center gap-3">
        <DownloadXLSButton data={apiData} />
        {/* <DownloadPDFButton data={apiData} /> */}
      </div>
      <div className="flex flex-col gap-4 items-center justify-center w-full">
        <h2 className="text-3xl font-bold py-2">Newsletter form Data</h2>
        <div className="h-[65vh] overflow-scroll w-full">
          <NewsletterData />
        </div>
      </div>
    </Layout>
  );
};

export default NewsletterPage;
