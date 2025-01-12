import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import Image from "next/image";

function CustomLoader({ isLoading }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <div>
      {isLoading && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody className="p-10 flex w-full items-center justify-center">
                  <Image
                    src={"/loader.gif"}
                    alt="Magic Hat"
                    height={100}
                    width={100}
                    className="w-[150px] h-[150px] text-center"
                  />
                  <h2 className="font-bold text-2xl text-primary text-center">
                    Generating Story ...
                  </h2>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default CustomLoader;
