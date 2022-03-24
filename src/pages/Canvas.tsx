import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

const Canvas = () => {
  const [startMouse, setStartMouse] = useState<number[] | null[]>([null, null]);
  const [endMouse, setEndMouse] = useState<number[] | null[]>([null, null]);
  const [isMouseUp, setIsMouseUp] = useState(true);
  const [resize, setResize] = useState<number[]>([0, 0]);
  const [dragged, setDragged] = useState<any>([]);
  const drawCanvas: HTMLCanvasElement = document.getElementById(
    "draw"
  ) as HTMLCanvasElement;
  const drawCtx = drawCanvas?.getContext("2d");
  const showCanvas: HTMLCanvasElement = document.getElementById(
    "show"
  ) as HTMLCanvasElement;
  const showCtx = showCanvas?.getContext("2d");
  const [canvasLocation, setCanvasLocation] = useState<number[]>([
    drawCanvas?.getBoundingClientRect().x,
    drawCanvas?.getBoundingClientRect().y,
  ]);

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
    const mainPrompt = prompt("영역의 이름은 무엇인가요?", "");
    if (mainPrompt) {
      setDragged([
        ...dragged,
        {
          name: mainPrompt,
          position: [startMouse[0], startMouse[1], endMouse[0], endMouse[1]],
        },
      ]);

      drawCtx?.clearRect(0, 0, 800, 1000);
    }
  };

  const handleMouseLeave = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!isMouseUp) {
      drawCtx?.clearRect(0, 0, 800, 1000);
    }
    setIsMouseUp(true);
  };

  const handleEdit = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    idx: number,
    list: any
  ) => {
    const current = dragged;
    const editName = prompt("수정한 영역의 이름은 무엇인가요?", `${list.name}`);
    current.splice(idx, 1, { name: editName, position: list.position });
    setDragged([...current]);
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    idx: number
  ) => {
    const current = dragged;
    current.splice(idx, 1);
    setDragged([...current]);
  };

  const handleResize = debounce(() => {
    setResize([window.innerWidth, window.innerHeight]);
  }, 800);

  // 저장된 dragg 보여줌
  useEffect(() => {
    if (showCtx) {
      showCtx.clearRect(0, 0, 800, 1000);
      dragged.map((list: any) => {
        const [startX, startY, endX, endY] = list?.position;
        showCtx.lineWidth = 3;
        showCtx.fillStyle = "rgb(29, 209, 161,0.2)";
        showCtx.strokeStyle = "rgb(29, 209, 161)";
        showCtx.fillRect(startX, startY, endX - startX, endY - startY);
        showCtx.strokeRect(startX, startY, endX - startX, endY - startY);
      });
    }
  }, [dragged]);
  // canvas 위치 알아내기
  useEffect(() => {
    const drawCanvas: HTMLCanvasElement = document.getElementById(
      "draw"
    ) as HTMLCanvasElement;
    setCanvasLocation([
      drawCanvas?.getBoundingClientRect().x,
      drawCanvas?.getBoundingClientRect().y,
    ]);
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
    if (
      startMouse[0] &&
      startMouse[1] &&
      endMouse[0] &&
      endMouse[1] &&
      drawCtx &&
      !isMouseUp
    ) {
      drawCtx.lineWidth = 3;
      drawCtx.fillStyle = "rgb(255, 107, 107,0.2)";
      drawCtx.strokeStyle = "rgb(255, 107, 107)";
      drawCtx.clearRect(0, 0, 800, 1000);
      drawCtx.fillRect(
        startMouse[0],
        startMouse[1],
        endMouse[0] - startMouse[0],
        endMouse[1] - startMouse[1]
      );
      drawCtx.strokeRect(
        startMouse[0],
        startMouse[1],
        endMouse[0] - startMouse[0],
        endMouse[1] - startMouse[1]
      );
    }
  }, [startMouse[0], startMouse[1], endMouse[0], endMouse[1]]);

  return (
    <Main>
      <Wrapper>
        <ItemList>
          {dragged &&
            dragged.map((list: any, idx: number) => (
              <Item key={idx}>
                <ItemDiv>{list.name}</ItemDiv>
                <ItemIconsWrapper>
                  <ItemIcon onClick={(event) => handleEdit(event, idx, list)}>
                    ✏️
                  </ItemIcon>
                  <ItemIcon onClick={(event) => handleDelete(event, idx)}>
                    🗑
                  </ItemIcon>
                </ItemIconsWrapper>
              </Item>
            ))}
        </ItemList>
        <CanvasBase
          width="800"
          height="1000"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          id="draw"
        ></CanvasBase>
        <CanvasShow width="800" height="1000" id="show"></CanvasShow>
        <Img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/451a2619-a21b-462d-bb59-a50196e3057a/fashion-unsplash.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220323T084142Z&X-Amz-Expires=86400&X-Amz-Signature=d4f144583d56f8537c0699aa9319330e3a0ac68987a567f0d13c51b460164e7c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22fashion-unsplash.jpg%22&x-id=GetObject"></Img>

        {dragged &&
          dragged.map((list: any, idx: number) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                top: `${list.position[1]}px`,
                left: `${list.position[0]}px`,
                zIndex: "200",
              }}
            >
              {list.name}
            </div>
          ))}
      </Wrapper>
    </Main>
  );
};
export default Canvas;

const Main = styled.main`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.section`
  position: relative;
  width: 800px;
  height: 1000px;
`;
const ItemList = styled.ul`
  position: absolute;
  left: 10px;
  top: 10px;
  margin: 0;
  z-index: 250;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
`;
const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;
const ItemDiv = styled.div`
  font-size: 18px;
  :before {
    content: "✅";
    font-size: 14px;
    padding-right: 10px;
  }
`;
const ItemIconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ItemIcon = styled.div`
  font-size: 13px;
  padding: 0 5px;
  :hover {
    cursor: pointer;
  }
`;

const CanvasBase = styled.canvas`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 800px;
  height: 1000px;
  display: block;
  box-sizing: border-box;
  border: solid 1px black;
  z-index: 100;
`;

const CanvasShow = styled.canvas`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 800px;
  height: 1000px;
  display: block;
  box-sizing: border-box;
  border: solid 2px red;
  z-index: 50;
`;
const Img = styled.img`
  position: absolute;
  width: 800px;
  left: 0px;
  top: 0px;
`;
