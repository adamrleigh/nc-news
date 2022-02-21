import * as Plot from "@observablehq/plot";
import favorability from "./favorability.json";
import * as d3 from "d3";
import { useRef, useState, useEffect } from "react";

export const BarChart = () => {
  const headerRef = useRef();
  const { data, setData } = useState(favorability);

  const getFavourability = (d) => {
    return (
      d["Very Favorable %"] +
      d["Somewhat Favorable %"] -
      d["Very Unfavorable %"] -
      d["Somewhat Unfavorable %"]
    );
  };

  favorability.forEach((pres) => {
    pres["First Inauguration Date"] = new Date(pres["First Inauguration Date"]);
  });

  useEffect(() => {
    const chart = Plot.plot({
      inset: 30,
      width: 960,
      height: 600,
      x: {
        label: "Total posts →",
      },
      y: {
        grid: true,
        label: `↑ Total likes`,
        percent: true,
        tickFormat: "+f",
      },
      marks: [
        Plot.ruleY([0]),
        Plot.image(favorability, {
          x: "First Inauguration Date",
          y: (d) => getFavourability(d) / 100,
          width: 60,
          src: "Portrait URL",
          title: (d) =>
            `${d.Name}\n${d["First Inauguration Date"].getUTCFullYear()}`,
        }),
      ],
    });
    headerRef.current.append(chart);
    return () => chart.remove();
  }, [data]);
  return <div id="chartArea" ref={headerRef} data-test-id={`hi`}></div>;
};
