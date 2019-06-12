import React from "react";
import renderer from "react-test-renderer";
import Card from "../Card";

describe("Card Component", () => {
  it("Renders Card component", () => {
    const tree = renderer
      .create(
        <Card
          height={"140px"}
          width={"100px"}
          handleClick={() => console.log("handleCick")}
          flipped={true}
          disabled={false}
          title={"Testing Card"}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
