import { useLayoutEffect, useRef, useState } from "react";
import { Panel, PanelGroup } from "react-resizable-panels";

import ResizeHandle from "./ResizeHandle";
import styles from "./styles.module.css";

const INTEGRATED_SEARCH = {
  minSize: 250,
  defaultSize: 300,
};

const TIME_FILTER = {
  minSize: 250,
  defaultSize: 300,
};

const MAIN = {
  minSize: 250,
};

const MAIN_SEARCH = {
  minSize: 100,
  defaultSize: 100,
};

const MAIN_GRID = {
  minSize: 400,
};

export default function App() {
  const [minSize, setMinSize] = useState({
    INTEGRATED_SEARCH: 10,
    TIME_FILTER: 10,
    MAIN: 10,
    MAIN_SEARCH: 10,
    MAIN_GRID: 20,
  });
  const [defaultSize, setDefaultSize] = useState({
    INTEGRATED_SEARCH: 10,
    TIME_FILTER: 10,
    MAIN: undefined,
    MAIN_SEARCH: 10,
    MAIN_GRID: undefined,
  });

  useLayoutEffect(() => {
    const panelGroup = document.querySelector('[data-panel-group-id="group"]');
    const resizeHandles = document.querySelectorAll(
      '[data-panel-resize-handle-id="horizontal-*"]'
    );
    const observer = new ResizeObserver(() => {
      let width = panelGroup.offsetWidth;

      resizeHandles.forEach((resizeHandle) => {
        width -= resizeHandle.offsetWidth;
      });

      setMinSize({
        INTEGRATED_SEARCH: (INTEGRATED_SEARCH.minSize / width) * 100,
        TIME_FILTER: (TIME_FILTER.minSize / width) * 100,
        MAIN: (MAIN.minSize / width) * 100,
      });
      setDefaultSize({
        INTEGRATED_SEARCH: (INTEGRATED_SEARCH.defaultSize / width) * 100,
        TIME_FILTER: (TIME_FILTER.defaultSize / width) * 100,
        MAIN: undefined,
      });
    });
    observer.observe(panelGroup);
    resizeHandles.forEach((resizeHandle) => {
      observer.observe(resizeHandle);
    });

    return () => {
      observer.unobserve(panelGroup);
      resizeHandles.forEach((resizeHandle) => {
        observer.unobserve(resizeHandle);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <PanelGroup direction="horizontal" id="group">
      <Panel
        className={styles.Panel}
        minSize={minSize.INTEGRATED_SEARCH}
        defaultSize={defaultSize.INTEGRATED_SEARCH}
        order={1}
        collapsible
      >
        <div className={styles.PanelContent}>INTEGRATED_SEARCH</div>
      </Panel>
      <ResizeHandle id="horizontal-group-integrated-search" />

      <Panel
        className={styles.Panel}
        minSize={minSize.TIME_FILTER}
        defaultSize={defaultSize.TIME_FILTER}
        order={1}
        collapsible
      >
        <div className={styles.PanelContent}>TIME_FILTER</div>
      </Panel>
      <ResizeHandle id="horizontal-group-time" />

      <Panel
        className={styles.Panel}
        order={2}
        minSize={minSize.MAIN}
        defaultSize={defaultSize.MAIN}
        style={{ overflow: "auto" }}
      >
        <VerticalGroup />
      </Panel>
    </PanelGroup>
  );
}

function VerticalGroup() {
  const ref = useRef();
  const [minSize, setMinSize] = useState({
    MAIN_SEARCH: 10,
    MAIN_GRID: 20,
  });
  const [defaultSize, setDefaultSize] = useState({
    MAIN_SEARCH: 10,
    MAIN_GRID: undefined,
  });

  useLayoutEffect(() => {
    const panelGroup = document.querySelector(
      '[data-panel-group-id="vertical-group"]'
    );
    const resizeHandles = document.querySelectorAll(
      "[data-panel-resize-handle-id='vertical-resize-handle']"
    );

    const observer = new ResizeObserver(() => {
      let height = panelGroup.offsetHeight;

      resizeHandles.forEach((resizeHandle) => {
        height -= resizeHandle.offsetHeight;
      });

      setMinSize({
        MAIN_GRID: (MAIN_GRID.minSize / height) * 100,
        MAIN_SEARCH: (MAIN_SEARCH.minSize / height) * 100,
      });
      setDefaultSize({
        MAIN_GRID: undefined,
        MAIN_SEARCH: (MAIN_SEARCH.defaultSize / height) * 100,
      });
    });
    observer.observe(panelGroup);
    resizeHandles.forEach((resizeHandle) => {
      observer.observe(resizeHandle);
    });

    return () => {
      observer.unobserve(panelGroup);
      resizeHandles.forEach((resizeHandle) => {
        observer.unobserve(resizeHandle);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <PanelGroup
      autoSaveId="verticalMinMax"
      direction="vertical"
      id="vertical-group"
      className={styles.scroll}
      style={{ overflow: "auto" }}
      ref={ref}
    >
      <Panel
        minSize={minSize.MAIN_SEARCH}
        defaultSize={defaultSize.MAIN_SEARCH}
      >
        <div className={styles.PanelContent}>MAIN_SEARCH</div>
      </Panel>
      <ResizeHandle id="vertical-resize-handle" />
      <Panel>
        <div className={styles.PanelContent}>MAIN_GRID</div>
      </Panel>
    </PanelGroup>
  );
}
