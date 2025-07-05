import React from "react";
import { Check } from "lucide-react";

interface CheckboxProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "success" | "warning" | "error";
}

export const Checkbox: React.FC<CheckboxProps> = ({
    checked = false,
    onCheckedChange,
    disabled = false,
    className = "",
    size = "md",
    variant = "default",
}) => {
    const handleChange = () => {
        if (!disabled && onCheckedChange) {
            onCheckedChange(!checked);
        }
    };

    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    };

    const variantClasses = {
        default: {
            base: "border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600",
            focus: "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            hover: "hover:border-gray-400 data-[state=checked]:hover:bg-blue-700",
        },
        success: {
            base: "border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600",
            focus: "focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
            hover: "hover:border-gray-400 data-[state=checked]:hover:bg-green-700",
        },
        warning: {
            base: "border-gray-300 data-[state=checked]:bg-yellow-600 data-[state=checked]:border-yellow-600",
            focus: "focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2",
            hover: "hover:border-gray-400 data-[state=checked]:hover:bg-yellow-700",
        },
        error: {
            base: "border-gray-300 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600",
            focus: "focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
            hover: "hover:border-gray-400 data-[state=checked]:hover:bg-red-700",
        },
    };

    const iconSizes = {
        sm: "w-3 h-3",
        md: "w-3.5 h-3.5",
        lg: "w-4 h-4",
    };

    const currentVariant = variantClasses[variant];

    return (
        <div
            className={`
        relative inline-flex items-center justify-center
        ${sizeClasses[size]}
        border-2 rounded-md cursor-pointer
        ${currentVariant.base}
        ${!disabled ? currentVariant.hover : ""}
        ${!disabled ? currentVariant.focus : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${checked ? "shadow-sm" : ""}
        ${className}
      `}
            data-state={checked ? "checked" : "unchecked"}
            onClick={handleChange}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleChange();
                }
            }}
            tabIndex={disabled ? -1 : 0}
            role="checkbox"
            aria-checked={checked}
            aria-disabled={disabled}
        >
            {checked && (
                <Check
                    className={`${iconSizes[size]} text-white`}
                    strokeWidth={3}
                />
            )}
        </div>
    );
};
