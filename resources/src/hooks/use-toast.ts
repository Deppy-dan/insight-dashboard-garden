
// This is a simplified version of the toast hook for the resources/src directory
import { useState } from "react";

type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

// Simple implementation
export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, ...props };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => 
        prevToasts.filter((toast) => toast.id !== id)
      );
    }, 5000);
    
    return id;
  };

  const dismiss = (toastId?: string) => {
    setToasts((prevToasts) => 
      prevToasts.filter((toast) => toast.id !== toastId)
    );
  };

  return {
    toast,
    dismiss,
    toasts,
  };
};

export const toast = (props: ToastProps) => {
  // This would normally access a global context, 
  // but for simplicity, we'll just log to console
  console.log("Toast:", props);
  return props;
};
