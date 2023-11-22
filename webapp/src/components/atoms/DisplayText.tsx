import styled from "@emotion/styled";


interface Props {
    text: string;
    className: string;
}
export const DisplayText = (props:Props) =>{
    return(
        <Wrapper className={props.className}>{props.text}</Wrapper>
    )
}

const Wrapper = styled.div`
  position: fixed;
  transform: translate(-50%, -50%);
  z-index: 50;
  padding: 10px 18px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 9999px;
`;
