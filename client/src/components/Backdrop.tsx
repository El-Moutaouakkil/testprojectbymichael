import React, { ReactElement, useContext } from "react";
import styled from "styled-components";
import { modalContext } from "../App";

function Backdrop({ children }: any): ReactElement {
    const { showModal, setShowModal } = useContext(modalContext);

    return (
        <BackdropContainer
           /*  onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                setShowModal(false);
            }} */>
            {children}
        </BackdropContainer>
    );
}

export default Backdrop;

const BackdropContainer = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 0;
    display: grid;
    place-content: center;
`;
