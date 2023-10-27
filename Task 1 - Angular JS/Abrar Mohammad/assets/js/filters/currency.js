financeApp.filter("numbersToWords", function () {
    var words = [
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
    var words2 = [
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
    return function inWords(partyAmount) {
        if ((partyAmount = partyAmount.toString()).length > 11) return "overflow";
        numValue = ("00000000000" + partyAmount)
            .substr(-11)
            .match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!numValue) return;
        var amountInWords = "";
        amountInWords +=
            numValue[1] != 0
                ? (words[Number(numValue[1])] ||
                    words2[numValue[1][0]] + " " + words[numValue[1][1]]) + "hundred "
                : "";
        amountInWords +=
            numValue[2] != 0
                ? (words[Number(numValue[2])] ||
                    words2[numValue[2][0]] + " " + words[numValue[2][1]]) + "crore "
                : "";
        amountInWords +=
            numValue[3] != 0
                ? (words[Number(numValue[3])] ||
                    words2[numValue[3][0]] + " " + words[numValue[3][1]]) + "lakh "
                : "";
        amountInWords +=
            numValue[4] != 0
                ? (words[Number(numValue[4])] ||
                    words2[numValue[4][0]] + " " + words[numValue[4][1]]) + "thousand "
                : "";
        amountInWords +=
            numValue[5] != 0
                ? (words[Number(numValue[5])] ||
                    words2[numValue[5][0]] + " " + words[numValue[5][1]]) + "hundred "
                : "";
        amountInWords +=
            numValue[6] != 0
                ? (amountInWords != "" ? "and " : "") +
                (words[Number(numValue[6])] ||
                    words2[numValue[6][0]] + " " + words[numValue[6][1]]) +
                "only "
                : "";
        return amountInWords;
    }
    inWords()
})