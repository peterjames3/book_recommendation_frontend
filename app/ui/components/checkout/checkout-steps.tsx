// app/ui/checkout/checkout-steps.tsx
interface CheckoutStepsProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: 'Customer Info' },
  { number: 2, label: 'Confirmation' }
];

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= step.number
                ? 'bg-accent2 border-primary text-text'
                : 'border-gray-300 text-gray-500'
            }`}>
              {step.number}
            </div>
            <span className={`ml-2 font-medium ${
              currentStep >= step.number ? 'text-primary' : 'text-gray-500'
            }`}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-4 ${
                currentStep > step.number ? 'bg-accent2' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}