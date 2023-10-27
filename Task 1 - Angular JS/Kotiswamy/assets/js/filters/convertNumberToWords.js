app.filter("numbersToWord", function () {
  return function (amount) {
    let below20List = [
      "",
      "one ",
      "two ",
      "three ",
      "four ",
      "five ",
      "six ",
      "seven ",
      "eight ",
      "nine ",
      "ten ",
      "eleven ",
      "twelve ",
      "thirteen ",
      "fourteen ",
      "fifteen ",
      "sixteen ",
      "seventeen ",
      "eighteen ",
      "nineteen ",
    ];
    let above20List = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];
    if (amount === 0) {
      return "Zero only";
    } else if (!amount) {
      return "Amount in words";
    } else if ((amount = amount.toString()).length > 14) {
      return "Amount out of range...";
    }
    var n = ("00000000000000" + amount)
      .substr(-14)
      .match(/^(\d{2})(\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    var amountInWord = "";
    amountInWord +=
      n[1] != 0
        ? (below20List[Number(n[1])] ||
            above20List[n[1][0]] + " " + below20List[n[1][1]]) + "lakh "
        : "";
    amountInWord +=
      n[2] != 0
        ? (below20List[Number(n[2])] ||
            above20List[n[2][0]] + " " + below20List[n[2][1]]) + "thousand "
        : "";
    amountInWord +=
      n[3] != 0
        ? (below20List[Number(n[3])] ||
            above20List[n[3][0]] + " " + below20List[n[3][1]]) + "hundred "
        : "";
    amountInWord +=
      n[4] != 0
        ? (below20List[Number(n[4])] ||
            above20List[n[4][0]] + " " + below20List[n[4][1]]) + "crore "
        : "";
    amountInWord +=
      n[5] != 0
        ? (below20List[Number(n[5])] ||
            above20List[n[5][0]] + " " + below20List[n[5][1]]) + "lakh "
        : "";
    amountInWord +=
      n[6] != 0
        ? (below20List[Number(n[6])] ||
            above20List[n[6][0]] + " " + below20List[n[6][1]]) + "thousand "
        : "";
    amountInWord +=
      n[7] != 0
        ? (below20List[Number(n[7])] ||
            above20List[n[7][0]] + " " + below20List[n[7][1]]) + "hundred "
        : "";
    amountInWord +=
      n[8] != 0
        ? (amountInWord != "" ? "and " : "") +
          (below20List[Number(n[8])] ||
            above20List[n[8][0]] + " " + below20List[n[8][1]]) +
          "only "
        : "";
    return amountInWord;
  };
});
