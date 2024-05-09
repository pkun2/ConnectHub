import styled from 'styled-components';

export const LoginContainer = styled.div`
    width: 100%;
    max-width: 500px; 
    margin: 100px auto; 
    padding: 20px;
`;

export const LoginBox = styled.div`
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
    font-size: 32px;
    text-align: center;
    margin-bottom: 20px;
    color: #426B1F;
`;

export const Subtitle = styled.h2`
    font-size: 28px;
    margin-top: 0;
    margin-bottom: 30px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
`;

export const Button = styled.button`
    width: 100%;
    background-color: ${(props) => props.backgroundColor || '#ADD8E6'};
    color: #fff;
    border: none;
    padding: 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    &:hover {
        background-color: ${(props) => props.hoverColor || '#7BB7D3'};
    }
`;

export const FindLinks = styled.div`
    text-align: center;
    margin-top: 5px;
`;

export const StyledLink = styled.a`
    color: #999;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;
