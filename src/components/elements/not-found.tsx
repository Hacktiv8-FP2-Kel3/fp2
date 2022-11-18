import React from "react";
import Lottie from "lottie-react";
import NotFound from "../../assets/404-page.json";

export default function NotFoundComponent() {
  return (
    <Lottie animationData={NotFound} loop={true} style={{ width: "45%" }} />
  );
}
