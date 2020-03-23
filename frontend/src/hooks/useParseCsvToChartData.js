import { useEffect, useState } from 'react';
const csvFilePath = require('../data/data.csv');
const Papa = require('papaparse/papaparse.min');

const setHashmap = (obj, key) => {
  if (!obj[key]) {
    obj[key] = 1;
  } else {
    obj[key]++;
  }
};

const mapToPieChartData = (val) => {
  const chartVals = [];

  Object.keys(val).forEach((v) => chartVals.push(
    {
      id: v,
      label: v,
      value: val[v],
    },
  ));

  return chartVals;
};

const setAgeRange = ({ data }) => {
  const age = {};

  data.map((d) => {
    switch (true) {
      case d.age <= 20:
        setHashmap(age, '<=20');
        break;
      case d.age >= 21 && d.age <= 25:
        setHashmap(age, '21-25');
        break;
      case d.age >= 26 && d.age <= 30:
        setHashmap(age, '26-30');
        break;
      case d.age >= 31 && d.age <= 35:
        setHashmap(age, '31-35');
        break;
      case d.age >= 36 && d.age <= 40:
        setHashmap(age, '36-40');
        break;
      case d.age >= 41 && d.age <= 45:
        setHashmap(age, '41-45');
        break;
      default:
        setHashmap(age, '>46');
        break;
    }

    return '';
  });

  return mapToPieChartData(age);
};

const setPieChartData = ({ data }, key) => {
  const hashMap = {};

  data.map((d) => setHashmap(hashMap, d[key]));

  return mapToPieChartData(hashMap);
};

const useParseCsvToChartData = () => {
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState([]);
  const [cities, setCities] = useState([]);
  const [contract, setContract] = useState([]);
  const [stack, setStack] = useState([]);

  useEffect(() => {
    setLoading(true);
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: (res) => {
        setAge(setAgeRange(res));
        setCities(setPieChartData(res, 'location'));
        setContract(setPieChartData(res, 'contract_type'));
        setStack(setPieChartData(res, 'stack'));
        setLoading(false);
      },
    });
  }, []);

  return [loading, age, cities, contract, stack];
};

export default useParseCsvToChartData;
