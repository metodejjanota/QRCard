import React, { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";

type ToastType = "success" | "info";

interface ToastContextType {
	showToast: (type: ToastType, text: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
	children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
	const [toast, setToast] = useState<{ type: ToastType; text: string } | null>(
		null
	);

	const showToast = useCallback((type: ToastType, text: string) => {
		setToast({ type, text });
		setTimeout(() => setToast(null), 1000);
	}, []);

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			{toast &&
				createPortal(
					<div className="toast toast-center">
						<div className={`alert alert-${toast.type}`}>
							<span>{toast.text}</span>
						</div>
					</div>,
					document.body
				)}
		</ToastContext.Provider>
	);
};

export const useToast = (): ToastContextType => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
};
