import { Link } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";
function SelectorsButtons() {
  const [chosenButton, setChosenButton] = useState("Hoodie");

  return (
    <div className="w-full  py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            <div className="w-[120px]">
              <Button
                onClick={() => {
                  if (chosenButton !== "Hoodie") setChosenButton("Hoodie");
                }}
                chosenButton={chosenButton}
              >
                Hoodie
              </Button>
            </div>

            <div className="w-[120px]">
              <Link to="/products/women" replace>
                <Button
                  onClick={() => setChosenButton("Pantalone")}
                  chosenButton={chosenButton}
                >
                  Pantalone
                </Button>
              </Link>
            </div>

            <div className="w-[120px]">
              <Link to="/products/women" replace>
                <Button
                  onClick={() => setChosenButton("Shirt")}
                  chosenButton={chosenButton}
                >
                  Shirt
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectorsButtons;
