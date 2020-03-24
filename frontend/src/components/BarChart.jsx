import { ResponsiveBar } from '@nivo/bar';
import React from 'react';

const BarChart = ({ data, theme }) => (
  <ResponsiveBar
    data={data}
    keys={[ 'value' ]}
    indexBy="id"
    enableGridX={true}
    colorBy="index"
    margin={{ top: 30, right: 80, bottom: 50, left: 100 }}
    padding={0.3}
    layout="horizontal"
    colors={{ scheme: theme }}
    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
  />
);

export default BarChart;
