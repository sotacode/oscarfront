"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, step2Schema, step3Schema, step4Schema, step5Schema, step6Schema, step7Schema } from "./schema";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import Step4 from "./steps/step4";
import Step5 from "./steps/step5";
import Step6 from "./steps/step6";
import Step7 from "./steps/step7";
import { Button, Card } from "@nextui-org/react";

// Create context for navigation
const StepNavigationContext = createContext<{ goToNextStep: () => void } | null>(null);
export const useStepNavigation = () => useContext(StepNavigationContext);

const steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7];
const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema, step5Schema, step6Schema, step7Schema];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const Form = steps[currentStep];

  // Use step-specific schema for validation
  const methods = useForm({
    resolver: zodResolver(stepSchemas[currentStep]),
    mode: "all",
  });

  // Store all form data across steps
  const [allData, setAllData] = useState({});

  // Function to go to next step (exposed via context)
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      // Get current form values and merge with allData
      const currentValues = methods.getValues();
      const mergedData = { ...allData, ...currentValues };
      setAllData(mergedData);

      setCurrentStep((s) => s + 1);
      setTimeout(() => {
        methods.reset(mergedData);
      }, 0);
    }
  };

  // Auto-advance to Step 7 when payment completes
  useEffect(() => {
    if ((allData as any).status === "created" || (allData as any).status === "failed") {
      if (currentStep === 5) { // Step 6 (0-indexed)
        goToNextStep();
      }
    }
  }, [(allData as any).status, currentStep]);

  const onSubmit = (data: any) => {
    // Merge current step data into allData
    const mergedData = { ...allData, ...data };
    console.log("Merged Data", mergedData);
    setAllData(mergedData);
    console.log("Step Data", data);
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
      // Reset form for next step
      setTimeout(() => {
        methods.reset(mergedData);
      }, 0);
    } else {
      // Final submit: validate all data
      console.log("Final Submit", mergedData);
    }
  };

  return (
    <StepNavigationContext.Provider value={{ goToNextStep }}>
      <FormProvider {...methods}>
        <Card className="p-6 w-full mx-auto mt-10">
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Form />
            <div className="flex justify-between mt-6">
              {currentStep > 0 && currentStep < 6 && (
                <Button
                  type="button"
                  variant="flat"
                  onPress={() => {
                    setCurrentStep((s) => s - 1)
                  }}
                >
                  Back
                </Button>
              )}
              {currentStep < 5 && (
                <Button type="submit">
                  {currentStep === steps.length - 1 ? "Complete" : currentStep === 4 ? "Proceed to Payment" : "Next"}
                </Button>
              )}
            </div>
          </form>
        </Card>
      </FormProvider>
    </StepNavigationContext.Provider>
  );
}
