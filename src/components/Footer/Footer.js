import React from 'react';
import styled from 'styled-components';

const Footer = props => {
    const currentYear = new Date().getFullYear();

    return(
        <FooterContainer>
            <Copyright>Copyright &copy; {currentYear}</Copyright>
        </FooterContainer>
    );
};

// Styles
const FooterContainer = styled.footer`
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Copyright = styled.p`
        font-size: 1.5rem;
        color: rgb(122, 122, 122);
`;

export default Footer;