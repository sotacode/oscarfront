"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, step2Schema, step3Schema, step4Schema, step5Schema } from "./schema";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import Step4 from "./steps/step4";
import Step5 from "./steps/step5";
import { Button, Card } from "@nextui-org/react";




const steps = [Step1, Step2, Step3, Step4, Step5];
const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema, step5Schema];

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
    <FormProvider {...methods}>
      <Card className="p-6 w-full mx-auto mt-10">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Form />
          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
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
            <Button type="submit">
              {currentStep === steps.length - 1 ? "Book" : currentStep === 3 ? "Pay" : "Next"}
            </Button>
          </div>
        </form>
      </Card>
    </FormProvider>
  );
}
