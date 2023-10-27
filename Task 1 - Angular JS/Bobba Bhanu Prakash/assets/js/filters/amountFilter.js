app.filter("convertToWords", function () {
  return function (amount) {
    if (amount == 0) {
      return "Zero";
    }
    var ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    var teens = [
      "",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    var tens = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Fourty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    function convertGroup(number) {
      if (number == 0) return "";
      else if (number < 10) return ones[number];
      else if (number < 20) return teens[number - 10];
      else if (number < 100)
        return tens[Math.floor(number / 10)] + " " + ones[number % 10];
      else
        return (
          ones[Math.floor(number / 100)] +
          " Hundred " +
          convertGroup(number % 100)
        );
    }
    var words = "";
    var crores = Math.floor(amount / 10000000);
    var lakhs = Math.floor((amount % 10000000) / 100000);
    var thousands = Math.floor((amount % 100000) / 1000);
    var remaining = Math.round(amount % 1000);

    if (crores > 0) {
      words += convertGroup(crores) + " Crore ";
    }

    if (lakhs > 0) {
      words += convertGroup(lakhs) + " Lakh ";
    }

    if (thousands > 0) {
      words += convertGroup(thousands) + " Thousand ";
    }

    if (remaining > 0) {
      words += convertGroup(remaining);
    }

    return words;
  };
});
