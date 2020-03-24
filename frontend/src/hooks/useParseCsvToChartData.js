import { useEffect, useState } from 'react';

const Papa = require('papaparse/papaparse.min');
const csvFilePath = require('../data/data.csv');

const setKeyValMap = (obj, key) => {
  const objCopy = obj;
  !objCopy[key] ? objCopy[key] = 1 : objCopy[key]++;

  return objCopy;
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

  return chartVals
    .filter((val) => val.value >= 5)
    .sort((a, b) => ((a.value > b.value) ? 1 : -1));
};

const setExpRange = ({ data }) => {
  const exp = {};

  data.forEach((d) => {
    const key = d.exp < 1 ? '0-1' : d.exp;
    setKeyValMap(exp, key);
  });

  return mapToPieChartData(exp);
};

const setAgeRange = ({ data }) => {
  const age = {};

  data.forEach((d) => {
    switch (true) {
      case d.age <= 20:
        setKeyValMap(age, '<=20');
        break;
      case d.age >= 21 && d.age <= 25:
        setKeyValMap(age, '21-25');
        break;
      case d.age >= 26 && d.age <= 30:
        setKeyValMap(age, '26-30');
        break;
      case d.age >= 31 && d.age <= 35:
        setKeyValMap(age, '31-35');
        break;
      case d.age >= 36 && d.age <= 40:
        setKeyValMap(age, '36-40');
        break;
      case d.age >= 41 && d.age <= 45:
        setKeyValMap(age, '41-45');
        break;
      default:
        setKeyValMap(age, '>46');
        break;
    }
  });

  return mapToPieChartData(age);
};

const setPieChartData = ({ data }, key) => {
  const hashMap = {};

  data.map((d) => setKeyValMap(hashMap, d[key]));

  return mapToPieChartData(hashMap);
};

const useParseCsvToChartData = () => {
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState([]);
  const [cities, setCities] = useState([]);
  const [contract, setContract] = useState([]);
  const [stack, setStack] = useState([]);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    setLoading(true);
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: (res) => {
        setAge(setAgeRange(res));
        setExperience(setExpRange(res));
        setCities(setPieChartData(res, 'location'));
        setContract(setPieChartData(res, 'contract_type'));
        setStack(setPieChartData(res, 'stack'));
        setLoading(false);
      },
    });
  }, []);

  return [loading, age, cities, contract, stack, experience];
};

export default useParseCsvToChartData;
