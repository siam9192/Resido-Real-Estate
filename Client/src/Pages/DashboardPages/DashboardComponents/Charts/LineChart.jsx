import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Apr',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Jun',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Jul',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Aug',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default class DashBoardLineChart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/line-chart-of-different-axis-intervals-er37wm';

  chart = (interval) => (
    <ResponsiveContainer height={250} width="100%">
      <LineChart data={data} margin={{ right: 25, top: 10 }}>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" interval={interval} />
        <YAxis interval={interval} />
        <Line type="monotone" dataKey="pv" stroke="#0d6efd" activeDot={{ r: 10}} />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );

  render() {
    return (
      <>
        {/* {this.chart('preserveEnd')} */}
        {this.chart('preserveStart')}
        {/* {this.chart('preserveStartEnd')}
        {this.chart('equidistantPreserveStart')}
        {this.chart(1)} */}
      </>
    );
  }
}

