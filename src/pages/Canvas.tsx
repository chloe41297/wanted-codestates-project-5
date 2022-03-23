import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

const Canvas = () => {
  const [canvasLocation, setCanvasLocation] = useState<number[]>([0, 0]);
  const [startMouse, setStartMouse] = useState<number[] | null[]>([null, null]);
  const [endMouse, setEndMouse] = useState<number[] | null[]>([null, null]);
  const [isMouseUp, setIsMouseUp] = useState(true);
  const [resize, setResize] = useState<number[]>([0, 0]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    setStartMouse([
      event.clientX - canvasLocation![0],
      event.clientY - canvasLocation![1],
    ]);
    setEndMouse([null, null]);
    setIsMouseUp(false);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    setEndMouse([
      event.clientX - canvasLocation![0],
      event.clientY - canvasLocation![1],
    ]);
  };

  const handleMouseUp = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    setIsMouseUp(true);
  };

  const handleResize = debounce(() => {
    setResize([window.innerWidth, window.innerHeight]);
  }, 800);

  // canvas 위치 알아내기
  useEffect(() => {
    const canvasElem = document
      .querySelector("canvas")
      ?.getBoundingClientRect();
    if (canvasElem) {
      setCanvasLocation([canvasElem?.x, canvasElem?.y]);
    }
  }, [resize]);
  // window resize 알아내기
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // canvas 그리기
  useEffect(() => {
    const canvasElem = document.querySelector("canvas")?.getContext("2d");
    if (
      startMouse[0] &&
      startMouse[1] &&
      endMouse[0] &&
      endMouse[1] &&
      canvasElem &&
      !isMouseUp
    ) {
      canvasElem.lineWidth = 5;
      canvasElem.fillStyle = "rgb(29, 209, 161,0.2)";
      canvasElem.strokeStyle = "rgb(29, 209, 161)";
      canvasElem.clearRect(0, 0, 800, 800);
      canvasElem.fillRect(
        startMouse[0],
        startMouse[1],
        endMouse[0] - startMouse[0],
        endMouse[1] - startMouse[1]
      );
      canvasElem.strokeRect(
        startMouse[0],
        startMouse[1],
        endMouse[0] - startMouse[0],
        endMouse[1] - startMouse[1]
      );
    }
  }, [startMouse[0], startMouse[1], endMouse[0], endMouse[1]]);

  return (
    <div>
      <CanvasBase
        width="800"
        height="800"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></CanvasBase>
    </div>
  );
};
export default Canvas;

const Main = styled.main`
  width: 100vw;
  height: 100vh;
`;

const CanvasBase = styled.canvas`
  width: 800px;
  height: 800px;
  margin: 0 auto;
  display: block;
  box-sizing: border-box;
  border: solid 1px black;
`;
