import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "warning" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

interface ToastProps {
  key?: string;
  toast: ToastMessage;
  onClose: (id: string) => void;
}

export function Toast({ toast, onClose }: ToastProps) {
  const iconMap = {
    success: <CheckCircle className="w-5 h-5 text-success" />,
    warning: <AlertTriangle className="w-5 h-5 text-warning" />,
    error: <XCircle className="w-5 h-5 text-danger" />,
    info: <Info className="w-5 h-5 text-accent" />,
  };

  const bgMap = {
    success: "bg-white border-l-4 border-success shadow-lg",
    warning: "bg-white border-l-4 border-warning shadow-lg",
    error: "bg-white border-l-4 border-danger shadow-lg",
    info: "bg-white border-l-4 border-accent shadow-lg",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      className={`flex items-start gap-3 p-4 rounded-xl min-w-[320px] max-w-sm ${bgMap[toast.type]} border border-border-main`}
      id={`toast-${toast.id}`}
    >
      <div className="mt-0.5">{iconMap[toast.type]}</div>
      <div className="flex-1">
        <h4 className="font-display font-semibold text-sm text-secondary">
          {toast.title}
        </h4>
        <p className="text-xs text-text-muted mt-1 leading-relaxed">
          {toast.message}
        </p>
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className="text-text-muted hover:text-secondary hover:bg-surface-main p-1 rounded-full transition-colors"
        aria-label="Close notification"
        id={`close-toast-${toast.id}`}
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
}
