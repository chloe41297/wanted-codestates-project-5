import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import MainButton from "components/MainButton";
import backgroundImg from "../asset/background.jpg";

const Canvas = () => {
  const [startMouse, setStartMouse] = useState<number[] | null[]>([null, null]);
  const [endMouse, setEndMouse] = useState<number[] | null[]>([null, null]);
  const [isMouseUp, setIsMouseUp] = useState(true);
  const [resize, setResize] = useState<number[]>([0, 0]);
  const [dragged, setDragged] = useState<any>([]);
  const [isChecked, setIsChecked] = useState<number[]>([]);
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
  const localStorage = window.localStorage;
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

  const handleMouseUp = () => {
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
      localStorage.setItem(
        "canvasItem",
        JSON.stringify([
          ...dragged,
          {
            name: mainPrompt,
            position: [startMouse[0], startMouse[1], endMouse[0], endMouse[1]],
          },
        ])
      );
    } else {
      drawCtx?.clearRect(0, 0, 800, 1000);
    }
  };

  const handleMouseLeave = () => {
    if (!isMouseUp) {
      drawCtx?.clearRect(0, 0, 800, 1000);
    }
    setIsMouseUp(true);
  };

  const handleEdit = (idx: number, list: any) => {
    const current = dragged;
    const editName = prompt("수정한 영역의 이름은 무엇인가요?", `${list.name}`);
    current.splice(idx, 1, { name: editName, position: list.position });
    setDragged([...current]);
    localStorage.setItem("canvasItem", JSON.stringify([...current]));
  };

  const handleDelete = (idx: number) => {
    const current = dragged;
    current.splice(idx, 1);
    setDragged([...current]);
    localStorage.setItem("canvasItem", JSON.stringify([...current]));
  };

  const handleResize = debounce(() => {
    setResize([window.innerWidth, window.innerHeight]);
  }, 800);

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
    list: any
  ) => {
    if (showCtx) {
      if (!isChecked.includes(idx)) {
        setIsChecked([...isChecked, idx]);
      } else if (isChecked.includes(idx)) {
        const currentChecked = isChecked;
        setIsChecked([...currentChecked.filter((number) => number !== idx)]);
      }
    }
  };

  // 저장된 dragg 보여줌
  useEffect(() => {
    if (showCtx) {
      showCtx.clearRect(0, 0, 800, 1000);
      dragged.forEach((list: any, idx: number) => {
        const [startX, startY, endX, endY] = list?.position;
        if (isChecked.includes(idx)) {
          showCtx.lineWidth = 3;
          showCtx.fillStyle = "rgb(253, 203, 110,0.2)";
          showCtx.strokeStyle = "rgb(253, 203, 110)";
          showCtx.fillRect(startX, startY, endX - startX, endY - startY);
          showCtx.strokeRect(startX, startY, endX - startX, endY - startY);
        } else if (!isChecked.includes(idx)) {
          showCtx.lineWidth = 3;
          showCtx.fillStyle = "rgb(29, 209, 161,0.2)";
          showCtx.strokeStyle = "rgb(29, 209, 161)";
          showCtx.fillRect(startX, startY, endX - startX, endY - startY);
          showCtx.strokeRect(startX, startY, endX - startX, endY - startY);
        }
      });
    }
  }, [dragged, isChecked]);
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
    if (localStorage.getItem("canvasItem")) {
      const storeData = localStorage.getItem("canvasItem") as any;
      setDragged([...JSON.parse(storeData)]);
    }
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
      <MainButton></MainButton>
      <Wrapper>
        <ItemList>
          {dragged &&
            dragged.map((list: any, idx: number) => (
              <Item key={idx}>
                <ItemDiv>
                  <input
                    type="checkbox"
                    checked={isChecked.includes(idx)}
                    onChange={(e) => handleCheck(e, idx, list)}
                  ></input>
                  {list.name}
                </ItemDiv>
                <ItemIconsWrapper>
                  <ItemIcon onClick={() => handleEdit(idx, list)}>✏️</ItemIcon>
                  <ItemIcon onClick={() => handleDelete(idx)}>🗑</ItemIcon>
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
        <Img src={backgroundImg}></Img>

        {dragged &&
          dragged.map((list: any, idx: number) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                top: `${
                  list.position[1] >= list.position[3]
                    ? list.position[3]
                    : list.position[1]
                }px`,
                left: `${
                  list.position[0] >= list.position[2]
                    ? list.position[2]
                    : list.position[0]
                }px`,
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
  z-index: 50;
`;
const Img = styled.img`
  position: absolute;
  width: 800px;
  left: 0px;
  top: 0px;
`;
