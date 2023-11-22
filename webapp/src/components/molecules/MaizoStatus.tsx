import styled from "@emotion/styled";
import { useCoinContext } from "../../provider/CoinProvider";

interface Props {
  coin: number;
}
export const MaizoStatus = (props: Props) => {
  const coinContext = useCoinContext();
  return (
    <Wrapper isPrime={coinContext.isPrime}>
      <SubWrapper isPrime={coinContext.isPrime}>
        <Row>
          <img src="image/maizocoin.png" alt="maizocoin" width={30} />
          <CoinText isPrime={coinContext.isPrime}>{props.coin}</CoinText>
        </Row>
      </SubWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isPrime: boolean }>`
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 50;
  padding: 3px;
  background: ${(props) => (props.isPrime ? "linear-gradient(180deg, #FFA800 25%, #A53939 79.17%)" : "transparent")};
  border-radius: 30px;
`;

const SubWrapper = styled.div<{ isPrime: boolean }>`
  margin: auto;
  background-color:${(props) => (props.isPrime ? "#000" : "rgba(0, 0, 0, 0.5)")};
  border-radius: 30px;
  padding: 5px 10px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: auto;
`;

const CoinText = styled.div<{ isPrime: boolean }>`
  font-size: 1.2rem;
  font-weight: bold;
  background: ${(props) => (props.isPrime ? "linear-gradient(180deg, #FFA800 25%, #A53939 79.17%)" : "#fff")};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
