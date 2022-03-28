/** @format */

import * as helpers from "../";

describe("Test Battle ships logic helpers", () => {
  it("should generate correct battle ship board", () => {
    const width = 2;
    const height = 2;
    const ship = {
      isShip: false,
      status: "",
    };
    const output = [
      [ship, ship],
      [ship, ship],
    ];
    expect(helpers.generateBoard(width, height)).toEqual(output);
  });

  it("should generate random number with given maximum number", () => {
    expect(helpers.getRandomNumber(5)).toBeLessThan(5);
    expect(helpers.getRandomNumber(5)).toBeGreaterThanOrEqual(0);
  });

  it("should output true if all ships are sunked", () => {
    const ships = [
      {
        id: 1,
        name: "Battleship",
        size: 5,
      },
      {
        id: 2,
        name: "Destroyer",
        size: 4,
      },
      {
        id: 3,
        name: "Destroyer",
        size: 4,
      },
    ];
    const totalSunkShips = 3;
    expect(helpers.getGameStatus(ships, totalSunkShips)).toBeTruthy();
  });

  it("should output false if not all ships are sunked", () => {
    const ships = [
      {
        id: 1,
        name: "Battleship",
        size: 5,
      },
      {
        id: 2,
        name: "Destroyer",
        size: 4,
      },
      {
        id: 3,
        name: "Destroyer",
        size: 4,
      },
    ];
    const totalSunkShips = 2;
    expect(helpers.getGameStatus(ships, totalSunkShips)).toBeFalsy();
  });

  it("it should output correct number of sunked ships, total missed, total hits", () => {
    const ships = [
      {
        id: 1,
        name: "Battleship",
        size: 5,
      },
      {
        id: 2,
        name: "Destroyer",
        size: 4,
      },
      {
        id: 3,
        name: "Destroyer",
        size: 4,
      },
    ];

    const battleField = [
      [
        { isShip: false, status: "missed" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
      ],
      [
        { isShip: false, status: "missed" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
      ],
      [
        { isShip: false, status: "missed" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "missed" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
      ],
      [
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: true, id: 1, name: "Battleship", status: "hitted" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "missed" },
      ],
      [
        { isShip: false, status: "missed" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "missed" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: true, id: 1, name: "Battleship", status: "hitted" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
      ],
      [
        { isShip: false, status: "missed" },
        { isShip: true, id: 3, name: "Destroyer", status: "alive" },
        { isShip: true, id: 3, name: "Destroyer", status: "alive" },
        { isShip: true, id: 3, name: "Destroyer", status: "hitted" },
        { isShip: true, id: 3, name: "Destroyer", status: "hitted" },
        { isShip: false, status: "missed" },
        { isShip: true, id: 1, name: "Battleship", status: "hitted" },
        { isShip: false, status: "missed" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
      ],
      [
        { isShip: false, status: "missed" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "missed" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: true, id: 1, name: "Battleship", status: "hitted" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
      ],
      [
        { isShip: false, status: "missed" },
        { isShip: true, id: 2, name: "Destroyer", status: "alive" },
        { isShip: true, id: 2, name: "Destroyer", status: "alive" },
        { isShip: true, id: 2, name: "Destroyer", status: "hitted" },
        { isShip: true, id: 2, name: "Destroyer", status: "alive" },
        { isShip: false, status: "" },
        { isShip: true, id: 1, name: "Battleship", status: "hitted" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
      ],
      [
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "missed" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
      ],
      [
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
        { isShip: false, status: "" },
      ],
    ];

    const output = { totalMissed: 14, totalHits: 8, totalSunkShips: 1 };
    expect(helpers.getTotal(battleField, ships)).toEqual(output);
  });

  it("should target the ship when fire", () => {
    const rowIndex = 1;
    const colIndex = 1;
    const battleField = [
      [
        {
          isShip: false,
          status: "",
        },
        {
          isShip: false,
          status: "",
        },
      ],
      [
        {
          isShip: true,
          status: "",
        },
        {
          isShip: true,
          status: "",
        },
      ],
    ];

    const battleFieldOutput = [
      [
        {
          isShip: false,
          status: "",
        },
        {
          isShip: false,
          status: "",
        },
      ],
      [
        {
          isShip: true,
          status: "",
        },
        {
          isShip: true,
          status: "hitted",
        },
      ],
    ];
    expect(helpers.fire(battleField, rowIndex, colIndex)).toEqual(
      battleFieldOutput
    );
  });

  it("should not target the ship when fire", () => {
    const rowIndex = 0;
    const colIndex = 0;
    const battleField = [
      [
        {
          isShip: false,
          status: "",
        },
        {
          isShip: false,
          status: "",
        },
      ],
      [
        {
          isShip: true,
          status: "",
        },
        {
          isShip: true,
          status: "",
        },
      ],
    ];

    const battleFieldOutput = [
      [
        {
          isShip: false,
          status: "missed",
        },
        {
          isShip: false,
          status: "",
        },
      ],
      [
        {
          isShip: true,
          status: "",
        },
        {
          isShip: true,
          status: "",
        },
      ],
    ];
    expect(helpers.fire(battleField, rowIndex, colIndex)).toEqual(
      battleFieldOutput
    );
  });
});
