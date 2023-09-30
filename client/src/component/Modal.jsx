import React from "react";
import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/ui/select";

const Modal = async ({ contract, setModal }) => {
  const sharing = async () => {
    const address = document.querySelector("#address").value;
    await contract.allow(address);
    setModal(false);
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.accessList();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        const opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger onClick={() => sharing()}>Share</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Share with</AlertDialogTitle>
            <AlertDialogDescription>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="People with Access" />
                </SelectTrigger>
                <SelectContent id="selectNumber">
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Modal;
