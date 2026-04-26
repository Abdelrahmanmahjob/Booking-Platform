import { forwardRef } from "react";
import { IconType } from "react-icons/lib";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: IconType;
  rightElement?: React.ReactNode;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, icon: Icon, rightElement, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">
          {label}
        </label>
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="text-muted-foreground" size={18} />
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full py-3 
              ${Icon ? "pl-10" : "pl-4"}
              ${rightElement ? "pr-12" : "pr-4"}
              border-2 rounded-xl
              bg-background/50
              transition-all duration-200
              placeholder:text-muted-foreground
              focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary
              ${
                error
                  ? "border-destructive/50 focus:border-destructive focus:ring-destructive/20"
                  : "border-border hover:border-border/80"
              }
              ${className}
            `}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-destructive flex items-center gap-1 animate-slide-down">
            <svg
              className="w-4 h-4 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";
