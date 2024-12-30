import React, { useEffect, useState } from "react";

import Assement from "./Assement";
import Support from "./Support";

export default function Carsoule() {
  return (
    <>
      <div className="h-[700px] bg-white text-left">
        <Assement />
        <Support />
      </div>
    </>
  );
}
