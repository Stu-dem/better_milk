"use client";

import useUser from "@/queries/getUser";
import UserInfo from "@/components/UserInfo";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const ClientPage = () => {
  const {data, status, error} =  useUser()


  return (
    <div>
      {status === "success" && <UserInfo user={data} label="🧑‍💻Client component" />}
      {status === "error" && JSON.stringify(error.message)}
      {status === "pending" && <LoadingSpinner />}
    </div>
  );
};

export default ClientPage;
