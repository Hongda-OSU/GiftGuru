import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./homePage";

describe("HomePage", () => {
  it("There should be a button with text Get Recommendations", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const recommendationButton = screen.getByRole("button", {
      name: /get recommendations/i,
    });
    expect(recommendationButton).not.toBeNull();
  });
});
