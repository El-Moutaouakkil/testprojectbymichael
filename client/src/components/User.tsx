import axios from "axios";
import React, {
    Context,
    createContext,
    ReactElement,
    useContext,
    useRef,
    useState,
} from "react";
import { MdDeleteSweep, MdEdit } from "react-icons/md";
import styled from "styled-components";
import { modalContext } from "../App";
import { usersListContext } from "./UserList";

export interface UserInfo {
    id?: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar?: string;
}

function User({
    id,
    first_name,
    last_name,
    email,
    avatar,
}: UserInfo): ReactElement {
    const { users, setUsers } = useContext(usersListContext);
    const { showModal, setShowModal } = useContext(modalContext);

    return (
        <UserContainer>
            <div className='user-avatar-info'>
                <div className='avatar-container'>
                    <img src={avatar} alt='avatarimage' />
                </div>
                <div className='full-name'>
                    {first_name} {last_name}
                </div>
            </div>

            <div className='email'>{email}</div>
            <div className='user-edit'>
                {/* //Todo: add 3 icons  */}
                <span
                    className='edit-icon-container'
                    onClick={(e) => {
                        setShowModal(true);
                    }}>
                    <MdEdit />
                </span>
                <span
                    className='delete-icon-container'
                    onClick={() => {
                        axios
                            .delete(`http://localhost:5000/api/users/${id}`)
                            .catch((e) => console.error(e));
                        setUsers((prevList) =>
                            prevList.filter(
                                (currentUser) => currentUser.id !== id
                            )
                        );
                    }}>
                    <MdDeleteSweep />
                </span>
            </div>
        </UserContainer>
    );
}

export default User;

const UserContainer = styled.div`
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* gap: 4rem; */
    max-width: 500px;
    margin-inline: auto;

    padding-inline: 0.3rem;
    padding-block: 0.7rem;
    border-radius: 5px;
    .user-avatar-info {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        /* background-color: palevioletred; */
        .avatar-container {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: lightgray;
            overflow: hidden;
            img {
                /* border-radius: 0%; */
                display: block;
            }
        }
        .full-name {
            color: #333;
            font-weight: bold;
            flex: 1;
        }
    }
    .email {
        font-style: italic;
        color: #555;
        font-weight: 500;
        font-size: 0.7rem;
        text-align: center;
        /* background-color: cyan; */
        flex: 1;
    }

    .user-edit {
        > * {
            cursor: pointer;
            font-size: 1rem;
            /* background-color: white; */
            border-radius: 50%;
            padding: 0.2rem;
            margin-inline: 0.3rem;
            /* width: 20px; */

            > * {
                width: 20px;
                height: 20px;
                padding-top: 5px;
            }
            &:nth-child(2) {
                color: #ee0b0b;
            }
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
                rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        }
    }
`;
