"use client";

import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      style={
        {
          "--normal-bg": "rgba(0, 0, 0, 0.9)",
          "--normal-text": "#ffffff",
          "--normal-border": "rgba(255, 255, 255, 0.1)",
          "--success-bg": "#18B668",
          "--success-text": "#ffffff",
          "--error-bg": "#dc2626",
          "--error-text": "#ffffff",
        } as React.CSSProperties
      }
      position="top-right"
      expand={true}
      richColors={true}
      {...props}
    />
  );
};

export { Toaster };
