import {
  ModalOverlay as RACModalOverlay,
  Modal as RACModal,
} from "react-aria-components";

export function ModalOverlay({ children, ...props }) {
  return (
    <RACModalOverlay
      {...props}
      className="fixed top-0 left-0 w-full h-screen bg-white bg-opacity-70 backdrop-blur-sm flex items-center justify-center transition-opacity duration-200 animate-modal-fade"
    >
      {children}
    </RACModalOverlay>
  );
}

export function Modal({ children, ...props }) {
  return (
    <RACModal
      {...props}
      className="shadow-lg rounded-md bg-white text-base border border-base-900 outline-none max-w-lg w-full transition-transform duration-300 transform scale-100 animate-modal-zoom"
    >
      {children}
    </RACModal>
  );
}
