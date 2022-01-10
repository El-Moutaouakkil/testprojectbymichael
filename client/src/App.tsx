import React, { createContext, useState } from "react";
import "./App.css";
import Backdrop from "./components/Backdrop";
import Modal from "./components/Modal";
import User from "./components/User";
import UserList from "./components/UserList";

let modalContext: React.Context<{
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}>;

function App() {
    const [showModal, setShowModal] = useState(false);
    modalContext = createContext({ showModal, setShowModal });

    return (
        <div className='App'>
            <modalContext.Provider value={{ showModal, setShowModal }}>
                <UserList />

            </modalContext.Provider>
        </div>
    );
}

export default App;
export { modalContext };
