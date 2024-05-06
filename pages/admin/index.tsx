import React from "react";
import Layout from "./component/Layout";
import Head from "next/head";
import NewsletterData from "./component/NewsletterData";
import ContactData from "./component/ContactData";

const AdminHome = () => {
  return (
    <Layout>
      <Head>
        <title>Admin Home</title>
      </Head>
      <div>
        <h2 className="text-4xl font-bold w-full text-center py-3">
          Admin Home Page
        </h2>
        <div className="flex gap-2 items-start justify-center">
          <div className="w-[55%] flex flex-col justify-center items-start border-r-[1px] border-r-gray-200">
            <h3 className="text-center w-full font-bold text-xl">
              Newsletter Data
            </h3>
            <NewsletterData />
          </div>

          <div className="w-[45%] flex flex-col justify-center items-start">
            <h3 className="text-center w-full font-bold text-xl">
              Contact Form Data
            </h3>
            <div className="px-6 flex flex-col items-center justify-start w-full py-2 h-[65vh] overflow-scroll">
              <ContactData />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
