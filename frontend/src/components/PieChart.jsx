import { ResponsivePie } from '@nivo/pie';
import React from 'react';

const PieChart = ({ data, theme }) => (
  <ResponsivePie
    data={data}
    sortByValue={true}
    margin={{
      top: 30,
      right: 80,
      bottom: 50,
      left: 80
    }}
    innerRadius={0.4}
    padAngle={0.7}
    cornerRadius={3}
    colors={{
      scheme: theme
    }}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]]
    }}
    radialLabelsSkipAngle={10}
    radialLabelsTextXOffset={4}
    radialLabelsTextColor="#333333"
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={16}
    radialLabelsLinkHorizontalLength={24}
    radialLabelsLinkStrokeWidth={1}
    radialLabelsLinkColor={{
      from: "color"
    }}
    slicesLabelsSkipAngle={10}
    slicesLabelsTextColor="#333333"
    animate={true}
    motionStiffness={90}
    motionDamping={15}
  />
);

export default PieChart;
