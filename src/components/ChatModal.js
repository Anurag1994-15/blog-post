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
  const modalStyle = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
      position: 'absolute',
      top: '100px',
      left: '800px',
      right: '10px',
      bottom: '60px',
      border: '1px solid #ccc',
      background: '#e8eef5',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px'
    }
};
const bottomFixed={
  position:'fixed',
  bottom:0,
  right:0,
}

  return (
    <div style={bottomFixed}>
   
      <button type="button" className="px-6 py-3.5 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm text-center mr-2 mb-2" onClick={setModalIsOpenToTrue}>My Chat</button>
      {/* <button  className=" bg-green-400 flex text-left" onClick={setModalIsOpenToTrue}> My CHAT</button> */}
      <Modal isOpen={modalIsOpen} style={modalStyle}>
      <button
          className="font-light float-right text-5xl px-3 py-3 justify-between"
          onClick={setModalIsOpenToFalse}
        >
          <FontAwesomeIcon icon="fa-solid fa-window-close" />
        </button>
        <ChatList />
        
      </Modal>
    </div>
  );
};

export default ChatModal;
