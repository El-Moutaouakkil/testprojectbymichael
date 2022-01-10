import axios from "axios";
import React, {
    FormEvent,
    MouseEventHandler,
    ReactElement,
    useContext,
    useState,
} from "react";
import styled from "styled-components";
import { modalContext } from "../App";
import { MdClose } from "react-icons/md";
import { usersListContext } from "./UserList";

interface Props {}

function Modal({}: Props): ReactElement {
    const [id, setId] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const { showModal, setShowModal } = useContext(modalContext);
    const { users, setUsers } = useContext(usersListContext);

    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let updatedUser = {
            id,
            first_name: firstName,
            last_name: lastName,
            email: email,
        };
        axios
            .put("http://localhost:5000/api/users", updatedUser)
            .then(() => console.log("user updated"))
            .then(() => {
                let updatedUserIndex = users.findIndex(
                    (user) => user.id == updatedUser.id
                );
                users[updatedUserIndex] = {
                    ...users[updatedUserIndex],
                    ...updatedUser,
                };
                return users;
            })
            .then((users) => setUsers(users))
            .then(() => setShowModal(false));

        // console.log(users);
    };

    return (
        <ModalContainer>
            <form>
                <h4>Enter the user infos</h4>
                <input
                    required
                    placeholder='id'
                    type='text'
                    name='id'
                    value={id}
                    onChange={(e) => setId(e.target.value as any)}
                />
                <input
                    required
                    placeholder='first name'
                    type='text'
                    name='first_name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value as any)}
                />
                <input
                    required
                    placeholder='last name'
                    type='text'
                    name='last_name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value as any)}
                />
                <input
                    required
                    placeholder='email'
                    type='text'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value as any)}
                />
                <button
                    type='submit'
                    onClick={(e) => {
                        handleSubmit(e);
                    }}>
                    Send
                </button>
            </form>
            <div
                className='close-button'
                onClick={(e) => {
                    setShowModal(false);
                }}>
                <MdClose />
            </div>
        </ModalContainer>
    );
}

export default Modal;

const ModalContainer = styled.div`
    /* position: absolute;
    z-index: 9999999; */
    position: relative;
    form {
        padding: 2rem;
        background-color: white;
        border-radius: 5px;
        > * {
            display: block;
            margin-block: 1rem;
            padding: 0.5rem;
        }
        button {
            cursor: pointer;
            padding: 0.3rem 0.8rem;
            background-color: crimson;
            border: none;
            border-radius: 5px;
            color: white;
        }
        h4 {
            font-weight: 500;
            margin: 0.5rem;
            padding: 0 0.6rem;
            color: #222;
            text-align: left;
        }
    }
    .close-button {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        margin: 0.4rem;
        background-color: #222;
        color: whitesmoke;
        width: 25px;
        height: 25px;
        display: grid;
        place-content: center;
        border-radius: 50%;
    }
`;
