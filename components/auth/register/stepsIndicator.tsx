export default function StepsIndicator({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <div className="flex items-center justify-center mb-8">
      {[
        { step: 1, label: "Account" },
        { step: 2, label: "Business" },
        { step: 3, label: "Schedule" },
      ].map((item, index) => (
        <div key={item.step} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`
                  w-9 h-9 rounded-full flex items-center justify-center
                  text-sm font-bold transition-all duration-300
                  ${
                    currentStep > item.step
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                      : currentStep === item.step
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/40 scale-110 ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                  }
                `}
            >
              {currentStep > item.step ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                item.step
              )}
            </div>
            <span
              className={`
                  text-xs font-medium transition-colors
                  ${currentStep >= item.step ? "text-primary" : "text-muted-foreground"}
                `}
            >
              {item.label}
            </span>
          </div>

          {/* Connector Line */}
          {index < 2 && (
            <div className="w-12 md:w-16 h-0.5 mx-2 mb-5 transition-all duration-500 rounded-full overflow-hidden bg-muted">
              <div
                className={`
                    h-full bg-primary transition-all duration-500
                    ${currentStep > item.step ? "w-full" : "w-0"}
                  `}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
