import { Html, useProgress } from "@react-three/drei";
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { IsEnteredAtom } from "../stores";

export const Loader = ({ isCompleted }) => {
  const [isEntered, setIsEntered] = useRecoilState(IsEnteredAtom);

  const progress = useProgress();

  if (isEntered) {
    return null;
  }
  return (
    <Html center>
      <BlurredBackground />
      <Container>
        <ProgressBar value={progress}>
          {isCompleted ? 100 : progress.progress}%
        </ProgressBar>
        <EnterBtn onClick={() => setIsEntered(true)}>
          Enter
        </EnterBtn>
      </Container>
    </Html>
  );
};

export default Loader;

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const BlurredBackground = styled.div`
  width: 400px;
  height: 400px;
  background-color: red;
  border-radius: 50%;
  filter: blur(300px);
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
`;

const ProgressBar = styled.div`
  font-size: 24px;
  color: #ccc;
`;

const EnterBtn = styled.button`
  animation: ${blink} 1s infinite;
  transition-duration: 0.4s;
  font-size: 16px;
  outline: none;
  border: 0.5px solid #999;
  padding: 8px 18px;
  background-color: transparent;
  color: #999;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
    color: #dc4f00;
  }
`;