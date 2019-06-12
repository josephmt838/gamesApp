import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import GameBoard from "../GameBoard";

describe("GameBoard Component", () => {
  it("Renders GameBoard component", () => {
    const tree = renderer.create(<GameBoard classes="testing-jest" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Supplies classes to gameboard", () => {
    const outputClass = "game-board testing-jest";
    const newClass = "testing-jest";
    const game = <GameBoard classes={newClass} />;

    const { getByTestId } = render(game);

    const renderedClasses = Object.values(
      getByTestId("classes").classList
    ).join(" ");

    expect(renderedClasses).toEqual(outputClass);
  });

  it("Supplies children to GameBoard", () => {
    const game = (
      <GameBoard>
        <p data-testid="children">Testing Children</p>
      </GameBoard>
    );

    const { getByTestId } = render(game);
    expect(getByTestId("children").innerHTML).toBe("Testing Children");
  });
});
