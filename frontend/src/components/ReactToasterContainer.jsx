"use client";

import "react-toastify/dist/ReactToastify.css";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const ReactToasterContainer = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error")) {
      toast.error(searchParams.get("error"));
    }
  }, [searchParams]);

  return <ToastContainer />;
};

export default ReactToasterContainer;
