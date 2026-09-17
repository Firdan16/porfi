"use client";

import { useEffect, useState } from "react";
import CustomCursor from "./CustomCursor";

export default function CustomCursorLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <CustomCursor />;
}
