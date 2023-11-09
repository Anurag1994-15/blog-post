import React, { useState } from "react";
import Modal from "react-modal";
import ChatList from "./ChatList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button  onClick={setModalIsOpenToTrue}> My CHAT</button>
      <Modal isOpen={modalIsOpen}>
        <ChatList />
        <button
          className=" font-light float-right text-5xl px-3 py-3 mt-3 justify-between"
          onClick={setModalIsOpenToFalse}
        >
          <FontAwesomeIcon icon="fa-solid fa-window-close" />
        </button>
      </Modal>
    </div>
  );
};

export default ChatModal;
