import { RecoilRoot } from "recoil";
import styled from "styled-components";
import MainCanvas from "./components/MainCanvas";

function App() {
  return (
    <RecoilRoot>
      <Wrapper>
        <MainCanvas />
      </Wrapper>
    </RecoilRoot>
  )
}

export default App

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
