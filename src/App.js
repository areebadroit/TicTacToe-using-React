import React, { useState } from "react";

import Icon from "./components/icon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
const itemArray = new Array(9).fill("empty");

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");
  const [count, setCount] = useState(0);
  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    setCount(0);
    itemArray.fill("empty", 0, 9);
  };
  const checkIsWinnerHelper = (a, b, c) => {
    if (
      itemArray[a] !== "empty" &&
      itemArray[a] === itemArray[b] &&
      itemArray[a] === itemArray[c]
    ) {
      return true;
    }
  };
  const checkIsWinner = () => {
    // if (itemArray[0] !== "empty" && itemArray[0] === itemArray[1] && itemArray[0] === itemArray[2]) {
    //   setWinMessage(itemArray[0]);
    // }
    //alert(count);
    if (count >= 8) {
      setWinMessage(`Game Draw`);
    }
    if (checkIsWinnerHelper(0, 1, 2)) {
      setWinMessage(`${itemArray[0]} wins`);
    } else if (checkIsWinnerHelper(3, 4, 5)) {
      setWinMessage(`${itemArray[3]} wins`);
    } else if (checkIsWinnerHelper(6, 7, 8)) {
      setWinMessage(`${itemArray[6]} wins`);
    } else if (checkIsWinnerHelper(0, 3, 6)) {
      setWinMessage(`${itemArray[0]} wins`);
    } else if (checkIsWinnerHelper(1, 4, 7)) {
      setWinMessage(`${itemArray[1]} wins`);
    } else if (checkIsWinnerHelper(2, 5, 8)) {
      setWinMessage(`${itemArray[2]} wins`);
    } else if (checkIsWinnerHelper(0, 4, 8)) {
      setWinMessage(`${itemArray[0]} wins`);
    } else if (checkIsWinnerHelper(2, 4, 6)) {
      setWinMessage(`${itemArray[2]} wins`);
    }
  };
  const changeItem = (itemNumber) => {
    if (winMessage) {
      return toast(
        (winMessage === "circle wins")?
        `Circle has won the game, please reload the game to continue playing`:`Cross has won the game, please reload the game to continue playing`,
        { type: "success" }
      );
    }
    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setCount(count + 1);
      setIsCross(!isCross);
    } else {
      return toast("already filled", { type: "error" });
    }
    checkIsWinner();
  };
  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
          {winMessage ? (
            <div className="mb-2 mt-2">
              <h1 className="text-success text-uppercase text-center">
                {winMessage}
              </h1>
              <Button color="success" block onClick={reloadGame}>
                Reload
              </Button>
            </div>
          ) : (
            <h1 className="text-center text-warning">
              {isCross ? "Cross" : "Circle"}'s turn
            </h1>
          )}
          <div className="grid">
            {itemArray.map((item, index) => (
              <Card color="warning" onClick={() => changeItem(index)}>
                <CardBody className="box">
                  <Icon name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
