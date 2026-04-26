import { ReloadIcon } from "@radix-ui/react-icons";

interface SubmitButtonProps {
  isLoading: boolean;
  loadingText: string;
  text: string;
}

export function SubmitButton({
  isLoading,
  loadingText,
  text,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="
        group relative w-full py-3 px-4
        bg-primary hover:bg-primary/90
        text-primary-foreground font-medium rounded-xl
        shadow-lg shadow-primary/25
        hover:shadow-xl hover:shadow-primary/30
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-4 focus:ring-primary/30
      "
    >
      <span className="flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <ReloadIcon className="h-5 w-5 animate-spin" />
            {loadingText}
          </>
        ) : (
          <>
            {text}
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </>
        )}
      </span>
    </button>
  );
}
