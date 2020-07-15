export default [
  {
    _id: "25yW1tqFogDRCAcPtLQA",
    title: "Racer",
    count: 1,
    price: 50,
    discount: {
      type: "percent",
      percent: 10,
    },
  },
  {
    _id: "2HkKg2fFObWkzqBCqy4Y",
    title: "Foxx",
    count: 2,
    price: 50,
    discount: {
      type: "freeEveryNth",
      number: 4,
    },
  },
  {
    _id: "2IDyLteFlWGZwmbFD1GF",
    title: "Rover",
    count: 3,
    price: 50,
    discount: {
      type: "freeOverPay",
      price: 100,
    },
  },
  {
    _id: "2Qdy8t1QpelOm2DMhfxJ",
    title: "Aist",
    count: 4,
    price: 50,
    discount: {
      type: "bundle",
      match: ["2ctdOVL6dcWAVIZgaHIO"],
      reductionPerBundle: 20,
    },
  },
  {
    _id: "2ctdOVL6dcWAVIZgaHIO",
    title: "Stinger",
    price: 50,
    count: 10,
    discount: {
      type: "bulk",
      count: 10,
      reductionToEvery: 10,
    },
  },
  {
    _id: "2ctdOVL6dcWAVIZgaHIO",
    title: "Erelucas",
    price: 50,
    count: 9,
  },
];
