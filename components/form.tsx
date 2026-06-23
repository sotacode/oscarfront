"use client";

import { Button, Input, Select, SelectItem, Modal, ModalBody, ModalContent, ModalFooter, Spinner, Textarea, useDisclosure } from '@nextui-org/react'
import { siteConfig } from '../config/site';
import { FormContact } from '@/types';
import { validateForm } from '@/utils/common';
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";
import { useState } from 'react';

const serviceOptions = [
  { label: "Pre-Purchase Inspection", value: "pre-purchase-inspection" },
  { label: "Vehicle Servicing", value: "vehicle-servicing" },
  { label: "Fleet Servicing", value: "fleet-servicing" },
  { label: "Brake Repairs", value: "brake-repairs" },
  { label: "Suspension Repairs", value: "suspension-repairs" },
  { label: "WOF Repairs", value: "wof-repairs" },
  { label: "Computer Diagnostics", value: "computer-diagnostics" },
];

export const Form: React.FC<any> = () => {
  const { form } = siteConfig;
  const [contact, setContact] = useState<FormContact>({
    name: '',
    phone: '',
    email: '',
    rego: '',
    serviceRequired: '',
    message: '',
  });
  const [submitAvailable, setSubmitAvailable] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [thereIsError, setThereIsError] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const validates = validateForm(contact);
    setSubmitAvailable(true);
    if (validates.name && validates.phone && validates.email && validates.serviceRequired && validates.message) {
      setIsLoading(true);
      try {
        fetch('https://yggyzbh4ud.execute-api.us-east-1.amazonaws.com/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contact),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
            setContact({
              name: '',
              phone: '',
              email: '',
              rego: '',
              serviceRequired: '',
              message: '',
            });
            setSubmitAvailable(false);
            setThereIsError(false);
            onOpen();
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error:', error);
            setThereIsError(true);
            setIsLoading(false);
          });
      } catch (error) {
        console.log(error);
        setThereIsError(true);
        onOpen();
        setIsLoading(false);
      }
    }
  }
  return (
    <div className='mt-7 w-full'>
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          type="text"
          variant="bordered"
          labelPlacement='outside'
          placeholder={form["EN"].namePlaceholder}
          label={form["EN"].name}
          value={contact.name}
          onValueChange={(value) => setContact(prev => ({ ...prev, name: value }))}
          isInvalid={submitAvailable && !validateForm(contact).name}
          color={submitAvailable && !validateForm(contact).name ? "danger" : "primary"}
          errorMessage={submitAvailable && !validateForm(contact).name && form["EN"].errorName}
          className="flex-1"
        />
        <Input
          type="email"
          variant="bordered"
          labelPlacement='outside'
          placeholder={form["EN"].emailPlaceholder}
          label={form["EN"].email}
          value={contact.email}
          onValueChange={(value) => setContact(prev => ({ ...prev, email: value }))}
          isInvalid={submitAvailable && !validateForm(contact).email}
          color={submitAvailable && !validateForm(contact).email ? "danger" : "primary"}
          errorMessage={submitAvailable && !validateForm(contact).email && form["EN"].errorEmail}
          className="flex-1"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-3">
        <Input
          type="tel"
          variant="bordered"
          labelPlacement='outside'
          placeholder={form["EN"].phonePlaceholder}
          label={form["EN"].phone}
          value={contact.phone}
          onValueChange={(value) => setContact(prev => ({ ...prev, phone: value }))}
          isInvalid={submitAvailable && !validateForm(contact).phone}
          color={submitAvailable && !validateForm(contact).phone ? "danger" : "primary"}
          errorMessage={submitAvailable && !validateForm(contact).phone && form["EN"].errorPhone}
          className="flex-1"
        />
        <Input
          type="text"
          variant="bordered"
          labelPlacement='outside'
          placeholder={form["EN"].regoPlaceholder}
          label={form["EN"].rego}
          value={contact.rego}
          onValueChange={(value) => setContact(prev => ({ ...prev, rego: value }))}
          className="flex-1"
        />
      </div>
      <div className="mt-3">
        <Select
          label={form["EN"].serviceRequired}
          placeholder="Select a service"
          variant="bordered"
          labelPlacement="outside"
          selectedKeys={contact.serviceRequired ? [contact.serviceRequired] : []}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as string;
            setContact(prev => ({ ...prev, serviceRequired: selected || '' }));
          }}
          isInvalid={submitAvailable && !validateForm(contact).serviceRequired}
          color={submitAvailable && !validateForm(contact).serviceRequired ? "danger" : "primary"}
          errorMessage={submitAvailable && !validateForm(contact).serviceRequired && form["EN"].errorServiceRequired}
        >
          {serviceOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="w-full flex flex-col gap-2 mt-3">
        <Textarea
          variant="bordered"
          label={form["EN"].message}
          placeholder={form["EN"].messagePlaceholder}
          labelPlacement="outside"
          value={contact.message}
          onValueChange={(value) => setContact(prev => ({ ...prev, message: value }))}
          isInvalid={submitAvailable && !validateForm(contact).message}
          color={submitAvailable && !validateForm(contact).message ? "danger" : "primary"}
          errorMessage={submitAvailable && !validateForm(contact).message && form["EN"].errorMessage}
        />
      </div>
      <div className="w-full flex flex-col gap-2 my-4">
        <Button color='primary' className="w-full py-2 px-4 rounded font-semibold" onClick={handleSubmit}>
          {isLoading ? <Spinner color="warning" className='' /> : form["EN"].send}
        </Button>
      </div>
      <>
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody className='text-center justify-center'>
                  <p className='text-2xl'>
                    {!thereIsError ? form["EN"].modalMessage : form["EN"].modalErrorMesage}
                  </p>
                  <p className='text-xl'>
                    {!thereIsError ? form["EN"].modalDescription : form["EN"].modalErrorDescription}
                  </p>
                  <div className='my-5'>
                    {!thereIsError ? <FaRegCheckCircle color='green' size='200' className='mx-auto' /> : <FaRegTimesCircle color="red" size='200' className='mx-auto' />}
                  </div>

                </ModalBody>
                <ModalFooter className='justify-center'>
                  <Button color="primary" onPress={onClose}>
                    {form["EN"].buttonCloseModal}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>

  )
}
