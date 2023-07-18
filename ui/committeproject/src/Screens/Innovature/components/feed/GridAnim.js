import React from "react";
import feedStyles from "./feed.module.css";
const GridAnim = () => {
  return (
    <div>
      <div class={feedStyles["logo-holder"]}>
        <div class={feedStyles["bg"]}></div>
        <div class={feedStyles["bar"]}></div>
        <div class={feedStyles["bar1"]}></div>
        <div class={feedStyles["bar2"]}></div>
        <div class={feedStyles["bar3"]}></div>
        <div class={feedStyles["bar4"]}></div>
        <div class={feedStyles["bar5"]}></div>
        <div class={feedStyles["bar6"]}></div>
        <div class={feedStyles["bar4"]}></div>
        <div class={feedStyles["bar5"]}></div>

        <div class={feedStyles["bar1"]}></div>
        <div class={feedStyles["bar2"]}></div>
        <div class={feedStyles["bar1"]}></div>
        <div class={feedStyles["bar2"]}></div>
        <div class={feedStyles["bar"]}></div>
        <div class={feedStyles["bar6"]}></div>
        <div class={feedStyles["bar4"]}></div>
        <div class={feedStyles["bar5"]}></div>

        <div class={feedStyles["bar1"]}></div>
        {/* <div class={feedStyles["bar fill1"]}></div>
        <div class={feedStyles["bar fill2"]}></div>
    */}
      
      </div>
    </div>
  );
};

export default GridAnim;