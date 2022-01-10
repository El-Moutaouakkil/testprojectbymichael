import axios from "axios";
import React, { createContext, ReactElement, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { modalContext } from "../App";
import Backdrop from "./Backdrop";
import Modal from "./Modal";
import User, { UserInfo } from "./User";

let usersListContext: React.Context<{
    users: UserInfo[];
    setUsers: React.Dispatch<React.SetStateAction<UserInfo[]>>;
}>;
export default function UserList(): ReactElement {
    const [users, setUsers] = useState<UserInfo[]>([]);
    usersListContext = createContext({ users, setUsers });
     const { showModal, setShowModal } = useContext(modalContext);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/users`)
            .then(({ data }) => setUsers(data))
            .catch((e) => console.error(e));
    }, []);

    return (
        <usersListContext.Provider value={{ users, setUsers }}>
            <UsersListContainer>
                {users.map((user) => (
                    <User
                        key={user.id}
                        id={user.id}
                        first_name={user.first_name}
                        last_name={user.last_name}
                        email={user.email}
                        avatar={user.avatar}
                    />
                ))}
            </UsersListContainer>

            {showModal && (
                
                <Backdrop>
                    <Modal />
                </Backdrop>
            )}
        </usersListContext.Provider>
    );
}

const UsersListContainer = styled.div`
    max-width: 600px;
    margin-inline: auto;
    /* display: grid; */
    /* justify-content: center; */
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: white;
`;

export { usersListContext };

