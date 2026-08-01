import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function Toast({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div class="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} class="toast">
          {toast.type === "error" ? (
            <AlertCircle style={{ width: 18, height: 18, color: "#EF4444" }} />
          ) : (
            <CheckCircle2 style={{ width: 18, height: 18, color: "#10B981" }} />
          )}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
