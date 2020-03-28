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

const setSalaryRange = ({ data }) => {
  const salary = {
    all: {},
    b2b: {},
    uop: {},
    uod: {},
    uz: {},
    unknown: {},
  };

  data.forEach((d) => {
    salaryRange(d, salary.all);
    switch(true) {
      case d.contract_type === 'b2b':
        salaryRange(d, salary.b2b);
        break;
      case d.contract_type === 'uop':
        salaryRange(d, salary.uop);
        break;
      case d.contract_type === 'uod':
        salaryRange(d, salary.uod);
        break;
      case d.contract_type === 'uz':
        salaryRange(d, salary.uz);
        break;
      default:
        salaryRange(d, salary.unknown);
        break;
    }
  });
  console.log(salary);
};

const salaryRange = (field, obj) => {
  switch (true) {
    case field.salary < 3000:
      setKeyValMap(obj, '< 3000');
      break;
    case field.salary >= 3000 && field.salary < 4500:
      setKeyValMap(obj, '3000-4499');
      break;
    case field.salary >= 4500 && field.salary < 6000:
      setKeyValMap(obj, '4500-5999');
      break;
    case field.salary >= 6000 && field.salary < 7500:
      setKeyValMap(obj, '6000-7499');
      break;
    case field.salary >= 7500 && field.salary < 9000:
      setKeyValMap(obj, '7500-8999');
      break;
    case field.salary >= 9000 && field.salary < 10500:
      setKeyValMap(obj, '9000-10499');
      break;
    case field.salary >= 10500 && field.salary < 12000:
      setKeyValMap(obj, '10500-11999');
      break;
    case field.salary >= 12000 && field.salary < 15000:
      setKeyValMap(obj, '12000-14999');
      break;
    case field.salary >= 15000 && field.salary < 20000:
      setKeyValMap(obj, '15000-19999');
      break;
    case field.salary >= 20000 && field.salary < 25000:
      setKeyValMap(obj, '20000-24999');
      break;
    default:
      setKeyValMap(obj, '>25000');
      break;
  }
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
        setSalaryRange(res);
        setLoading(false);
      },
    });
  }, []);

  return [loading, age, cities, contract, stack, experience];
};

export default useParseCsvToChartData;
